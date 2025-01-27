import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ScrollToTop />        
            <App />     
    </BrowserRouter>
)
