import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './EventCalendar.css'; 
import axios from 'axios';

const AvailabilityCalendar = () => {
  const [events, setEvents] = useState([]);


  useEffect(() => {
    // Fetch events data from the backend
    axios.get('http://localhost:8080/reservation/unavailable-dates')
    .then(response => {
      const eventsWithColors = response.data.map(event => ({
        ...event,
        color: getRandomColor()
      }));
      setEvents(eventsWithColors);
    })
    .catch(error => console.error('Failed to fetch events:', error));
  }, []);

   const normalizeDate = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 8)];  
    }
    return color;
  };  

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const normalizedDate = normalizeDate(date); 
  
      const dayEvents = events.filter(event => 
        normalizeDate(new Date(event.reservedDate)).getTime() === normalizedDate.getTime()
      );
  
      return (
        <div className="events-container">
          {dayEvents.map((event, index) => (
            <div 
              key={index} 
              className="event-box"
              style={{ backgroundColor: event.color }} 
            >
              <p>{event.organizationName}</p>
              <p>{event.eventType}</p>
            </div>
          ))}
        </div>
      );
    }
    return null;
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
        tileContent={tileContent}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default AvailabilityCalendar;
