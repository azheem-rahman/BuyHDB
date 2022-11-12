import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SomeContext from "./context/some-context";

import NavBar from "./components/NavBar";
import PageHome from "./pages/PageHome";
import PageSearch from "./pages/PageSearch";
import PageCompare from "./pages/PageCompare";
import PageResources from "./pages/PageResources";
import PageResults from "./pages/PageResults";
import PageLanding from "./pages/PageLanding";
import PageCreateAccount from "./pages/PageCreateAccount";

function App() {
  const [town, setTown] = useState("");
  const [flatType, setFlatType] = useState("");
  const [flatModel, setFlatModel] = useState("");

  //   const [numOfCriteriaSelected, setNumOfCriteriaSelected] = useState(0);

  const [searchCriteria, setSearchCriteria] = useState(null);

  const [post, setPost] = useState([]);

  // for comparison feature
  //   const [compareFirst, setCompareFirst] = useState("");
  //   const [compareSecond, setCompareSecond] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SomeContext.Provider
      value={{
        town,
        setTown,
        flatType,
        setFlatType,
        flatModel,
        setFlatModel,
        searchCriteria,
        setSearchCriteria,
        post,
        setPost,
        username,
        setUsername,
        password,
        setPassword,
      }}
    >
      <div className="container-fluid gx-0">
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<PageLanding />} />
          <Route path="/create-account" element={<PageCreateAccount />} />
          <Route path="/Homepage" element={<PageHome />} />
          <Route path="/Search" element={<PageSearch />} />
          <Route path="/Results" element={<PageResults />} />
          <Route path="/Compare" element={<PageCompare />} />
          <Route path="/Resources" element={<PageResources />} />
        </Routes>
      </div>
    </SomeContext.Provider>
  );
}

export default App;
