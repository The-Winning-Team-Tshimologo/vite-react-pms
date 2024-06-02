/** @format */

// NotificationContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import WebSocketService from "../notification/WebSocketService";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		WebSocketService.connect(() => {
			WebSocketService.subscribe("/user/topic/messages", (message) => {
				setNotifications((prevNotifications) => [
					...prevNotifications,
					message,
				]);
			});
		});

		return () => {
			WebSocketService.disconnect();
		};
	}, []);

	return (
		<NotificationContext.Provider value={{ notifications }}>
			{children}
		</NotificationContext.Provider>
	);
};
