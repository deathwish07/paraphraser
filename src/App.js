import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState(''); // User input
  const [lexDiversity, setLexDiversity] = useState(50); // Lexical diversity
  const [orderDiversity, setOrderDiversity] = useState(50); // Order diversity
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(''); // API response

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('https://rewritebackend.com/paraphrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          lex_diversity: lexDiversity,
          order_diversity: orderDiversity,
        }),
      });

      const data = await res.json();
      setResponse(data.paraphrased_text || 'No paraphrase returned');
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to fetch response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI Paraphrase Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Input Text:</label><br />
          <textarea
            placeholder="Enter text to paraphrase..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows="4"
            cols="50"
          />
        </div>
        <div>
          <label>Lexical Diversity:</label>
          <input
            type="number"
            value={lexDiversity}
            min="0"
            max="100"
            onChange={(e) => setLexDiversity(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Order Diversity:</label>
          <input
            type="number"
            value={orderDiversity}
            min="0"
            max="100"
            onChange={(e) => setOrderDiversity(Number(e.target.value))}
          />
        </div>
        <button type="submit">Generate Paraphrase</button>
      </form>

      <div>
        {/* <h2>Paraphrased Output:</h2>
        <pre>{response}</pre> */}
        {isLoading && (
          <div className="loading-screen">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}
        <pre>{response && !isLoading && <div className="response">Result: {response}</div>}</pre>
        
      </div>
    </div>
  );
}

export default App;
