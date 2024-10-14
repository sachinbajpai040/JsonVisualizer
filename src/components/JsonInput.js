import React, { useState } from 'react';
import { Code } from 'lucide-react';

const JsonInput = ({ onParse }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const handleParse = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setError('');
      onParse(parsed);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center">
        <Code className="h-6 w-6 mr-2" />
        JSON Input
      </h2>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter your JSON here..."
        className="w-full h-48 p-2 border rounded resize-none"
      />
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Invalid JSON</p>
          <p>{error}</p>
        </div>
      )}
      <button
        onClick={handleParse}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Parse JSON
      </button>
    </div>
  );
};

export default JsonInput;