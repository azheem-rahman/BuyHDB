require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./queries/queries");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/users", db.getAllUsersAccounts);

app.put("/user-create-account", db.createUser);
app.post("/user-login", db.loginUser);
app.put("/user-create-details", db.createDetailsUser);
app.patch("/user-update-details", db.updateDetailsUser);
app.put("/user-create-listing", db.createListingUser);
app.get("/user-saved-listings", db.getAllSavedListings);
app.delete("/user-delete-one-saved-listing", db.deleteOneSavedListing);
app.delete("/user-delete-all-saved-listings", db.deleteAllSavedListings);

app.put("/admin-create-account", db.createAdmin);
app.post("/admin-login", db.loginAdmin);

const PORT = process.env.PORT || 5001;

app.listen(PORT);
