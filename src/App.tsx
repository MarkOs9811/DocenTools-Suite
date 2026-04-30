import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./slices/store";
import Dashboard from "./pages/Dashboard";
import AppGeneradorGIFT from "./pages/AppGeneradorGIFT";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/app.css";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/gift" element={<AppGeneradorGIFT />} />
        </Routes>
      </Router>
    </Provider>
  );
}
