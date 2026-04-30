import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion, updateQuestion, setActiveQuestion, Question } from '../../slices/giftSlice';
import { RootState } from '../../slices/store';
import { HiOutlinePlus, HiOutlineSparkles, HiOutlineTrash } from 'react-icons/hi';
import { v4 as uuidv4 } from 'uuid';

interface FormData {
  title: string;
  statement: string;
  type: 'multiple_choice' | 'true_false';
  options: { text: string; feedback: string; isCorrect: boolean }[];
}

const FormularioGIFT = () => {
  const dispatch = useDispatch();
  const activeQuestionId = useSelector((state: RootState) => state.gift.activeQuestionId);
  const questions = useSelector((state: RootState) => state.gift.questions);
  const activeQuestion = questions.find(q => q.id === activeQuestionId);

  const { register, control, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: {
      title: '',
      statement: '',
      type: 'multiple_choice',
      options: [{ text: '', feedback: '', isCorrect: false }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options"
  });

  const questionType = watch('type');

  useEffect(() => {
    if (activeQuestion) {
      reset({
        title: activeQuestion.title,
        statement: activeQuestion.statement,
        type: activeQuestion.type,
        options: activeQuestion.options.map(opt => ({
          text: opt.text,
          feedback: opt.feedback,
          isCorrect: opt.isCorrect
        }))
      });
    } else {
      reset({
        title: '',
        statement: '',
        type: 'multiple_choice',
        options: [{ text: '', feedback: '', isCorrect: false }]
      });
    }
  }, [activeQuestion, reset]);

  useEffect(() => {
    if (questionType === 'true_false' && fields.length !== 2) {
      reset({
        ...watch(),
        options: [
          { text: 'Verdadero', feedback: '', isCorrect: false },
          { text: 'Falso', feedback: '', isCorrect: false }
        ]
      });
    }
  }, [questionType, fields.length, reset, watch]);

  const onSubmit = (data: FormData) => {
    const newQuestion: Question = {
      id: activeQuestionId || uuidv4(),
      title: data.title,
      statement: data.statement,
      type: data.type,
      options: data.options.map(opt => ({ 
        ...opt, 
        id: uuidv4() 
      })),
      createdAt: Date.now()
    };

    if (activeQuestionId && questions.some(q => q.id === activeQuestionId)) {
      dispatch(updateQuestion(newQuestion));
    } else {
      dispatch(addQuestion(newQuestion));
      handleCancel();
    }
  };

  const handleCancel = () => {
    reset({
      title: '',
      statement: '',
      type: 'multiple_choice',
      options: [{ text: '', feedback: '', isCorrect: false }]
    });
    dispatch(setActiveQuestion(null));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && questionType === 'multiple_choice') {
      e.preventDefault();
      append({ text: '', feedback: '', isCorrect: false });
    }
  };

  return (
    <div className="modern-card p-4 h-100 d-flex flex-column">
      <h3 className="h5 fw-bold mb-4">
        {activeQuestionId ? 'Editar Pregunta' : 'Nueva Pregunta'}
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="scroll-area flex-grow-1">
        <div className="mb-3">
          <label className="label-modern">Título Interno</label>
          <input 
            {...register('title', { required: true })} 
            className="input-modern" 
            placeholder="Ej: Quiz 1 - Módulo 1"
          />
        </div>

        <div className="mb-3">
          <label className="label-modern">Tipo de Pregunta</label>
          <select 
            {...register('type')} 
            className="input-modern"
          >
            <option value="multiple_choice">Opción Múltiple</option>
            <option value="true_false">Verdadero / Falso</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="label-modern">Enunciado</label>
          <textarea 
            {...register('statement', { required: true })} 
            className="input-modern" 
            rows={3} 
            placeholder="Escribe la pregunta aquí..."
            style={{ height: 'auto' }}
          />
        </div>

        <div className="mb-4">
          <label className="label-modern">Opciones de respuesta</label>
          <p className="text-muted small mb-3">Presiona Enter para agregar más opciones.</p>
          
          {fields.map((field, index) => (
            <div key={field.id} className="mb-3 p-3 bg-light rounded-3 position-relative">
              <input
                {...register(`options.${index}.text` as const, { required: true })}
                className="input-modern mb-2"
                placeholder={`Opción ${index + 1}`}
                onKeyDown={handleKeyDown}
              />
              <input
                {...register(`options.${index}.feedback` as const)}
                className="input-modern border-0 bg-white"
                placeholder="Retroalimentación (opcional)"
                style={{ fontSize: '0.85rem' }}
              />
              {questionType === 'multiple_choice' && fields.length > 1 && (
                 <button 
                  type="button" 
                  onClick={() => remove(index)}
                  className="btn btn-sm text-danger position-absolute end-0 top-0 mt-2 me-2"
                 >
                   <HiOutlineTrash size={18} />
                 </button>
              )}
            </div>
          ))}
          
          {questionType === 'multiple_choice' && (
            <button 
              type="button" 
              onClick={() => append({ text: '', feedback: '', isCorrect: false })}
              className="btn w-100 border-dashed py-2 text-muted d-flex align-items-center justify-content-center gap-2"
              style={{ border: '2px dashed var(--border-color)', borderRadius: 'var(--radius)' }}
            >
              <HiOutlinePlus /> Agregar Opción
            </button>
          )}
        </div>
      </form>

      <div className="pt-3 border-top mt-auto">
        <button 
          type="button"
          onClick={handleSubmit(onSubmit)} 
          className="btn-modern btn-primary-edu w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <HiOutlineSparkles /> {activeQuestionId ? 'Actualizar Pregunta' : 'Agregar a la Lista'}
        </button>
        {activeQuestionId && (
          <button 
            type="button" 
            onClick={handleCancel}
            className="btn btn-link w-100 mt-2 text-muted text-decoration-none"
          >
            Cancelar Edición
          </button>
        )}
      </div>
    </div>
  );
};

export default FormularioGIFT;
