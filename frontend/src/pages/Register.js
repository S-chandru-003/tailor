import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', role: 'CUSTOMER',
    address: '', city: '', state: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }} required />
        <input type="email" placeholder="Email" value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }} required />
        <input type="password" placeholder="Password" value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }} required />
        <input type="tel" placeholder="Phone" value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }} required />
        <select value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}>
          <option value="CUSTOMER">Customer</option>
          <option value="TAILOR">Tailor</option>
        </select>
        <input type="text" placeholder="Address" value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }} required />
        <input type="text" placeholder="City" value={formData.city}
          onChange={(e) => setFormData({...formData, city: e.target.value})}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }} required />
        <input type="text" placeholder="State" value={formData.state}
          onChange={(e) => setFormData({...formData, state: e.target.value})}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }} required />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none' }}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
