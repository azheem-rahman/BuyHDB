const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "buy_hdb",
  password: "admin",
  port: 5432,
});

const getAllUsersAccounts = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT username, password FROM users_accounts;"
    );
    res.json({ data });
    console.log(data.rows); // to access the table data only from response
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ status: "error", message: "failed to GET all users accounts" });
  }
};

// ========================== CREATE USER ACCOUNT ========================== //
const createUser = async (req, res) => {
  // console.log(req.body);
  try {
    // check to see if user account already exists to prevent duplicates
    // let usernameExists = false;
    const usernameExists = await pool.query(
      `SELECT username FROM users_accounts
      WHERE username='${req.body.username}'
      ;`
    );
    // console.log(data);

    // .map through accounts array to see if username exists
    // data.rows.map((account) => {
    //   if (account.username === req.body.username.toLowerCase()) {
    //     usernameExists = true;
    //   }
    // });

    if (usernameExists) {
      // if username already exists, dont create user and respond with error
      res.json({ status: "error", message: "username taken" });
    } else {
      // if username does not exist, proceed to create new user account below
      // create new user_id
      const newId = uuidv4();

      // add in bcrypt to password
      const password = await bcrypt.hash(req.body.password, 12);

      // create new user account
      await pool.query(
        `INSERT INTO users_accounts(username, password) VALUES ('${req.body.username}', '${password}')`
      );

      res.json({
        status: "ok",
        message: `user ${req.body.username} created successfully`,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to create ${req.body.username} user account`,
    });
  }
};

module.exports = { getAllUsersAccounts, createUser };
