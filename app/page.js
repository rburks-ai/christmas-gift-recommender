'use client';
import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ age: '', gender: '', interests: '', budget: '' });
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setGifts(data.gifts || []);
    } catch (err) {
      alert('Error getting recommendations');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: 20, fontFamily: 'system-ui' }}>
      <h1 style={{ textAlign: 'center', color: '#c41e3a' }}>🎄 Christmas Gift Finder</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <input
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
          style={{ padding: 10, fontSize: 16, border: '1px solid #ddd', borderRadius: 5 }}
        />
        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          required
          style={{ padding: 10, fontSize: 16, border: '1px solid #ddd', borderRadius: 5 }}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          placeholder="Interests (e.g., gaming, cooking, sports)"
          value={form.interests}
          onChange={(e) => setForm({ ...form, interests: e.target.value })}
          required
          style={{ padding: 10, fontSize: 16, border: '1px solid #ddd', borderRadius: 5 }}
        />
        <input
          placeholder="Budget (e.g., $50)"
          value={form.budget}
          onChange={(e) => setForm({ ...form, budget: e.target.value })}
          required
          style={{ padding: 10, fontSize: 16, border: '1px solid #ddd', borderRadius: 5 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 12,
            fontSize: 18,
            background: '#c41e3a',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer'
          }}
        >
          {loading ? 'Finding Gifts...' : 'Get Recommendations'}
        </button>
      </form>

      {gifts.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h2>Recommended Gifts:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {gifts.map((gift, i) => (
              <li key={i} style={{ padding: 15, margin: '10px 0', background: '#f9f9f9', borderRadius: 5 }}>
                <strong>🎁 {gift.name}</strong>
                <p style={{ margin: '5px 0', color: '#666' }}>{gift.description}</p>
                <span style={{ color: '#c41e3a', fontWeight: 'bold' }}>{gift.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
