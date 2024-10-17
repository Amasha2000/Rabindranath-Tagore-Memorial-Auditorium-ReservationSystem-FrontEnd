import React, { useState } from 'react';
import './ApplicationForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    nic: '',
    applicantName: '',
    email: '',
    eventType: '',
    otherEventType: '',
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
    security: '',
    username:''
  });

  const navigate = useNavigate()

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     try {
  //       console.log('Form submitted', formData);

  //       const userName = localStorage.getItem("userName");
  //       formData.username = userName
  //       console.log(formData.username)

  //       const response = await axios.post('http://localhost:8080/reservation/submit-form', formData,
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         }
  //       );
  //       console.log('Reservation created successfully', response.data);
  //       navigate('/payment')
  //     } catch (error) {
  //       console.error('Error submitting form', error);
  //     }
  //   } else {
  //     console.log('Form validation failed');
  //   }
  // };

  return (
    <div className="form-container">
      <h1 className="form-title">Application Form</h1>

      <form className="form-content" onSubmit={handleSubmit}>
        <div className="section">
          <h3>Details of the organization/person applying:</h3>
          <div className="input-group">
            <div className="input-column">
              <label>Name of the organization</label>
              <input type="text" name="organizationName" value={formData.organizationName} onChange={handleChange} />

              <label>National Identity Card Number</label>
              <input type="text" name="nic" value={formData.nic} onChange={handleChange} />

              </div>

            <div className="input-column">
              <label>Name of the applicant</label>
              <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} />

              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>
     </div>

        <div className="section">
          <h3>Details related to the matter of application:</h3>
          <input type="text" name="eventType" value={formData.eventType} onChange={handleChange} />
        </div>

        <div className="section">
          <h3>Viewers:</h3>
          <input type="text" name="viewers" value={formData.viewers} onChange={handleChange} />
          </div>

<div className="section">
  <h3>Date and Time:</h3>
  <div className="date-time-group">
    <input
      className="date"
      type="date"
      name="reservedDate"
      value={formData.reservedDate}
      onChange={handleChange}
    />
    <label>From</label>
    <input
      type="time"
      name="eventStartTime"
      value={formData.eventStartTime}
      onChange={handleChange}
      onFocus={() => {
        if (!formData.eventStartTime) {
          setFormData({ ...formData, eventStartTime: "08:00" });
        }
      }}
    />
    <label>To</label>
    <input
      type="time"
      name="eventEndTime"
      value={formData.eventEndTime}
      onChange={handleChange}
      onFocus={() => {
        if (!formData.eventEndTime) {
          setFormData({ ...formData, eventEndTime: "12:00" });
        }
      }}
    />
    <label>No of Hours</label>
    <select
      name="eventNoOfHours"
      value={formData.eventNoOfHours}
      onChange={handleChange}
    >
      <option value="">Select</option>
      <option value="4">4</option>
      <option value="8">8</option>
    </select>
    {errors.dateTime && <span className="error-text">{errors.dateTime}</span>}
  </div>
  <label>Additional Hours</label>
    <select
      name="eventAdditionalHours"
      value={formData.eventAdditionalHours}
      onChange={handleChange}
      className='additionalHour'
    >
      <option value="">Select</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
    </select>
</div>

<div className="section">
  <h3>Time Period of Decoration/Preparation:</h3>
  <div className="date-time-group">
    <label>From</label>
    <input type="time" name="decorationStartTime" value={formData.decorationStartTime} onChange={handleChange} />
    <label>To</label>
    <input type="time" name="decorationEndTime" value={formData.decorationEndTime} onChange={handleChange} />
    <label>No of Hours</label>
    <select name="decorationNoOfHours" value={formData.decorationNoOfHours} onChange={handleChange}>
      <option value="">Select</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
    </select>
  </div>
</div>

<div className="section">
  <h3>Time Period of the Rehearsal:</h3>
  <div className="date-time-group">
    <label>From</label>
    <input type="time" name="rehearsalStartTime" value={formData.rehearsalStartTime} onChange={handleChange} />
    <label>To</label>
    <input type="time" name="rehearsalEndTime" value={formData.rehearsalEndTime} onChange={handleChange} />
    <label>No of Hours</label>
    <select name="rehearsalNoOfHours" value={formData.rehearsalNoOfHours} onChange={handleChange}>
      <option value="">Select</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
    </select>
  </div>
</div>

<div className="section">
  <h3>Details regarding Outsourced Equipment/Services:</h3>
  <label>Stage lighting</label>
  <textarea rows="2" name="stageLighting" value={formData.stageLighting} onChange={handleChange}></textarea>
  <label>Stage Sound Administration</label>
  <textarea rows="2" name="stageSoundAdministration" value={formData.stageSoundAdministration} onChange={handleChange}></textarea>
  <label>Electric generators</label>
  <textarea rows="2" name="electricGenerator" value={formData.electricGenerator} onChange={handleChange}></textarea>
  <label>Stage Decorations</label>
  <textarea rows="2" name="stageDecoration" value={formData.stageDecoration} onChange={handleChange}></textarea>
  <label>Ticket sales at the Auditorium premises</label>
  <textarea rows="2" name="ticketSalesAtPremises" value={formData.ticketSalesAtPremises} onChange={handleChange}></textarea>

  <h3>Personnel handling and security of premises:</h3>
  <div className="radio-group security">
    <label>
      <input
        type="radio"
        name="security"
        value="Externally"
        checked={formData.security === 'Externally'}
        onChange={handleChange}
      />
      Externally
    </label>
    <label>
      <input
        type="radio"
        name="security"
        value="University security department"
        checked={formData.security === 'University security department'}
        onChange={handleChange}
      />
      University security department
    </label>
    {errors.security && <span className="error-text">{errors.security}</span>}
  </div>
</div>

<button type="submit" disabled={!formData.agreed}>
  Submit
</button>
</form>
</div>
);
};

export default ApplicationForm;

       
