// hooks/useAuth.ts
// import { useContext } from 'react';
import { useAuthContext } from '@/context/AuthProvider';

export const useAuth = () => {
  return useAuthContext();
};
