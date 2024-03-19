import { Provider } from "react-redux";
import store from "./stores/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./App.css";
import LandingPage from "./pages/home/LandingPage";
import HomePage from "./pages/home/HomePage";
import LoginCallbackPage from "./pages/users/LoginCallbackPage";
import SignUpPage from "./pages/users/SignUpPage";



const router = createBrowserRouter([
  {
    path: "/",
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
    <Provider store={store}>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </Provider>
  )
}

export default App
