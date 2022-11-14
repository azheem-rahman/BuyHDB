import React, { useContext, useEffect, useState } from "react";
import SomeContext from "../context/some-context";

import { DataGrid } from "@mui/x-data-grid";

import { Button } from "react-bootstrap";

const UserSavedListings = () => {
  const someCtx = useContext(SomeContext);

  const [savedListings, setSavedListings] = useState([]);
  const [deleteSelections, setDeleteSelections] = useState([]);

  // setting columns for saved listings table using Data Grid from MUI
  const columns = [
    { field: "saved_listing_id", headerName: "Listing ID" },
    { field: "saved_street_name", headerName: "Street Name", flex: 1 },
    { field: "saved_block", headerName: "Block" },
    { field: "saved_storey_range", headerName: "Storey Range", flex: 1 },
    { field: "saved_floor_area_sqm", headerName: "Floor Area" },
    { field: "saved_resale_price", headerName: "Resale Price" },
    { field: "saved_remaining_lease", headerName: "Remaining Lease", flex: 1 },
  ];

  // GET all saved listings under user and set to state
  const getUserSavedListings = async () => {
    const url = "http://127.0.0.1:5001/user-get-all-saved-listings";
    const body = {
      username: someCtx.currentUsername,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const response = await res.json();

      console.log(response);

      response.map((item) => {
        return setSavedListings((prevState) => [...prevState, item]);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // to track and setDeleteSelections to rows that were selected by user
  const onRowsSelectionHandle = (rowIDs) => {
    const selectedRowData = rowIDs.map((rowID) =>
      savedListings.find((row) => row.saved_listing_id === rowID)
    );
    console.log(selectedRowData);
    setDeleteSelections(selectedRowData);
  };

  // user select rows => rows selected passed to setDeleteSelections state
  // => deleteSelections.map() to pass each row one by one to backend
  // => backend deletes each row it receives from database
  // => update frontend savedListings => datagrid table gets updated
  const deleteUserSelectionsToBackend = async () => {
    const url = "http://127.0.0.1:5001/user-delete-one-saved-listing";

    try {
      const deleteOneListingToBackend = async (url, oneListing) => {
        const body = {
          username: someCtx.currentUsername,
          savedListingID: oneListing.saved_listing_id,
        };

        const res = await fetch(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const response = await res.json();
        console.log(response);
      };

      deleteSelections.map((item) => {
        return deleteOneListingToBackend(url, item);
      });

      // update frontend savedListings so that datagrid is updated
      setSavedListings(
        savedListings.filter(
          (row) =>
            deleteSelections.filter(
              (selectedRow) =>
                selectedRow.saved_listing_id === row.saved_listing_id
            ).length < 1
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  // to getUserSavedListings from backend at mount and unmount
  useEffect(() => {
    getUserSavedListings();
  }, []);

  return (
    <div>
      <hr />
      <h4>{someCtx.currentUsername}'s Saved Listings</h4>
      <hr />
      <div style={{ height: "101vh" }}>
        <DataGrid
          getRowId={(row) => row.saved_listing_id}
          rows={savedListings}
          columns={columns}
          autoPageSize={true}
          checkboxSelection={true}
          // selectionModel={savedSelections}
          onSelectionModelChange={(rowIDs) => onRowsSelectionHandle(rowIDs)}
        />
      </div>

      <br />

      <div className="row">
        <div className="col d-flex justify-content-center">
          <Button variant="warning" onClick={deleteUserSelectionsToBackend}>
            Delete Selections
          </Button>
          <div className="col"></div>
        </div>
      </div>

      <br />
    </div>
  );
};

export default UserSavedListings;
