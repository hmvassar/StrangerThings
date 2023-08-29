import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import Register from './components/Register';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Messages from './components/Messages';
import Profile from './components/Profile';
import EditPost from './components/EditPost';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/register", element: <Register /> },
      { path: "/", element: <Login /> },
      { path: "/home", element: <HomePage /> },
      { path: "/profile", element: <Profile /> },
      { path: "/messages", element: <Messages /> },
      { path: "home/:id", element: <EditPost /> },
      { path: "profile/:id", element: <EditPost /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)