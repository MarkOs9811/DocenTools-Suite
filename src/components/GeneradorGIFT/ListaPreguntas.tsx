import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/store";
import { setActiveQuestion, deleteQuestion } from "../../slices/giftSlice";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";

const ListaPreguntas = () => {
  const dispatch = useDispatch();
  const { questions, activeQuestionId } = useSelector(
    (state: RootState) => state.gift,
  );

  const hasCorrectOption = (qId: string) => {
    const q = questions.find((q) => q.id === qId);
    return q?.options.some((opt) => opt.isCorrect);
  };

  if (questions.length === 0) {
    return (
      <div className="modern-card p-4 h-100 d-flex flex-column align-items-center justify-content-center text-center">
        <div className="bg-light p-4 rounded-circle mb-3">
          <HiOutlineExclamationCircle size={40} className="text-muted" />
        </div>
        <h4 className="fw-bold">No hay preguntas</h4>
        <p className="text-muted small">
          Empieza creando tu primera pregunta en el formulario de la izquierda.
        </p>
      </div>
    );
  }
  const handleExportGIFT = () => {
    if (questions.length === 0) return;

    // Pequeña validación de UX: Avisar si hay preguntas sin marcar
    const incompletas = questions.filter((q) => !hasCorrectOption(q.id));
    if (incompletas.length > 0) {
      const confirmar = window.confirm(
        `⚠️ Tienes ${incompletas.length} pregunta(s) sin respuesta correcta. Moodle te dará error si las importas así.\n\n¿Seguro que deseas exportar de todos modos?`,
      );
      if (!confirmar) return;
    }

    let giftText = "";

    // Construir el string formato GIFT
    questions.forEach((q) => {
      const title = q.title ? `::${q.title}::` : "";
      const statement = q.statement
        ? q.statement.trim()
        : "Pregunta sin enunciado";

      giftText += `${title} ${statement} {\n`;

      q.options.forEach((opt) => {
        // En Moodle GIFT: '=' es correcta, '~' es incorrecta
        const prefix = opt.isCorrect ? "=" : "~";
        // Si hay feedback, se pone un '#' después de la opción
        const feedback = opt.feedback ? `#${opt.feedback.trim()}` : "";

        // Evitamos exportar opciones vacías que el profe haya dejado por accidente
        if (opt.text && opt.text.trim() !== "") {
          giftText += `\t${prefix}${opt.text.trim()}${feedback}\n`;
        }
      });

      giftText += "}\n\n"; // Cierre de la pregunta y salto de línea para la siguiente
    });

    // Lógica mágica para crear y descargar el archivo .txt
    const blob = new Blob([giftText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Banco_Preguntas_DocenTool.txt"; // El nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Limpiamos memoria
  };

  return (
    <div className="modern-card p-4 h-100 d-flex flex-column">
      <h3 className="h5 fw-bold mb-4">Historial ({questions.length})</h3>

      <div className="scroll-area flex-grow-1">
        {questions.map((q) => {
          const isComplete = hasCorrectOption(q.id);
          const isActive = activeQuestionId === q.id;

          return (
            <div
              key={q.id}
              onClick={() => dispatch(setActiveQuestion(q.id))}
              className={`modern-card question-card-item ${isActive ? "active" : ""} ${isComplete ? "completed" : "warning"}`}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span
                      className="fw-bold text-truncate"
                      style={{ maxWidth: "150px" }}
                    >
                      {q.title || "Sin Título"}
                    </span>
                    {isComplete ? (
                      <span className="badge-status badge-success d-flex align-items-center gap-1">
                        <HiOutlineCheckCircle /> Completa
                      </span>
                    ) : (
                      <span className="badge-status badge-pending d-flex align-items-center gap-1">
                        <HiOutlineExclamationCircle /> Falta respuesta
                      </span>
                    )}
                  </div>
                  <p className="text-muted small mb-0 text-truncate">
                    {q.statement || "Sin contenido..."}
                  </p>
                </div>

                <div className="d-flex gap-1 ms-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setActiveQuestion(q.id));
                    }}
                    className="btn btn-sm btn-light p-1 border"
                    title="Editar"
                  >
                    <HiOutlinePencil size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteQuestion(q.id));
                    }}
                    className="btn btn-sm btn-light p-1 border text-danger"
                    title="Eliminar"
                  >
                    <HiOutlineTrash size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-top mt-auto">
        <button
          onClick={handleExportGIFT}
          disabled={questions.length === 0}
          className="btn w-100 btn-dark fw-bold shadow-sm"
          style={{ borderRadius: "var(--radius)" }}
        >
          Exportar archivo .GIFT
        </button>
      </div>
    </div>
  );
};

export default ListaPreguntas;
