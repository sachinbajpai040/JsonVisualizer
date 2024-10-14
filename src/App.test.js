import React, { useState } from 'react';
import JsonInput from './components/JsonInput';
import JsonEditor from './components/JsonEditor';

const App = () => {
  console.log('App component rendering');
  const [parsedJson, setParsedJson] = useState(null);

  const handleParse = (data) => {
    console.log('handleParse called with:', data);
    setParsedJson(data);
  };

  const handleBack = (editedData) => {
    console.log('handleBack called with:', editedData);
    setParsedJson(null);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {parsedJson ? (
        <JsonEditor data={parsedJson} onBack={handleBack} />
      ) : (
        <JsonInput onParse={handleParse} />
      )}
    </div>
  );
};

export default App;