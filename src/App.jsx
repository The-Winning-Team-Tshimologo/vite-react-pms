import React from "react";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import AuthProvider from "./security/auth/AuthContext";
// import SignIn from "./pages/signin/Signin";
import ProtectedRoute from "./security/ProtectedRoute";
import LandingPage from "./pages/landingPage/LandingPage";
import LogIssue from "./pages/logIssue/LogIssue";
import { SPSignup } from "./pages/spSignup/SPSignup";
import { SPSignupUploadDocument } from "./pages/spSignup/SPSignupUploadDocument";
import { SPSignupProfile } from "./pages/spSignup/SPSignupProfile";
import Appointments from "./pages/appointments/Appointments";
import SPDashboard from "./pages/adminDashboard/adminDashboard";
import { BookAppointment } from "./pages/bookAppointment/BookAppointment";
import BrowseProfessionals from "./pages/browseProfessionals/BrowseProfessionals";
import Payment from "./pages/payment/Payment";
import JobRequest from "./components/jobRequest/JobRequest";
// import Review from "./components/review/Review";
import Signin from "./pages/signin/SignIn";
import MessagingPage from "./pages/messagingPage/MessagingPage";
import Invoice from "./components/invoice/Invoice";
import Profile from "./pages/profile/Profile";
import ADDashboard from "./pages/adminDashboard/adminDashboard";
import Reminders from "./pages/reminders/Reminders";
import ReviewPage from "./pages/reviewPage/ReviewPage";
import Applications from "./pages/applications/Applications";
import Users from "./pages/users/Users";
import ApplicantPage from "./pages/applicantPage/ApplicantPage";

import Update from "./pages/updateProfile/Update";
import ServiceRequest from "./components/ServiceRequest/ServiceRequest";
import Comms from "./components/comms/Comms";




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
    // {
    //   path: "/bookAppointment",
    //   element: <BookAppointment />,
    // },
    // {
    //   path: "/browseProfessionals",
    //   element: <BrowseProfessionals />,
    // },
    {
      element: (
        <ProtectedRoute>
          <Sidebar />
        </ProtectedRoute>
      ),
      children: [
        // {
        //   index: true,
        //   path: "/landing",
        //   element: (
            
        //       <LandingPage />
            
        //   ),
        // },
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/update",
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
              <SPDashboard />
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
          path: "/add-dashboard",
          element: (
            <ProtectedRoute>
              <ADDashboard />
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
          path: "/review",
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
          path: "/ServiceRequest",
          element: (
            <ProtectedRoute>
             <ServiceRequest/>
            </ProtectedRoute>
          ),
        },
        {
          path: "/Comms",
          element: (
            <ProtectedRoute>
                 <Comms/>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);


  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router}>{children}</RouterProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}

export default App;
