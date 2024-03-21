import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import './App.css'
import LandingPage from './pages/home/LandingPage'
import HomePage from './pages/home/HomePage'
import LoginCallbackPage from './pages/users/LoginCallbackPage';
import { Provider } from "react-redux";
import store from "./stores/store";
import SignUpPage from "./pages/users/SignUpPage";
import FAQPage from './pages/inquiry/FAQPage';
import RequestListPage from './pages/inquiry/RequestListPage';
import RequestCreatePage from './pages/inquiry/RequestCreatePage';
import RequestDetailPage from './pages/inquiry/RequestDetailPage';
import RequestEditPage from './pages/inquiry/RequestEditPage';
import SideBar from './components/common/SideBar'
import ModelCreatePage from './pages/voiceModel/ModelCreatePage'
import CoverListPage from './pages/aiCover/CoverListPage'
import ModelDetailPage from './pages/voiceModel/ModelDetailPage';
import RecordingPage from './pages/voiceModel/RecordingPage'

function Layout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}


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
    path: "/signup",
    element: <SignUpPage /> 
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "request",
        children: [
          {
            index: true,
            element: <RequestListPage />,
          },
          {
            path: "create",
            element: <RequestCreatePage />,
          },
          {
            path: ":id",
            element: <RequestDetailPage />,
          },
          {
            path: ":id/edit",
            element: <RequestEditPage />,
          }
        ]
      },
      {
        path: "FAQ",
        element: <FAQPage />
      },
      {
        path: "model",
        children: [
          {
            path: "create",
            element: <ModelCreatePage />
          },
          {
            path: ":code",
            element: <ModelDetailPage />
          },
          {
            path: "record",
            element: <RecordingPage />
          }
        ]
      },
      {
        path: "cover",
        children: [
          {
            index: true,
            element: <CoverListPage />
          }
        ]
      }
    ]
  },
]);



function App() {

  return (
    <Provider store={store}>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </Provider>
  )
}

export default App
