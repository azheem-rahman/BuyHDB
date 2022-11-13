// Results component to display result
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import SomeContext from "../context/some-context";
import Data from "./Data";
import testData from "./testData";

import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";

import { DataGrid } from "@mui/x-data-grid";

const Results = () => {
  const someCtx = useContext(SomeContext);

  let resultFound = false;

  const [savedSelections, setSavedSelections] = useState([]);

  const checkResultFound = () => {
    if (someCtx.post.length !== 0) {
      resultFound = true;
    }
  };

  // setting columns for results table using Data Grid from MUI
  const columns = [
    { field: "id", headerName: "Listing ID" },
    { field: "street_name", headerName: "Street Name", flex: 1 },
    { field: "block", headerName: "Block" },
    { field: "storey_range", headerName: "Storey Range", flex: 1 },
    { field: "floor_area_sqm", headerName: "Floor Area" },
    { field: "resale_price", headerName: "Resale Price" },
    { field: "remaining_lease", headerName: "Remaining Lease", flex: 1 },
  ];

  const onRowsSelectionHandle = (ids) => {
    const selectedRowData = ids.map((id) =>
      someCtx.post.find((row) => row.id === id)
    );
    console.log(selectedRowData);
    setSavedSelections(selectedRowData);
  };

  const searchAgain = () => {
    someCtx.setTown("");
    someCtx.setFlatType("");
    someCtx.setFlatModel("");
    someCtx.setSearchCriteria(null);
    someCtx.setPost([]);
  };

  const saveUserSelectionsToBackend = () => {
    const url = "http://127.0.0.1:5001/user-create-listing";

    try {
      const sendOneListingToBackend = async (url, oneListing) => {
        const body = {
          username: someCtx.currentUsername,
          savedStreetName: oneListing.street_name,
          savedBlock: oneListing.block,
          savedStoreyRange: oneListing.storey_range,
          savedFloorAreaSqm: oneListing.floor_area_sqm,
          savedResalePrice: oneListing.resale_price,
          savedRemainingLease: oneListing.remaining_lease,
          savedFlatType: someCtx.flatType,
          savedFlatModel: someCtx.flatModel,
          savedTown: someCtx.town,
          savedHDBListingID: oneListing.id,
        };

        const res = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const response = await res.json();
        console.log(response);
      };

      savedSelections.map((item) => {
        return sendOneListingToBackend(url, item);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div className="results-header">
        <h4>Search Results</h4>

        <hr />

        <div className="row">
          <div className="col">
            <p>Town</p>
          </div>
          <div className="col">
            <p>{someCtx.town}</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <p>Flat Type</p>
          </div>
          <div className="col">
            <p>{someCtx.flatType}</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <p>Flat Model</p>
          </div>
          <div className="col">
            <p>{someCtx.flatModel}</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <p>Total Records Found</p>
          </div>
          <div className="col">
            {someCtx.post.length !== 0 ? (
              <p>{someCtx.post.length} records</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <Data checkResultFound={checkResultFound()} />

      <br />

      <div style={{ height: "101vh" }}>
        <DataGrid
          rows={someCtx.post}
          columns={columns}
          autoPageSize={true}
          checkboxSelection={true}
          // selectionModel={savedSelections}
          onSelectionModelChange={(ids) => onRowsSelectionHandle(ids)}
        />
      </div>

      <br />

      <div className="row">
        <div className="col d-flex justify-content-center">
          <Button variant="success" onClick={saveUserSelectionsToBackend}>
            Save Selections
          </Button>
          <div className="col"></div>
          <NavLink to="/search">
            <Button variant="danger" onClick={searchAgain}>
              Search Again
            </Button>
          </NavLink>
          <br />
        </div>
      </div>

      <br />
    </div>
  );
};

export default Results;
