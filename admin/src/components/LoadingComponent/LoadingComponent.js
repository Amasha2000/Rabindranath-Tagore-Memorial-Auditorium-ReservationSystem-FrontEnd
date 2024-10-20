import React from 'react';
import './LoadingComponent.css';

const LoadingComponent = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <div className="loading-text">Loading data please wait...</div>
    </div>
  );
};

export default LoadingComponent;
