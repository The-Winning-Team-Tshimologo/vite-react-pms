/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { subscribeToMessages, sendMessage } from "./websocket-client"; // Import subscribeToMessages function
import "./Chat.css";

const Chat = ({ user2, userName }) => {
	const [conversations, setConversations] = useState({});
	const [selectedConversation, setSelectedConversation] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [selectedUser, setSelectedUser] = useState(user2);

	useEffect(() => {
		fetchConversations();
		subscribeToMessages(handleReceivedMessage); // Subscribe to incoming messages
	}, []);

	const fetchConversations = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8081/api/v1/chat/conversations-per-user",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			setConversations(response.data);
			if (user2 && response.data[user2]) {
				setSelectedConversation(response.data[user2]);
				setSelectedUser(user2); // Set the initial selected user
			}
		} catch (error) {
			console.error("Error fetching conversations", error);
		}
	};

	const handleSendMessage = async () => {
		try {
			const message = {
				content: newMessage,
				sender: userName,
				recipient: selectedUser,
				timestamp: new Date().toISOString(),
			};

			await axios.post(
				`http://localhost:8081/api/v1/chat/send/${selectedUser}`,
				message,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			// Send the message via WebSocket
			sendMessage(message);

			setSelectedConversation([...selectedConversation, message]);
			setNewMessage("");
		} catch (error) {
			console.error("Error sending message", error);
		}
	};

	const handleReceivedMessage = (message) => {
		// Update conversation with the received message
		if (
			(message.sender === selectedUser && message.recipient === userName) ||
			(message.sender === userName && message.recipient === selectedUser)
		) {
			setSelectedConversation([...selectedConversation, message]);
		}
	};

	const selectConversation = (recipient) => {
		setSelectedConversation(conversations[recipient]);
		setSelectedUser(recipient); // Update the selected user
	};

	return (
		<div className='chat-container'>
			<div className='chat-main'>
				<div className='chat-messages'>
					{selectedConversation.map((msg, index) => (
						<div
							key={index}
							className={`message ${
								msg.sender === userName ? "sender-message" : "recipient-message"
							}`}
						>
							<span className='message-text'>
								<strong>
									{msg.sender === userName ? "You" : msg.sender} to{" "}
									{msg.recipient === userName ? "You" : msg.recipient}:{" "}
								</strong>
								{msg.content}
							</span>
						</div>
					))}
				</div>
				<div className='chat-input'>
					<input
						type='text'
						className='input-field'
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder='Type your message'
					/>
					<button
						className='send-button'
						onClick={handleSendMessage}
					>
						Send
					</button>
				</div>
			</div>
			<div className='chat-sidebar'>
				<ul>
					{Object.keys(conversations).map((recipient) => (
						<li
							key={recipient}
							onClick={() => selectConversation(recipient)}
							className={recipient === selectedUser ? "selected-user" : ""}
						>
							{recipient}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Chat;
