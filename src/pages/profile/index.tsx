import React, { useState, useEffect } from "react";
import ProfileCategories from "@/components/ProfileCategories";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useToast } from "@/context/ToastContext";
import { User } from "@/types/interface";
import Image from "next/image";

const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    if (!accessToken) {
      router.push("/home");
      return;
    }

    setToken(accessToken);
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile");
        setUser({
          name: response?.data?.user?.name,
          email: response?.data?.user?.email,
          createdAt: new Date(response?.data?.user?.createdAt).toLocaleString(
            "en-IN"
          ),
        });
      } catch (error: unknown) {
        if (error instanceof AxiosError && error?.response?.status === 401) {
          const message = error?.response?.data?.message;
          showToast(message, "error");
          router.push("/home");
        }
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="main">
        {token && (
          <div className="profile__main">
            <div className="account__details">
              <div className="user__avatar__container">
                <Image
                  src="/default_profile_picture.png"
                  alt="A default profile picture"
                  width={100}
                  height={100}
                  className="user__avatar"
                />
              </div>
              <div className="user__info">
                <p className="user__name">{user?.name}</p>
                <p className="user__desc">
                  This is the email being used: <strong>{user?.email}</strong>,
                  and this account was created on{" "}
                  <strong>{user?.createdAt}</strong>.
                </p>
              </div>
            </div>
            <div className="profile__sub__categories">
              <ProfileCategories
                heading={"Manage Account"}
                description={"This helps to manage account"}
                onClick={() => router.push("/profile/manageaccount")}
              />
              <ProfileCategories
                heading={"Manage Passwords"}
                description={"This is to manage the password"}
                onClick={() => router.push("/profile/managepasswords")}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
