import React, { useContext } from "react";
import SomeContext from "../context/some-context";

import AdminNavBar from "./AdminNavBar";

const AdminHomepage = () => {
  const someCtx = useContext(SomeContext);

  return (
    <div>
      <AdminNavBar />
      <h1>test</h1>
    </div>
  );
};

export default AdminHomepage;
