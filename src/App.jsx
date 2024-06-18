/** @format */

import React from "react";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
	RouterProvider,
	createBrowserRouter,
	useNavigate,
} from "react-router-dom";
import AuthProvider from "./security/auth/AuthContext";
import ProtectedRoute from "./security/ProtectedRoute";
import LandingPage from "./pages/landingPage/LandingPage";
import { FormProvider } from "./utils/FormContext";
import Signin from "./pages/signin/SignIn";
import SignUp from "./pages/customer/signup/SignUp";
import { SPSignup } from "./pages/serviceProvider/spSignup/SPSignup";
import { SPSignupUploadDocument } from "./pages/serviceProvider/spSignup/SPSignupUploadDocument";
import { SPSignupProfile } from "./pages/serviceProvider/spSignup/SPSignupProfile";
import SPSignupApplication from "./pages/serviceProvider/spSignup/SPSignupApplication";
import Sidebar from "./components/sidebar/Sidebar";
import Update from "./pages/serviceProvider/updateProfile/Update";
import LogIssue from "./pages/customer/logIssue/LogIssue";
import Appointments from "./pages/serviceProvider/appointments/Appointments";
import ADDashboard from "./pages/admin/adminDashboard/ADDashboard";
import Payment from "./pages/customer/payment/Payment";
import JobRequest from "./pages/serviceProvider/jobRequest/JobRequest";
import { BookAppointment } from "./pages/customer/bookAppointment/BookAppointment";
import BrowseProfessionals from "./pages/customer/browseProfessionals/BrowseProfessionals";
import MessagingPage from "./pages/messagingPage/MessagingPage";
import Invoice from "./components/invoice/Invoice";
import Profile from "./pages/admin/profile/Profile";
import Reminders from "./pages/customer/reminders/Reminders";
import ReviewPage from "./pages/reviewPage/ReviewPage";
import Applications from "./pages/admin/applications/Applications";
import Users from "./pages/admin/users/Users";
import ApplicantPage from "./pages/admin/applicantPage/ApplicantPage";
import ServiceRequest from "./components/ServiceRequest/ServiceRequest";
import Comms from "./components/comms/Comms";
import CustomerProfile from "./pages/customer/customerProfile/CustomerProfile";
import Dashboard from "./components/dashboard/Dashboard";
import UpdateCustomerProfile from "./components/updateProfile/UpdateCustomerProfile";
import CustomerProfileCard from "./pages/customer/customerProfile/CustomerProfileCard";
import Activation from "./pages/serviceProvider/spSignup/onbaording/Activation";
import SystemNotification from "./components/notification/SystemNotification";
import { NotificationProvider } from "./components/notification/NotificationContext";
import ServiceReview from "./components/review/ServiceReview";



