/** @format */

import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "@/components/header/Header";
import Chat from "@/components/messagingTool/Chat";

const MessagingPage = () => {
	const location = useLocation();
	const { userName: paramUserName } = useParams();
	const { userName: stateUserName, user2 } = location.state || {
		userName: "",
		user2: "",
	};

	// Fallback to paramUserName if stateUserName is not provided
	// const userName = stateUserName || paramUserName;
	const userName = stateUserName || JSON.parse(localStorage.getItem("user")).userName; 


	return (
		<>
			<Header />
			<Chat
				user2={user2}
				userName={userName}
			/>
		</>
	);
};

export default MessagingPage;
