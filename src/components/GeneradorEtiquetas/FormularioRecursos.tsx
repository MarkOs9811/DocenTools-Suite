import React from "react";
import { ResourceData, ResourceType } from "../../types";
import {
  AccordionForm,
  BadgeForm,
  BannerForm,
  BibliographyForm,
  ButtonForm,
  CardForm,
  CuriosityForm,
  GridForm,
  ProfileForm,
  QuoteForm,
  TableForm,
  TimelineForm,
} from "./SubFormularios";

interface FormularioRecursosProps {
  data: ResourceData;
  onChange: (newData: ResourceData) => void;
}

export const FormularioRecursos: React.FC<FormularioRecursosProps> = ({
  data,
  onChange,
}) => {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as ResourceType;
    let initialData: Partial<ResourceData> = { type: newType };

    // Default values per type to ensure good preview
    switch (newType) {
      case "timeline":
        initialData.timelineSteps = [
          { id: "1", title: "Inicio", content: "Comienza aquí" },
        ];
        break;
      case "profile":
        initialData.profileName = "Nombre del Docente";
        initialData.profileEmail = "docente@universidad.edu";
        initialData.profileSchedule = "Lunes a Viernes 09:00 - 18:00";
        initialData.profilePhoto =
          "https://api.dicebear.com/7.x/avataaars/svg?seed=Docente";
        break;
      case "bibliography":
        initialData.biblioTitle = "Título del Recurso";
        initialData.biblioType = "pdf";
        initialData.biblioObligatory = "obligatorio";
        initialData.biblioDesc = "Descripción del material...";
        break;
      case "table":
        initialData.tableTitle1 = "Concepto";
        initialData.tableTitle2 = "Descripción";
        initialData.tableRows = [
          { id: "1", col1: "Moodle", col2: "Entorno virtual de aprendizaje." },
          {
            id: "2",
            col1: "Snippet",
            col2: "Fragmento de código reutilizable.",
          },
        ];
        break;
      case "grid":
        initialData.gridModules = [
          { id: "1", title: "Semana 1", url: "#" },
          { id: "2", title: "Semana 2", url: "#" },
          { id: "3", title: "Semana 3", url: "#" },
        ];
        break;
      case "quote":
        initialData.quoteText =
          "La educación es el arma más poderosa que puedes usar para cambiar el mundo.";
        initialData.quoteAuthor = "Nelson Mandela";
        break;
      case "curiosity":
        initialData.curiosityTitle = "¿Sabías que...?";
        initialData.curiosityText =
          "El aprendizaje espaciado mejora la retención a largo plazo.";
        break;
      case "badge":
        initialData.badgeMessage = "¡Felicidades, terminamos!";
        break;
      case "banner":
        initialData.bannerTitle = "Bienvenido al Módulo";
        initialData.bannerSubtitle = "Introducción a la materia";
        break;
    }

    onChange({ ...data, ...initialData });
  };

  const updateData = (partial: Partial<ResourceData>) => {
    onChange({ ...data, ...partial });
  };

  const renderSubForm = () => {
    switch (data.type) {
      case "card":
        return <CardForm data={data} onChange={updateData} />;
      case "button":
        return <ButtonForm data={data} onChange={updateData} />;
      case "accordion":
        return <AccordionForm data={data} onChange={updateData} />;
      case "profile":
        return <ProfileForm data={data} onChange={updateData} />;
      case "timeline":
        return <TimelineForm data={data} onChange={updateData} />;
      case "quote":
        return <QuoteForm data={data} onChange={updateData} />;
      case "curiosity":
        return <CuriosityForm data={data} onChange={updateData} />;
      case "badge":
        return <BadgeForm data={data} onChange={updateData} />;
      case "banner":
        return <BannerForm data={data} onChange={updateData} />;
      case "table":
        return <TableForm data={data} onChange={updateData} />;
      case "grid":
        return <GridForm data={data} onChange={updateData} />;
      case "bibliography":
        return <BibliographyForm data={data} onChange={updateData} />;
      default:
        return null;
    }
  };

  return (
    <div className="card p-4 h-100 border bg-white">
      <h3
        className="mb-4"
        style={{
          color: "var(--secondary-color)",
          fontWeight: "700",
          fontSize: "1.25rem",
        }}
      >
        Configuración
      </h3>

      <div className="mb-4 p-3 bg-light rounded-3">
        <label className="form-label fw-bold text-primary small text-uppercase">
          1. Elige el Componente
        </label>
        <select
          className="form-select form-select-lg border-0 shadow-sm"
          value={data.type}
          onChange={handleTypeChange}
        >
          <optgroup label="Básicos" className="small fw-bold">
            <option className="small" value="card">
              Tarjeta de Aviso
            </option>
            <option className="small" value="button">
              Botón de Acción
            </option>
            <option className="small" value="banner">
              Banner / Separador
            </option>
          </optgroup>
          <optgroup label="Interacción" className="small fw-bold">
            <option className="small" value="accordion">
              Acordeón Desplegable
            </option>
            <option className="small" value="timeline">
              Línea de Tiempo
            </option>
            <option className="small" value="grid">
              Grid de Módulos
            </option>
          </optgroup>
          <optgroup label="Contenido" className="small fw-bold">
            <option className="small" value="profile">
              Perfil del Docente
            </option>
            <option className="small" value="bibliography">
              Bibliografía
            </option>
            <option className="small" value="table">
              Tabla Comparativa
            </option>
          </optgroup>
          <optgroup label="Inspiradores" className="small fw-bold">
            <option className="small" value="quote">
              Cita Destacada
            </option>
            <option className="small" value="curiosity">
              Caja "Para saber más"
            </option>
            <option className="small" value="badge">
              Badge de Logro
            </option>
          </optgroup>
        </select>
      </div>

      <div
        className="flex-grow-1 overflow-auto p-2"
        style={{ maxHeight: "60vh" }}
      >
        <label className="form-label fw-bold text-primary small text-uppercase mb-3">
          2. Personaliza los Datos
        </label>
        {renderSubForm()}
      </div>
    </div>
  );
};
