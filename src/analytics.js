import ReactGA from 'react-ga4';

const initializeAnalytics = () => {
  ReactGA.initialize('G-3K1BCHH4N4');
};

const logPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

const logEvent = (category = '', action = '', label = '') => {
  if (category && action) {
    ReactGA.event({ category, action, label });
  }
};

export { initializeAnalytics, logPageView, logEvent };
