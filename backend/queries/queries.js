// previously used for internal database
// const Pool = require("pg").Pool;

const Pool = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const connectDB = async () => {
  try {
    const pool = new Pool({
      user: "admin",
      host: "dpg-cg43rqvdvk4st70utnfg-a",
      database: "buy_hdb",
      password: "Wo6nnHeeZm7P7hDobCSLoAVXZWPDaXwa",
      port: 5432,
    });

    await pool.connect(process.env.RENDER_URL);
  } catch (error) {
    console.log(error);
  }
};

connectDB();

// below code used to connect to local database
// const pool = new Pool({
//   user: "admin",
//   host: "localhost",
//   database: "buy_hdb",
//   password: "admin",
//   port: 5432,
// });

// ========================================================================= //
// ===================== SHARED ADMIN AND USERS PORTION ==================== //
// ========================================================================= //

// ========================== Login Account (both user and admin) ========================== //
const login = async (req, res) => {
  try {
    // check if username is found, if found proceed to login
    const usernameFound = await pool.query(
      `SELECT username FROM accounts
      WHERE username = '${req.body.username}';`
    );

    // usernameFound.rowCount is 0 if no username found
    if (usernameFound.rowCount !== 0) {
      const accountTypeFound = await pool.query(
        `SELECT account_type FROM accounts
        WHERE username = '${req.body.username}';`
      );

      const accountType = accountTypeFound.rows[0].account_type;

      const passwordFound = await pool.query(
        `SELECT password 
        FROM accounts
        WHERE username = '${req.body.username}' AND account_type = '${accountType}';`
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
        // create payload to tag access and refresh token
        const payload = {
          username: req.body.username,
          accountType: accountType,
        };

        // create access token
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
          expiresIn: "20m",
          jwtid: uuidv4(),
        });

        // create refresh token
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
          expiresIn: "30d",
          jwtid: uuidv4(),
        });

        // proceed to login
        res.json({
          status: "ok",
          message: `${req.body.username} account login successful`,
          username: req.body.username,
          accountType: accountType,
          accessToken: accessToken,
          refreshToken: refreshToken,
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

// ========================================================================= //
// ============================= USERS PORTION ============================= //
// ========================================================================= //

// ========================== Create User Account ========================== //
const createUser = async (req, res) => {
  try {
    // check to see if user account already exists to prevent duplicates
    const usernameExists = await pool.query(
      `SELECT username FROM accounts
        WHERE username = '${req.body.username}';`
    );

    if (usernameExists.rowCount) {
      // if username already exists, dont create user and respond with error
      res.json({ status: "error", message: "username taken" });
    } else {
      // if username does not exist, proceed to create new user account below

      // add in bcrypt to password
      const password = await bcrypt.hash(req.body.password, 12);

      // create new user account
      await pool.query(
        `INSERT INTO accounts(username, password, account_type) 
        VALUES ('${req.body.username}', '${password}', 'user');`
      );

      // create payload to tag access and refresh token
      const payload = {
        username: req.body.username,
        accountType: "user",
      };

      // create access token
      const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "20m",
        jwtid: uuidv4(),
      });

      // create refresh token
      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "30d",
        jwtid: uuidv4(),
      });

      res.json({
        status: "ok",
        message: `user ${req.body.username} created successfully`,
        username: req.body.username,
        accessToken: accessToken,
        refreshToken: refreshToken,
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

// =========================== Create User Details ========================== //
const createDetailsUser = async (req, res) => {
  try {
    // after user creates account, will be re-directed to fill in their details
    // find the user account's account_id based on its username from accounts table => set account_id found to userID
    const getUserID = await pool.query(
      `SELECT account_id FROM accounts
      WHERE username = '${req.body.username}' AND account_type = 'user';`
    );
    // console.log(getUserID);
    const userID = getUserID.rows[0].account_id;
    // console.log(userID.rows[0].user_id);

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
        );`
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
      errorMessage: err.message,
    });
  }
};

// =========================== Read User Details ========================== //
const getDetailsUser = async (req, res) => {
  try {
    // to get a user's details (all details)

    // find the user id based on username
    const getUserID = await pool.query(
      `SELECT account_id FROM accounts
      WHERE username = '${req.body.username}' AND account_type = 'user';`
    );
    // console.log(userID.rows[0].user_id);
    const userID = getUserID.rows[0].account_id;

    const userDetails = await pool.query(
      `SELECT * FROM users_details
      WHERE user_id = ${userID}`
    );
    console.log(userDetails.rows[0]);

    // respond to frontend with object userDetails.rows[0] containing the user's details
    res.json(userDetails.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to get all user details for user ${req.body.username}`,
    });
  }
};

