// services/PastaService.ts
import api from './api';
import { Pasta } from '../types/PastaType';

export const getPastaByIdUser = async (userId: string): Promise<Pasta[]> => {
  try {
    const response = await api.get<Pasta[]>(`/getIdUserPasta/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar pastas:", error);
    throw error;
  }
};
