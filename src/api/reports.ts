"use server";

import { ResponseData } from "@/utils/interfaces";
import { apiClient } from "@/services";

export const getForGenerateReport = async (): Promise<ResponseData> => {
  try {
    const response = await apiClient.GET(`sales/forGenerateReport`);
    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: "Ocurrió un error",
        data: response.statusText,
      };
    }

    return {
      error: data.error,
      message: data.message,
      data: data.data,
    };
  } catch (error: any) {
    return {
      error: true,
      message: "Error al obtener datos para la generación de reportes: " + error.message,
      data: error.message,
    };
  }
};
