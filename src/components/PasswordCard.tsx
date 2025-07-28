import { UserPasswords } from "@/types/interface";
import { BootstrapInput } from "@/utils/muiStyles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";

const PasswordCard = ({
  id,
  name,
  url,
  userName,
  password,
  handleEditButton,
  handleDeleteButton,
}: UserPasswords) => {
  const [visibility, setVisibility] = useState<boolean>(false);

  const handleVisibility = () => setVisibility(!visibility);
  return (
    <>
      <div className="card__wrapper" key={id}>
        <div className="card__heading">
          <h2>{name}</h2>
        </div>
        <BootstrapInput
          defaultValue="URL"
          value={url}
          id="bootstrap-input"
          disabled
        />
        <div className="input__wrapper">
          <BootstrapInput
            defaultValue="User Name"
            value={userName}
            id="bootstrap-input-username"
            disabled
          />
          <ContentCopyIcon className="copy__icon" />
        </div>

        <div className="input__wrapper">
          <BootstrapInput
            defaultValue="Password"
            value={password}
            id="bootstrap-input-password"
            disabled
            type={!visibility ? "password" : "text"}
          />
          {!visibility ? (
            <VisibilityIcon
              onClick={handleVisibility}
              className="visibility__icon"
            />
          ) : (
            <VisibilityOffIcon
              onClick={handleVisibility}
              className="visibility__icon"
            />
          )}
          <ContentCopyIcon className="copy__icon" />
        </div>
        <div className="card__action__btns">
          <button
            className="action__btn"
            id="save"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              textAlign: "center",
            }}
            onClick={handleEditButton}
          >
            <EditIcon fontSize={"small"} />
            Edit
          </button>
          <button
            className="action__btn"
            id="cancel"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              textAlign: "center",
            }}
            onClick={handleDeleteButton}
          >
            <DeleteIcon fontSize={"small"} />
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default PasswordCard;
