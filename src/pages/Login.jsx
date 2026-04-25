import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowRight, Mountain, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/map" replace />;
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the login link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/map');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="login-container" 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        background: 'url(/assets/trekking_bg.png) no-repeat center center / cover',
        position: 'relative'
      }}
    >
      {/* Overlay to ensure text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.8))',
        zIndex: 0
      }} />

      <div className="glass-panel" style={{
        padding: '40px',
        width: '100%',
        maxWidth: '420px',
        zIndex: 1,
        textAlign: 'center'
      }}>
        <Mountain size={48} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>
          Welcome to <span className="text-gradient">PeakPursuit</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Discover the best trails and campsites in the Western Ghats.
        </p>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <input 
              type="email" 
              className="glass-input" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <input 
              type="password" 
              className="glass-input" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="glass-button" disabled={loading} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '16px',
            opacity: loading ? 0.7 : 1
          }}>
            {loading ? <Loader size={18} className="spin" /> : (isSignUp ? 'Create Account' : 'Explore Trails')} 
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div style={{ marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"} 
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ color: 'var(--color-primary)', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', marginLeft: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
}
