import React, { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js

const HumidityChart = () => {
    const [humidityData, setHumidityData] = useState([]);
    const [timeStamps, setTimeStamps] = useState([]);

    // Generate fake humidity data
    const generateFakeHumidity = () => {
        const newHumidity = 82 + Math.random() * 5;
        return newHumidity;
    };

    // Function to simulate data fetching with fake data
    const fetchHumidity = useCallback(() => {
        const newHumidity = generateFakeHumidity();
        console.log('Generated Fake Humidity:', newHumidity);

        setHumidityData(prevData => [...prevData.slice(-9), newHumidity]);
        setTimeStamps(prevTime => [...prevTime.slice(-9), new Date().toLocaleTimeString()]);
    }, []);

    useEffect(() => {
        fetchHumidity(); // Initial fetch with fake data
        const interval = setInterval(fetchHumidity, 2000); // Update every 2 seconds
        return () => clearInterval(interval);  // Cleanup interval on component unmount
    }, [fetchHumidity]); // Include fetchHumidity in dependency array

    const data = {
        labels: timeStamps,
        datasets: [
            {
                label: 'Humidity (%)',
                data: humidityData,
                fill: false,
                borderColor: 'rgba(153,102,255,1)',
                backgroundColor: 'rgba(153,102,255,0.2)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: 80,
                suggestedMax: 90,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div>
            <h2>Real-Time Humidity Chart</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default HumidityChart;
