import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import PasswordCard from "@/components/PasswordCard";
import AddPassword from "@/components/AddPassword";
import { addPassword } from "@/types/interface";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useToast } from "@/context/ToastContext";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

const App = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    if (!accessToken) {
      router.push("/home");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => setOpen(false);

  const onSubmit: SubmitHandler<addPassword> = async (data) => {
    try {
      const response = await axios.post("/profile/managePasswords", data);
      if (response.status === 200)
        showToast(response?.data?.message, "success");
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      console.log(err);
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
          <div className="password__card__container">
            <PasswordCard />
            <PasswordCard />
            <PasswordCard />
            <PasswordCard />
            <PasswordCard />
            <PasswordCard />
            <PasswordCard />
            <PasswordCard />
            <PasswordCard />
            <PasswordCard />
            <PasswordCard />
            <PasswordCard />
          </div>
        </div>
      </div>
      {open && (
        <AddPassword
          open={open}
          handleClose={handleClose}
          submitHandler={onSubmit}
        />
      )}
    </>
  );
};

export default App;
