import React, { useEffect, useRef, useState } from "react";

import AdminNavBar from "./AdminNavBar";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "react-bootstrap";
import AdminCreateAdminAccountModal from "./AdminCreateAdminAccountModal";

const AdminAccountsOverview = () => {
  const [adminAccountsLoginDetails, setAdminAccountsLoginDetails] = useState(
    []
  );
  const [adminAccountsSelection, setAdminAccountsSelection] = useState([]);

  const [createAdminAccountModalOpen, setCreateAdminAccountModalOpen] =
    useState(false);

  const newAdminUsernameRef = useRef();
  const newAdminPasswordRef = useRef();

  const columnsAdminAccountLoginDetails = [
    { field: "account_id", headerName: "Account ID", width: 100 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "password", headerName: "Password", flex: 1 },
  ];

  // GET all admin accounts login details
  const getAdminAccountsLoginDetails = async () => {
    const url = "http://127.0.0.1:5001/admin-get-all-admin-accounts";

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const response = await res.json();

      console.log(response);

      response.map((userAccount) => {
        return setAdminAccountsLoginDetails((prevState) => [
          ...prevState,
          userAccount,
        ]);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // to delete admin accounts (in backend) selected by Admin
  const deleteAdminAccountsSelectionsToBackend = async () => {
    const url = "http://127.0.0.1:5001/admin-delete-admin-account";

    try {
      // Delete ONE admin account
      const deleteOneAdminAccountToBackend = async (url, oneAdminAccount) => {
        const body = {
          username: oneAdminAccount.username,
        };

        const res = await fetch(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const response = await res.json();
        console.log(response);
      };

      adminAccountsSelection.map((adminAccount) => {
        return deleteOneAdminAccountToBackend(url, adminAccount);
      });

      // update frontend adminAccountsSelections so that datagrid is updated
      setAdminAccountsLoginDetails(
        adminAccountsLoginDetails.filter(
          (row) =>
            adminAccountsSelection.filter(
              (selectedRow) => selectedRow.account_id === row.account_id
            ).length < 1
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  // to create new Admin Account to backend
  const createAdminAccountsToBackend = async () => {
    try {
      const url = "http://127.0.0.1:5001/admin-create-account";

      const body = {
        username: newAdminUsernameRef.current.value,
        password: newAdminPasswordRef.current.value,
      };

      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const response = await res.json();
      console.log(response);

      const newAdminAccount = {
        account_id: response.newAdminAccountCreated.account_id,
        username: response.newAdminAccountCreated.username,
        password: response.newAdminAccountCreated.password,
      };

      // update frontend adminAccountsSelections so that datagrid is updated
      setAdminAccountsLoginDetails((prevState) => [
        ...prevState,
        newAdminAccount,
      ]);
    } catch (err) {
      console.log(err.message);
    }
  };

  // to track and setAdminAccountsSelection to rows selected by Admin
  const onRowsSelectionHandleAdminAccounts = (rowIDs) => {
    const selectedRowData = rowIDs.map((rowID) =>
      adminAccountsLoginDetails.find((row) => row.account_id === rowID)
    );
    console.log(selectedRowData);
    setAdminAccountsSelection(selectedRowData);
  };

  const handleCreateAdminAccountClick = () => {
    // setCreateAdminAccountModalOpen to false so that modal pops up
    setCreateAdminAccountModalOpen(true);
  };

  const handleCreateAdminAccountModalSubmit = () => {
    // setCreateAdminAccountModalOpen to false so that modal closes
    setCreateAdminAccountModalOpen(false);

    // update backend the new admin account created
    createAdminAccountsToBackend();
  };

  const handleCreateAdminAccountModalCancel = () => {
    // setCreateAdminAccountModalOpen to false so that modal closes
    setCreateAdminAccountModalOpen(false);
  };

  useEffect(() => {
    getAdminAccountsLoginDetails();
  }, []);

  return (
    <div>
      <AdminNavBar />

      {/* modal for admin to create admin accounts */}
      {createAdminAccountModalOpen && (
        <AdminCreateAdminAccountModal
          title="Create Admin Account"
          submitClicked={handleCreateAdminAccountModalSubmit}
          cancel={handleCreateAdminAccountModalCancel}
          newAdminUsernameRef={newAdminUsernameRef}
          newAdminPasswordRef={newAdminPasswordRef}
        />
      )}

      <div className="container centered">
        <h2>Admin Accounts Overview</h2>
      </div>

      {/* See all Admin Accounts */}
      <div className="container">
        <hr />

        <div style={{ height: "100vh" }}>
          <DataGrid
            getRowId={(row) => row.account_id}
            rows={adminAccountsLoginDetails}
            columns={columnsAdminAccountLoginDetails}
            autoPageSize={true}
            checkboxSelection={true}
            onSelectionModelChange={(rowIDs) =>
              onRowsSelectionHandleAdminAccounts(rowIDs)
            }
          />
          <br />
          <div className="row">
            <div className="col d-flex justify-content-center">
              <Button
                variant="warning"
                onClick={deleteAdminAccountsSelectionsToBackend}
              >
                Delete Admin Account
              </Button>
              <div className="col"></div>
              <Button variant="success" onClick={handleCreateAdminAccountClick}>
                Create Admin Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccountsOverview;
