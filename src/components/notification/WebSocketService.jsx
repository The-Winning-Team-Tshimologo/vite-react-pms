/** @format */

// websocketService.js
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

class WebSocketService {
	constructor() {
		this.socket = new SockJS("http://localhost:8081/api/v1/ws");
		this.stompClient = Stomp.over(this.socket);
		this.subscriptions = [];
	}

	connect(callback) {
		this.stompClient.connect({}, (frame) => {
			console.log("Connected: " + frame);
			if (callback) callback(frame);
		});
	}

	subscribe(destination, callback) {
		const subscription = this.stompClient.subscribe(destination, (message) => {
			callback(JSON.parse(message.body));
		});
		this.subscriptions.push(subscription);
	}

	disconnect() {
		if (this.stompClient) {
			this.subscriptions.forEach((subscription) => subscription.unsubscribe());
			this.stompClient.disconnect();
			console.log("Disconnected");
		}
	}
}

export default new WebSocketService();
