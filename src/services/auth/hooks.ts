import { useMutation } from '@tanstack/react-query';

import { signUp } from './authApi';

export function useSingUp() {
  return useMutation(signUp);
}
