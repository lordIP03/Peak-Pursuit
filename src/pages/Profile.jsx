import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, MapPin, LogOut } from 'lucide-react';

export default function Profile() {
  const { user, signOut } = useAuth();

  return (
    <div style={{ padding: '32px', display: 'flex', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
          <div style={{ 
            width: '80px', height: '80px', 
            borderRadius: '50%', 
            background: 'var(--color-primary)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white'
          }}>
            <User size={40} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>Explorer Profile</h1>
            <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={16} /> {user?.email}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--glass-border)' }}>
            <span style={{ color: 'var(--text-muted)' }}><Calendar size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }}/> Member Since</span>
            <span>{new Date(user?.created_at).toLocaleDateString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--glass-border)' }}>
            <span style={{ color: 'var(--text-muted)' }}><MapPin size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }}/> Trails Saved</span>
            <span>0</span>
          </div>
        </div>

        <button 
          onClick={signOut}
          className="glass-button" 
          style={{ width: '100%', background: 'rgba(239, 68, 68, 0.9)', display: 'flex', justifyContent: 'center', gap: '8px' }}
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );
}
