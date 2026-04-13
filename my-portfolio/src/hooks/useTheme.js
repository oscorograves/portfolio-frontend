import { useState, useEffect, useLayoutEffect } from 'react';

/**
 * useTheme Hook
 * Manages the application's theme (Dark/Light) based on time of day and IP geolocation.
 * Follows the repository's pattern of offloading specialized logic into reusable hooks.
 */
const useTheme = () => {
  // Initialize state synchronously
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // 1. Check if the head script already applied the class (Browser only)
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    
    // 2. Fallback for SSR/Prerendering environments
    const hour = new Date().getHours();
    return hour < 6 || hour >= 18;
  });

  // Apply the 'dark' class to the <html> element
  // useLayoutEffect ensures this happens before the browser paints
  useLayoutEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // IP-based Refinement
  // This runs asynchronously in the background to ensure geographic accuracy
  useEffect(() => {
    const fetchTimeByIP = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();
        
        // WorldTimeAPI returns ISO datetime string, e.g. "2026-04-12T09:55:10.123+05:30"
        const date = new Date(data.datetime);
        const currentHour = date.getHours();
        
        // Light mode between 6 AM and 6 PM
        const shouldBeDark = currentHour < 6 || currentHour >= 18;
        
        // Only update state if it differs to avoid unnecessary re-renders
        if (shouldBeDark !== isDarkMode) {
          setIsDarkMode(shouldBeDark);
        }
      } catch (error) {
        console.warn('Error determining time by IP, sticking with local/current time:', error);
      }
    };

    fetchTimeByIP();
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
};

export default useTheme;
