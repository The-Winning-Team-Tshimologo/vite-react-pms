import React from 'react';
import "./App.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import AuthProvider from "./security/auth/AuthContext";
import SignIn from "./pages/signin/SignIn";
import ProtectedRoute from "./security/ProtectedRoute";
import Activity from "./pages/mockPages/Activity";
import Issus from "./pages/mockPages/Issus";
import SP from "./pages/mockPages/SP";
import About from "./pages/mockPages/About";
import Messages from "./pages/mockPages/Messages";
import LandingPage from "./pages/landingPage/LandingPage";
import LogIssue from './pages/logIssue/LogIssue';
import Payment from "@/components/payment/Payment.jsx";
import JobRequest from "@/components/jobRequest/JobRequest.jsx";
import {SPSignup} from "@/pages/spSignup/SPSignup.jsx";
import {SPSignupUploadDocument} from "@/pages/spSignup/SPSignupUploadDocument.jsx";

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
    },
    {
      path: "/sp-signup",
      element: <SPSignup/>,
    },

    {
      path: "/sp-signup-documents",
      element: <SPSignupUploadDocument/>,
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
          path: "/activity",
          element: (
            <ProtectedRoute>
              <Activity />
            </ProtectedRoute>
          ),
        },
        {
          path: "/about",
          element: (
            <ProtectedRoute>
              <About />
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
          path: "/messages",
          element: (
            <ProtectedRoute>
              <Messages />
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
          path: "/sp",
          element: (
            <ProtectedRoute>
              <SP />
            </ProtectedRoute>
          ),
        },
        {
          path: "/job-request",
          element: (
              <ProtectedRoute>
                <JobRequest/>
              </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router}>
          {children}
        </RouterProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}

export default App;
