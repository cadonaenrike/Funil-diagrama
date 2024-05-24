/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export interface Fluxo {
  name: string;
  pastaId: string;
  nodes: any[];
  edges: any[];
  userId: string;
}

export const saveFluxo = async (fluxoData: Fluxo): Promise<void> => {
  try {
    await api.post("/whatsFluxCreate", fluxoData);
  } catch (error) {
    console.error("Erro ao salvar fluxo:", error);
    throw error;
  }
};

export const getFluxo = async (fluxoId: string): Promise<Fluxo> => {
  try {
    const response = await api.get<Fluxo>(`/fluxos/${fluxoId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter fluxo:", error);
    throw error;
  }
};
