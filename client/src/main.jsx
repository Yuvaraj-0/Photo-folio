// main.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ReactGA from "react-ga4";

ReactGA.initialize("G-550K0XZ57Y"); // replace with your GA measurement ID

// Track page views
const trackPageView = (page) => {
  ReactGA.send({ hitType: "pageview", page });
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}> {/* ✅ Wrap App with Redux Provider */}
      <App />
    </Provider>
  </BrowserRouter>
);

