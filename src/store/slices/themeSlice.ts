import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  isDark: boolean;
}

const initialState: ThemeState = {
  isDark: JSON.parse(localStorage.getItem('theme-isDark') || "false"),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem('theme-isDark', JSON.stringify(state.isDark));
      
      if (state.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;