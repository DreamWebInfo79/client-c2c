import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logPageView } from '../analytics';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);
};

export default usePageTracking;
