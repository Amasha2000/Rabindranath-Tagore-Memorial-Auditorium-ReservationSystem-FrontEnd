import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ManageReservation.css';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const ReservationManagePage = () => {
  const [reservations, setReservations] = useState([]);
  const [eventType, setEventType] = useState('');
  const navigate = useNavigate();

  const fetchReservations = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/reservation/get/by-status-eventType?status=PENDING,APPROVED&eventType=${eventType}`);
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations', error);
    }
  },[eventType]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleComplete = async (reservationId) => {
    try {
      await axios.put(`http://localhost:8080/reservation/complete/${reservationId}`);
      fetchReservations(); // Refresh the list
      alert("Reservation has completed successfully.")
    } catch (error) {
      console.error('Error updating reservation status', error);
    }
  };

  const handleViewApplicationForm = (reservation) => {
    navigate('/application-form', { state: { reservation} });
  };

  const handleViewPaymentDetails = (reservation) => {
    navigate('/payment-detail', { state: { reservation} });
  };

  if (reservations === null) {
    return <LoadingComponent/>;
     }

  return (
    <div>
      <h2>Manage Reservations</h2>
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
            <th>Status</th>
            <th>Is Advance Fee Paid</th>
            <th>Is Total Fee Paid</th>
            <th>Refundable Fee</th>
            <th>Cancellation Fee</th>
            <th>Complete Reservation</th>
            <th>View Application Form</th>
            <th>View Payment Details</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservationId}>
              <td>{reservation.eventType}</td>
              <td>{reservation.reservedDate}</td>
              <td>{reservation.eventStartTime}</td>
              <td>{reservation.eventEndTime}</td>
              <td>{reservation.organizationName}</td>
              <td>{reservation.applicantName}</td>
              <td>{reservation.approvalStatus}</td>
              <td>{reservation.isAdvanceFeePaid ? 'Yes' : 'No'}</td>
              <td>{reservation.isTotalFeePaid ? 'Yes' : 'No'}</td>
              <td>Rs.{reservation.refundableFee}</td>
              <td>Rs.{reservation.cancellationFee ? reservation.cancellationFee : 0}</td>
              <td>
                <button className='complete' onClick={() => handleComplete(reservation.reservationId)}>Done</button>
              </td>
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

export default ReservationManagePage;
