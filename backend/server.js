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
app.put("/create-user", db.createUser);
app.post("/user-login", db.login);

const PORT = process.env.PORT || 5001;

app.listen(PORT);
