import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { authInterface, TokenProps } from "@/types/interface";
import AuthComponent from "@/components/AuthComponent";
import axios from "@/lib/axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const App = () => {
  const router = useRouter();
  const [allowRender, setAllowRender] = useState(false);
  const [toast, setToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      try {
        const decoded: TokenProps = jwtDecode(token);
        const now: number = Date.now() / 1000;
        if (decoded.exp < now) {
          localStorage.removeItem("access-token");
          setAllowRender(true);
        } else if (router.pathname === "/auth/login") {
          router.back();
        }
      } catch (err) {
        localStorage.removeItem("access-token");
        setAllowRender(true);
        console.log(err);
      }
    } else setAllowRender(true);
  }, [router]);

  const onSubmit: SubmitHandler<authInterface> = async (data) => {
    try {
      const response = await axios.post("/login", data);
      console.log(response);
      if (response.status === 200) {
        const accessToken = response?.data?.token;
        const message: string = response?.data?.message;
        localStorage.setItem("access-token", accessToken);
        setToast(true);
        setSuccessMessage(message);
        setTimeout(() => {
          router.push("/home");
        }, 200);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setToast(false);
  };

  return (
    <>
      <Head>
        <title>Pass Keys | Login</title>
        <meta name="description" content="Passkeys login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {allowRender && (
        <div className="main">
          <AuthComponent mode="login" submitHandler={onSubmit} />
        </div>
      )}
      <Snackbar open={toast} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
          }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default App;
