import React, { useState } from 'react';

function BookingModal({ tailor, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    clothType: '',
    gender: '',
    chest: '',
    waist: '',
    shoulder: '',
    length: '',
    sleeve: '',
    hip: '',
    inseam: '',
    thigh: '',
    knee: '',
    ankle: '',
    description: '',
    preferredDate: '',
    budget: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryPincode: '',
    deliveryPhone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, tailorId: tailor.id, tailorName: tailor.shopName });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', borderRadius: '12px', padding: '30px', maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Book Order - {tailor.shopName}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Cloth Type *</label>
            <select value={formData.clothType} onChange={(e) => setFormData({...formData, clothType: e.target.value})}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} required>
              <option value="">Select cloth type</option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Jeans">Jeans</option>
              <option value="T-Shirt">T-Shirt</option>
              <option value="Suit">Suit (2 Piece)</option>
              <option value="3 Piece Suit">3 Piece Suit</option>
              <option value="Blazer">Blazer</option>
              <option value="Coat">Coat</option>
              <option value="Kurta">Kurta</option>
              <option value="Kurta Pajama">Kurta Pajama</option>
              <option value="Sherwani">Sherwani</option>
              <option value="Pathani Suit">Pathani Suit</option>
              <option value="Salwar Kameez">Salwar Kameez</option>
              <option value="Churidar">Churidar</option>
              <option value="Anarkali">Anarkali</option>
              <option value="Lehenga">Lehenga</option>
              <option value="Lehenga Choli">Lehenga Choli</option>
              <option value="Saree Blouse">Saree Blouse</option>
              <option value="Blouse">Blouse</option>
              <option value="Dress">Dress</option>
              <option value="Gown">Gown</option>
              <option value="Skirt">Skirt</option>
              <option value="Palazzo">Palazzo</option>
              <option value="Dupatta">Dupatta</option>
              <option value="Jacket">Jacket</option>
              <option value="Waistcoat">Waistcoat</option>
              <option value="Dhoti">Dhoti</option>
              <option value="Lungi">Lungi</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Gender *</label>
            <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} required>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Body Measurements (in inches)</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Chest</label>
              <input type="number" step="0.1" value={formData.chest} 
                onChange={(e) => setFormData({...formData, chest: e.target.value})}
                placeholder="e.g., 38"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Waist</label>
              <input type="number" step="0.1" value={formData.waist}
                onChange={(e) => setFormData({...formData, waist: e.target.value})}
                placeholder="e.g., 32"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Shoulder</label>
              <input type="number" step="0.1" value={formData.shoulder}
                onChange={(e) => setFormData({...formData, shoulder: e.target.value})}
                placeholder="e.g., 16"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Hip</label>
              <input type="number" step="0.1" value={formData.hip}
                onChange={(e) => setFormData({...formData, hip: e.target.value})}
                placeholder="e.g., 40"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Length</label>
              <input type="number" step="0.1" value={formData.length}
                onChange={(e) => setFormData({...formData, length: e.target.value})}
                placeholder="e.g., 28"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Sleeve</label>
              <input type="number" step="0.1" value={formData.sleeve}
                onChange={(e) => setFormData({...formData, sleeve: e.target.value})}
                placeholder="e.g., 24"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
          </div>

          <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Leg Measurements (in inches)</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Inseam</label>
              <input type="number" step="0.1" value={formData.inseam}
                onChange={(e) => setFormData({...formData, inseam: e.target.value})}
                placeholder="e.g., 30"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Thigh</label>
              <input type="number" step="0.1" value={formData.thigh}
                onChange={(e) => setFormData({...formData, thigh: e.target.value})}
                placeholder="e.g., 22"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Knee</label>
              <input type="number" step="0.1" value={formData.knee}
                onChange={(e) => setFormData({...formData, knee: e.target.value})}
                placeholder="e.g., 16"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Ankle</label>
              <input type="number" step="0.1" value={formData.ankle}
                onChange={(e) => setFormData({...formData, ankle: e.target.value})}
                placeholder="e.g., 14"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
          </div>

          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Description</label>
            <textarea value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Any special requirements or design preferences..."
              rows="3"
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', resize: 'vertical' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Preferred Date</label>
              <input type="date" value={formData.preferredDate}
                onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Budget (₹)</label>
              <input type="text" value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                placeholder="e.g., 5000-8000"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
          </div>

          <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Delivery Details</h4>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Delivery Address *</label>
            <textarea value={formData.deliveryAddress}
              onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
              placeholder="House/Flat No., Street, Area..."
              rows="2"
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', resize: 'vertical' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>City *</label>
              <input type="text" value={formData.deliveryCity}
                onChange={(e) => setFormData({...formData, deliveryCity: e.target.value})}
                placeholder="City"
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>State *</label>
              <input type="text" value={formData.deliveryState}
                onChange={(e) => setFormData({...formData, deliveryState: e.target.value})}
                placeholder="State"
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Pincode *</label>
              <input type="text" value={formData.deliveryPincode}
                onChange={(e) => setFormData({...formData, deliveryPincode: e.target.value})}
                placeholder="e.g., 400001"
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Contact Phone *</label>
              <input type="tel" value={formData.deliveryPhone}
                onChange={(e) => setFormData({...formData, deliveryPhone: e.target.value})}
                placeholder="e.g., +91 98765 43210"
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
            <button type="button" onClick={onClose}
              style={{ flex: 1, padding: '12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>
              Cancel
            </button>
            <button type="submit"
              style={{ flex: 1, padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '500' }}>
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;
