import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const popupModalStyle = {
  "& .MuiPaper-root": {
    borderRadius: "1em",
    backgroundColor: "#E0E0E0",
    // color: "#E0E0E0",
  },
  "& .MuiTypography-root": {
    // color: "#E0E0E0",
  },
};

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 5,
    position: "relative",
    //   backgroundColor: "#",
    color: "#f6e9d9",
    border: "1px solid",
    borderColor: "#f6e9d9",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
      borderColor: "#2D3843",
    }),
  },
  "&.Mui-disabled .MuiInputBase-input": {
    color: "#f6e9d9 !important",
    WebkitTextFillColor: "#f6e9d9",
  },
}));

export const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    color: "#f6e9d9",
    "& fieldset": {
      borderColor: "#f6e9d9", 
    },
    "&:hover fieldset": {
      borderColor: "#f6e9d9", 
    },
    "&.Mui-focused fieldset": {
      borderColor: "#f6e9d9", 
    },
    "&.Mui-disabled": {
      opacity: 1,
      color: "#bfae99", 
      "& fieldset": {
        borderColor: "#bfae99", 
      },
    },
  },
  "& .MuiInputBase-input.Mui-disabled": {
    color: "#bfae99 !important", 
    WebkitTextFillColor: "#bfae99 !important",
  },
  "& .MuiInputLabel-root": {
    color: "#f6e9d9", 
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#f6e9d9", 
  },
};
