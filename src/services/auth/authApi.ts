import api from '@/services/api';

type signUpParams = {
  name: string;
  email: string;
  password: string;
};

export async function signUp(params: signUpParams) {
  const response = await api.post('auth/signUp', params);
  return response.data;
}
