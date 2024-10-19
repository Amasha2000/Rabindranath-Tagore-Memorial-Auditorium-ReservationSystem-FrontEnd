import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notification.css';

const Notification = () => {
  const [viewUnread, setViewUnread] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from the backend
  useEffect(() => {
    const userName = localStorage.getItem('userName'); 
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/notifications/${userName}`);
        setNotifications(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []); 

  const handleMarkAsRead = async (id) => {
    try {
      await axios.post(`http://localhost:8080/notifications/markAsRead/${id}`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.notification_id === id ? { ...notif, hasRead: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const filteredNotifications = viewUnread
    ? notifications.filter((notif) => !notif.hasRead)
    : notifications;

  return (
    <div className="notification-page">
      <div className="background-image"></div>
      <div className="toggle-buttons">
        <button
          className={!viewUnread ? 'active' : ''}
          onClick={() => setViewUnread(false)}
        >
          All
        </button>
        <button
          className={viewUnread ? 'active' : ''}
          onClick={() => setViewUnread(true)}
        >
          Unread
        </button>
      </div>
      <div className="notifications">
        {filteredNotifications.map((notif) => (
          <div className="notification-box" key={notif.notificationId}>
            <span>{notif.message}</span>
            <a href={notif.redirectUrl}>Go to Page</a>
            <button className='markAsReadButton' 
            onClick={() => handleMarkAsRead(notif.notificationId)}
            disabled={notif.hasRead}
            >
              Mark as Read
            </button>
            <span className='date'>{notif.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
