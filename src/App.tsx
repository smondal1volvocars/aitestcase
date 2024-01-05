import React from 'react';
import './App.css';
import TestCaseGenerator from './components/TestCaseGenerator';
import Button from './components/Button';
// import Message from './components/Message';

function App() {
  return (
    <div className="App">
      <div>
          <h1>Test Case Generator App</h1>
          <code><TestCaseGenerator componentToTest={Button} /></code>
        </div>
    </div>
  );
}

export default App;
