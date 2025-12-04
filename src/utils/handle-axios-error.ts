import { AxiosError } from "axios";
import { notifyErrorPopUp } from "./notify-popup";

export function handleAxiosError(error: unknown) {
  if (error instanceof AxiosError) {
    const status = error.response?.status;

    if (status && status < 500) {
      notifyErrorPopUp(error.response?.data?.message || error.message);
      return;
    }

    console.error("Erro:", error);
    return;
  }

  console.error("Erro desconhecido:", error);
}
