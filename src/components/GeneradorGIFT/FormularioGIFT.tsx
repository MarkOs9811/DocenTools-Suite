import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  updateQuestion,
  setActiveQuestion,
  Question,
} from "../../slices/giftSlice";
import { RootState } from "../../slices/store";
import {
  HiOutlinePlus,
  HiOutlineSparkles,
  HiOutlineTrash,
  HiCheckCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";

interface FormData {
  title: string;
  statement: string;
  type: "multiple_choice" | "true_false";
  options: { text: string; feedback: string; isCorrect: boolean }[];
}

const FormularioGIFT = () => {
  const dispatch = useDispatch();
  const activeQuestionId = useSelector(
    (state: RootState) => state.gift.activeQuestionId,
  );
  const questions = useSelector((state: RootState) => state.gift.questions);
  const activeQuestion = questions.find((q) => q.id === activeQuestionId);

  const { register, control, handleSubmit, reset, watch, getValues, setValue } =
    useForm<FormData>({
      defaultValues: {
        title: "",
        statement: "",
        type: "multiple_choice",
        options: [{ text: "", feedback: "", isCorrect: false }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const questionType = watch("type");

  useEffect(() => {
    if (activeQuestion) {
      reset({
        title: activeQuestion.title,
        statement: activeQuestion.statement,
        type: activeQuestion.type,
        options: activeQuestion.options.map((opt) => ({
          text: opt.text,
          feedback: opt.feedback,
          isCorrect: opt.isCorrect,
        })),
      });
    } else {
      reset({
        title: "",
        statement: "",
        type: "multiple_choice",
        options: [{ text: "", feedback: "", isCorrect: false }],
      });
    }
  }, [activeQuestion, reset]);

  useEffect(() => {
    if (questionType === "true_false" && fields.length !== 2) {
      reset({
        ...watch(),
        options: [
          { text: "Verdadero", feedback: "", isCorrect: true },
          { text: "Falso", feedback: "", isCorrect: false },
        ],
      });
    }
  }, [questionType, fields.length, reset, watch]);

  const handleSetCorrect = (indexToSelect: number) => {
    const currentOptions = getValues("options");
    const updatedOptions = currentOptions.map((opt, idx) => ({
      ...opt,
      isCorrect: idx === indexToSelect,
    }));
    setValue("options", updatedOptions);
  };

  const onSubmit = (data: FormData) => {
    const hasCorrectAnswer = data.options.some((opt) => opt.isCorrect);
    if (!hasCorrectAnswer) {
      alert(
        "Por favor, marca cuál es la respuesta correcta haciendo clic en el check.",
      );
      return;
    }

    const newQuestion: Question = {
      id: activeQuestionId || uuidv4(),
      title: data.title,
      statement: data.statement,
      type: data.type,
      options: data.options.map((opt) => ({
        ...opt,
        id: uuidv4(),
      })),
      createdAt: Date.now(),
    };

    if (activeQuestionId && questions.some((q) => q.id === activeQuestionId)) {
      dispatch(updateQuestion(newQuestion));
    } else {
      dispatch(addQuestion(newQuestion));
      handleCancel();
    }
  };

  const handleCancel = () => {
    reset({
      title: "",
      statement: "",
      type: "multiple_choice",
      options: [{ text: "", feedback: "", isCorrect: false }],
    });
    dispatch(setActiveQuestion(null));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && questionType === "multiple_choice") {
      e.preventDefault();
      append({ text: "", feedback: "", isCorrect: false });
    }
  };

  return (
    <div
      className="modern-card p-3 h-100 d-flex flex-column"
      style={{ fontSize: "0.9rem" }}
    >
      <div className="card-header">
        <h3 className="h5 fw-bold mb-3 my-3">
          {activeQuestionId ? (
            <div
              className="px-3"
              style={{
                borderLeft: "4px solid var(--secondary-color)",
              }}
            >
              <h5>Editar Pregunta</h5>
            </div>
          ) : (
            <div
              className="px-3"
              style={{
                borderLeft: "4px solid var(--primary-color)",
              }}
            >
              <h5>Nueva pregunta</h5>
            </div>
          )}
        </h3>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="scroll-area flex-grow-1"
      >
        <div className="mb-1">
          <label className="label-modern small opacity-75">
            Título Interno
          </label>
          <input
            {...register("title", { required: true })}
            className="input-modern p-2"
            placeholder="Ej: Pregunta 1 - Módulo 1"
          />
        </div>

        <div className="mb-1">
          <label className="label-modern small opacity-75">
            Tipo de Pregunta
          </label>
          <select {...register("type")} className="input-modern p-2">
            <option value="multiple_choice">Opción Múltiple</option>
            <option value="true_false">Verdadero / Falso</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="label-modern small opacity-75">Enunciado</label>
          <textarea
            {...register("statement", { required: true })}
            className="input-modern p-2"
            rows={2}
            placeholder="Escribe la pregunta aquí..."
            style={{ height: "auto", resize: "none" }}
          />
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label className="label-modern mb-0 small opacity-75">
              Opciones de respuesta
            </label>
            <span className="text-muted" style={{ fontSize: "0.7rem" }}>
              Selecciona la correcta ↓
            </span>
          </div>

          {fields.map((field, index) => {
            const isCorrect = watch(`options.${index}.isCorrect`);

            return (
              <div
                key={field.id}
                className={`mb-1 p-2 rounded-2 border ${
                  isCorrect
                    ? "border-success bg-success bg-opacity-10"
                    : "border-light bg-light"
                }`}
              >
                {/* FILA PRINCIPAL: CHECK + INPUT OPCIÓN + BASURA */}
                <div className="d-flex align-items-center gap-2 mb-1">
                  {/* BOTÓN CHECK (Más pequeño) */}
                  <button
                    type="button"
                    onClick={() => handleSetCorrect(index)}
                    className="btn btn-sm p-0 border-0 d-flex align-items-center"
                    title="Marcar como respuesta correcta"
                  >
                    {isCorrect ? (
                      <HiCheckCircle className="text-success" size={22} />
                    ) : (
                      <HiOutlineCheckCircle
                        className="text-muted opacity-50"
                        size={22}
                      />
                    )}
                  </button>

                  {/* INPUT OPCIÓN TEXTO (Sin margen inferior) */}
                  <input
                    {...register(`options.${index}.text` as const, {
                      required: true,
                    })}
                    className="input-modern flex-grow-1 p-2 mb-0"
                    placeholder={`Opción ${index + 1}`}
                    onKeyDown={handleKeyDown}
                    readOnly={questionType === "true_false"}
                    style={{ fontSize: "0.85rem" }}
                  />

                  {/* BOTÓN ELIMINAR (Alineado a la derecha, proporcional) */}
                  {questionType === "multiple_choice" && fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="btn btn-sm text-danger p-1 d-flex align-items-center justify-content-center"
                      title="Eliminar opción"
                      style={{ minWidth: "28px" }}
                    >
                      <HiOutlineTrash size={18} />
                    </button>
                  )}
                </div>

                {/* FILA SECUNDARIA: FEEDBACK (Indentado para alinearse con el input de texto) */}
                <div style={{ paddingLeft: "30px" }}>
                  <input
                    {...register(`options.${index}.feedback` as const)}
                    className="input-modern border-light bg-white p-1 text-dark w-100"
                    placeholder="Retroalimentación (opcional)"
                    style={{ fontSize: "0.75rem", fontStyle: "italic" }}
                  />
                </div>
              </div>
            );
          })}

          {questionType === "multiple_choice" && (
            <button
              type="button"
              onClick={() =>
                append({ text: "", feedback: "", isCorrect: false })
              }
              className="btn w-100 border-dashed py-1 mt-1 text-muted d-flex align-items-center justify-content-center gap-2 small"
              style={{
                border: "2px dashed var(--border-color)",
                borderRadius: "var(--radius)",
                backgroundColor: "transparent",
                fontSize: "0.8rem",
              }}
            >
              <HiOutlinePlus size={16} /> Agregar Opción
            </button>
          )}
        </div>
      </form>

      <div className="pt-2 border-top mt-auto">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="btn-modern btn-primary-edu w-100 d-flex align-items-center justify-content-center gap-2 py-2"
          style={{ fontSize: "0.9rem" }}
        >
          <HiOutlineSparkles size={18} />{" "}
          {activeQuestionId ? "Actualizar Pregunta" : "Agregar a la Lista"}
        </button>
        {activeQuestionId && (
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-outline-ligh  border w-100 mt-1 text-muted text-decoration-none small my-2"
            style={{ fontSize: "0.8rem" }}
          >
            Cancelar Edición
          </button>
        )}
      </div>
    </div>
  );
};

export default FormularioGIFT;
