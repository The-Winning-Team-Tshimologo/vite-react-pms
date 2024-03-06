import "./App.css";
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
import LandingPage from "./pages/landingPage/LandingPage"

function App() {
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
              <Issus />
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
          path: "/sp",
          element: (
            <ProtectedRoute>
              <SP />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
