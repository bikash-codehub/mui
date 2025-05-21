import React from 'react';
import Sidebar from './components/Sidebar';
import './App.css'; // Assuming a basic CSS file for styling

function App() {
  return (
    <div className="App">
      <Sidebar />
      <main style={{ marginLeft: '240px', padding: '20px' }}> {/* Adjust marginLeft to accommodate sidebar width */}
        <h1>Main Content</h1>
        <p>This is where the main application content will go.</p>
      </main>
    </div>
  );
}

export default App;
