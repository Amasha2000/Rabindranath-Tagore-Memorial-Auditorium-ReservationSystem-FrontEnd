import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './History.css';

const History = () => {
  const [reservations, setReservations] = useState([]);
  const [eventType, setEventType] = useState('');
  const navigate = useNavigate();

  const fetchReservations = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/reservation/get/complete');
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations', error);
    } 
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleViewApplicationForm = (reservation) => {
    navigate('/application-form', { state: { reservation } });
  };

  const handleViewPaymentDetails = (reservation) => {
    navigate('/payment-detail', { state: { reservation } });
  };

  const filteredReservations = reservations.filter((reservation) => 
    eventType === '' || reservation.eventType === eventType
  );

  return (
    <div>
      <h2>History</h2>
      <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
        <option value="">All Event Types</option>
        <option value="Conferences/Lectures">Conferences/Lectures</option>
        <option value="Stage Drama">Stage Drama</option>
        <option value="Musical concerts">Musical concerts</option>
        <option value="Awards/Tributes/Ceremonies">Awards/Tributes/Ceremonies</option>
        <option value="Other">Other</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Event Type</th>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Organization</th>
            <th>Applicant</th>
            <th>Advance Fee</th>
            <th>Total Fee</th>
            <th>Refundable Fee</th>
            <th>Cancellation Fee</th>
            <th>View Application Form</th>
            <th>View Payment Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => (
            <tr key={reservation.reservationId}>
              <td>{reservation.eventType}</td>
              <td>{reservation.reservedDate}</td>
              <td>{reservation.eventStartTime}</td>
              <td>{reservation.eventEndTime}</td>
              <td>{reservation.organizationName}</td>
              <td>{reservation.applicantName}</td>
              <td>Rs.{reservation.advanceFee}</td>
              <td>Rs.{reservation.totalFee}</td>
              <td>Rs.{reservation.refundableFee}</td>
              <td>Rs.{reservation.cancellationFee ? reservation.cancellationFee : 0}</td>
              <td>
                <button onClick={() => handleViewApplicationForm(reservation)}>View</button>
              </td>
              <td>
                <button onClick={() => handleViewPaymentDetails(reservation)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
