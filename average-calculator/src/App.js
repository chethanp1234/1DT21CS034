import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [numberId, setNumberId] = useState('p');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchNumbers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://localhost:5000/numbers/${numberId}`);
      setResponse(res.data);
    } catch (err) {
      setError('Failed to fetch data from the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator</h1>
        <div>
          <label htmlFor="numberId">Select Number ID: </label>
          <select
            id="numberId"
            value={numberId}
            onChange={(e) => setNumberId(e.target.value)}
          >
            <option value="p">Prime</option>
            <option value="f">Fibonacci</option>
            <option value="e">Even</option>
            <option value="r">Random</option>
          </select>
          <br />
          <button onClick={handleFetchNumbers}>Fetch Numbers</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'white' }}>{error}</p>}
        {response && (
          <div>
            <h2>Response</h2>
            <p><strong>Previous State:</strong> {JSON.stringify(response.windowPrevState)}</p>
            <p><strong>Current State:</strong> {JSON.stringify(response.windowCurrState)}</p>
            <p><strong>Number:</strong> {JSON.stringify(response.numbers)}</p>
            <p><strong>Average:</strong> {response.average}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;