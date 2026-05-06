import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';

function TailorDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('requests');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await api.get(`/tailors/orders/tailor/${user.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const updateOrder = async (orderId, updates) => {
    try {
      await api.put(`/tailors/orders/${orderId}`, updates);
      loadOrders();
      alert('Order updated successfully!');
    } catch (error) {
      alert('Failed to update order');
    }
  };

  const handlePriceUpdate = (orderId) => {
    const price = prompt('Enter price:');
    if (price) {
      updateOrder(orderId, { price: parseFloat(price) });
    }
  };

  const handleStatusUpdate = (orderId, status) => {
    updateOrder(orderId, { status });
  };

  const handleRequest = (requestId, action) => {
    if (action === 'accept') {
      alert('Request accepted! Customer will be notified.');
      setRequests(requests.filter(r => r.id !== requestId));
    } else {
      alert('Request declined.');
      setRequests(requests.filter(r => r.id !== requestId));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Profile Section */}
      <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '30px', borderRadius: '12px', color: 'white', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', color: '#f5576c' }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ margin: '0 0 5px 0' }}>Welcome, {user?.name || 'Tailor'}!</h2>
              <p style={{ margin: '0', opacity: '0.9' }}>✂️ Professional Tailor</p>
              <p style={{ margin: '5px 0 0 0', opacity: '0.9' }}>📧 {user?.email}</p>
            </div>
          </div>
          <a href="/profile" style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '500' }}>
            View Profile
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
        <button 
          onClick={() => setActiveTab('requests')}
          style={{ 
            padding: '12px 24px', 
            background: activeTab === 'requests' ? '#f5576c' : 'transparent', 
            color: activeTab === 'requests' ? 'white' : '#666',
            border: 'none',
            borderBottom: activeTab === 'requests' ? '3px solid #f5576c' : 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500'
          }}>
          Customer Requests ({requests.length})
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          style={{ 
            padding: '12px 24px', 
            background: activeTab === 'orders' ? '#f5576c' : 'transparent', 
            color: activeTab === 'orders' ? 'white' : '#666',
            border: 'none',
            borderBottom: activeTab === 'orders' ? '3px solid #f5576c' : 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500'
          }}>
          My Orders ({orders.length})
        </button>
      </div>

      {/* Customer Requests Tab */}
      {activeTab === 'requests' && (
        <div>
          <h3 style={{ marginBottom: '20px', fontSize: '24px' }}>New Customer Requests</h3>
          {orders.filter(o => o.status === 'PENDING').length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>No pending requests</p>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {orders.filter(o => o.status === 'PENDING').map(request => (
                <div key={request.id} style={{ border: '1px solid #e0e0e0', padding: '20px', borderRadius: '12px', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '20px', color: '#333' }}>{request.customer?.name}</h4>
                      <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>📧 {request.customer?.email}</p>
                      <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>📞 {request.customer?.phone}</p>
                    </div>
                    <span style={{ background: '#fff3cd', color: '#856404', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>
                      {request.status}
                    </span>
                  </div>
                  
                  <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                    <p style={{ margin: '0 0 10px 0' }}><strong>Cloth Type:</strong> {request.clothType}</p>
                    <p style={{ margin: '0 0 10px 0' }}><strong>Description:</strong> {request.description}</p>
                    <p style={{ margin: '0 0 10px 0' }}><strong>Preferred Date:</strong> {request.preferredDate}</p>
                    <p style={{ margin: '0' }}><strong>Budget:</strong> ₹{request.budget}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => handleRequest(request.id, 'accept')}
                      style={{ flex: 1, padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '500' }}>
                      ✓ Accept Request
                    </button>
                    <button 
                      onClick={() => handleRequest(request.id, 'decline')}
                      style={{ flex: 1, padding: '12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '500' }}>
                      ✗ Decline
                    </button>
                    <button 
                      style={{ padding: '12px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>
                      💬 Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <h3 style={{ marginBottom: '20px', fontSize: '24px' }}>My Orders</h3>
          {orders.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>No orders yet</p>
          ) : (
            <div>
              {orders.map(order => (
                <div key={order.id} style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
                  <p><strong>Order #{order.id}</strong> - {order.clothType}</p>
                  <p>Customer: {order.customer?.name}</p>
                  <p>Status: {order.status}</p>
                  <p>Price: ${order.price || 'Not set'}</p>
                  <p>Measurements: {order.measurements || 'Not provided'}</p>
                  
                  <div style={{ marginTop: '10px' }}>
                    <button onClick={() => handlePriceUpdate(order.id)}
                      style={{ padding: '8px', margin: '5px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      Set Price
                    </button>
                    <button onClick={() => handleStatusUpdate(order.id, 'CONFIRMED')}
                      style={{ padding: '8px', margin: '5px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      Confirm
                    </button>
                    <button onClick={() => handleStatusUpdate(order.id, 'IN_PROGRESS')}
                      style={{ padding: '8px', margin: '5px', background: '#ffc107', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      In Progress
                    </button>
                    <button onClick={() => handleStatusUpdate(order.id, 'COMPLETED')}
                      style={{ padding: '8px', margin: '5px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      Complete
                    </button>
                    <a href={`/chat/${order.id}`} style={{ marginLeft: '10px' }}>💬 Chat</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TailorDashboard;
