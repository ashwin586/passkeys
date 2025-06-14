import React from "react";
import { ProfileComponentProps } from "@/types/interface";

const ProfileCategories: React.FC<ProfileComponentProps> = ({
  heading,
  description,
}) => {
  return (
    <>
      <div className="profile__categories__container">
        <h3>{heading}</h3>
        <p>{description}</p>
      </div>
    </>
  );
};

export default ProfileCategories;
