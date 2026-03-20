import React from 'react';
import { Sun, Moon } from 'phosphor-react';

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-full transition-colors mr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 group relative"
            aria-label="Toggle Dark Mode"
        >
            {isDarkMode ? <Sun className="w-6 h-6" weight="duotone" /> : <Moon className="w-6 h-6" weight="duotone" />}
            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none bg-white dark:bg-gray-900 px-2 py-1 rounded shadow-sm border border-gray-200 dark:border-gray-700">Switch Theme</span>
        </button>
    );
};

export default ThemeToggle;
