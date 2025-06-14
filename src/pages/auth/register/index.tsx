import AuthComponent from "@/components/AuthComponent";
import { SubmitHandler } from "react-hook-form";
import React from "react";
import { authInterface } from "@/types/interface";
import Head from "next/head";

const App = () => {
  const onSubmit: SubmitHandler<authInterface> = async (data) => {
    console.log(data);
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