// =========================== Update User Details ========================== //
const updateDetailsUser = async (req, res) => {
  try {
    // to update user details after user has created account and created user details

    // find the user id based on username
    const getUserID = await pool.query(
      `SELECT account_id FROM accounts
      WHERE username = '${req.body.username}' AND account_type = 'user';`
    );
    // console.log(userID.rows[0].user_id);
    const userID = getUserID.rows[0].account_id;

    // create a new row inside user_details table
    // where users_details.user_id = users_accounts.user_id = userID found above
    const updateUsersDetailsResult = await pool.query(
      `UPDATE users_details
      SET 
        given_name = '${req.body.givenName}', 
        current_town = '${req.body.currentTown}',
        current_flat_type = '${req.body.flatType}',
        current_flat_model = '${req.body.flatModel}',
        current_monthly_combined_income = '${req.body.monthlyCombinedIncome}',
        current_younger_age = '${req.body.youngerAge}'
      WHERE user_id = '${userID}'
      RETURNING *;`
    );
    // if successfully updated, query returns updateUsersDetailsResult.rows[0] = object containing updated row information
    // if not successfully updated, error message comes out at console.error(err.message) under catch(err) below
    // console.log(updateUsersDetailsResult.rows[0]);
    res.json({
      status: "ok",
      message: `updated user detail for user ${req.body.username} successfully`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to update user details for user ${req.body.username}`,
    });
  }
};

// ======================== Create User Saved Listing ====================== //
const createListingUser = async (req, res) => {
  try {
    // to create a new listing row in saved_listing table when user saves a resale listing

    // find the user_id based on username
    const getUserID = await pool.query(
      `SELECT account_id FROM accounts
      WHERE username = '${req.body.username}' AND account_type = 'user';`
    );
    // console.log(userID.rows[0].user_id);
    const userID = getUserID.rows[0].account_id;

    // check for duplicates (check if user has previously saved the same listing)
    const checkDuplicate = await pool.query(
      `SELECT * FROM saved_listings
      WHERE user_id = '${userID}' AND saved_listing_hdb_id = '${req.body.savedHDBListingID}'`
    );

    // if duplicate exists, skip and dont add same listing into database
    if (checkDuplicate.rowCount) {
      res.json({
        status: "ok",
        message: `saved listing ${req.body.savedHDBListingID} for user ${req.body.username} already exists`,
      });
    } else {
      // on frontend, user clicks on heart icon => take in the data from frontend into req.body
      // pass req.body to create new listing row in saved_listings table
      await pool.query(
        `INSERT INTO saved_listings(
          user_id,
          saved_street_name,
          saved_block,
          saved_storey_range,
          saved_floor_area_sqm,
          saved_resale_price,
          saved_remaining_lease,
          saved_flat_type,
          saved_flat_model,
          saved_town,
          saved_listing_hdb_id
          ) 
          VALUES (
            '${userID}',
            '${req.body.savedStreetName}', 
            '${req.body.savedBlock}',
            '${req.body.savedStoreyRange}',
            '${req.body.savedFloorAreaSqm}',
            '${req.body.savedResalePrice}',
            '${req.body.savedRemainingLease}',
            '${req.body.savedFlatType}',
            '${req.body.savedFlatModel}',
            '${req.body.savedTown}',
            '${req.body.savedHDBListingID}'
            );`
      );

      res.json({
        status: "ok",
        message: `created new saved listing ${req.body.savedHDBListingID} for user ${req.body.username} successfully`,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to create new saved listing for user ${req.body.username}`,
    });
  }
};

