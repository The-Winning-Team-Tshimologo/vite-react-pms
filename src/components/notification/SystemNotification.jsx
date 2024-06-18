/** @format */

import React, { useEffect, useState, useContext } from "react";
import Header from "../header/Header";
import "./Notification.css";
import { NotificationContext } from "./NotificationContext"; // Adjust the import path if necessary

const SystemNotification = () => {
	const [notifications, setNotifications] = useState([]);
	const { setUnreadCount } = useContext(NotificationContext);

	const fetchNotifications = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(
				"http://localhost:8081/api/v1/notifications/all",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await response.json();
			setNotifications(data);
		} catch (error) {
			console.error("Error fetching notifications:", error);
		}
	};

	const fetchUnreadCount = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(
				"http://localhost:8081/api/v1/notifications/unread-count",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const count = await response.json();
			setUnreadCount(count);
		} catch (error) {
			console.error("Error fetching unread count:", error);
		}
	};

	useEffect(() => {
		fetchNotifications();
		fetchUnreadCount();
		const intervalId = setInterval(() => {
			fetchNotifications();
			fetchUnreadCount();
		}, 5000); // Poll every 5 seconds

		return () => clearInterval(intervalId); // Clean up the interval on component unmount
	}, [setUnreadCount]);

	const markAsRead = async (notificationId) => {
		const token = localStorage.getItem("token");
		try {
			await fetch(
				`http://localhost:8081/api/v1/notifications/${notificationId}/read`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			fetchUnreadCount(); // Update unread count after marking as read
		} catch (error) {
			console.error("Error marking notification as read:", error);
		}
	};

	const handleNotificationClick = (notification) => {
		markAsRead(notification.id);
	};

	return (
		<div className='system-notification-container'>
			<Header />
			<div className='notification-content'>
				<h2>System Notifications</h2>
				{notifications.length > 0 ? (
					<div className='notification-list'>
						<ul>
							{notifications.map((notification, index) => (
								<li
									key={index}
									className={`notification-item ${
										notification.status === "UNREAD" ? "unread" : "read"
									}`}
									onClick={() => handleNotificationClick(notification)}
								>
									<div className='notification-preview'>
										<div className='notification-sender'>
											<strong>From:</strong> {notification.sender}
										</div>
										<div className='notification-timestamp'>
											<strong>Time:</strong>{" "}
											{notification.timestamp.split("T")[0]}
										</div>
									</div>
									<div className='notification-preview-content'>
										{notification.content}
									</div>
								</li>
							))}
						</ul>
					</div>
				) : (
					<p className='no-notifications'>No notifications available</p>
				)}
			</div>
		</div>
	);
};

export default SystemNotification;
