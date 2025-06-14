import TextField from "@mui/material/TextField";
import { inputProps } from "@/types/interface";

export const Input: React.FC<inputProps> = ({ label, defaultValue, id }) => {
  return (
    <TextField required id={id} label={label} defaultValue={defaultValue} />
  );
};
