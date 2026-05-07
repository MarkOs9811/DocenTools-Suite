import React, { useState, useMemo } from "react";
import { ResourceData } from "../../types";
import { Copy, Check } from "lucide-react";
import { generarHTML } from "@/src/lib/Generator";

interface PreviewRecursosProps {
  data: ResourceData;
}

export const PreviewRecursos: React.FC<PreviewRecursosProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const generatedHtml = useMemo(() => {
    return generarHTML(data);
  }, [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card h-100 border rounded-2">
      <div className="card-header bg-white border-bottom py-3">
        <h5
          className="mb-0"
          style={{ color: "var(--secondary-color)", fontWeight: "600" }}
        >
          Vista Previa y Código
        </h5>
      </div>
      <div className="card-body">
        <div className="mb-4">
          <label className="form-label text-muted small fw-bold text-uppercase">
            Live Preview (en Moodle)
          </label>
          <div
            className="p-3 border rounded-3 bg-light"
            style={{
              minHeight: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            dangerouslySetInnerHTML={{ __html: generatedHtml }}
          />
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="form-label text-muted small fw-bold text-uppercase mb-0">
              Código HTML Snippet
            </label>
            <button
              className={`btn btn-sm ${copied ? "btn-success" : "btn-outline-primary"} d-flex align-items-center gap-2`}
              onClick={handleCopy}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "¡Copiado!" : "Copiar Código"}
            </button>
          </div>
          <pre
            className="p-3 bg-dark text-light rounded-3 mb-0"
            style={{ fontSize: "13px", overflowX: "auto", maxHeight: "300px" }}
          >
            <code>{generatedHtml}</code>
          </pre>
        </div>

        <div
          className="alert alert-warning py-2 mt-3"
          style={{ fontSize: "13px" }}
        >
          <strong>Nota:</strong> Este código usa CSS <i>inline</i> para
          garantizar compatibilidad con el editor de Moodle.
        </div>
      </div>
    </div>
  );
};
