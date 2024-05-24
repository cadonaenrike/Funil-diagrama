import { Pasta } from "../types/PastaType";
import api from "./api";

export const getPastaByIdUser = async (idUser: string): Promise<Pasta> => {
  try {
    const response = await api.get<Pasta>(`/getIdUserPasta/${idUser}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter pasta:", error);
    throw error; // Ou retorne um valor de erro adequado
  }
};
