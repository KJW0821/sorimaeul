
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/home/LandingPage'
import LoginCallbackPage from './pages/users/LoginCallbackPage';


const router = createBrowserRouter([
  {
    path: "/landing",
    element: <LandingPage />
  },
  {
    path: "/login-callback/:provider",
    element: <LoginCallbackPage />
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
