import React, { useMemo } from 'react';
import './PaymentDetail.css';
import { useLocation } from 'react-router-dom';
import LoadingComponent from '../LoadingComponent/LoadingComponent'

const PaymentWorkflow = () => {
    const { state } = useLocation();
  
    const memoizedReservationData = useMemo(() => {
      return state?.reservation || {};
    }, [state]);
    
    if (memoizedReservationData === 0) {
    return <LoadingComponent/>;
     }

  return (
    <div className="payment-page">
         <h2 className="payment-workflow-title">Payment Details</h2>
      <div className="payment-workflow-container">
        <div className="payment-box">
          <div className="fees-box">
            <div className="fee-item"><span>Advance Fee                    : </span>Rs.{memoizedReservationData.advanceFee ? memoizedReservationData.advanceFee : 0}</div>
            <div className="fee-item"><span>Hall Reservation Charges       : </span>Rs.{memoizedReservationData.hallReservationFee ? memoizedReservationData.hallReservationFee : 0}</div>
            <div className="fee-item"><span>Decoration/Preparation Charges : </span>Rs.{memoizedReservationData.decorationFee ? memoizedReservationData.decorationFee : 0}</div>
            <div className="fee-item"><span>Rehearsal Charges              : </span>Rs.{memoizedReservationData.rehearsalFee ? memoizedReservationData.rehearsalFee : 0}</div>
            <div className="fee-item"><span>Additional Hours Charges       : </span>Rs.{memoizedReservationData.additionalHourFee ? memoizedReservationData.additionalHourFee : 0 }</div>
            <div className="fee-item"><span>Refundable Charges             : </span>Rs.{memoizedReservationData.refundableFee ? memoizedReservationData.refundableFee : 0}</div>
            <div className="total-fee">Total Fee: Rs.{memoizedReservationData.totalFee}</div>
            <div className="fee-item"><span>Cancellation Charges             : </span>Rs.{memoizedReservationData.cancellationFee ? memoizedReservationData.cancellationFee : 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentWorkflow;
