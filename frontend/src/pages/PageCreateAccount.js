import React from "react";
import CreateAccount from "../components/CreateAccount";
import CreateAccountSideImage from "../assets/CreateAccountSideImage.jpg";

const PageCreateAccount = () => {
  return (
    <div className="row">
      <div className="col-sm">
        <img src={CreateAccountSideImage} alt="" style={{ width: "50vw" }} />
      </div>
      <div className="col-sm">
        <CreateAccount />
      </div>
    </div>
  );
};

export default PageCreateAccount;
