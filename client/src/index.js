import  React  from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {AuthProvider} from './api/context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthProvider>
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route path = "/*" element = {<App/>}/>
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
