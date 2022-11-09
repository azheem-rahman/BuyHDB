require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./queries/queries");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const admin = require("./routes/adminRouter");
const user = require("./routes/userRouter");

app.get("/users", db.getAllUsersAccounts);

app.put("/user-create", db.createUser);
app.post("/user-login", db.loginUser);
app.put("/user-create-details", db.createDetailsUser);

app.put("/admin-create", db.createAdmin);
app.post("/admin-login", db.loginAdmin);

const PORT = process.env.PORT || 5001;

app.listen(PORT);
