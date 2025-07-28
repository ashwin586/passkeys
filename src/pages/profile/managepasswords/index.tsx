import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import PasswordCard from "@/components/PasswordCard";
import AddPassword from "@/components/AddPassword";
import { addPassword, UserPasswords } from "@/types/interface";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useToast } from "@/context/ToastContext";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

const App = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<UserPasswords[] | null>(null);
  const [selectedCredential, setSelectedCredential] =
    useState<addPassword | null>(null);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    if (!accessToken) {
      router.push("/home");
      return;
    }

    const storedCredentials = async () => {
      try {
        const response = await axios.get("/profile/managePasswords");
        const userPasswords = response?.data?.passwords;
        setCredentials(userPasswords);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err);
      }
    };

    storedCredentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setSelectedCredential(null);
  };

  const onSubmit: SubmitHandler<addPassword> = async (data) => {
    try {
      let response = null;
      if (!isEdit)
        response = await axios.post("/profile/managePasswords", data);
      else
        response = await axios.patch(
          `/profile/managePasswords/${selectedCredential?.id}`,
          data
        );
      console.log(response);
      if (response.status === 200)
        showToast(response?.data?.message, "success");
      if (response?.data?.updatedData) {
        const updatedData = response?.data?.updatedData;
        const updatedCredentials =
          credentials?.map((cred) =>
            cred?.id === updatedData?.id ? updatedData : cred
          ) ?? [];
        setCredentials(updatedCredentials);
      }
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      console.log(err);
    } finally {
      handleClose();
    }
  };

  const searchInputStyle = {
    "& .MuiInputBase-input": {
      width: "400px",
      color: "#DCD7C9",
    },
    "& .MuiFormLabel-root": {
      color: "#DCD7C9",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#DCD7C9",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#DCD7C9",
    },
  };

  const handleEditButton = (data: addPassword) => {
    setOpen(true);
    setSelectedCredential(data);
    setIsEdit(true);
  };

  const handleDeleteButton = async (data: addPassword) => {
    const id = data?.id;
    try {
      const response = await axios.delete(`/profile/managePasswords/${id}`);
      if (response?.status === 200) {
        const updatedCredentials =
          credentials?.filter((cred) => cred?.id !== id) ?? [];
        setCredentials(updatedCredentials);
        showToast(response?.data?.message, "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="main">
        <div className="profile__main">
          <div className="manage__pass__navbar">
            <div className="pass__search">
              <TextField
                id="standard-search"
                label="Search Password"
                type="search"
                variant="standard"
                sx={searchInputStyle}
              />
            </div>
            <div className="pass__btn__sec">
              <button
                className="action__btn"
                id="add"
                onClick={() => setOpen(true)}
              >
                Add Password
              </button>
            </div>
          </div>
          {credentials && credentials?.length > 0 ? (
            <div className="password__card__container">
              {credentials?.map((creds: UserPasswords) => (
                <PasswordCard
                  key={creds?.id}
                  id={creds?.id}
                  name={creds?.name}
                  url={creds?.url}
                  userName={creds?.userName}
                  password={creds?.password}
                  handleEditButton={() => handleEditButton(creds)}
                  handleDeleteButton={() => handleDeleteButton(creds)}
                />
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {/* {open && ( */}
      <AddPassword
        open={open}
        handleClose={handleClose}
        submitHandler={onSubmit}
        selectedCredential={selectedCredential}
      />
      {/* )} */}
    </>
  );
};

export default App;
