import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import ResaleFlatPricesHeader from "../components/ResaleFlatPricesHeader";
import Search from "../components/Search";
import NavBar from "../components/NavBar";
import SomeContext from "../context/some-context";
import UserSavedListings from "../components/UserSavedListings";

const PageUserSavedListings = () => {
  const someCtx = useContext(SomeContext);
  return (
    <div>
      <NavBar />

      <div
        className="searchpage-resultspage-header"
        style={{ margin: 0, padding: 0 }}
      ></div>

      <br />

      <div className="container">
        <UserSavedListings />
      </div>

      <div className="footer d-flex align-items-end">
        <div className="container centered">
          <h6>Created by Azheem</h6>
        </div>
      </div>
    </div>
  );
};

export default PageUserSavedListings;
