import React, { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import './ReservationReport.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyReservationReport = () => {
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
            const monthlyData = processMonthlyData(reservations);
            setChartData(generateChartData(monthlyData));
            setCsvData(prepareCsvData(monthlyData));
        }
    }, [reservations]);

    const processMonthlyData = (reservations) => {
        const monthlyData = {};
        reservations.forEach(reservation => {
            const month = new Date(reservation.reservedDate).toLocaleString('default', { month: 'long' });
            if (!monthlyData[month]) {
                monthlyData[month] = { count: 0, totalRevenue: 0 };
            }

            monthlyData[month].count += 1;
            monthlyData[month].totalRevenue += reservation.totalFee-reservation.refundableFee+reservation.advanceFee;
        });

        return monthlyData;
    };

    const generateChartData = (monthlyData) => {
        const labels = Object.keys(monthlyData);
        const counts = labels.map(label => monthlyData[label].count);
        const revenues = labels.map(label => monthlyData[label].totalRevenue);

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

    const prepareCsvData = (monthlyData) => {
        const csvData = [['Month', 'Reservations Count', 'Total Revenue']];
        for (const month in monthlyData) {
            csvData.push([
                month,
                monthlyData[month].count,
                monthlyData[month].totalRevenue.toFixed(2),
            ]);
        }
        return csvData;
    };

    return (
        <div className="report-container">
            <h2>Monthly Report</h2>
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
                                }
                            },
                        },
                        barPercentage: 0.3, 
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
                    filename={"monthly_report.csv"}
                >
                    Download Monthly Report
                </CSVLink>
            )}
        </div>
    );
};

export default MonthlyReservationReport;
