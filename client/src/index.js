// Import React and other necessary modules
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

// Get the root element from the HTML document
const rootElement = document.getElementById('root');
// Create a root for rendering the React components
const root = createRoot(rootElement);

// Render the App component within the React.StrictMode
// StrictMode is a tool for highlighting potential problems in an application
// It helps to identify unsafe lifecycle methods, legacy context API usage, and more
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker to enable offline functionality and faster loading
// Note that using service workers can introduce some pitfalls
// Read more about service workers and Progressive Web Apps (PWA) at the provided link
// https://bit.ly/CRA-PWA
serviceWorker.register();
