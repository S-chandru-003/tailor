import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BookingModal from '../components/BookingModal';
import api from '../api';

function CustomerDashboard() {
  const { user } = useAuth();
  const [tailors, setTailors] = useState([]);
  const [filteredTailors, setFilteredTailors] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    minRating: 0,
    specialization: ''
  });

  useEffect(() => {
    loadTailors();
    loadOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, tailors]);

  const loadTailors = async () => {
    try {
      const response = await api.get('/tailors/search', {
        params: { city: user?.city || 'Mumbai' }
      });
      setTailors(response.data);
      setFilteredTailors(response.data);
    } catch (error) {
      console.error('Error loading tailors:', error);
      setTailors([]);
      setFilteredTailors([]);
    }
  };

  const applyFilters = () => {
    let filtered = [...tailors];

    if (filters.state) {
      filtered = filtered.filter(t => t.state.toLowerCase().includes(filters.state.toLowerCase()));
    }

    if (filters.city) {
      filtered = filtered.filter(t => t.city.toLowerCase().includes(filters.city.toLowerCase()));
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter(t => t.rating >= filters.minRating);
    }

    if (filters.specialization) {
      filtered = filtered.filter(t => t.specialization.toLowerCase().includes(filters.specialization.toLowerCase()));
    }

    setFilteredTailors(filtered);
  };

  const resetFilters = () => {
    setFilters({ state: '', city: '', minRating: 0, specialization: '' });
  };

  const loadOrders = async () => {
    try {
      const response = await api.get(`/tailors/orders/customer/${user.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const createOrder = (tailor) => {
    setSelectedTailor(tailor);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      await api.post('/tailors/orders', {
        customer: { id: user.id },
        tailor: { id: bookingData.tailorId },
        ...bookingData
      });
      loadOrders();
      alert('Booking request sent successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Profile Section */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '30px', borderRadius: '12px', color: 'white', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ margin: '0 0 5px 0' }}>Welcome, {user?.name || 'Customer'}!</h2>
              <p style={{ margin: '0', opacity: '0.9' }}>📧 {user?.email}</p>
              <p style={{ margin: '5px 0 0 0', opacity: '0.9' }}>📍 {user?.city}, {user?.state}</p>
            </div>
          </div>
          <a href="/profile" style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '500' }}>
            View Profile
          </a>
        </div>
      </div>
      
      {/* Filter Section */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Filter Tailors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>State</label>
            <input type="text" value={filters.state}
              onChange={(e) => setFilters({...filters, state: e.target.value})}
              placeholder="e.g., Maharashtra"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>City</label>
            <input type="text" value={filters.city}
              onChange={(e) => setFilters({...filters, city: e.target.value})}
              placeholder="e.g., Mumbai"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Min Rating</label>
            <select value={filters.minRating}
              onChange={(e) => setFilters({...filters, minRating: parseFloat(e.target.value)})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}>
              <option value="0">All Ratings</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
              <option value="3.0">3.0+ Stars</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Specialization</label>
            <input type="text" value={filters.specialization}
              onChange={(e) => setFilters({...filters, specialization: e.target.value})}
              placeholder="e.g., Wedding"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
          </div>
        </div>
        <button onClick={resetFilters}
          style={{ marginTop: '15px', padding: '8px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Reset Filters
        </button>
        <span style={{ marginLeft: '15px', color: '#666' }}>Showing {filteredTailors.length} tailors</span>
      </div>

      <h3 style={{ marginBottom: '20px', fontSize: '24px' }}>Top Rated Tailors Near You</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
        {filteredTailors.map(tailor => (
          <div key={tailor.id} style={{ border: '1px solid #e0e0e0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s', cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <img src={tailor.image || 'https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=400'} alt={tailor.shopName} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '20px', color: '#333' }}>{tailor.shopName}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                <span style={{ color: '#ffa500', fontSize: '18px' }}>⭐</span>
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{tailor.rating?.toFixed(1)}</span>
                <span style={{ color: '#666', fontSize: '14px' }}>({tailor.totalRatings} reviews)</span>
              </div>
              <p style={{ margin: '8px 0', color: '#666', fontSize: '14px' }}>📍 {tailor.address}</p>
              <p style={{ margin: '8px 0', color: '#666', fontSize: '14px' }}>🏙️ {tailor.city}, {tailor.state}</p>
              <p style={{ margin: '8px 0', color: '#666', fontSize: '14px' }}>📞 {tailor.phone}</p>
              {tailor.specialization && <p style={{ margin: '8px 0', color: '#667eea', fontSize: '14px', fontWeight: '500' }}>✂️ {tailor.specialization}</p>}
              {tailor.experience && <p style={{ margin: '8px 0', color: '#666', fontSize: '14px' }}>🎓 {tailor.experience} years experience</p>}
              <button onClick={() => createOrder(tailor)}
                style={{ width: '100%', marginTop: '15px', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '500' }}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: '50px', marginBottom: '20px', fontSize: '24px' }}>My Orders</h3>
      <div>
        {orders.map(order => (
          <div key={order.id} style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
            <p><strong>Order #{order.id}</strong> - {order.clothType}</p>
            <p>Tailor: {order.tailorName}</p>
            <p>Status: {order.status}</p>
            <p>Gender: {order.gender}</p>
            {order.chest && <p>Measurements: Chest: {order.chest}", Waist: {order.waist}", Shoulder: {order.shoulder}"</p>}
            <a href={`/chat/${order.id}`}>💬 Chat with Tailor</a>
          </div>
        ))}
      </div>

      {showBookingModal && (
        <BookingModal 
          tailor={selectedTailor}
          onClose={() => setShowBookingModal(false)}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
}

export default CustomerDashboard;
