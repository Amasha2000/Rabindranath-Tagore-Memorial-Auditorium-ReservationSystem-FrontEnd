import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AvailabilityCalendar.css'; 
import axios from 'axios';

const AvailabilityCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isProceedButtonEnabled, setIsProceedButtonEnabled] = useState(false);

  const handleSubmit = () => {
    window.location.href = "/terms"; 
  };

  useEffect(() => {
    // Fetch events data from the backend
    axios.get('http://localhost:8080/reservation/unavailable-dates')
    .then(response => {
      const events = response.data.map(event => ({
        ...event
      }));
      setEvents(events);
    })
    .catch(error => console.error('Failed to fetch events:', error));
  }, []);

   const normalizeDate = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const onDateChange = date => {
    setSelectedDate(date);
    const normalizedDate = normalizeDate(date);
    const hasEventAvailable = events.some(event => 
      new Date(event.date).toDateString() === normalizedDate.getTime()
    );
    setIsProceedButtonEnabled(!hasEventAvailable);
  };
  
  const tileDisabled = ({ date }) => {
    const normalizedDate = normalizeDate(date);
    return events.some(event => 
      normalizeDate(new Date(event.reservedDate)).getTime() === normalizedDate.getTime()
    );
  };

  const tileClassName = ({ date }) => {
    const normalizedDate = normalizeDate(date);
    return events.some(event => 
      normalizeDate(new Date(event.reservedDate)).getTime() === normalizedDate.getTime()
    ) ? 'disabled-tile' : '';
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onDateChange}
        value={selectedDate}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
        minDate={new Date()} 
      />
      <p className="note">*Select an available date to proceed to reservation</p>
      <div className="button-container">
    <button
      className={`proceed-btn ${isProceedButtonEnabled ? '' : 'disabled'}`}
      disabled={!isProceedButtonEnabled}
      onClick={handleSubmit}
    >
      <span>
      Proceed to Reservation
      </span>
    </button>
  </div>
    </div>
  );
};

export default AvailabilityCalendar;
