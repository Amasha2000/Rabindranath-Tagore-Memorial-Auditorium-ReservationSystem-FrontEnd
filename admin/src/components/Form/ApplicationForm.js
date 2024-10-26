import React, { useEffect, useState, useMemo } from 'react';
import './ApplicationForm.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    nic: '',
    landLine: '',
    applicantName: '',
    email: '',
    mobile: '',
    address: '',
    eventType: '',
    otherEventType: '',
    concertType: '',
    musicBand: '',
    singers: '',
    specialInvitees: '',
    viewers: '',
    reservedDate: '',
    eventStartTime: '',
    eventEndTime: '',
    eventNoOfHours: '',
    eventAdditionalHours: '',
    decorationStartTime: '',
    decorationEndTime: '',
    decorationNoOfHours: '',
    rehearsalStartTime: '',
    rehearsalEndTime: '',
    rehearsalNoOfHours: '',
    stageLighting: '',
    stageSoundAdministration: '',
    electricGenerator: '',
    stageDecoration: '',
    ticketSalesAtPremises: '',
    security: ''
  });

  // eslint-disable-next-line
  const [isDisabled, setIsDisabled] = useState(true);
  const { state } = useLocation();
  
  const memoizedReservationData = useMemo(() => {
    return state?.reservation || {};
  }, [state]);
  
  useEffect(() => {
    if (memoizedReservationData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        organizationName: memoizedReservationData.organizationName,
        applicantName: memoizedReservationData.applicantName,
        eventType: memoizedReservationData.eventType,
        reservedDate: memoizedReservationData.reservedDate,
        nic: memoizedReservationData.nic,
        landLine: memoizedReservationData.landLine,
        email: memoizedReservationData.email,
        mobile: memoizedReservationData.mobile,
        address: memoizedReservationData.address,
        otherEventType: memoizedReservationData.otherEventType,
        concertType: memoizedReservationData.concertType,
        musicBand: memoizedReservationData.musicBand,
        singers: memoizedReservationData.singers,
        specialInvitees: memoizedReservationData.specialInvitees,
        viewers: memoizedReservationData.viewers,
        eventStartTime: memoizedReservationData.eventStartTime,
        eventEndTime: memoizedReservationData.eventEndTime,
        eventNoOfHours: memoizedReservationData.eventNoOfHours,
        eventAdditionalHours: memoizedReservationData.eventAdditionalHours,
        decorationStartTime: memoizedReservationData.decorationStartTime,
        decorationEndTime: memoizedReservationData.decorationEndTime,
        decorationNoOfHours: memoizedReservationData.decorationNoOfHours,
        rehearsalStartTime: memoizedReservationData.rehearsalStartTime,
        rehearsalEndTime: memoizedReservationData.rehearsalEndTime,
        rehearsalNoOfHours: memoizedReservationData.rehearsalNoOfHours,
        stageLighting: memoizedReservationData.stageLighting,
        stageSoundAdministration: memoizedReservationData.stageSoundAdministration,
        electricGenerator: memoizedReservationData.electricGenerator,
        stageDecoration: memoizedReservationData.stageDecoration,
        ticketSalesAtPremises: memoizedReservationData.ticketSalesAtPremises,
        security: memoizedReservationData.security,
      }));
    }
  }, [memoizedReservationData]);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/reservation/send-vc/${memoizedReservationData.reservationId}`);
      alert("Application Form has successfully send to VC");
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleApproval = async (status) => {
    try {
      const response = await fetch(`http://localhost:8080/reservation/${memoizedReservationData.reservationId}/${status}`, {
        method: 'PUT' 
      });

      if (response.ok) {
        alert(`Reservation ${status} successfully.`);
      } else {
        alert('Error updating reservation status');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating reservation status');
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Application Form</h1>

      <form className="form-content">
        <div className="section">
          <h3>Details of the organization/person applying:</h3>
          <div className="input-group">
            <div className="input-column">
              <label>Name of the organization</label>
              <input type="text" name="organizationName" value={formData.organizationName || ''} disabled={isDisabled} />
              
              <label>National Identity Card Number</label>
              <input type="text" name="nic" value={formData.nic || ''} disabled={isDisabled} />
             
              <label>Landline</label>
              <input type="text" name="landLine" value={formData.landLine || ''} disabled={isDisabled} />
              </div>

            <div className="input-column">
              <label>Name of the applicant</label>
              <input type="text" name="applicantName" value={formData.applicantName || ''} disabled={isDisabled} />
              
              <label>Email</label>
              <input type="email" name="email" value={formData.email || ''} disabled={isDisabled} />
              
              <label>Mobile</label>
              <input type="text" name="mobile" value={formData.mobile || ''} disabled={isDisabled} />
              </div>
          </div>

          <label>Address</label>
          <textarea name="address" rows="3" value={formData.address || ''} disabled={isDisabled}></textarea>
         </div>

        <div className="section">
          <h3>Details related to the matter of application:</h3>
          <div className="radio-group">
            {['Conferences/Lectures', 'Stage Drama', 'Musical concerts', 'Awards/Tributes/Ceremonies'].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="eventType"
                  value={type}
                  checked={formData.eventType === type || ''}
                  disabled={isDisabled}
                />
                {type}
              </label>
            ))}
          </div>

          <div className="radio-group secondary">
            <label>
              <input
                type="radio"
                name="eventType"
                value="Other"
                checked={formData.eventType === 'Other' || ''}
                disabled={isDisabled}
              />
              Other
            </label>
            <input
              type="text"
              name="otherEventType"
              className="small-input"
              value={formData.otherEventType || ''}
              disabled={isDisabled}
            />
            </div>
          </div>

        <div className="section">
          <h3>Musical concerts:</h3>
          <div className="radio-group music">
            <label>
              <input
                type="radio"
                name="concertType"
                value="Classical"
                checked={formData.concertType === 'Classical' || ''}
                disabled={isDisabled}
              />
              Classical
            </label>
            <label>
              <input
                type="radio"
                name="cencertType"
                value="Fast rhythms"
                checked={formData.concertType === 'Fast rhythms' || ''}
                disabled={isDisabled}
              />
              Fast rhythms
            </label>
           </div>

          <p className="warning-text">
            There is no space for spectators to dance in the auditorium. If this is done, the security deposit amount of the relevant concert will be cancelled.
          </p>

          <label>Music Band</label>
          <input type="text" className='band' name="musicBand" value={formData.musicBand || ''} disabled={isDisabled} />
      
          <label>Participating singers</label>
          <textarea name="singers" rows="3" value={formData.singers || ''} disabled={isDisabled}></textarea>
          </div>

        <div className="section">
          <h3>Stage drama/Conferences/Lectures/Awards/Tributes/Ceremonies:</h3>
          <label>Resource persons/ Program lead persons/ Team/ Special Invitees</label>
          <textarea name="specialInvitees" rows="3" value={formData.specialInvitees || ''} disabled={isDisabled}></textarea>
          </div>

        <div className="section">
          <h3>Viewers:</h3>
          <div className="radio-group">
            {['University students', 'School students', 'Institute staff', 'Open'].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="viewers"
                  value={type}
                  checked={formData.viewers === type || ''}
                  disabled={isDisabled}
                />
                {type}
              </label>
            ))}
          </div>
          </div>

