import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Option {
  id: string;
  text: string;
  feedback: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  title: string;
  statement: string;
  type: 'multiple_choice' | 'true_false';
  options: Option[];
  createdAt: number;
}

interface GiftState {
  questions: Question[];
  activeQuestionId: string | null;
  searchQuery: string;
}

const initialState: GiftState = {
  questions: [],
  activeQuestionId: null,
  searchQuery: '',
};

const giftSlice = createSlice({
  name: 'gift',
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload);
      state.activeQuestionId = action.payload.id;
    },
    updateQuestion: (state, action: PayloadAction<Question>) => {
      const index = state.questions.findIndex(q => q.id === action.payload.id);
      if (index !== -1) {
        state.questions[index] = action.payload;
      }
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter(q => q.id !== action.payload);
      if (state.activeQuestionId === action.payload) {
        state.activeQuestionId = state.questions.length > 0 ? state.questions[0].id : null;
      }
    },
    setActiveQuestion: (state, action: PayloadAction<string | null>) => {
      state.activeQuestionId = action.payload;
    },
    setCorrectAnswer: (state, action: PayloadAction<{ questionId: string; optionId: string }>) => {
      const question = state.questions.find(q => q.id === action.payload.questionId);
      if (question) {
        if (question.type === 'true_false') {
          question.options = question.options.map(opt => ({
            ...opt,
            isCorrect: opt.id === action.payload.optionId
          }));
        } else {
          question.options = question.options.map(opt => ({
            ...opt,
            isCorrect: opt.id === action.payload.optionId
          }));
        }
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { 
  addQuestion, 
  updateQuestion, 
  deleteQuestion, 
  setActiveQuestion, 
  setCorrectAnswer,
  setSearchQuery 
} = giftSlice.actions;

export default giftSlice.reducer;
