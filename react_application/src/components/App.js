// App.js
import React from 'react';
import Home from './Home';
import Create from './Create'; // Import the Create component
import '../styles/App.css';

function App() {
  return (
    <div className="App">
      <Home /> {/* Use the Home component */}
      <Create /> {/* Use the Create component */}
    </div>
  );
}

export default App;