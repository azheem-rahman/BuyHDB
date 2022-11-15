import React, { useEffect, useState } from "react";

import AdminNavBar from "../components/AdminNavBar";

import { DataGrid } from "@mui/x-data-grid";

import { Button } from "react-bootstrap";

const AdminUserAccountsOverview = () => {
  // ========================================================================= //
  // =================== USER ACCOUNTS LOGIN DETAILS PORTION ================= //
  // ========================================================================= //
  const [userAccountsLoginDetails, setUserAccountsLoginDetails] = useState([]);
  const [deleteUserAccountsSelection, setDeleteUserAccountsSelection] =
    useState([]);

  const columnsUserAccountLoginDetails = [
    { field: "user_id", headerName: "Account ID" },
    { field: "username", headerName: "Username" },
    { field: "password", headerName: "Password", flex: 1 },
  ];

  // GET all user account login details
  const getUserAccountsLoginDetails = async () => {
    const url = "http://127.0.0.1:5001/admin-get-all-user-accounts";

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const response = await res.json();

      console.log(response);

      response.map((userAccount) => {
        return setUserAccountsLoginDetails((prevState) => [
          ...prevState,
          userAccount,
        ]);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // to track and setDeleteUserAccountsSelection to rows selected by Admin
  const onRowsSelectionHandleDeleteUserAccounts = (rowIDs) => {
    const selectedRowData = rowIDs.map((rowID) =>
      userAccountsLoginDetails.find((row) => row.user_id === rowID)
    );
    console.log(selectedRowData);
    setDeleteUserAccountsSelection(selectedRowData);
  };

  // to delete user accounts (in backend) selected by Admin
  const deleteUserAccountsSelectionsToBackend = async () => {
    const url = "http://127.0.0.1:5001/admin-delete-user-account";

    try {
      // Delete ONE user account
      const deleteOneUserAccountToBackend = async (url, oneUserAccount) => {
        const body = {
          username: oneUserAccount.username,
        };

        const res = await fetch(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const response = await res.json();
        console.log(response);
      };

      deleteUserAccountsSelection.map((userAccount) => {
        return deleteOneUserAccountToBackend(url, userAccount);
      });

      // update frontend deleteUserAccountsSelections so that datagrid is updated
      setUserAccountsLoginDetails(
        userAccountsLoginDetails.filter(
          (row) =>
            deleteUserAccountsSelection.filter(
              (selectedRow) => selectedRow.user_id === row.user_id
            ).length < 1
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  // to getUserAccountsLoginDetails
  // to getUserPersonalDetails
  // from backend at mount and unmount
  useEffect(() => {
    getUserAccountsLoginDetails();
    getUserPersonalDetails();
  }, []);

  // ========================================================================= //
  // ================== USER ACCOUNTS PERSONAL DETAILS PORTION =============== //
  // ========================================================================= //
  const [userPersonalDetails, setUserPersonalDetails] = useState([]);

  const columnsUserPersonalDetails = [
    { field: "detail_id", headerName: "Detail ID" },
    { field: "username", headerName: "Username" },
    { field: "given_name", headerName: "Given Name" },
    { field: "current_town", headerName: "Town" },
    { field: "current_flat_type", headerName: "Flat Type" },
    { field: "current_flat_model", headerName: "Flat Model" },
    {
      field: "current_monthly_combined_income",
      headerName: "Monthly Combined Income",
      flex: 1,
    },
    { field: "current_younger_age", headerName: "Younger Age" },
  ];

  // GET all user personal details
  const getUserPersonalDetails = async () => {
    const url = "http://127.0.0.1:5001/admin-get-all-user-details";

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const response = await res.json();

      console.log(response);

      response.map((userDetail) => {
        return setUserPersonalDetails((prevState) => [
          ...prevState,
          userDetail,
        ]);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // ========================================================================= //
  // ================== USER ACCOUNTS SAVED LISTINGS PORTION ================= //
  // ========================================================================= //
  const [userSavedListings, setUserSavedListings] = useState([]);
  const [deleteUserSavedListingsSelected, setDeleteUserSavedListingsSelected] =
    useState([]);

  // to track and setDeleteUserSavedListingsSelected to rows selected by Admin
  const onRowsSelectionHandleDeleteUserSavedListings = (rowIDs) => {};

  return (
    <div>
      <AdminNavBar />

      <div className="container centered">
        <h2>Admin User Accounts Overview</h2>
      </div>

      {/* See all user accounts (username and password) */}
      <div className="container">
        <hr />
        <h4>All User Accounts Login Details</h4>
        <hr />

        <div style={{ height: "101vh" }}>
          <DataGrid
            getRowId={(row) => row.user_id}
            rows={userAccountsLoginDetails}
            columns={columnsUserAccountLoginDetails}
            autoPageSize={true}
            checkboxSelection={true}
            onSelectionModelChange={(rowIDs) =>
              onRowsSelectionHandleDeleteUserAccounts(rowIDs)
            }
          />
        </div>
        <br />
        <div className="row">
          <div className="col d-flex justify-content-center">
            <Button
              variant="warning"
              onClick={deleteUserAccountsSelectionsToBackend}
            >
              Delete User Accounts
            </Button>
            <div className="col"></div>
          </div>
        </div>
        <br />
      </div>

      {/* See all user accounts details */}
      <div className="container">
        <hr />
        <h4>All User Accounts Personal Details</h4>
        <hr />

        <div style={{ height: "101vh" }}>
          <DataGrid
            getRowId={(row) => row.detail_id}
            rows={userPersonalDetails}
            columns={columnsUserPersonalDetails}
            autoPageSize={true}
          />
        </div>
      </div>

      {/* See all user accounts saved listings */}
      <div className="container">
        <h4>All Saved Listings</h4>
      </div>
    </div>
  );
};

export default AdminUserAccountsOverview;
