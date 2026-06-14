import React from 'react';
import { Sun, Moon } from 'phosphor-react';

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-gray-500 hover:text-primary-500 rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 group relative"
            aria-label="Toggle Dark Mode"
        >
            {isDarkMode ? <Sun className="w-5 h-5" weight="duotone" /> : <Moon className="w-5 h-5" weight="duotone" />}
        </button>
    );
};

export default ThemeToggle;
