import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MAHARASHTRA_TRAILS } from '../data/mockData';
import L from 'leaflet';
import { MapPin, Star, Clock, Activity, Tent } from 'lucide-react';
const trekIcon = new L.Icon({
  iconUrl: '/assets/trek_zigzag_icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});
const campIcon = new L.Icon({
  iconUrl: '/assets/camp_tent_icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Fix for default leaflet icons not showing up in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Home() {
  const navigate = useNavigate();
  const [selectedTrail, setSelectedTrail] = useState(MAHARASHTRA_TRAILS[0]);
  
  // Center of Maharashtra roughly
  const mapCenter = [18.9, 73.5]; 

  return (
    <div style={{ display: 'flex', flex: 1, padding: '16px', gap: '16px', overflow: 'hidden' }}>
      
      {/* Sidebar for Selected Trail */}
      <div className="glass-panel" style={{ width: '380px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <img 
          src={selectedTrail.image} 
          alt={selectedTrail.name} 
          style={{ width: '100%', height: '240px', objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} 
        />
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedTrail.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(245, 158, 11, 0.2)', padding: '4px 8px', borderRadius: '12px', color: 'var(--color-secondary)' }}>
              <Star size={14} fill="currentColor" />
              <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{selectedTrail.rating}</span>
            </div>
          </div>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: '1.5' }}>
            {selectedTrail.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <Activity size={18} color="var(--color-primary)" />
              <span>{selectedTrail.difficulty}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <Clock size={18} color="var(--color-primary)" />
              <span>{selectedTrail.duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {selectedTrail.type === 'Camping' ? <Tent size={18} color="var(--color-primary)" /> : <MapPin size={18} color="var(--color-primary)" />}
              <span>{selectedTrail.type}</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {selectedTrail.tags.map(tag => (
              <span key={tag} style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                padding: '4px 12px', 
                borderRadius: '16px', 
                fontSize: '0.75rem',
                border: '1px solid var(--glass-border)'
              }}>
                {tag}
              </span>
            ))}
          </div>

          <button className="glass-button" style={{ width: '100%' }} onClick={() => navigate(`/trail/${selectedTrail.id}`)}>
            View Full Details
          </button>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="glass-panel" style={{ flex: 1, padding: '4px', overflow: 'hidden' }}>
        <MapContainer 
          center={mapCenter} 
          zoom={8} 
          style={{ height: '100%', width: '100%', borderRadius: '12px' }}
        >
          {/* Using a dark themed map tile layer */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          {MAHARASHTRA_TRAILS.map((trail) => (
            <Marker 
              key={trail.id} 
              position={trail.coordinates}
              icon={trail.type.includes('Trek') ? trekIcon : campIcon}
              eventHandlers={{
                click: () => setSelectedTrail(trail),
              }}
            >
              <Popup>
                <div style={{ textAlign: 'center', margin: '4px' }}>
                  <h3 style={{ margin: 0, paddingBottom: '4px', borderBottom: '1px solid var(--glass-border)' }}>{trail.name}</h3>
                  <p style={{ margin: '8px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{trail.difficulty}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

    </div>
  );
}
