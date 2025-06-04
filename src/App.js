import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { metrics, recentOrders } from './data/dashboardData';
import './App.css'; // Assuming a basic CSS file for styling

const sales = [10, 20, 30, 28, 45, 40, 60];

function App() {
  return (
    <div className="App">
      <Sidebar />
      <main style={{ marginLeft: '240px', padding: '20px' }}> {/* Adjust marginLeft to accommodate sidebar width */}
        <Dashboard metrics={metrics} orders={recentOrders} sales={sales} />
      </main>
    </div>
  );
}

export default App;
