import React from 'react';
import { useLocation } from 'react-router-dom';

const Background = () => {
  const location = useLocation();

  // Conditionally set the background based on the current route
  const getBackground = () => {
    switch (location.pathname) {
      case '/':
        return 'url(/img/backg.png)';
      case '/register-volunteer':
        return 'url(/img/backg.png)';
      case '/find-volunteer':
        return 'url(/img/backg.png)';
      case '/community-forum':
        return 'linear-gradient(135deg, #6a11cb, #2575fc)';
      case '/donation':
        return 'url(/img/backg.png)';
      case '/safety-guidelines':
        return 'url(/img/backg.png)';
      default:
        return 'url(/img/backg.png)';
    }
  };

  const style = {
    backgroundImage: getBackground(),
    backgroundSize: 'cover',  // Ensure the background fills the screen
    backgroundPosition: 'center',  // Keep the background centered
    backgroundAttachment: 'fixed',  // Fix the background so it stays in place when scrolling
    height: '100%',  // Take the full height of the page
    width: '100%',  // Ensure the background covers full width
    position: 'absolute',  // Position it as a background
    top: 0,  // Align to the top of the page
    left: 0,  // Align to the left of the page
    zIndex: -1,  // Ensure the background is behind all content
  };

  return <div style={style}></div>;
};

export default Background;
