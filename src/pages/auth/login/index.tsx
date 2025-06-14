import React from "react";
import { SubmitHandler } from "react-hook-form";
import { authInterface } from "@/types/interface";
import AuthComponent from "@/components/AuthComponent";
import axios from "@/lib/axios";
import Head from "next/head";

const App = () => {
  const onSubmit: SubmitHandler<authInterface> = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("/login", data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Pass Keys | Login</title>
        <meta name="description" content="Passkeys login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <AuthComponent mode="login" submitHandler={onSubmit} />
      </div>
    </>
  );
};

export default App;
