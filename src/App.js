import React, { useState } from 'react';
import JsonInput from './components/JsonInput';
import JsonEditor from './components/JsonEditor';
import './output.css';

const App = () => {
  const [parsedJson, setParsedJson] = useState(null);

  const handleParse = (data) => {
    setParsedJson(data);
  };

  const handleBack = (editedData) => {
    console.log('Edited JSON:', editedData);
    setParsedJson(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        {parsedJson ? (
          <JsonEditor data={parsedJson} onBack={handleBack} />
        ) : (
          <JsonInput onParse={handleParse} />
        )}
      </div>
    </div>
  );
};

export default App;