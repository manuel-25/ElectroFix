import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useGtagPageView = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-JZ0PG7SGEL', {
        page_path: location.pathname,
      });
      window.gtag('config', 'AW-16673611004', {
        page_path: location.pathname,
      });
    }
  }, [location]);
};

export default useGtagPageView;
