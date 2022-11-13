import React from "react";
import ResaleFlatPricesHeader from "../components/ResaleFlatPricesHeader";
import Search from "../components/Search";
import NavBar from "../components/NavBar";

const PageSearch = () => {
  return (
    <div>
      <NavBar />

      <div
        className="searchpage-resultspage-header"
        style={{ margin: 0, padding: 0 }}
      ></div>

      <br />

      <div className="container">
        <ResaleFlatPricesHeader />
      </div>

      <div className="container">
        <Search />
      </div>

      <div className="footer d-flex align-items-end">
        <div className="container centered">
          <h6>Created by Azheem</h6>
        </div>
      </div>
    </div>
  );
};

export default PageSearch;
