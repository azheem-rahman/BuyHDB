require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./queries/queries");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/login", db.login);

app.put("/user-create-account", db.createUser);
app.put("/user-create-details", db.createDetailsUser);
app.get("/user-get-user-details", db.getDetailsUser);
app.patch("/user-update-details", db.updateDetailsUser);
app.put("/user-create-listing", db.createListingUser);
app.post("/user-get-all-saved-listings", db.getAllSavedListings);
app.delete("/user-delete-one-saved-listing", db.deleteOneSavedListing);
app.delete("/user-delete-all-saved-listings", db.deleteAllSavedListings);
app.put("/user-create-delete-request", db.createDeleteAccountRequest);

app.get("/admin-get-all-user-accounts", db.getAllUsersAccounts);
app.get("/admin-get-all-user-details", db.getAllUsersDetails);
app.get("/admin-get-all-users-saved-listings", db.getAllUsersAllSavedListings);
app.delete("/admin-delete-user-saved-listing", db.deleteOneSavedListing);
app.patch("/admin-update-user-account", db.updateUserAccount);
app.delete("/admin-delete-user-account", db.deleteUserAccountByAdmin);
app.get("/admin-get-delete-requests", db.getAllDeleteRequests);
app.get("/admin-get-all-admin-accounts", db.getAllAdminAccounts);
app.delete("/admin-delete-admin-account", db.deleteAdminAccount);
app.put("/admin-create-account", db.createAdmin);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
