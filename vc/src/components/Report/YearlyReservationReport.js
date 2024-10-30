import React, { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import './ReservationReport.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const YearlyReservationReport = () => {
    const [reservations, setReservations] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        const fetchCompletedReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/reservation/get/complete');
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching completed reservations:', error);
            }
        };

        fetchCompletedReservations();
    }, []);

    useEffect(() => {
        if (reservations.length > 0) {
            const yearlyData = processYearlyData(reservations);
            setChartData(generateChartData(yearlyData));
            setCsvData(prepareCsvData(yearlyData));
        }
    }, [reservations]);

    // Process reservation data by year
    const processYearlyData = (reservations) => {
        const yearlyData = {};
        reservations.forEach(reservation => {
            const year = new Date(reservation.reservedDate).getFullYear(); // Group by year
            if (!yearlyData[year]) {
                yearlyData[year] = { count: 0, totalRevenue: 0 };
            }

            yearlyData[year].count += 1;
            yearlyData[year].totalRevenue += reservation.totalFee - reservation.refundableFee + reservation.advanceFee;
        });

        return yearlyData;
    };

    const generateChartData = (yearlyData) => {
        const labels = Object.keys(yearlyData); // Use years as labels
        const counts = labels.map(label => yearlyData[label].count);
        const revenues = labels.map(label => yearlyData[label].totalRevenue);

        return {
            labels,
            datasets: [
                {
                    label: 'Number of Reservations',
                    data: counts,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                    yAxisID: 'y1',
                },
                {
                    label: 'Total Revenue',
                    data: revenues,
                    backgroundColor: 'rgba(153,102,255,1)',
                    borderColor: 'rgba(153,102,255,1)',
                    borderWidth: 1,
                    yAxisID: 'y2', 
                },
            ],
        };
    };

    const prepareCsvData = (yearlyData) => {
        const csvData = [['Year', 'Reservations Count', 'Total Revenue']];
        for (const year in yearlyData) {
            csvData.push([
                year,
                yearlyData[year].count,
                yearlyData[year].totalRevenue.toFixed(2),
            ]);
        }
        return csvData;
    };

    return (
        <div className="report-container">
            <h2>Yearly Report</h2>
            <div className="chart-container">
                {chartData ? (
                    <Bar 
                    data={chartData} 
                    options={{
                        scales: {
                            y1: {
                                type: 'linear',
                                position: 'left',
                                title: {
                                    display: true,
                                    text: 'Number of Reservations',
                                },
                                beginAtZero: true,
                                min: 0,
                                max: 10, // Adjust the max value as needed for better scaling
                                ticks: {
                                    stepSize: 1,
                                    callback: function(value) {
                                        return Number.isInteger(value) ? value : '';
                                    },
                                },
                            },
                            y2: {
                                type: 'linear',
                                position: 'right',
                                title: {
                                    display: true,
                                    text: 'Total Revenue',
                                },
                                beginAtZero: true,
                                grid: {
                                    drawOnChartArea: false,
                                }
                            },
                        },
                        barPercentage: 0.3, // Reduce bar width
                        categoryPercentage: 0.5, // Reduce space between bars
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        },
                        layout: {
                            padding: {
                                top: 20,
                                bottom: 20,
                            },
                        },
                    }}
                />                
                ) : (
                    <p>Loading chart data...</p>
                )}
            </div>
            {csvData.length > 1 && (
                <CSVLink
                    className="download-btn"
                    data={csvData}
                    filename={"yearly_report.csv"}
                >
                    Download Yearly Report
                </CSVLink>
            )}
        </div>
    );
};

export default YearlyReservationReport;
