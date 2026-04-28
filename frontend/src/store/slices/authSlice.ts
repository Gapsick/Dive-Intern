import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  studentId: string;
  name: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isKo: boolean;
}

const mockUser: User = {
  studentId: '2021001',
  name: '田中太郎',
};

const initialState: AuthState = {
  isLoggedIn: true,
  user: mockUser,
  isKo: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    toggleLanguage: (state) => {
      state.isKo = !state.isKo;
    },
  },
});

export const { login, logout, toggleLanguage } = authSlice.actions;
export default authSlice.reducer;
