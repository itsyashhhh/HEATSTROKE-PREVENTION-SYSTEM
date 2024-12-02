import React from 'react';
import TempChart from './TempChart';
import HumidityChart from './HumidityChart';
import NightModeToggle from './NightModeToggle';
import './App.css'; // Import the CSS file

const App = () => {
    return (
        <div>
            <header>
                <h1>HEAT-STROKE PREVENTION SYSTEM</h1>
            </header>
            <NightModeToggle />
            <div className="chart-container">
                <TempChart />
                <HumidityChart />
            </div>
        </div>
    );
};

export default App;
                                                                                                                                                                                                                                                                                                                                                                