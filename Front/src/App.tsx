
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import './App.css'
import LandingPage from './pages/home/LandingPage'
import HomePage from './pages/home/HomePage'
import LoginCallbackPage from './pages/users/LoginCallbackPage';
import SignUpPage from "./pages/users/SignUpPage";
import FAQPage from './pages/inquiry/FAQPage';
import RequestListPage from './pages/inquiry/RequestListPage';
import RequestCreatePage from './pages/inquiry/RequestCreatePage';

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
    path: "/",
    element: <HomePage />
  },
  {
    path: "/signup",
    element: <SignUpPage /> 
  },
  {
    path: "/FAQ",
    element: <FAQPage />
  },
  {
    path: "/request",
    children: [
      {
        index: true,
        element: <RequestListPage />
      },
      {
        path: "create",
        element: <RequestCreatePage />
      }
    ]
  }
]);



function App() {

  return (
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  )
}

export default App