function App({ children }) {
	const router = createBrowserRouter([
		{
			index: true,
			path: "/landing",
			element: <LandingPage />,
		},
		{
			path: "/signin",
			element: <Signin />,
		},

		{
			path: "/signup",
			element: <SignUp />,
			// Eyes
			// Button
		},
		{
			path: "/SPSignup",
			element: <SPSignup />,
		},
		{
			path: "/SPSignupUploadDocuments",
			element: <SPSignupUploadDocument />,
		},
		{
			path: "/SPSignupProfile",
			element: <SPSignupProfile />,
		},
		{
			path: "/SPSignupProfileApplication",
			element: <SPSignupApplication />,
		},
		{
			path: "/SPActivation",
			element: <Activation />,
		},
		{
			element: (
				<ProtectedRoute>
					<Sidebar />
				</ProtectedRoute>
			),
			children: [
				{
					path: "/",
					element: <Dashboard />,
				},
				{
					path: "/updateServiceProvider",
					element: <Update />,
				},

				{
					path: "/issues",
					element: (
						<ProtectedRoute>
							<LogIssue />
						</ProtectedRoute>
					),
				},
				{
					path: "/notification",
					element: (
						<ProtectedRoute>
							<SystemNotification />
						</ProtectedRoute>
					),
				},
				{
					path: "/issues/:id",
					element: (
						<ProtectedRoute>
							<LogIssue />
						</ProtectedRoute>
					),
				},
				{
					path: "/appointments",
					element: (
						<ProtectedRoute>
							<Appointments />
						</ProtectedRoute>
					),
				},
				{
					path: "/admin-dashboard",
					element: (
						<ProtectedRoute>
							<ADDashboard />
						</ProtectedRoute>
					),
				},
				{
					path: "/payment",
					element: (
						<ProtectedRoute>
							<Payment />
						</ProtectedRoute>
					),
				},
				{
					path: "/jobrequest",
					element: (
						<ProtectedRoute>
							<JobRequest />
						</ProtectedRoute>
					),
				},

				{
					path: "/schedule-appointment",
					element: (
						<ProtectedRoute>
							<BookAppointment />
						</ProtectedRoute>
					),
				},
				{
					path: "/browse-professionals",
					element: (
						<ProtectedRoute>
							<BrowseProfessionals />
						</ProtectedRoute>
					),
				},
				{
					path: "/inbox",
					element: (
						<ProtectedRoute>
							<MessagingPage />
						</ProtectedRoute>
					),
				},
				{
					path: "/inbox/:userName",
					element: (
						<ProtectedRoute>
							<MessagingPage />
						</ProtectedRoute>
					),
				},
				{
					path: "/invoice",
					element: (
						<ProtectedRoute>
							<Invoice />
						</ProtectedRoute>
					),
				},
				{
					path: "/profile",
					element: (
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					),
				},
				{
					path: "/sp-profile/:id",
					element: (
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					),
				},

				{
					path: "/sp-profile/:id/:userName",
					element: (
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					),
				},
				{
					path: "/sp-profile2/:id/:application",
					element: (
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					),
				},
				{
					path: "/reminders",
					element: (
						<ProtectedRoute>
							<Reminders />
						</ProtectedRoute>
					),
				},
				{
					path: "/review/:id",
					element: (
						<ProtectedRoute>
							<ReviewPage />
						</ProtectedRoute>
					),
				},
				{
					path: "/applications",
					element: (
						<ProtectedRoute>
							<Applications />
						</ProtectedRoute>
					),
				},
				{
					path: "/serviceReview",
					element: (
						<ProtectedRoute>
							<ServiceReview />
						</ProtectedRoute>
					),
				},
				{
					path: "/users",
					element: (
						<ProtectedRoute>
							<Users />
						</ProtectedRoute>
					),
				},
				{
					path: "/applicant",
					element: (
						<ProtectedRoute>
							<ApplicantPage />
						</ProtectedRoute>
					),
				},
				{
					path: "/profile/:id",
					element: (
						<ProtectedRoute>
							<Update />
						</ProtectedRoute>
					),
				},
				{
					path: "customer-profile-update",
					element: (
						<ProtectedRoute>
							<UpdateCustomerProfile />
						</ProtectedRoute>
					),
				},
				{
					path: "/ServiceRequest",
					element: (
						<ProtectedRoute>
							<ServiceRequest />
						</ProtectedRoute>
					),
				},
				{
					path: "/Comms",
					element: (
						<ProtectedRoute>
							<Comms />
						</ProtectedRoute>
					),
				},
				{
					path: "/customer-profile/:id/:id2/:userName",
					element: (
						<ProtectedRoute>
							<CustomerProfile />
						</ProtectedRoute>
					),
				},
				{
					path: "/customer-profile/:id/:id2/:userName/:status",
					element: (
						<ProtectedRoute>
							<CustomerProfile />
						</ProtectedRoute>
					),
				},
				{
					path: "/customer-profile-card",
					element: (
						<ProtectedRoute>
							<CustomerProfileCard />
						</ProtectedRoute>
					),
				},
			],
		},
	]);

	return (
		<FormProvider>
			<AuthProvider>
			<NotificationProvider>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<RouterProvider router={router}>{children}</RouterProvider>
					</LocalizationProvider>
				</NotificationProvider>
			</AuthProvider>
		</FormProvider>
	);
}

export default App;
