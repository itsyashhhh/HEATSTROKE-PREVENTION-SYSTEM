import React, { useState } from 'react';
import './NightModeToggle.css'; // Import the CSS for the toggle button

const NightModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleNightMode = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            document.body.classList.toggle('dark-mode', newMode);
            return newMode;
        });
    };

    return (
        <div className="toggle-container">
            <button className="toggle-button" onClick={toggleNightMode}>
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
        </div>
    );
};

export default NightModeToggle;
