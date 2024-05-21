/** @format */

import Stomp from "stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export function connectWebSocket() {
	const socket = new SockJS("http://localhost:8081/api/v1/ws");
	stompClient = Stomp.over(socket);
	return stompClient;
}

export function subscribeToMessages(callback) {
	if (!stompClient) {
		stompClient = connectWebSocket();
	}
	stompClient.connect(
		{},
		() => {
			stompClient.subscribe("/topic/messages", (message) => {
				callback(JSON.parse(message.body));
			});
		},
		(error) => {
			console.error("Error connecting to WebSocket:", error);
		}
	);
}

export function sendMessage(message) {
	if (!stompClient) {
		stompClient = connectWebSocket();
	}
	stompClient.send("/app/chat.send", {}, JSON.stringify(message));
}

const socket = new WebSocket("ws://localhost:8081/api/v1/ws");

socket.onopen = function () {
	console.log("WebSocket connection established.");
};

socket.onmessage = function (event) {
	console.log("Received message:", event.data);
	// Handle the received message here
};

socket.onerror = function (error) {
	console.error("WebSocket error:", error);
};

socket.onclose = function (event) {
	console.log("WebSocket connection closed:", event.code, event.reason);
	// Optionally attempt to reconnect here
};
