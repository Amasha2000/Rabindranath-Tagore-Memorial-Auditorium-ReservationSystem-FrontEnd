import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentWorkflow.css';
import auditoriumOutside from '../../images/header2.jpg';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const PaymentWorkflow = () => {
  const [reservationData, setReservationData] = useState([]);
  const [advancePaid, setAdvancePaid] = useState(false);
  const [totalPaid, setTotalPaid] = useState(false);
  const [isProcessingCancellation, setIsProcessingCancellation] = useState(false);
  const [cancellationRequested, setCancellationRequested] = useState(false);
  const [cancellationApproved, setCancellationApproved] = useState(false);
  const [hasCancelled, setHasCancelled] = useState(false);
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const reservationResponse = await axios.get(`http://localhost:8080/reservation/get_user/${userName}`);
        setReservationData(reservationResponse.data);

        if (reservationResponse.data.length === 0) {
          alert('You have no reservation data.');
          return;
        }

        const data = reservationResponse.data[0];

        const advancePaymentResponse = await axios.get(`http://localhost:8080/payment/advance/${data.reservationId}`);
        setAdvancePaid(advancePaymentResponse.data); 
        
        const totalPaymentResponse = await axios.get(`http://localhost:8080/payment/total/${data.reservationId}`);
        setTotalPaid(totalPaymentResponse.data);

        setCancellationRequested(data.cancellationRequested);
        setCancellationApproved(data.cancellationApproved);
        setHasCancelled(data.hasCancelled);
        

        if(data.cancellationRequested === true){
          setIsProcessingCancellation(true)
        }

      } catch (error) {
        console.error('Error fetching reservation or payment data:', error);
      }
    };

    fetchReservationData();
  }, [userName]);

  const handleAdvancePayment = () => {
    navigate(`/payment/${reservationData[0].reservationId}/${reservationData[0].advanceFee}/ADVANCE_FEE`);
  };

  const handleFullPayment = () => {
    navigate(`/payment/${reservationData[0].reservationId}/${reservationData[0].totalFee}/TOTAL_FEE`);
  };

  const handleCancellationRequest = async () => {
    try {
      await axios.post(`http://localhost:8080/reservation/request-cancellation/${reservationData[0].reservationId}`);

      alert('Cancellation request submitted successfully. Waiting for admin approval.');
      setCancellationRequested(true);
      setIsProcessingCancellation(true);

    } catch (error) {
      console.error('Error requesting cancellation:', error);
      alert('Failed to request cancellation. Please try again.');
      setIsProcessingCancellation(false);
    }
  };

  const handleCancellation = async () => {
    try {

      const isConfirmed = window.confirm("Are you sure you want to cancel the reservation?");
  
      if (!isConfirmed) {
       return; 
     }

      await axios.put(`http://localhost:8080/reservation/cancel/${reservationData[0].reservationId}`);
      setHasCancelled(true);
      alert('Reservation cancelled successfully.');
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      alert('Failed to cancel reservation. Please try again.');
    }
  };

  if (reservationData.length === 0) {
    return <LoadingComponent />;
  }

  return (
    <div className="payment-page">
      <div className="image-banner">
        <img src={auditoriumOutside} alt="Auditorium" className="auditorium-image" />
        <div className="overlay-info">
          <div className="info-box">
            <span>Organization Name : </span>{reservationData[0].organizationName}
          </div>
          <div className="info-box">
            <span>Event Type : </span>{reservationData[0].eventType}
          </div>
          <div className="info-box">
            <span>Date : </span>{reservationData[0].reservedDate}
          </div>
          <div className={`info-box approval-status ${reservationData[0].approvalStatus}`}>
            {reservationData[0].approvalStatus}
          </div>
        </div>
      </div>

      <h2 className="payment-workflow-title">Payment Work Flow</h2>
      <div className="payment-workflow-container">
        <div className="payment-box">
          <div className="advance-fee">
            <span>Advance Fee: </span>Rs.{reservationData[0].advanceFee}
          </div>
          <button
            className="pay-button"
            onClick={handleAdvancePayment}
            disabled={advancePaid || reservationData[0].approvalStatus !== 'APPROVED'} 
          >
            Pay Advance Amount
          </button>
        </div>

        <div className="payment-box">
          <div className="fees-box">
            <div className="fee-item"><span>Hall Reservation Charges       : </span>Rs.{reservationData[0].hallReservationFee}</div>
            <div className="fee-item"><span>Decoration/Preparation Charges : </span>Rs.{reservationData[0].decorationFee}</div>
            <div className="fee-item"><span>Rehearsal Charges              : </span>Rs.{reservationData[0].rehearsalFee}</div>
            <div className="fee-item"><span>Additional Hours Charges       : </span>Rs.{reservationData[0].additionalHourFee}</div>
            <div className="fee-item"><span>Refundable Charges             : </span>Rs.{reservationData[0].refundableFee}</div>
            <div className="total-fee">Total Fee: Rs.{reservationData[0].totalFee}</div>
          </div>
          <button
            className="pay-button"
            onClick={handleFullPayment}
            disabled={!advancePaid || totalPaid || reservationData[0].isCancelled || hasCancelled}
          >
            Pay Full Amount
          </button>
        </div>
      </div>

      {hasCancelled ? (
        <p className='info-para'>Your reservation has been cancelled.</p>
      ) : (
        <div>
          {!cancellationApproved && !hasCancelled && advancePaid && (
            <button className="cancel-button"
              onClick={handleCancellationRequest}
              disabled={isProcessingCancellation}
            >
              {isProcessingCancellation && cancellationRequested ? "Request is processing..." : "Request for Cancellation"}
            </button>
          )}

          { !hasCancelled && cancellationApproved && (
            <button className="cancel-button" onClick={handleCancellation}>
              Cancel Reservation
            </button>
          )}

          {cancellationRequested && !cancellationApproved && (
            <p className='info-para'>Your cancellation request is pending approval.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentWorkflow;
