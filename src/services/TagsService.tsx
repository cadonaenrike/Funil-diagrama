import { TagsType } from "../types/TagsType";
import api from "./api";

export const getAllTags = async (): Promise<TagsType[]> => {
  try {
    const response = await api.get<TagsType[]>("/getTags"); // Ajuste na URL
    return response.data;
  } catch (error) {
    console.error("Erro ao obter tags:", error);
    throw error;
  }
};
