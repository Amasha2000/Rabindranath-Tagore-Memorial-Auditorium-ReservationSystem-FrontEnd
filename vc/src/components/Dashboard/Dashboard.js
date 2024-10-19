import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import topImage from '../../images/header2.jpg'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [pendingReservations, setPendingReservations] = useState([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        
        // Fetch pending reservations
        axios.get('http://localhost:8080/reservation/get/vc-pending')
            .then(response => {
                setPendingReservations(response.data);
                console.log(response.data)
            });
    }, []);

    const handleViewClick = (reservation) => {
        navigate('/application-form', { state: { reservation } });
    };
    
    
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <img src={topImage} alt="Banner" />
                <div className="pending-reservations-card">
                <h2>Pending Reservation Requests</h2>
                <p className="pending-count">{pendingReservations.length}</p>
                </div>
            </div>    
                <table className="reservations-table">
                    <thead>
                        <tr>
                            <th>Name of the Organization</th>
                            <th>Name of the Applicant</th>
                            <th>Event Type</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingReservations.map(reservation => (
                            <tr key={reservation.reservationId} className={reservation.isClosed ? 'closed' : ''}>
                                <td>{reservation.organizationName}</td>
                                <td>{reservation.applicantName}</td>
                                <td>{reservation.eventType}</td>
                                <td>{reservation.reservedDate}</td>
                                <td>
                                    <button className="view" onClick={() => handleViewClick(reservation)}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
};

export default Dashboard;
