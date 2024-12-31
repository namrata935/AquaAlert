import React from 'react';
import '../styles/SafetyGuidelines.css';

function SafetyGuidelines() {
  return (
    <div className="safety-guidelines">
      <h2>Flood Safety Guidelines</h2>
      
      <section className="guidelines-section">
        <h3>Before a Flood</h3>
        <ul>
          <li className="important">Prepare an emergency kit with:
            <ul className="sub-list">
              <li>Drinking water and non-perishable food</li>
              <li>First aid supplies and medications</li>
              <li>Battery-powered radio and flashlights</li>
              <li>Extra batteries and power banks</li>
            </ul>
          </li>
          <li>Know your evacuation route and have a family communication plan</li>
          <li>Keep important documents in a waterproof container</li>
          <li>Monitor local news and weather updates</li>
          <li>Move valuable items to higher levels</li>
        </ul>
      </section>

      <section className="guidelines-section">
        <h3>During a Flood</h3>
        <ul>
          <li className="urgent"><strong>Move to Higher Ground Immediately!</strong></li>
          <li>Avoid walking or driving through flood waters
            <span className="warning">Just 6 inches of moving water can knock you down</span>
          </li>
          <li>Stay away from power lines and electrical wires</li>
          <li>Turn off utilities at main switches if instructed</li>
          <li>Follow evacuation orders promptly</li>
          <li>Keep children away from flood waters</li>
        </ul>
      </section>

      <section className="guidelines-section">
        <h3>After a Flood</h3>
        <ul>
          <li>Wait for official word that it's safe to return home</li>
          <li>Avoid flood waters - they may be contaminated</li>
          <li>Document damage for insurance purposes
            <ul className="sub-list">
              <li>Take photos of all damage</li>
              <li>Make a detailed list of damaged items</li>
            </ul>
          </li>
          <li>Clean and disinfect everything that got wet</li>
          <li>Watch for animals, especially snakes</li>
          <li>Be aware of the risk of electrocution</li>
        </ul>
      </section>

      <section className="guidelines-section emergency-contacts">
        <h3>Emergency Contacts</h3>
        <ul>
          <li>Emergency Services: <a href="tel:112">112</a></li>
          <li>National Disaster Response Force: <a href="tel:01124363260">011-24363260</a></li>
          <li>Flood Control Room: <a href="tel:1800223346">1800-22-3346</a></li>
        </ul>
      </section>
    </div>
  );
}

export default SafetyGuidelines; 