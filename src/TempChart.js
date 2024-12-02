import React, { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js

const TempChart = () => {
    const [temperatureData, setTemperatureData] = useState([]);
    const [timeStamps, setTimeStamps] = useState([]);

    // Generate fake temperature data
    const generateFakeData = () => {
        const newTemp = Math.random() * 40;
        return newTemp;
    };

    // Function to simulate data fetching with fake data
    const fetchTemperature = useCallback(() => {
        const newTemp = generateFakeData();
        console.log('Generated Fake Temperature:', newTemp);

        setTemperatureData(prevData => [...prevData.slice(-9), newTemp]);
        setTimeStamps(prevTime => [...prevTime.slice(-9), new Date().toLocaleTimeString()]);
    }, []);

    useEffect(() => {
        fetchTemperature(); // Initial fetch with fake data
        const interval = setInterval(fetchTemperature, 2000); // Update every 2 seconds
        return () => clearInterval(interval);  // Cleanup interval on component unmount
    }, [fetchTemperature]); // Include fetchTemperature in dependency array

    const data = {
        labels: timeStamps,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: temperatureData,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: 0,
                suggestedMax: 50,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div>
            <h2>Real-Time Temperature Chart</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default TempChart;
