import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ManageCancellation.css';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const ManageCancellation = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  const fetchReservations = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/reservation/get/cancellation-requested');
      
      const reservationsWithPayments = await Promise.all(response.data.map(async (reservation) => {
        const advancePaidResponse = await axios.get(`http://localhost:8080/payment/advance/${reservation.reservationId}`);
        const totalPaidResponse = await axios.get(`http://localhost:8080/payment/total/${reservation.reservationId}`);
        
        return {
          ...reservation,
          isAdvanceFeePaid: advancePaidResponse.data,
          isTotalFeePaid: totalPaidResponse.data,
        };
      }));
      setReservations(reservationsWithPayments);
    } catch (error) {
      console.error('Error fetching reservations', error);
    }
  },[]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleApprove = async (reservationId) => {
    try {
      await axios.put(`http://localhost:8080/reservation/approve-cancellation/${reservationId}`);
      fetchReservations(); 
      alert("Request has approved successfully.")
    } catch (error) {
      console.error('Error updating request', error);
    }
  };

  const handleReject = async (reservationId) => {
    try {
      await axios.put(`http://localhost:8080/reservation/reject-cancellation/${reservationId}`);
      fetchReservations(); 
      alert("Request has rejected successfully.")
    } catch (error) {
      console.error('Error updating request', error);
    }
  };

  const handleViewApplicationForm = (reservation) => {
    navigate('/application-form', { state: { reservation} });
  };

  const handleViewPaymentDetails = (reservation) => {
    navigate('/payment-detail', { state: { reservation} });
  };

  if (!Array.isArray(reservations) || reservations.length === 0) {
      return <LoadingComponent/>;
    }   

  return (
    <div>
      <h2>Manage Cancellation Requests</h2>

      <table>
        <thead>
          <tr>
            <th>Event Type</th>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Organization</th>
            <th>Applicant</th>
            <th>Is Advance Fee Paid</th>
            <th>Is Total Fee Paid</th>
            <th>Approve Request</th>
            <th>Reject Request</th>
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
              <td>{reservation.isAdvanceFeePaid ? 'Yes' : 'No'}</td>
              <td>{reservation.isTotalFeePaid ? 'Yes' : 'No'}</td>
              <td>
                <button className='approve-cancellation' onClick={() => handleApprove(reservation.reservationId)}>Done</button>
              </td>
              <td>
                <button className='reject-cancellation' onClick={() => handleReject(reservation.reservationId)}>Done</button>
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

export default ManageCancellation;
