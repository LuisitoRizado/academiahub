import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const client_id = import.meta.env.VITE_AUTH0_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={client_id} redirectUri={window.location.origin + '/home'}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
)
