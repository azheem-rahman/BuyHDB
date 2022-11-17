import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "react-bootstrap";

const AdminDeleteUserAccountRequests = () => {
  const [userAccountsLoginDetails, setUserAccountsLoginDetails] = useState([]);
  const [userAccountsSelection, setUserAccountsSelection] = useState([]);

  const columnsDeleteUserAccountRequests = [
    { field: "account_id", headerName: "Account ID" },
    { field: "username", headerName: "Username", flex: 1 },
  ];

  // GET all user accounts delete requests
  const getDeleteUserAccountRequests = async () => {
    const url = "http://127.0.0.1:5001/admin-get-delete-requests";

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

  // to track and setUserAccountsSelection to rows selected by Admin
  const onRowsSelectionHandleUserAccounts = (rowIDs) => {
    const selectedRowData = rowIDs.map((rowID) =>
      userAccountsLoginDetails.find((row) => row.account_id === rowID)
    );
    console.log(selectedRowData);
    setUserAccountsSelection(selectedRowData);
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

      userAccountsSelection.map((userAccount) => {
        return deleteOneUserAccountToBackend(url, userAccount);
      });

      // update frontend userAccountsSelections so that datagrid is updated
      setUserAccountsLoginDetails(
        userAccountsLoginDetails.filter(
          (row) =>
            userAccountsSelection.filter(
              (selectedRow) => selectedRow.account_id === row.account_id
            ).length < 1
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getDeleteUserAccountRequests();
  }, []);

  return (
    <div>
      <AdminNavBar />

      <div className="container centered">
        <h2>Delete User Account Requests</h2>
      </div>

      {/* See all delete user account requests */}
      <div className="container">
        <hr />

        <div style={{ height: "100vh" }}>
          <DataGrid
            getRowId={(row) => row.account_id}
            rows={userAccountsLoginDetails}
            columns={columnsDeleteUserAccountRequests}
            autoPageSize={true}
            checkboxSelection={true}
            onSelectionModelChange={(rowIDs) =>
              onRowsSelectionHandleUserAccounts(rowIDs)
            }
          />
          <br />
          <div className="row">
            <div className="col d-flex justify-content-center">
              <Button
                variant="warning"
                onClick={deleteUserAccountsSelectionsToBackend}
              >
                Delete User Accounts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteUserAccountRequests;
