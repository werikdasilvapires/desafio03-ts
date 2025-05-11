import { api } from "../api"

interface IAuthResponse {
  success: boolean;
  user?: {
    email: string;
    name: string;
    id: string;
  };
}

export const login = async (email: string, password: string): Promise<IAuthResponse> => {
  const data: any = await api

  if(email !== data.email || password !== data.password) {
    return {
      success: false
    }
  }

  return {
    success: true,
    user: {
      email: data.email,
      name: data.name,
      id: data.id
    }
  }
}