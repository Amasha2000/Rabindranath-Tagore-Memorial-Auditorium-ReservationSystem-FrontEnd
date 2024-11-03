import React, { useEffect, useState } from 'react';
import './UpcomingEvent.css';

const UpcomingEvent = () => {
  
  const [events, setEvents] = useState([]);

  
  useEffect(() => {
    fetch('http://localhost:8080/events/all') 
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="upevents-container" id='upcoming-events'>
      <h1 className='topic'>Upcoming Events</h1>
      <div className="events-list">
        {events.map(event => (
          <div className="event-card" key={event.eventId}>
            <img src={`http://localhost:8080/images/${event.imageURL}`} alt={event.title} className="event-image" />
            <div className="event-info">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvent;
