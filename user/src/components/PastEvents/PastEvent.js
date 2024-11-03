import React from 'react';
import './PastEvent.css'; 
import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';
import img3 from '../../images/img3.jpg';
import img4 from '../../images/img4.jpg';
import img5 from '../../images/img5.jpg';
import img6 from '../../images/img6.jpg';


const events = [
  { id: 1, image: img1, name: 'Kings of 70s Unplugged', organizer: 'Organized by ROPA' },
  { id: 2, image: img2, name: 'Kings of 70s Unplugged', organizer: 'Organized by ROPA' },
  { id: 3, image: img3, name: 'Kings of 70s Unplugged', organizer: 'Organized by ROPA' },
  { id: 4, image: img4, name: 'ThabaraWila', organizer: 'Organized by Faculty of Engineering' },
  { id: 5, image: img5, name: 'ThabaraWila', organizer: 'Organized by Faculty of Engineering' },
  { id: 6, image: img6, name: 'ThabaraWila', organizer: 'Organized by Faculty of Engineering' },
];

const PastEvent = () => {
  return (
    <div className="past-events-container" id='past-events'>
      <h1>Past Events</h1>
      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.name} className="event-image" />
            <div className="event-info">
              <h3 className="event-name">{event.name}</h3>
              <p className="event-organizer">{event.organizer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PastEvent;
