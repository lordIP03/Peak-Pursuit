import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MAHARASHTRA_TRAILS } from '../data/mockData';
import { 
  ArrowLeft, 
  MapPin, 
  Mountain, 
  TrendingUp, 
  Clock, 
  Car, 
  Train, 
  CalendarDays, 
  AlertTriangle, 
  CheckCircle2,
  Camera,
  Star
} from 'lucide-react';
import './TrailDetail.css';

const THINGS_TO_CARRY = [
  "Trekking shoes with good grip",
  "Minimum 2 liters of water",
  "Energy bars and dry fruits",
  "First aid kit",
  "Sunscreen and sunglasses",
  "Raincoat/Poncho (if monsoon)",
  "Flashlight/Headlamp",
  "Power bank"
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Helper to determine best months based on tags (just a mock logic)
const getBestMonths = (tags) => {
  if (tags.includes("Monsoon Safe")) return [5, 6, 7, 8]; // Jun-Sep
  if (tags.includes("Night Sky")) return [9, 10, 11, 0, 1, 2]; // Oct-Mar
  return [8, 9, 10, 11, 0, 1]; // Default Sep-Feb
};

const TrailDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const trail = MAHARASHTRA_TRAILS.find(t => t.id === parseInt(id));

  if (!trail) {
    return (
      <div className="trail-detail-loading">
        <h2>Loading trail information...</h2>
        <button onClick={() => navigate('/map')} className="back-btn">Go Back</button>
      </div>
    );
  }

  const requiresPermit = trail.tags.includes("Forest Permit Required");
  const bestMonthsIndices = getBestMonths(trail.tags);

  return (
    <div className="trail-detail-container page-transition">
      {/* Hero Section */}
      <div className="trail-hero" style={{ backgroundImage: `url(${trail.image})` }}>
        <div className="hero-overlay"></div>
        <button className="back-nav-btn" onClick={() => navigate('/map')}>
          <ArrowLeft size={20} /> Back to Map
        </button>
        <div className="hero-content">
          <div className="hero-tags">
            <span className="type-badge">{trail.type}</span>
            <span className="difficulty-badge">{trail.difficulty}</span>
          </div>
          <h1 className="trail-title">{trail.name}</h1>
          <div className="hero-meta">
            <span className="meta-item"><MapPin size={18} /> {trail.coordinates[0].toFixed(2)}, {trail.coordinates[1].toFixed(2)}</span>
            <span className="meta-item rating"><Star size={18} fill="#ffc107" color="#ffc107" /> {trail.rating} ({trail.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="trail-content-wrapper">
        <div className="trail-main-content">
          {/* Description */}
          <section className="detail-section">
            <h2>About this {trail.type}</h2>
            <p className="trail-description">{trail.description}</p>
            <div className="tags-container">
              {trail.tags.map((tag, idx) => (
                <span key={idx} className="feature-tag">{tag}</span>
              ))}
            </div>
          </section>

          {/* Photo Gallery (Mock additional photos) */}
          <section className="detail-section">
            <h2><Camera size={20} /> Photo Gallery</h2>
            <div className="photo-grid">
              <img src={trail.image} alt="Trail view 1" />
              <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80" alt="Trail view 2" />
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" alt="Trail view 3" />
            </div>
          </section>

          {/* How to Reach */}
          <section className="detail-section">
            <h2>How to Reach</h2>
            <div className="transport-options">
              <div className="transport-card">
                <Car size={24} className="transport-icon" />
                <h3>By Road</h3>
                <p>Accessible via nearest major highway. Parking is available at the base village.</p>
              </div>
              <div className="transport-card">
                <Train size={24} className="transport-icon" />
                <h3>By Train</h3>
                <p>Nearest railway station is located 15-20 kms away. Local transport (jeeps/autos) available from the station.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="trail-sidebar">
          {/* Stats Card */}
          <div className="stats-card">
            <h3>Trail Statistics</h3>
            <div className="stat-grid">
              <div className="stat-item">
                <TrendingUp size={20} />
                <div>
                  <span className="stat-label">Elevation Gain</span>
                  <span className="stat-value">~850m</span>
                </div>
              </div>
              <div className="stat-item">
                <Mountain size={20} />
                <div>
                  <span className="stat-label">Max Altitude</span>
                  <span className="stat-value">1646m</span>
                </div>
              </div>
              <div className="stat-item">
                <MapPin size={20} />
                <div>
                  <span className="stat-label">Total Distance</span>
                  <span className="stat-value">~12 km</span>
                </div>
              </div>
              <div className="stat-item">
                <Clock size={20} />
                <div>
                  <span className="stat-label">Duration</span>
                  <span className="stat-value">{trail.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Best Season */}
          <div className="sidebar-card season-card">
            <h3><CalendarDays size={20} /> Best Season</h3>
            <div className="months-grid">
              {MONTHS.map((month, idx) => {
                const isBest = bestMonthsIndices.includes(idx);
                return (
                  <div key={month} className={`month-indicator ${isBest ? 'best' : ''}`}>
                    {month}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Permit Info */}
          <div className={`sidebar-card permit-card ${requiresPermit ? 'required' : 'not-required'}`}>
            <h3>Permit Information</h3>
            {requiresPermit ? (
              <div className="permit-status">
                <AlertTriangle size={20} />
                <p><strong>Forest Permit Required.</strong> Please obtain it from the base village checkpost before starting the trek.</p>
              </div>
            ) : (
              <div className="permit-status">
                <CheckCircle2 size={20} />
                <p><strong>No Permit Required.</strong> You can freely access this trail. Please maintain cleanliness.</p>
              </div>
            )}
          </div>

          {/* Things to Carry */}
          <div className="sidebar-card checklist-card">
            <h3>Things to Carry</h3>
            <ul className="checklist">
              {THINGS_TO_CARRY.map((item, idx) => (
                <li key={idx}><CheckCircle2 size={16} /> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailDetail;
