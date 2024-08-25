import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Make sure to create this CSS file

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    Alphabets: false,
    Numbers: false,
    HighestLowercaseAlphabet: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const parsedInput = JSON.parse(input);
      console.log(parsedInput);
      const res = await axios.post('https://bajaj-backend-frtxarx7r-shankhroy123s-projects.vercel.app/bfhl', parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON input or API error');
    }
  };

  const handleCheckboxChange = (option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    let filteredResponse = {};

    if (selectedOptions.Alphabets) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.Numbers) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.HighestLowercaseAlphabet) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div className="container">
      <h1>BFHL Data Processor</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input'
          rows="5"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div className="response-section">
          <h2>Filter Response</h2>
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.Alphabets}
                onChange={() => handleCheckboxChange('Alphabets')}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.Numbers}
                onChange={() => handleCheckboxChange('Numbers')}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.HighestLowercaseAlphabet}
                onChange={() => handleCheckboxChange('HighestLowercaseAlphabet')}
              />
              Highest lowercase alphabet
            </label>
          </div>
          <div className="filtered-response">
            <h3>Filtered Response:</h3>
            {renderFilteredResponse()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;