import React, { useState } from 'react';
import { ChevronLeft, Edit3 } from 'lucide-react';

const JsonEditor = ({ data, onBack }) => {
  const [editedData, setEditedData] = useState(data);

  const handleInputChange = (path, value) => {
    setEditedData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData));
      let current = newData;
      for (let i = 0; i < path.length - 1; i++) {
        if (current[path[i]] === undefined) {
          current[path[i]] = isNaN(path[i+1]) ? {} : [];
        }
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const renderField = (key, value, path = []) => {
    if (Array.isArray(value)) {
      return (
        <div key={key} className="ml-4 mb-2">
          <strong>{key}:</strong>
          {value.map((item, index) => (
            <div key={index}>
              {renderField(index, item, [...path, key, index])}
            </div>
          ))}
        </div>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <div key={key} className="ml-4 mb-2">
          <strong>{key}:</strong>
          {Object.entries(value).map(([subKey, subValue]) => 
            renderField(subKey, subValue, [...path, key])
          )}
        </div>
      );
    } else {
      return (
        <div key={key} className="mb-2 flex items-center">
          <label className="flex items-center gap-2">
            {key}:
            <input
              type="text"
              value={value === null ? 'null' : value.toString()}
              onChange={(e) => handleInputChange([...path, key], e.target.value)}
              className="ml-2 p-1 border rounded"
            />
          </label>
        </div>
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Edit3 className="h-6 w-6 mr-2" />
        JSON Editor
      </h2>
      <div className="mb-4">
        {Object.entries(editedData).map(([key, value]) => renderField(key, value))}
      </div>
      <button
        onClick={() => onBack(editedData)}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to Input
      </button>
    </div>
  );
};

export default JsonEditor;