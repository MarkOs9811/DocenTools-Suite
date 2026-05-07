import React from "react";
import { ResourceData, TimelineStep } from "../../types";
import { Plus, Trash2 } from "lucide-react";

interface SubFormProps {
  data: ResourceData;
  onChange: (newData: Partial<ResourceData>) => void;
}

export const CardForm: React.FC<SubFormProps> = ({ data, onChange }) => (
  <>
    <div className="mb-3">
      <label className="form-label fw-bold">Título</label>
      <input
        type="text"
        className="form-control"
        value={data.title || ""}
        onChange={(e) => onChange({ title: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">Mensaje</label>
      <textarea
        className="form-control"
        rows={3}
        value={data.content || ""}
        onChange={(e) => onChange({ content: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">Color</label>
      <select
        className="form-select"
        value={data.color}
        onChange={(e) => onChange({ color: e.target.value as any })}
      >
        <option value="info">Info (Azul)</option>
        <option value="success">Éxito (Verde)</option>
        <option value="danger">Peligro (Rojo)</option>
      </select>
    </div>
  </>
);

export const ButtonForm: React.FC<SubFormProps> = ({ data, onChange }) => (
  <>
    <div className="mb-3">
      <label className="form-label fw-bold">Texto del Botón</label>
      <input
        type="text"
        className="form-control"
        value={data.buttonText || ""}
        onChange={(e) => onChange({ buttonText: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">URL de Destino</label>
      <input
        type="text"
        className="form-control"
        value={data.buttonUrl || ""}
        onChange={(e) => onChange({ buttonUrl: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">Color de Fondo</label>
      <input
        type="color"
        className="form-control form-control-color w-100"
        value={data.buttonColor || "#E94C47"}
        onChange={(e) => onChange({ buttonColor: e.target.value })}
      />
    </div>
  </>
);

export const AccordionForm: React.FC<SubFormProps> = ({ data, onChange }) => (
  <>
    <div className="mb-3">
      <label className="form-label fw-bold">Título del Acordeón</label>
      <input
        type="text"
        className="form-control"
        value={data.accordionTitle || ""}
        onChange={(e) => onChange({ accordionTitle: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">Contenido Oculto</label>
      <textarea
        className="form-control"
        rows={5}
        value={data.accordionContent || ""}
        onChange={(e) => onChange({ accordionContent: e.target.value })}
      />
    </div>
  </>
);

export const ProfileForm: React.FC<SubFormProps> = ({ data, onChange }) => (
  <>
    <div className="mb-3">
      <label className="form-label fw-bold">URL de Foto</label>
      <input
        type="text"
        className="form-control"
        value={data.profilePhoto || ""}
        onChange={(e) => onChange({ profilePhoto: e.target.value })}
        placeholder="https://..."
      />
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">Nombre Completo</label>
      <input
        type="text"
        className="form-control"
        value={data.profileName || ""}
        onChange={(e) => onChange({ profileName: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">Correo Electrónico</label>
      <input
        type="email"
        className="form-control"
        value={data.profileEmail || ""}
        onChange={(e) => onChange({ profileEmail: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">Horarios de Atención</label>
      <input
        type="text"
        className="form-control"
        value={data.profileSchedule || ""}
        onChange={(e) => onChange({ profileSchedule: e.target.value })}
      />
    </div>
  </>
);

export const BibliographyForm: React.FC<SubFormProps> = ({
  data,
  onChange,
}) => (
  <>
    <div className="mb-3">
      <label className="form-label fw-bold">Título del Recurso</label>
      <input
        type="text"
        className="form-control"
        value={data.biblioTitle || ""}
        onChange={(e) => onChange({ biblioTitle: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">Tipo de Recurso</label>
      <select
        className="form-select"
        value={data.biblioType}
        onChange={(e) => onChange({ biblioType: e.target.value as any })}
      >
        <option value="link">Enlace (Web)</option>
        <option value="pdf">Lectura (PDF)</option>
        <option value="video">Multimedia (Video)</option>
      </select>
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">Categoría</label>
      <select
        className="form-select"
        value={data.biblioObligatory}
        onChange={(e) => onChange({ biblioObligatory: e.target.value as any })}
      >
        <option value="obligatorio">Obligatoria</option>
        <option value="complementario">Complementaria</option>
      </select>
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">Descripción Corta</label>
      <textarea
        className="form-control"
        rows={2}
        value={data.biblioDesc || ""}
        onChange={(e) => onChange({ biblioDesc: e.target.value })}
      />
    </div>
  </>
);

export const QuoteForm: React.FC<SubFormProps> = ({ data, onChange }) => (
  <>
    <div className="mb-3">
      <label className="form-label fw-bold">Texto de la Cita</label>
      <textarea
        className="form-control"
        rows={4}
        value={data.quoteText || ""}
        onChange={(e) => onChange({ quoteText: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">Autor</label>
      <input
        type="text"
        className="form-control"
        value={data.quoteAuthor || ""}
        onChange={(e) => onChange({ quoteAuthor: e.target.value })}
      />
    </div>
  </>
);

export const CuriosityForm: React.FC<SubFormProps> = ({ data, onChange }) => (
  <>
    <div className="mb-3">
      <label className="form-label fw-bold">Título de Encabezado</label>
      <input
        type="text"
        className="form-control"
        value={data.curiosityTitle || ""}
        onChange={(e) => onChange({ curiosityTitle: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">Dato Curioso / Texto</label>
      <textarea
        className="form-control"
        rows={3}
        value={data.curiosityText || ""}
        onChange={(e) => onChange({ curiosityText: e.target.value })}
      />
    </div>
  </>
);

export const BadgeForm: React.FC<SubFormProps> = ({ data, onChange }) => (
  <>
    <div className="mb-3">
      <label className="form-label fw-bold">Mensaje de Felicitación</label>
      <input
        type="text"
        className="form-control"
        value={data.badgeMessage || ""}
        onChange={(e) => onChange({ badgeMessage: e.target.value })}
      />
    </div>
  </>
);

export const BannerForm: React.FC<SubFormProps> = ({ data, onChange }) => (
  <>
    <div className="mb-3">
      <label className="form-label fw-bold">Título Principal</label>
      <input
        type="text"
        className="form-control"
        value={data.bannerTitle || ""}
        onChange={(e) => onChange({ bannerTitle: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold">Subtítulo</label>
      <input
        type="text"
        className="form-control"
        value={data.bannerSubtitle || ""}
        onChange={(e) => onChange({ bannerSubtitle: e.target.value })}
      />
    </div>
  </>
);

export const TableForm: React.FC<SubFormProps> = ({ data, onChange }) => {
  const addRow = () => {
    const rows = [
      ...(data.tableRows || []),
      { id: crypto.randomUUID(), col1: "Nuevo Item", col2: "Descripción" },
    ];
    onChange({ tableRows: rows });
  };

  const removeRow = (id: string) => {
    const rows = (data.tableRows || []).filter((r) => r.id !== id);
    onChange({ tableRows: rows });
  };

  const updateRow = (id: string, col: "col1" | "col2", value: string) => {
    const rows = (data.tableRows || []).map((r) =>
      r.id === id ? { ...r, [col]: value } : r,
    );
    onChange({ tableRows: rows });
  };

  return (
    <div>
      <div className="mb-3">
        <label className="form-label fw-bold small text-muted">
          ENCABEZADOS
        </label>
        <div className="d-flex gap-2 mb-2">
          <input
            type="text"
            className="form-control form-control-sm"
            value={data.tableTitle1 || ""}
            onChange={(e) => onChange({ tableTitle1: e.target.value })}
            placeholder="Columna 1"
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value={data.tableTitle2 || ""}
            onChange={(e) => onChange({ tableTitle2: e.target.value })}
            placeholder="Columna 2"
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <label className="form-label fw-bold small text-muted mb-0">
          FILAS DE CONTENIDO
        </label>
        <button className="btn btn-sm btn-outline-primary" onClick={addRow}>
          <Plus size={14} />
        </button>
      </div>
      {(data.tableRows || []).map((row) => (
        <div key={row.id} className="d-flex gap-2 mb-2">
          <input
            type="text"
            className="form-control form-control-sm"
            value={row.col1}
            onChange={(e) => updateRow(row.id, "col1", e.target.value)}
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value={row.col2}
            onChange={(e) => updateRow(row.id, "col2", e.target.value)}
          />
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => removeRow(row.id)}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export const GridForm: React.FC<SubFormProps> = ({ data, onChange }) => {
  const updateMod = (id: string, field: "title" | "url", value: string) => {
    const mods = (data.gridModules || []).map((m) =>
      m.id === id ? { ...m, [field]: value } : m,
    );
    onChange({ gridModules: mods });
  };

  return (
    <div>
      <label className="form-label fw-bold small text-muted text-uppercase mb-3">
        Módulos del Grid (Fijo 3)
      </label>
      {(data.gridModules || []).map((mod, idx) => (
        <div key={mod.id} className="p-3 border rounded mb-3 bg-light">
          <div className="fw-bold small mb-2 text-primary">
            TARJETA {idx + 1}
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Título Módulo"
              value={mod.title}
              onChange={(e) => updateMod(mod.id, "title", e.target.value)}
            />
          </div>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="URL Destino"
            value={mod.url}
            onChange={(e) => updateMod(mod.id, "url", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export const TimelineForm: React.FC<SubFormProps> = ({ data, onChange }) => {
  const addStep = () => {
    const steps = [
      ...(data.timelineSteps || []),
      {
        id: crypto.randomUUID(),
        title: "Nuevo Paso",
        content: "Descripción del paso...",
      },
    ];
    onChange({ timelineSteps: steps });
  };

  const removeStep = (id: string) => {
    const steps = (data.timelineSteps || []).filter((s) => s.id !== id);
    onChange({ timelineSteps: steps });
  };

  const updateStep = (id: string, field: keyof TimelineStep, value: string) => {
    const steps = (data.timelineSteps || []).map((s) =>
      s.id === id ? { ...s, [field]: value } : s,
    );
    onChange({ timelineSteps: steps });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <label className="form-label fw-bold mb-0">Pasos Cronológicos</label>
        <button className="btn btn-sm btn-outline-primary" onClick={addStep}>
          <Plus size={14} /> Añadir
        </button>
      </div>
      {(data.timelineSteps || []).map((step, idx) => (
        <div
          key={step.id}
          className="border p-2 rounded mb-2 bg-white shadow-sm"
        >
          <div className="d-flex gap-2 mb-2">
            <input
              type="text"
              className="form-control form-control-sm"
              value={step.title}
              onChange={(e) => updateStep(step.id, "title", e.target.value)}
              placeholder={`Paso ${idx + 1}`}
            />
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => removeStep(step.id)}
            >
              <Trash2 size={14} />
            </button>
          </div>
          <textarea
            className="form-control form-control-sm"
            rows={2}
            value={step.content}
            onChange={(e) => updateStep(step.id, "content", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};
