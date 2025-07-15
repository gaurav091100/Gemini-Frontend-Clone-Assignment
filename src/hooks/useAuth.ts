import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { setUser, setLoading, logout } from '@/store/slices/authSlice';
import type { User } from '@/lib/types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  return {
    user,
    isLoading,
    setUser: (user: User | null) => dispatch(setUser(user)),
    setLoading: (loading: boolean) => dispatch(setLoading(loading)),
    logout: () => dispatch(logout()),
  };
};