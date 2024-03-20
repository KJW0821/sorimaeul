import { Provider } from "react-redux";
import store from "./stores/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./App.css";
import LandingPage from "./pages/home/LandingPage";
import HomePage from "./pages/home/HomePage";
import LoginCallbackPage from "./pages/users/LoginCallbackPage";
import SignUpPage from "./pages/users/SignUpPage";
import FAQPage from './pages/inquiry/FAQPage';
import RequestListPage from './pages/inquiry/RequestListPage';
import RequestCreatePage from './pages/inquiry/RequestCreatePage';
import RequestDetailPage from './pages/inquiry/RequestDetailPage';
import RequestEditPage from './pages/inquiry/RequestEditPage';


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
      },
      {
        path: ":id",
        element: <RequestDetailPage />
      },
      {
        path: ":id/edit",
        element: <RequestEditPage />
      }
    ]
  }
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
