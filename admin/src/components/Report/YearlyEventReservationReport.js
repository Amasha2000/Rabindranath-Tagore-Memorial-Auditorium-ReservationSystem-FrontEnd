import React, { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import './ReservationReport.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const YearlyEventReservationReport = () => {
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

    const processYearlyData = (reservations) => {
        const yearlyData = {};

        reservations.forEach(reservation => {
            const year = new Date(reservation.reservedDate).getFullYear();
            const eventType = reservation.eventType;

            if (!yearlyData[year]) {
                yearlyData[year] = {};
            }

            if (!yearlyData[year][eventType]) {
                yearlyData[year][eventType] = { count: 0, totalRevenue: 0 };
            }

            yearlyData[year][eventType].count += 1;
            yearlyData[year][eventType].totalRevenue += reservation.totalFee - reservation.refundableFee + reservation.advanceFee;
        });

        return yearlyData;
    };

    const generateChartData = (yearlyData) => {
        const labels = Object.keys(yearlyData); // Years as labels
        const eventTypes = ["Conferences/Lectures", "Stage Drama", "Musical concerts", "Awards/Tributes/Ceremonies", "Other"]; // Event types

        const datasets = [];

        eventTypes.forEach((eventType, index) => {
            datasets.push({
                label: `${eventType} - Count`,
                data: labels.map(year => yearlyData[year][eventType]?.count || 0),
                backgroundColor: `rgba(${75 + index * 40}, 192, 192, 0.6)`,
                borderColor: `rgba(${75 + index * 40}, 192, 192, 1)`,
                borderWidth: 1,
                yAxisID: 'y1', // For the count
            });

            datasets.push({
                label: `${eventType} - Revenue`,
                data: labels.map(year => yearlyData[year][eventType]?.totalRevenue || 0),
                backgroundColor: `rgba(${153 + index * 40}, 102, 255, 0.6)`,
                borderColor: `rgba(${153 + index * 40}, 102, 255, 1)`,
                borderWidth: 1,
                yAxisID: 'y2', // For the revenue
            });
        });

        return {
            labels,
            datasets,
        };
    };

    const prepareCsvData = (yearlyData) => {
        const csvData = [['Year', 'Event Type', 'Reservations Count', 'Total Revenue']];
        for (const year in yearlyData) {
            for (const eventType in yearlyData[year]) {
                csvData.push([
                    year,
                    eventType,
                    yearlyData[year][eventType].count,
                    yearlyData[year][eventType].totalRevenue.toFixed(2),
                ]);
            }
        }
        return csvData;
    };

    return (
        <div className="report-container">
            <h2>Yearly Event Report</h2>
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
                                max: 10,
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
                                    },
                                },
                            },
                            barPercentage: 0.8,
                            categoryPercentage: 0.5,
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
                    Download Yearly Event Report
                </CSVLink>
            )}
        </div>
    );
};

export default YearlyEventReservationReport;
