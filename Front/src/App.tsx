
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/home/LandingPage'
import HomePage from './pages/home/HomePage'
import LoginCallbackPage from './pages/users/LoginCallbackPage';
import SignUpPage from "./pages/users/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/landing",
    element: <LandingPage />
  },
  {
    path: "/login-callback/:provider",
    element: <LoginCallbackPage />
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/signup",
    element: <SignUpPage /> 
  }
]);



function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
