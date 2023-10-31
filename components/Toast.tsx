import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message: string, type: any) => {
  toast(message, { type });
};

export default function Toast() {
  return <ToastContainer />;
}
