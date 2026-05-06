import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || ''
  });

  const handleSave = () => {
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} 
        style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px' }}>
        ← Back
      </button>

      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px', borderRadius: '12px', color: 'white', marginBottom: '30px', textAlign: 'center' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: 'bold', color: '#667eea', marginBottom: '20px' }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <h2 style={{ margin: '10px 0' }}>{user?.name}</h2>
        <p style={{ margin: '5px 0', opacity: '0.9' }}>{user?.role}</p>
      </div>

      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>Personal Information</h3>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)}
              style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Edit Profile
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setIsEditing(false)}
                style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleSave}
                style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#666' }}>Name</label>
            {isEditing ? (
              <input type="text" value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            ) : (
              <p style={{ margin: 0, padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>{user?.name}</p>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#666' }}>Email</label>
            {isEditing ? (
              <input type="email" value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            ) : (
              <p style={{ margin: 0, padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>{user?.email}</p>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#666' }}>Phone</label>
            {isEditing ? (
              <input type="tel" value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            ) : (
              <p style={{ margin: 0, padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>{user?.phone || 'Not provided'}</p>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#666' }}>Address</label>
            {isEditing ? (
              <input type="text" value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            ) : (
              <p style={{ margin: 0, padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>{user?.address || 'Not provided'}</p>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#666' }}>City</label>
              {isEditing ? (
                <input type="text" value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              ) : (
                <p style={{ margin: 0, padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>{user?.city}</p>
              )}
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#666' }}>State</label>
              {isEditing ? (
                <input type="text" value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              ) : (
                <p style={{ margin: 0, padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>{user?.state}</p>
              )}
            </div>
          </div>
        </div>

        <button onClick={handleLogout}
          style={{ width: '100%', marginTop: '30px', padding: '12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '500' }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
