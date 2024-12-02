import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TempMonitor.css';

const TempMonitor = () => {
    const [temp, setTemp] = useState('Loading...');
    const [intensity, setIntensity] = useState('Loading...');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [alert, setAlert] = useState(false); // State for alert message

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/data');
                const newTemp = response.data.temp;
                const newIntensity = response.data.intensity;

                setTemp(newTemp);
                setIntensity(newIntensity);

                // Update background color based on temperature
                const temperature = parseFloat(newTemp);
                setBgColor(getBackgroundColor(temperature));

                // Trigger alert if temperature is above 30°C
                if (temperature > 30) {
                    setAlert(true);
                } else {
                    setAlert(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Fetch data every 2 seconds
        const interval = setInterval(fetchData, 2000);

        // Initial fetch
        fetchData();

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const getBackgroundColor = (temperature) => {
        if (temperature < 15) return '#00f'; // Blue for Cold
        if (temperature < 25) return '#0f0'; // Green for Cool
        return '#f00'; // Red for Hot
    };

    return (
        <div className="container" style={{ backgroundColor: bgColor }}>
            <header className="header">
                HEAT-STROKE MONENTERING SYSTEM
            </header>
            <div className="content">
                <h1>HEAT-STORK MONENTERING SYSTEM</h1>
                <div id="data">
                    <p><strong>Temperature:</strong> <span id="temp">{temp}</span> °C</p>
                    <p><strong>HUMIDITY</strong> <span id="intensity">{intensity}</span></p>
                </div>
                {alert && (
                    <div className="alert">
                        <strong>Warning!</strong> High temperature detected. Please drink water and rest in a cool place.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TempMonitor;
