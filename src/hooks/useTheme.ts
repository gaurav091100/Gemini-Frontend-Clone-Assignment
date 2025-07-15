import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { toggleTheme } from '@/store/slices/themeSlice';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const { isDark } = useAppSelector((state) => state.theme);

  return {
    isDark,
    toggleTheme: () => dispatch(toggleTheme()),
  };
};