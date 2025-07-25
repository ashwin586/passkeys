import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { addPassword, AddPasswordProps } from "@/types/interface";
import { popupModalStyle } from "@/utils/muiStyles";
import { useEffect } from "react";

const AddPassword: React.FC<AddPasswordProps> = ({
  open,
  handleClose,
  submitHandler,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<addPassword>({
    defaultValues: {
      appName: "",
      url: "",
      userName: "",
      password: "",
    },
  });

  useEffect(() => {
    reset({
      appName: "",
      url: "",
      userName: "",
      password: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} sx={popupModalStyle}>
      <DialogTitle>Add Password</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <DialogContentText>
          {/* To subscribe to this website, please enter your email address here. We
          will send updates occasionally. */}
        </DialogContentText>
        <form onSubmit={handleSubmit(submitHandler)}>
          <TextField
            autoFocus
            margin="dense"
            id="appName"
            label="App Name *"
            type="text"
            fullWidth
            variant="standard"
            {...register("appName", {
              required: "App Name is required",
              minLength: {
                value: 1,
                message: "Atleast one character is required.",
              },
            })}
            error={!!errors.appName}
            helperText={errors.appName?.message}
          />

          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="URL *"
            type="text"
            fullWidth
            variant="standard"
            {...register("url", {
              required: "URL is required",
            })}
            error={!!errors.url}
            helperText={errors.url?.message}
          />

          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="Username or Email *"
            type="text"
            fullWidth
            variant="standard"
            {...register("userName", {
              required: "Username or Email is required",
              validate: (value) => {
                const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                const isUsername = /^[a-zA-Z0-9._]{3,}$/.test(value);
                return (
                  isEmail ||
                  isUsername ||
                  "Enter a valid email or username (min 3 characters, no spaces)"
                );
              },
            })}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />

          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password *"
            type="Password"
            fullWidth
            variant="standard"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPassword;
