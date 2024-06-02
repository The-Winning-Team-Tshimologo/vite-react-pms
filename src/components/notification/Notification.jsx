// Notification.js
import React from "react";
import { useNotification } from "./NotificationContext";
import { FaRegEnvelope as EnvelopeIcon } from "react-icons/fa"; // Alias the import
import "./Notification.css";

const Notification = () => {
  const { notifications } = useNotification();

  return (
    <div className="notification-container">
      <div className="notification-icon">
        <EnvelopeIcon /> {/* Use the alias here */}
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </div>
      {notifications.length > 0 && (
        <div className="notification-list">
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification.content}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
