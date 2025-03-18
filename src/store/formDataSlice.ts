import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData, FormState } from '../types';

const initialState: FormState = {
  uncontrolledForm: null,
  hookForm: null,
  lastAddedType: null,
  timestamp: null,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addUncontrolledFormData: (state, action: PayloadAction<FormData>) => {
      state.uncontrolledForm = action.payload;
      state.lastAddedType = 'uncontrolled';
      state.timestamp = Date.now();
    },
    addHookFormData: (state, action: PayloadAction<FormData>) => {
      state.hookForm = action.payload;
      state.lastAddedType = 'hook';
      state.timestamp = Date.now();
    },
  },
});

export const { addUncontrolledFormData, addHookFormData } =
  formDataSlice.actions;
export default formDataSlice.reducer;
