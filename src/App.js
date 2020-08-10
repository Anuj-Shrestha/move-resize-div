import React from 'react';
import './App.css';
import './App.scss';
import Resizable from './Resizable';

function App() {

  return (
    <div className="App">
      Move and Resize Demo
      <Resizable>
        <div>
          My original content
        </div>
      </Resizable>
    </div>
  );
}

export default App;
