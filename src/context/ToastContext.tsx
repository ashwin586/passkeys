import { createContext, useContext, useState } from "react";
import { ToastInterface, ToastType } from "@/types/interface";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ToastContext = createContext<ToastInterface | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<ToastType>("success");

  const showToast = (msg: string, sev: ToastType = "success") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
