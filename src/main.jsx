import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './pages/Auth.jsx'
import Homepage from './pages/Homepage.jsx'

const router  = createBrowserRouter([
  {
    path:'/',
    element:<Auth/>,
  },
  {
    path:'/homepage',
    element:<Homepage/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
