import React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { authInterface, AuthComponentProps } from "@/types/interface";
import Link from "next/link";

const AuthComponent: React.FC<AuthComponentProps> = ({
  mode,
  submitHandler,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authInterface>();
  return (
    <div className="login__container">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="login__form__container"
      >
        {mode === "login" ? (
          <h1 className="auth__heading">Login</h1>
        ) : (
          <h1 className="auth__heading">Register</h1>
        )}

        <TextField
          id="email"
          type="text"
          label="Email"
          variant="filled"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          autoComplete="off"
        />
        {errors.email && <p className="alert__err">{errors.email.message}</p>}
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="filled"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password && <p className="alert__err">{errors.password.message}</p>}
        {mode === "login" && (
          <div className="forgotpassword__link">
            <a href="/forgotpassword">Forgot password?</a>
          </div>
        )}
        <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
        <div>
          {mode === "login" ? (
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/auth/register">Register</Link>
            </p>
          ) : (
            <p>
              Already have an account <Link href="/auth/login">Login</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthComponent;
