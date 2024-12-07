import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    formData: {
      title: '',
      description: '',
      priority: 'low',
      dueDate: '',
    },
  },
  reducers: {
    openModal: (state,action) => {
      state.isOpen = true;
      if (action.payload) {
        state.formData = action.payload; // Prefill form data if available
      }
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.formData = { title: '', description: '', priority: 'low', dueDate: '' }; // Reset form data
      
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
