import { toast } from "sonner";

export const SuccessToast = () =>
  toast("با موفقیت انجام شد", {
    position: "top-center",
    duration: 3000,
    style: {
      backgroundColor: "green",
      color: "white",
      padding: "1rem",
      fontFamily: "IranSans",
      fontWeight: "bold",
    },
  });

export const ErrorToast = (text: string) =>
  toast(text, {
    position: "top-center",
    duration: 3000,
    style: {
      backgroundColor: "red",
      color: "white",
      padding: "1rem",
      fontFamily: "IranSans",
      fontWeight: "bold",
    },
  });
