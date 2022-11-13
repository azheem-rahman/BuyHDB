import React from "react";
import NavBar from "../components/NavBar";
import ResaleFlatPricesHeader from "../components/ResaleFlatPricesHeader";
import Results from "../components/Results";

const PageResults = () => {
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
        <Results />
      </div>

      <div className="footer d-flex align-items-end">
        <div className="container centered">
          <h6>Created by Azheem</h6>
        </div>
      </div>
    </div>
  );
};

export default PageResults;
