import React from "react";
import Topbar from "../components/ui/Topbar";
import FormularioGIFT from "../components/GeneradorGIFT/FormularioGIFT";
import ListaPreguntas from "../components/GeneradorGIFT/ListaPreguntas";
import PreviewPregunta from "../components/GeneradorGIFT/PreviewPregunta";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const AppGeneradorGIFT = () => {
  const navigate = useNavigate();

  return (
    <div className="vh-100 d-flex flex-column">
      <Topbar />

      <div className="px-4 py-2 border-bottom bg-white d-flex align-items-center justify-content-between">
        <button
          onClick={() => navigate("/")}
          className="btn btn-link text-dark text-decoration-none d-flex align-items-center gap-1 p-0 fw-bold"
        >
          <HiOutlineChevronLeft /> Volver al Dashboard
        </button>
        <span className="small text-muted fw-bold">
          HERRAMIENTA: GENERADOR GIFT
        </span>
      </div>

      <div className="container flex-grow-1 overflow-hidden">
        <div className="row h-100 g-3 py-3">
          {/* Column 1: Form */}
          <div className="col-12 col-xl-4 h-100">
            <FormularioGIFT />
          </div>

          {/* Column 2: List */}
          <div className="col-12 col-xl-4 h-100">
            <ListaPreguntas />
          </div>

          {/* Column 3: Preview */}
          <div className="col-12 col-xl-4 h-100">
            <PreviewPregunta />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppGeneradorGIFT;
