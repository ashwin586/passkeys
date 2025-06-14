import { SubmitHandler } from "react-hook-form";

export interface authInterface {
  email: string;
  password: string;
}

export interface inputProps {
  label: string;
  id: string;
  defaultValue: string;
}

export interface AuthComponentProps {
  mode: string;
  submitHandler: SubmitHandler<authInterface>;
}

export interface ProfileComponentProps {
  heading: string;
  description: string
}