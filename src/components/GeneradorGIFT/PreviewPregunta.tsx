import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../slices/store';
import { setCorrectAnswer } from '../../slices/giftSlice';
import { HiOutlineLightBulb, HiOutlineBadgeCheck, HiOutlineExclamationCircle } from 'react-icons/hi';

const PreviewPregunta = () => {
  const dispatch = useDispatch();
  const { questions, activeQuestionId } = useSelector((state: RootState) => state.gift);
  const activeQuestion = questions.find(q => q.id === activeQuestionId);

  if (!activeQuestion) {
    return (
      <div className="modern-card p-4 h-100 d-flex flex-column align-items-center justify-content-center text-center bg-light border-dashed" style={{ borderStyle: 'dashed' }}>
        <HiOutlineLightBulb size={48} className="text-muted mb-3" />
        <h4 className="fw-bold">Previsualización</h4>
        <p className="text-muted mb-0">Selecciona una pregunta de la lista para verla aquí y marcar la respuesta correcta.</p>
      </div>
    );
  }

  const hasCorrect = activeQuestion.options.some(opt => opt.isCorrect);

  const handleOptionClick = (optionId: string) => {
    dispatch(setCorrectAnswer({ questionId: activeQuestion.id, optionId }));
  };

  return (
    <div className="modern-card p-4 h-100 d-flex flex-column">
      <h3 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
        <HiOutlineBadgeCheck /> Previsualización
      </h3>

      {!hasCorrect && (
        <div className="alert-modern mb-4">
          <HiOutlineExclamationCircle className="text-warning fs-5" />
          <span className="small fw-bold">Seleccione la solución haciendo clic en una opción</span>
        </div>
      )}

      <div className="scroll-area flex-grow-1 mt-2">
        <div className="mb-4">
          <span className="text-muted small fw-bold text-uppercase d-block mb-1">Título</span>
          <p className="h6 fw-bold">{activeQuestion.title}</p>
        </div>

        <div className="mb-4">
          <span className="text-muted small fw-bold text-uppercase d-block mb-1">Enunciado</span>
          <p className="fs-5">{activeQuestion.statement}</p>
        </div>

        <div className="options-container">
          <span className="text-muted small fw-bold text-uppercase d-block mb-1">Opciones</span>
          {activeQuestion.options.map((opt) => (
            <div 
              key={opt.id}
              onClick={() => handleOptionClick(opt.id)}
              className={`preview-option d-flex align-items-center justify-content-between ${opt.isCorrect ? 'correct' : ''}`}
            >
              <div className="flex-grow-1">
                <p className="mb-0 fw-medium">{opt.text || '(Vacío)'}</p>
                {opt.feedback && (
                  <p className="mb-0 small text-muted italic" style={{ fontStyle: 'italic' }}>
                     → {opt.feedback}
                  </p>
                )}
              </div>
              {opt.isCorrect && (
                <HiOutlineBadgeCheck className="text-success fs-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-top text-center">
        <p className="small text-muted mb-0">
          Haz clic en una opción para marcarla como la <span className="text-success fw-bold">respuesta correcta</span>.
        </p>
      </div>
    </div>
  );
};

export default PreviewPregunta;
