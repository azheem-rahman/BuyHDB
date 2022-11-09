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

    if (usernameExists.rowCount) {
      // if username already exists, dont create user and respond with error
      res.json({ status: "error", message: "username taken" });
    } else {
      // if username does not exist, proceed to create new user account below

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

// ========================== LOGIN USER ACCOUNT ========================== //
const loginUser = async (req, res) => {
  try {
    // check if username is found, if found proceed to login

    const usernameFound = await pool.query(
      `SELECT username FROM users_accounts
      WHERE username='${req.body.username}'
      ;`
    );
    // console.log(usernameFound);

    if (usernameFound.rowCount !== 0) {
      const passwordFound = await pool.query(
        `SELECT password 
        FROM users_accounts
        WHERE username='${req.body.username}'`
      );
      // console.log(passwordFound.rows[0].password);

      const passwordInDatabase = passwordFound.rows[0].password;

      const passwordMatch = await bcrypt.compare(
        req.body.password,
        passwordInDatabase
      );
      // console.log(passwordMatch);

      // check if password match
      if (passwordMatch) {
        // proceed to login
        res.json({ status: "ok", message: "login successful" });
      } else {
        // respond error unable to login because password does not match
        res.json({ status: "error", message: "invalid username or password" });
      }
    } else {
      // respond error unable to login because user account does not exist
      res.json({ status: "error", message: "invalid username or password" });
    }

    // username not found => respond with error
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ status: "error", message: "failed to login" });
  }
};

// ========================== CREATE ADMIN ACCOUNT ========================== //
const createAdmin = async (req, res) => {
  // console.log(req.body);
  try {
    // check to see if user account already exists to prevent duplicates
    // let usernameExists = false;
    const usernameExists = await pool.query(
      `SELECT username FROM administrators_accounts
      WHERE username='${req.body.username}'
      ;`
    );
    // console.log(data);

    if (usernameExists.rowCount) {
      // if username already exists, dont create user and respond with error
      res.json({ status: "error", message: "username taken" });
    } else {
      // if username does not exist, proceed to create new user account below

      // add in bcrypt to password
      const password = await bcrypt.hash(req.body.password, 12);

      // create new user account
      await pool.query(
        `INSERT INTO administrators_accounts(username, password) VALUES ('${req.body.username}', '${password}')`
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

// ========================== LOGIN ADMIN ACCOUNT ========================== //
const loginAdmin = async (req, res) => {
  try {
    // check if username is found, if found proceed to login

    const usernameFound = await pool.query(
      `SELECT username FROM administrators_accounts
      WHERE username='${req.body.username}'
      ;`
    );
    // console.log(usernameFound);

    if (usernameFound.rowCount !== 0) {
      const passwordFound = await pool.query(
        `SELECT password 
        FROM administrators_accounts
        WHERE username='${req.body.username}'`
      );
      // console.log(passwordFound.rows[0].password);

      const passwordInDatabase = passwordFound.rows[0].password;

      const passwordMatch = await bcrypt.compare(
        req.body.password,
        passwordInDatabase
      );
      // console.log(passwordMatch);

      // check if password match
      if (passwordMatch) {
        // proceed to login
        res.json({ status: "ok", message: "login successful" });
      } else {
        // respond error unable to login because password does not match
        res.json({ status: "error", message: "invalid username or password" });
      }
    } else {
      // respond error unable to login because user account does not exist
      res.json({ status: "error", message: "invalid username or password" });
    }

    // username not found => respond with error
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ status: "error", message: "failed to login" });
  }
};

module.exports = {
  getAllUsersAccounts,
  createUser,
  loginUser,
  createAdmin,
  loginAdmin,
};
