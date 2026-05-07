import React, { useState } from "react";

import { ResourceData } from "../types";
import { Sparkles, ArrowRight } from "lucide-react";
import { FormularioRecursos } from "../components/GeneradorEtiquetas/FormularioRecursos";
import { PreviewRecursos } from "../components/GeneradorEtiquetas/PreviewRecursosProps";
import Topbar from "../components/ui/Topbar";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export const AppRecursosVisuales: React.FC = () => {
  const [resourceData, setResourceData] = useState<ResourceData>({
    type: "card",
    title: "¡Acceso a la Sesión Síncrona!",
    content:
      "La clase de hoy comenzará puntualmente a las 18:30. Asegúrate de tener micrófono y cámara listos.",
    color: "success",
    buttonText: "Entrar a Zoom",
    buttonUrl: "https://zoom.us/j/example",
    buttonColor: "#E94C47",
    accordionTitle: "Haz clic para ver más instrucciones",
    accordionContent:
      "Aquí puedes detallar pasos específicos que el alumno debe seguir...",
    profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    profileName: "Dra. María García",
    profileEmail: "mgarcia@docentools.edu",
    profileSchedule: "Lunes a Jueves, 17:00 - 19:00",
    bannerTitle: "Módulo 3: Innovación Educativa",
    bannerSubtitle: "Explorando nuevas tecnologías para el aula del siglo XXI",
    biblioTitle: "Guía de Diseño Instruccional",
    biblioType: "pdf",
    biblioObligatory: "obligatorio",
    biblioDesc:
      "Un documento esencial para comprender las bases del diseño de cursos online.",
    timelineSteps: [
      { id: "1", title: "Lectura inicial", content: "Lee el PDF del módulo." },
      {
        id: "2",
        title: "Debate en Foro",
        content: "Participa en el hilo de discusión.",
      },
      {
        id: "3",
        title: "Evaluación",
        content: "Realiza el test de comprobación.",
      },
    ],
  });
  const navigate = useNavigate();

  return (
    <div
      className=" vh-100 d-flex flex-column"
      style={{ backgroundColor: "var(--bg-soft)" }}
    >
      <Topbar />
      <div className="px-4 py-2 border-bottom bg-white d-flex align-items-center justify-content-between">
        <button
          onClick={() => navigate("/")}
          className="btn btn-link text-dark text-decoration-none d-flex align-items-center gap-1 p-0 fw-bold"
        >
          <HiOutlineChevronLeft /> Volver al Dashboard
        </button>
        <span className="small  text-dark fw-bold p-2 fs-5">
          Recursos Visuales HTML
        </span>
      </div>
      <div className="container flex-grow-1 ">
        <div className="row h-100 g-3 py-3">
          <div className="col-lg-5">
            <FormularioRecursos
              data={resourceData}
              onChange={setResourceData}
            />
          </div>
          <div className="col-lg-7">
            <PreviewRecursos data={resourceData} />
          </div>
          <div className=" p-4 bg-white rounded-4 shadow-sm border mt-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              ¿Cómo usarlo en Moodle? <ArrowRight size={18} />
            </h5>
            <div className="row g-3">
              {/* PASO 1 */}
              <div className="col-md-4">
                <div className="d-flex gap-3 align-items-start">
                  <span
                    className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "var(--primary-color)",
                      fontSize: "14px",
                    }}
                  >
                    1
                  </span>
                  <p className="small  mb-0">
                    Configura el diseño y añade tu contenido en el panel
                    izquierdo.
                  </p>
                </div>
              </div>

              {/* PASO 2 */}
              <div className="col-md-4">
                <div className="d-flex gap-3 align-items-start">
                  <span
                    className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "var(--primary-color)",
                      fontSize: "14px",
                    }}
                  >
                    2
                  </span>
                  <p className="small  mb-0">
                    Haz clic en <b>"Copiar Snippet"</b> para obtener el código
                    HTML.
                  </p>
                </div>
              </div>

              {/* PASO 3 */}
              <div className="col-md-4">
                <div className="d-flex gap-3 align-items-start">
                  <span
                    className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "var(--primary-color)",
                      fontSize: "14px",
                    }}
                  >
                    3
                  </span>
                  <p className="small  mb-0">
                    En tu curso Moodle, usando el recurso de etiqueta de texto,
                    pulsa los corchetes <code>&lt;&gt;</code> y pega el código.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppRecursosVisuales;
