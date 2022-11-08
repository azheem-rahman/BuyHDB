const Pool = require("pg").Pool;

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

module.exports = { getAllUsersAccounts };
