import ProfileCategories from "@/components/ProfileCategories";
import React from "react";

const App = () => {
  return (
    <>
      <div className="main">
        <div className="profile__main">
          <div className="account__details"></div>
          <div className="profile__sub__categories">
            <ProfileCategories
              heading={"Manage Account"}
              description={"This helps to manage account"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