// ======================== Read User Saved Listings ======================= //
const getAllSavedListings = async (req, res) => {
  try {
    // to get a user's saved listings (all listings)

    // find the user_id based on username
    const getUserID = await pool.query(
      `SELECT account_id FROM accounts
      WHERE username = '${req.body.username}' AND account_type = 'user';`
    );
    // console.log(userID.rows[0].user_id);
    const userID = getUserID.rows[0].account_id;

    // check to see if there are saved listing under user_id
    const savedListingsFound = await pool.query(
      `SELECT * FROM saved_listings
      JOIN accounts ON accounts.account_id = saved_listings.user_id
      WHERE accounts.account_id = '${userID}';`
    );
    // console.log(
    //   savedListingsFound.rows.map((item, index) => {
    //     return item;
    //   })
    // );

    // if there are saved listings found, respond with array of saved listings objects to frontend
    // if there are no saved listings found, respond with empty array
    res.json(savedListingsFound.rows);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to get ${req.body.username}'s saved listings`,
    });
  }
};

// ==================== Delete User Saved Listings (one) =================== //
const deleteOneSavedListing = async (req, res) => {
  try {
    // to delete one saved listing for a user

    // find the user_id based on username
    const getUserID = await pool.query(
      `SELECT account_id FROM accounts
      WHERE username = '${req.body.username}' AND account_type = 'user';`
    );
    // console.log(userID.rows[0].user_id);
    const userID = getUserID.rows[0].account_id;

    await pool.query(
      `DELETE FROM saved_listings
      WHERE user_id = ${userID} 
      AND saved_listing_id = ${req.body.savedListingID};`
    );

    res.json({ status: "ok", message: "listing deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: "failed to delete saved listing",
    });
  }
};

// ==================== Delete User Saved Listings (all) =================== //
const deleteAllSavedListings = async (req, res) => {
  try {
    // to delete all saved listings for a user

    // find the user_id based on username
    const getUserID = await pool.query(
      `SELECT account_id FROM accounts
      WHERE username = '${req.body.username}' AND account_type = 'user';`
    );
    // console.log(userID.rows[0].user_id);
    const userID = getUserID.rows[0].account_id;

    const deleteAllSavedListingsResults = await pool.query(
      `DELETE FROM saved_listings
      WHERE user_id = '${userID}';`
    );
    // console.log(deleteAllSavedListingsResults.rowCount);

    // if no saved listings found for userID, deleteAllSavedListingsResults.rowCount = 0
    if (deleteAllSavedListingsResults.rowCount != 0) {
      res.json({
        status: "ok",
        message: `all saved listings for user ${req.body.username} deleted successfully`,
      });
    } else {
      res.json({
        status: "error",
        mssage: `no saved listings found for user ${req.body.username}`,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to delete all saved listings for user ${req.body.username}`,
    });
  }
};

// ================== Create Delete Account Request by User ================ //
const createDeleteAccountRequest = async (req, res) => {
  try {
    // find the user_id based on username
    const getUserID = await pool.query(
      `SELECT account_id FROM accounts
      WHERE username = '${req.body.username}' AND account_type = 'user';`
    );
    // console.log(userID.rows[0].user_id);
    const userID = getUserID.rows[0].account_id;

    await pool.query(
      `INSERT INTO delete_requests (user_id)
      VALUES ('${userID}')`
    );

    res.json({
      status: "ok",
      message: `Successfully created delete account request for ${req.body.username}`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to create delete request for ${req.body.username}`,
    });
  }
};

// ========================================================================= //
// ============================= ADMIN PORTION ============================= //
// ========================================================================= //

// ========================== Get All User Accounts ========================= //
const getAllUsersAccounts = async (req, res) => {
  try {
    const data = await pool.query(
      `SELECT * FROM accounts 
      WHERE account_type = 'user';`
    );

    res.json(data.rows);
    console.log(data.rows); // to access only the table data from response
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ status: "error", message: "failed to GET all users accounts" });
  }
};

