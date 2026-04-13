import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routes as routeConfig } from '../routes-config';

/**
 * useSEO Hook
 * Manages Dynamic SEO: Title, Meta Description, Canonical, and OG tags.
 * Updates head metadata automatically on route changes.
 */
const useSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const basePath = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '');
    const canonicalUrl = `https://scalewithkanishk.in${basePath}`;

    // Find matching route config for current path
    const currentRoute = routeConfig.find(r => r.path === basePath) || routeConfig[0];

    // 1. Update page title
    document.title = currentRoute.title;

    // 2. Update meta description
    let metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) metaDesc.setAttribute('content', currentRoute.description);

    // 3. Update canonical URL
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // 4. Update OG tags
    const updateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property='${property}']`);
      if (tag) tag.setAttribute('content', content);
    };

    updateOGTag('og:url', canonicalUrl);
    updateOGTag('og:title', currentRoute.title);
    updateOGTag('og:description', currentRoute.description);

    // 5. Update Twitter tags
    const updateTwitterTag = (name, content) => {
      let tag = document.querySelector(`meta[name='${name}']`);
      if (tag) tag.setAttribute('content', content);
    };

    updateTwitterTag('twitter:url', canonicalUrl);
    updateTwitterTag('twitter:title', currentRoute.title);
    updateTwitterTag('twitter:description', currentRoute.description);

  }, [location.pathname]);
};

export default useSEO;
