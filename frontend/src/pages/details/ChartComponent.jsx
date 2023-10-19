import React from 'react';
import { Bar } from 'react-chartjs-2';

function ChartComponent({ zeroRatingCount, oneRatingCount, twoRatingCount, threeRatingCount, fourRatingCount, fiveRatingCount }) {
    const chartData = {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [
            {
                label: 'Rating Counts',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [zeroRatingCount, oneRatingCount, twoRatingCount, threeRatingCount, fourRatingCount, fiveRatingCount],
            },
        ],
    };

    return <Bar data={chartData} />;
}

export default ChartComponent;