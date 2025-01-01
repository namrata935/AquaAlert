import React from 'react';
import '../styles/SafetyGuidelines.css';

const SafetyGuidelines = () => {
  return (
    <div className="safety-container">
      <h1 className="safety-title">Flood Safety Guidelines</h1>
      
      <div className="guidelines-section">
        <h2>Before a Flood</h2>
        <ul>
          <li>Create an emergency kit with essential supplies</li>
          <li>Know your area's flood risk and evacuation routes</li>
          <li>Keep important documents in a waterproof container</li>
          <li>Install check valves in plumbing to prevent backups</li>
          <li>Monitor local weather updates and warnings</li>
        </ul>
        <div className="video-embed">
    <h3>Watch: How to Prepare for a flood</h3>
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/43M5mZuzHF8?si=E_RdK8IFlrtaX6j2" 
      title="Emergency Kit Preparation"
      frameBorder="0" 
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen>
    </iframe>
  </div>
      </div>

      <div className="guidelines-section">
        <h2>During a Flood</h2>
        <ul>
          <li>Move to higher ground immediately if advised</li>
          <li>Avoid walking or driving through flood waters</li>
          <li>Stay away from power lines and electrical wires</li>
          <li>Turn off utilities if instructed to do so</li>
          <li>Keep monitoring news and emergency channels</li>
        </ul>
        <div className="video-embed">
    <h3>Watch: What to do during a flood</h3>
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/rV1iqRD9EKY?si=PUCqf3VS2OEuI-jt" 
      title="Emergency Kit Preparation"
      frameBorder="0" 
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen>
    </iframe>
  </div>
      </div>

      <div className="guidelines-section">
        <h2>After a Flood</h2>
        <ul>
          <li>Wait for official word that it's safe to return home</li>
          <li>Document damage with photos for insurance</li>
          <li>Clean and disinfect everything that got wet</li>
          <li>Watch for hazards like weakened roads and contaminated water</li>
          <li>Take care of your health and seek medical care if needed</li>
        </ul>
      </div>
      <div className="emergency-contacts">
        <h2>Emergency Contacts</h2>
        <div className="contact-grid">
          <div className="contact-item">
            <h3>Emergency Services</h3>
            <p>112</p>
          </div>
          <div className="contact-item">
            <h3>Flood Control Room</h3>
            <p>1800-123-4567</p>
          </div>
          <div className="contact-item">
            <h3>Medical Emergency</h3>
            <p>108</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidelines;