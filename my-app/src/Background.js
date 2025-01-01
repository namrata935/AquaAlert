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
        return 'url(/path/to/register-volunteer-background.jpg)';
      case '/find-volunteer':
        return 'url(/path/to/find-volunteer-background.jpg)';
      case '/community-forum':
        return 'linear-gradient(135deg, #6a11cb, #2575fc)';
      case '/donation':
        return 'url(/path/to/donation-background.jpg)';
      case '/safety-guidelines':
        return 'url(/path/to/safety-guidelines-background.jpg)';
      default:
        return 'url(/img/backg.png)';
    }
  };

  const style = {
    backgroundImage: getBackground(),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Make the background take the full height of the screen
    position: 'absolute', // Fix the background to the page
    width: '100%',
    zIndex: -1, // Ensure the background is behind all other content
  };

  return <div style={style}></div>;
};

export default Background;
