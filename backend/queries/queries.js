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

// ========================================================================= //
// ============================= USERS PORTION ============================= //
// ========================================================================= //

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

// ========================== Create User Account ========================== //
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

// ========================== Login User Account ========================== //
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
        res.json({
          status: "ok",
          message: `user ${req.body.username} login successful`,
        });
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
    res.status(400).json({
      status: "error",
      message: `user ${req.body.username} failed to login`,
    });
  }
};

// =========================== Create User Details ========================== //
const createDetailsUser = async (req, res) => {
  try {
    // after user creates account, will be re-directed to fill in their details
    // find the user account's user_id based on its username from users_accounts table => set user_id found to userID
    const getUserID = await pool.query(
      `SELECT user_id FROM users_accounts
      WHERE username='${req.body.username}'
      ;`
    );
    // console.log(userID.rows[0].user_id);
    const userID = getUserID.rows[0].user_id;

    // create a new row inside user_details table
    // where users_details.user_id = users_accounts.user_id = userID found above
    await pool.query(
      `INSERT INTO users_details(
        user_id,
        given_name, 
        current_town, 
        current_flat_type, 
        current_flat_model, 
        current_monthly_combined_income, 
        current_younger_age
        ) 
        VALUES (
          '${userID}',
          '${req.body.givenName}', 
          '${req.body.currentTown}',
          '${req.body.flatType}',
          '${req.body.flatModel}',
          '${req.body.monthlyCombinedIncome}',
          '${req.body.youngerAge}'
        )`
    );

    res.json({
      status: "ok",
      message: `new user detail for user ${req.body.username} created successfully`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to create new user details for user ${req.body.username}`,
    });
  }
};

// =========================== Update User Details ========================== //
const updateDetailsUser = async (req, res) => {
  try {
  } catch (err) {}
};

// ======================== Create User Saved Listing ====================== //
const createListingUser = async (req, res) => {
  try {
    // on frontend, user clicks on heart icon => take in the data from frontend into req.body
    // pass req.body to create new listing in saved_listings table
  } catch (err) {}
};

// ========================================================================= //
// ============================= ADMIN PORTION ============================= //
// ========================================================================= //

// ========================== Create Admin Account ========================= //
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

// ========================== Login Admin Account ========================= //
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
  createDetailsUser,
};
