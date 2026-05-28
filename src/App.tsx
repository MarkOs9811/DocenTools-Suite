import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./slices/store";
import Dashboard from "./pages/Dashboard";
import AppGeneradorGIFT from "./pages/AppGeneradorGIFT";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/app.css";
import AppRecursosVisuales from "./pages/AppRecursosVisuales";
import AppMentoria from "./pages/AppMentorIa";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* El div contenedor se coloca por fuera de las Rutas */}
        <div className="container-fluid p-0 pb-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gift" element={<AppGeneradorGIFT />} />
            <Route path="/tags" element={<AppRecursosVisuales />} />
            <Route path="/mentorIa" element={<AppMentoria />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
