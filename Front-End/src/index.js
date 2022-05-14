import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDom.render(
  <Auth0Provider
    domain="dev-ccettuzw.us.auth0.com"
    clientId="9nyv14CLwXNMGVP0myQmn0ChDQc3Xifs"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