<div className="section">
  <h3>Date and Time:</h3>
  <div className="date-time-group">
    <input
      className="date"
      name="reservedDate"
      value={formData.reservedDate || ''}
      disabled={isDisabled}
    />
    <label>From</label>
    <input
      name="eventStartTime"
      value={formData.eventStartTime || ''}
      disabled={isDisabled}
    />
    <label>To</label>
    <input
      name="eventEndTime"
      value={formData.eventEndTime || ''}
      disabled={isDisabled}
    />
    <label>No of Hours</label>
    <input
      name="eventNoOfHours"
      value={formData.eventNoOfHours || ''}
      disabled={isDisabled}
    >
    </input>
  </div>
  <label>Additional Hours</label>
    <input
      name="eventAdditionalHours"
      value={formData.eventAdditionalHours || ''}
      disabled={isDisabled}
      className='additionalHour'
    >
    </input>
</div>

<div className="section">
  <h3>Time Period of Decoration/Preparation:</h3>
  <div className="date-time-group">
    <label>From</label>
    <input  name="decorationStartTime" value={formData.decorationStartTime || ''} disabled={isDisabled} />
    <label>To</label>
    <input  name="decorationEndTime" value={formData.decorationEndTime || ''} disabled={isDisabled} />
    <label>No of Hours</label>
    <input name="decorationNoOfHours" value={formData.decorationNoOfHours || ''} disabled={isDisabled}>
    </input>
  </div>
</div>

<div className="section">
  <h3>Time Period of the Rehearsal:</h3>
  <div className="date-time-group">
    <label>From</label>
    <input  name="rehearsalStartTime" value={formData.rehearsalStartTime || ''} disabled={isDisabled} />
    <label>To</label>
    <input  name="rehearsalEndTime" value={formData.rehearsalEndTime || ''} disabled={isDisabled} />
    <label>No of Hours</label>
    <input name="rehearsalNoOfHours" value={formData.rehearsalNoOfHours || ''} disabled={isDisabled}>
    </input>
  </div>
</div>

<div className="section">
  <h3>Details regarding Outsourced Equipment/Services:</h3>
  <label>Stage lighting</label>
  <textarea rows="2" name="stageLighting" value={formData.stageLighting || ''} disabled={isDisabled}></textarea>
  <label>Stage Sound Administration</label>
  <textarea rows="2" name="stageSoundAdministration" value={formData.stageSoundAdministration || ''} disabled={isDisabled}></textarea>
  <label>Electric generators</label>
  <textarea rows="2" name="electricGenerator" value={formData.electricGenerator || ''} disabled={isDisabled}></textarea>
  <label>Stage Decorations</label>
  <textarea rows="2" name="stageDecoration" value={formData.stageDecoration || ''} disabled={isDisabled}></textarea>
  <label>Ticket sales at the Auditorium premises</label>
  <textarea rows="2" name="ticketSalesAtPremises" value={formData.ticketSalesAtPremises || ''} disabled={isDisabled}></textarea>

  <h3>Personnel handling and security of premises:</h3>
  <div className="radio-group security">
    <label>
      <input
        type="radio"
        name="security"
        value="Externally"
        checked={formData.security === 'Externally' || ''}
        disabled={isDisabled}
      />
      Externally
    </label>
    <label>
      <input
        type="radio"
        name="security"
        value="University security department"
        checked={formData.security === 'University security department' || ''}
        disabled={isDisabled}
      />
      University security department
    </label>
  </div>
</div>

<div className='submit-buttons'>
 <button className='reject' type='button' onClick={() => handleApproval('REJECTED')}>
  Reject
</button>
<button className='approve' type='button' onClick={() => handleSubmit()}>
  Send To VC
</button>
 </div>
</form>
</div>
);
};

export default ApplicationForm;

       
