import React from "react";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import AuthProvider from "./security/auth/AuthContext";
import SignIn from "./pages/signin/SignIn";
import ProtectedRoute from "./security/ProtectedRoute";




import LandingPage from "./pages/landingPage/LandingPage";
import LogIssue from "./pages/logIssue/LogIssue";
import { SPSignup } from "./pages/spSignup/SPSignup";
import { SPSignupUploadDocument } from "./pages/spSignup/SPSignupUploadDocument";
import { SPSignupProfile } from "./pages/spSignup/SPSignupProfile";
import Appointments from "./pages/appointments/Appointments";
import SPDashboard from "./pages/adminDashboard/adminDashboard";
import { BookAppointment } from "./pages/bookAppointment/BookAppointment";
import BrowseProfessionals from "./components/browseProfessionals/BrowseProfessionals";
import Payment from "./components/payment/Payment";
import JobRequest from "./components/jobRequest/JobRequest";
import Review from "./components/review/Review";

function App({ children }) {
  const router = createBrowserRouter([
    {
      path: "/landing",
      element: <LandingPage />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />, 
      // Eyes
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
      element: (
        <ProtectedRoute>
          <Sidebar />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          path: "/",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
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
          path: "/spDashboard",
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
                <Payment/>
              </ProtectedRoute>
          ),
        },
        {
          path: "/jobrequest",
          element: (
              <ProtectedRoute>
                <JobRequest/>
              </ProtectedRoute>
          ),
        },
        {
          path: "/review",
          element: (
              <ProtectedRoute>
                <Review/>
              </ProtectedRoute>
          ),
        },
        {
          path: "/bookAppointment",
          element: (
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          ),
        },
        {
          path: "/BrowseProfessionals",
          element: (
            <ProtectedRoute>
              <BrowseProfessionals />
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
