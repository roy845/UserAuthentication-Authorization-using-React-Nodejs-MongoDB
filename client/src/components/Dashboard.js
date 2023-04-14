import React from 'react';
import '../styles/dashboard.css';


const Dashboard = ()=> {

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome to the Fancy Dashboard</h2>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Card 1</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="dashboard-card">
          <h3>Card 2</h3>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        <div className="dashboard-card">
          <h3>Card 3</h3>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;