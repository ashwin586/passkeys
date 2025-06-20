import AuthComponent from "@/components/AuthComponent";
import { SubmitHandler } from "react-hook-form";
import React from "react";
import { authInterface } from "@/types/interface";
import Head from "next/head";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

const App = () => {
  const router = useRouter();
  const onSubmit: SubmitHandler<authInterface> = async (data) => {
    try {
      const response = await axios.post("/register", data);
      if (response.status === 201) {
        router.push("/auth/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Pass Keys | Register</title>
        <meta name="description" content="Passkeys register page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <AuthComponent mode="register" submitHandler={onSubmit} />
      </div>
    </>
  );
};

export default App;
