import React from 'react';
import { Sun, Moon } from 'phosphor-react';

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-full transition-colors mr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
            aria-label="Toggle Dark Mode"
        >
            {isDarkMode ? <Sun className="w-6 h-6" weight="duotone" /> : <Moon className="w-6 h-6" weight="duotone" />}
        </button>
    );
};

export default ThemeToggle;
