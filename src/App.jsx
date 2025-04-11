import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [startCity, setStartCity] = useState('');
  const [endCity, setEndCity] = useState('');
  const [numDays, setNumDays] = useState(5);
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await axios.post('https://your-api-url.onrender.com/generate-trip', {
        startCity,
        endCity,
        numDays,
        preferences
      });
      setResult(response.data.itinerary);
    } catch (error) {
      setResult('Error generating itinerary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Trip Planner with Audio Tours</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        <input type="text" placeholder="Start City" className="w-full border p-2" value={startCity} onChange={(e) => setStartCity(e.target.value)} required />
        <input type="text" placeholder="End City" className="w-full border p-2" value={endCity} onChange={(e) => setEndCity(e.target.value)} required />
        <input type="number" placeholder="Number of Days" className="w-full border p-2" value={numDays} onChange={(e) => setNumDays(e.target.value)} required />
        <textarea placeholder="Preferences (e.g., scenic routes, parks, short hikes)" className="w-full border p-2" value={preferences} onChange={(e) => setPreferences(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Generate Trip</button>
      </form>
      {loading && <p className="text-center mt-6">Generating...</p>}
      {result && <div className="mt-6 max-w-3xl mx-auto whitespace-pre-wrap bg-white p-4 rounded shadow">{result}</div>}
    </div>
  );
}

export default App;
