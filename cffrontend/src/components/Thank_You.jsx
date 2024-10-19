import React from 'react';
import '../styles/Thank_You.css'; // Import the CSS file

const Thank_You = () => {
  return (
    <div className="thank-you-container">
      <h1 className="thank-you-message">THANK YOU</h1>
      <button className="home-button" onClick={() => window.location.href = '/'}>Go to Home</button>
    </div>
  );
}

export default Thank_You;