// ========================== Get All Admin Accounts ========================= //
const getAllAdminAccounts = async (req, res) => {
  try {
    const data = await pool.query(
      `SELECT * FROM accounts 
      WHERE account_type = 'admin';`
    );

    res.json(data.rows);
    console.log(data.rows); // to access only the table data from response
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ status: "error", message: "failed to GET all users accounts" });
  }
};

// ============ Edit User Account Login Details by Admin ==================== //
const updateUserAccount = async (req, res) => {
  try {
    // on frontend, Admin fills up a form => form provides req.body = {user_id, newUsername, newPassword} to backend

    // check to see if newUsername already taken to prevent duplicates
    const usernameExists = await pool.query(
      `SELECT username FROM accounts
      WHERE username = '${req.body.newUsername}' AND account_type = 'user';`
    );
    // console.log(usernameExists);

    if (usernameExists.rowCount) {
      // if newUsername already exists, dont update username and respond with error
      res.json({ status: "error", message: "new username taken" });
    } else {
      // if newUsername does not exist, proceed to update user account below:

      // update username
      await pool.query(
        `UPDATE accounts
        SET username = '${req.body.newUsername}'
        WHERE account_id = '${req.body.account_id}'`
      );

      // add in bcrypt to newPassword
      const password = await bcrypt.hash(req.body.newPassword, 12);

      // update password
      await pool.query(
        `UPDATE accounts
        SET password = '${password}'
        WHERE account_id = '${req.body.account_id}'`
      );

      res.json({
        status: "ok",
        message: `user ${req.body.account_id} with new username (${req.body.newUsername}) and new password updated successfully`,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to update user account ${req.body.account_id}`,
    });
  }
};

// ========================== Get All User Details ========================== //
const getAllUsersDetails = async (req, res) => {
  try {
    const data = await pool.query(
      `SELECT users_details.detail_id AS detail_id, 
        accounts.username AS username, 
        users_details.given_name AS given_name, 
        users_details.current_town AS current_town, 
        users_details.current_flat_type AS current_flat_type, 
        users_details.current_flat_model AS current_flat_model, 
        users_details.current_monthly_combined_income AS current_monthly_combined_income, 
        users_details.current_younger_age AS current_younger_age 
      FROM users_details 
      JOIN accounts ON accounts.account_id=users_details.user_id`
    );
    res.json(data.rows);
    console.log(data.rows); // to access the table data only from response
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ status: "error", message: "failed to GET all users details" });
  }
};

// ===================== Get All Saved Listings by All Users ======================= //
const getAllUsersAllSavedListings = async (req, res) => {
  try {
    const data = await pool.query(
      `SELECT saved_listings.saved_listing_id AS saved_listing_id, 
      accounts.username AS username,
      saved_listings.saved_listing_hdb_id AS saved_listing_hdb_id,
      saved_listings.saved_town AS saved_town,
      saved_listings.saved_flat_type AS saved_flat_type,
      saved_listings.saved_flat_model AS saved_flat_model,
      saved_listings.saved_street_name AS saved_street_name,
      saved_listings.saved_block AS saved_block,
      saved_listings.saved_storey_range AS saved_storey_range,
      saved_listings.saved_floor_area_sqm AS saved_floor_area_sqm,
      saved_listings.saved_resale_price AS saved_resale_price,
      saved_listings.saved_remaining_lease AS saved_remaining_lease
      FROM saved_listings
      JOIN accounts ON accounts.account_id=saved_listings.user_id`
    );
    res.json(data.rows);
    console.log(data.rows); // to access the table data only from response
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: "failed to GET all users saved listings",
    });
  }
};

// ========================== Create Admin Account ========================= //
const createAdmin = async (req, res) => {
  // console.log(req.body);
  try {
    // check to see if user account already exists to prevent duplicates
    // let usernameExists = false;
    const usernameExists = await pool.query(
      `SELECT username FROM accounts
      WHERE username = '${req.body.username}' AND account_type = 'admin';`
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
        `INSERT INTO accounts(username, password, account_type) 
        VALUES ('${req.body.username}', '${password}', 'admin')`
      );

      const getNewAdminAccountID = await pool.query(
        `SELECT account_id FROM accounts
        WHERE username = '${req.body.username}' AND account_type = 'admin';`
      );

      // console.log(getNewAdminAccountID.rows[0].account_id);

      res.json({
        status: "ok",
        message: `admin account ${req.body.username} created successfully`,
        newAdminAccountCreated: {
          account_id: getNewAdminAccountID.rows[0].account_id,
          username: req.body.username,
          password: password,
        },
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to create ${req.body.username} admin account`,
    });
  }
};

// ============================== Delete Admin Account ============================= //
const deleteAdminAccount = async (req, res) => {
  try {
    // find the user_id based on username
    const getUserID = await pool.query(
      `SELECT account_id FROM accounts
      WHERE username = '${req.body.username}' AND account_type = 'admin';`
    );
    // console.log(userID.rows[0].user_id);
    const userID = getUserID.rows[0].account_id;

    // delete user account from users_accounts table
    await pool.query(
      `DELETE FROM accounts
      WHERE account_id = '${userID}'`
    );

    res.json({
      status: "ok",
      message: `${req.body.username} user account deleted successfully`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to delete ${req.body.username} user account`,
    });
  }
};

// =============== Using Admin Account to delete User Account ============= //
const deleteUserAccountByAdmin = async (req, res) => {
  try {
    // on frontend, user puts in request to delete their account
    // request will pass to admin account
    // admin can see all requests to delete user accounts (another route to be added in later)
    // admin can proceed to delete user account
    // => must be logged in to admin on frontend side to see the page

    // find the user_id based on username
    const getUserID = await pool.query(
      `SELECT account_id FROM accounts
      WHERE username = '${req.body.username}' AND account_type = 'user';`
    );
    // console.log(userID.rows[0].user_id);
    const userID = getUserID.rows[0].account_id;

    // delete user account from users_accounts table
    await pool.query(
      `DELETE FROM accounts
      WHERE account_id = '${userID}'`
    );

    res.json({
      status: "ok",
      message: `${req.body.username} user account deleted successfully`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to delete ${req.body.username} user account`,
    });
  }
};

// ========== Using Admin Account to Read All Accounts Deletion Requests ============ //
const getAllDeleteRequests = async (req, res) => {
  try {
    const deleteRequestsFound = await pool.query(
      `SELECT accounts.account_id, accounts.username
      FROM accounts
      JOIN delete_requests ON delete_requests.user_id=accounts.account_id`
    );

    if (deleteRequestsFound.rowCount != 0) {
      res.json(deleteRequestsFound.rows);
    } else {
      res.json({ status: "ok", message: "no delete requests found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: "failed to get all delete requests",
    });
  }
};

module.exports = {
  login,
  createUser,
  createDetailsUser,
  getDetailsUser,
  updateDetailsUser,
  createListingUser,
  getAllSavedListings,
  deleteOneSavedListing,
  deleteAllSavedListings,
  createDeleteAccountRequest,
  getAllUsersAccounts,
  getAllAdminAccounts,
  updateUserAccount,
  getAllUsersDetails,
  getAllUsersAllSavedListings,
  createAdmin,
  deleteAdminAccount,
  getAllDeleteRequests,
  deleteUserAccountByAdmin,
};
