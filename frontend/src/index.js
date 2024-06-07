import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GlobalProvider } from './component/GlobalContext';
import 'bootstrap/dist/css/bootstrap.min.css';
/**
 * The root element of the application.
 */
const rootElement = document.getElementById('root');
/**
 * Create a root for React to render into.
 */
const root = ReactDOM.createRoot(rootElement);
/**
 * Render the application inside the root element.
 * The application is wrapped with GlobalProvider to provide global state management.
 */
root.render(
    <React.StrictMode>
        <GlobalProvider>
            <App />
        </GlobalProvider>
    </React.StrictMode>
);
