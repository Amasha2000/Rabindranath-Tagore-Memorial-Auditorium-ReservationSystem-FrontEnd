import React from 'react';
import { Link } from 'react-router-dom';
import './ViewReport.css';

const ViewReport = () => {
    return (
        <div className="view-report-container">
            <div className='background-image'></div>
            <div className="report-cards-container">
                <div className="report-card">
                    <h3>Monthly Report</h3>
                    <p>View the detailed monthly reservations and revenue report.</p>
                    <Link to="/monthly-report" className="report-button">View Monthly Report</Link>
                </div>
                <div className="report-card">
                    <h3>Yearly Report</h3>
                    <p>Check out the yearly statistics for events and revenue.</p>
                    <Link to="/yearly-report" className="report-button">View Yearly Report</Link>
                </div>
                <div className="report-card">
                    <h3>Yearly Event Report</h3>
                    <p>Check out the yearly event statistics for each event.</p>
                    <Link to="/event-report" className="report-button">Generate Yearly Event Report</Link>
                </div>
            </div>
        </div>
    );
};

export default ViewReport;
