import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Star, Edit2, Trash2, MessageSquare } from 'lucide-react';
import './ReviewSection.css';

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(days / 30);
  const years = Math.round(days / 365);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  return `${years} year${years > 1 ? 's' : ''} ago`;
};

const ReviewSection = ({ trailId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userReview, setUserReview] = useState(null);
  
  // Form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [trailId, user]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          id,
          trail_id,
          user_id,
          rating,
          text,
          created_at,
          profiles:user_id (email)
        `)
        .eq('trail_id', trailId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        return;
      }

      setReviews(data || []);
      
      if (user) {
        const existingReview = data?.find(r => r.user_id === user.id);
        if (existingReview) {
          setUserReview(existingReview);
          setRating(existingReview.rating);
          setReviewText(existingReview.text || '');
        }
      }
    } catch (err) {
      console.error('Unexpected error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (rating === 0) return alert('Please select a star rating');

    setSubmitting(true);
    try {
      const reviewData = {
        trail_id: trailId,
        user_id: user.id,
        rating,
        text: reviewText.trim()
      };

      if (userReview) {
        // Update existing review
        const { error } = await supabase
          .from('reviews')
          .update(reviewData)
          .eq('id', userReview.id);
          
        if (error) throw error;
      } else {
        // Insert new review
        const { error } = await supabase
          .from('reviews')
          .insert([reviewData]);
          
        if (error) throw error;
      }

      setIsEditing(false);
      fetchReviews(); // Refresh the list
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!userReview || !window.confirm('Are you sure you want to delete your review?')) return;
    
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', userReview.id);
        
      if (error) throw error;
      
      setUserReview(null);
      setRating(0);
      setReviewText('');
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review.');
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1) 
    : 0;

  return (
    <div className="review-section">
      <div className="review-header">
        <h2><MessageSquare size={24} /> Reviews & Ratings</h2>
        {reviews.length > 0 && (
          <div className="review-stats">
            <div className="avg-rating">
              <Star size={24} fill="#ffc107" color="#ffc107" />
              <span>{averageRating}</span>
            </div>
            <span className="review-count">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
          </div>
        )}
      </div>

      {/* Review Form Area */}
      <div className="review-form-container">
        {!user ? (
          <div className="login-prompt">
            <p>Please log in to leave a review for this trail.</p>
          </div>
        ) : (
          <>
            {userReview && !isEditing ? (
              <div className="my-review-summary">
                <div className="my-review-header">
                  <h3>Your Review</h3>
                  <div className="my-review-actions">
                    <button onClick={() => setIsEditing(true)} className="action-btn edit" title="Edit Review">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={handleDelete} className="action-btn delete" disabled={submitting} title="Delete Review">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="star-display">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={18} 
                      fill={star <= userReview.rating ? "#ffc107" : "none"} 
                      color={star <= userReview.rating ? "#ffc107" : "#666"} 
                    />
                  ))}
                </div>
                {userReview.text && <p className="my-review-text">{userReview.text}</p>}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="review-form">
                <h3>{userReview ? 'Edit Your Review' : 'Write a Review'}</h3>
                
                <div className="star-rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className="star-btn"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <Star 
                        size={28} 
                        fill={(hoverRating || rating) >= star ? "#ffc107" : "none"} 
                        color={(hoverRating || rating) >= star ? "#ffc107" : "#666"} 
                        className="transition-colors"
                      />
                    </button>
                  ))}
                </div>

                <textarea
                  placeholder="Share your experience (optional)... How was the trail? Any tips?"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows="4"
                  className="review-textarea"
                />

                <div className="form-actions">
                  {isEditing && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setIsEditing(false);
                        setRating(userReview.rating);
                        setReviewText(userReview.text || '');
                      }} 
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  )}
                  <button type="submit" disabled={submitting || rating === 0} className="submit-btn">
                    {submitting ? 'Submitting...' : (userReview ? 'Update Review' : 'Submit Review')}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>

      {/* Reviews List */}
      <div className="reviews-list">
        {loading ? (
          <p className="loading-text">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <div className="empty-state">
            <Star size={48} className="empty-icon" color="#444" />
            <p>No reviews yet.</p>
            <p className="sub-text">Be the first to review this trail!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-card-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {(review.profiles?.email || 'Anonymous').charAt(0).toUpperCase()}
                  </div>
                  <div className="reviewer-meta">
                    <span className="reviewer-name">
                      {review.profiles?.email ? review.profiles.email.split('@')[0] : 'Anonymous'}
                    </span>
                    <span className="review-date">{formatTimeAgo(review.created_at)}</span>
                  </div>
                </div>
                <div className="star-display">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={14} 
                      fill={star <= review.rating ? "#ffc107" : "none"} 
                      color={star <= review.rating ? "#ffc107" : "#555"} 
                    />
                  ))}
                </div>
              </div>
              {review.text && <p className="review-text">{review.text}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
