import { BootstrapInput } from "@/utils/muiStyles";
import React from "react";

const PasswordCard = () => {
  return (
    <>
      <div className="card__wrapper">
        <div className="card__heading">
          <h2>Heading</h2>
        </div>
        <BootstrapInput defaultValue="App Name" id="bootstrap-input" disabled />
        <BootstrapInput defaultValue="User Name" id="bootstrap-input" disabled />
        <BootstrapInput defaultValue="Password" id="bootstrap-input" disabled />
        <div className="card__action__btns">
          <button className="action__btn" id="save">
            edit
          </button>
          <button className="action__btn" id="cancel">
            delete
          </button>
        </div>
      </div>
    </>
  );
};

export default PasswordCard;
