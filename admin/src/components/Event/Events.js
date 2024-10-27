import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Events.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faSyncAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const fileInputRef = useRef(null); 
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    imageURL: null
  });
  const [imagePreview, setImagePreview] = useState(null); 

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async (selectedDate) => {
  try {
    let url = 'http://localhost:8080/events/all';
    
    if (selectedDate) {
      url = `http://localhost:8080/events/get/${selectedDate}`;
    }

    const response = await axios.get(url);
    setEvents(response.data);
  } catch (error) {
    console.error('Error fetching events', error);
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imageURL: file });
    setImagePreview(URL.createObjectURL(file)); // Preview the uploaded image
  };

  const handleAddEvent = async () => {
    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('date', formData.date);
    formDataObj.append('imageURL', formData.imageURL);

    try {
      await axios.post('http://localhost:8080/events/save', formDataObj);
      fetchEvents(); 
      resetForm();
      alert('Event added successfully');
    } catch (error) {
      console.error('Error adding event', error);
    }
  };

  const handleUpdateEvent = async () => {
    if (selectedEvent) {
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('date', formData.date);
      formDataObj.append('imageURL', formData.imageURL);

      try {
        await axios.put(`http://localhost:8080/events/update/${selectedEvent.eventId}`, formDataObj);
        fetchEvents(); 
        resetForm();
        alert('Event updated successfully');
      } catch (error) {
        console.error('Error updating event', error);
      }
    }
  };

  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        await axios.delete(`http://localhost:8080/events/delete/${selectedEvent.eventId}`);
        fetchEvents(); 
        resetForm();
        alert('Event deleted successfully');
      } catch (error) {
        console.error('Error deleting event', error);
      }
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      imageURL: null 
    });
    setImagePreview(`http://localhost:8080/images/${event.imageURL}`); 
  };

  const resetForm = () => {
    setFormData({ title: '', date: '', imageURL: null });
    setImagePreview(null); 
    setSelectedEvent(null);
     if (fileInputRef.current) {
    fileInputRef.current.value = '';  
  }
  };

  return (
    <div className="event-management">
      <h2 className='topic'>Manage Events</h2>
  
      <div className="form-group-row">
        <div className="form-group">
          <label>Event Name:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Upload Photo:</label>
          <input
            type="file"
            name="imageURL"
            accept="image/*"
            onChange={handlePhotoChange}
            ref={fileInputRef}
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Event" width="100" />
          </div>
        )}
      </div>

      <div className="button-group">
        <button onClick={handleAddEvent} className='add'>
          <FontAwesomeIcon icon={faFolderPlus} /> Add
        </button>
        <button onClick={handleUpdateEvent} className='update'>
          <FontAwesomeIcon icon={faSyncAlt} /> Update
        </button>
        <button onClick={handleDeleteEvent} className='delete'>
          <FontAwesomeIcon icon={faTimesCircle} /> Remove
        </button>
      </div>

      <div className="event-list">
        <label>Select Date:  </label>
        <input className='search' type="date" onChange={(e) => fetchEvents(e.target.value)} />
        
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.eventId} onClick={() => handleSelectEvent(event)}>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>
                  <img src={`http://localhost:8080/images/${event.imageURL}`} alt="Event Thumbnail" width="100" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventManagement;
