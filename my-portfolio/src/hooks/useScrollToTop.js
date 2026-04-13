import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useScrollToTop Hook
 * Resets the window scroll position to the top whenever the route changes.
 */
const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // We use instant behavior to prevent visual jumping during page transitions
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
};

export default useScrollToTop;
