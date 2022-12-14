import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SomeContext from "./context/some-context";

import PageHome from "./pages/PageHome";
import PageSearch from "./pages/PageSearch";
import PageCompare from "./pages/PageCompare";
import PageResources from "./pages/PageResources";
import PageResults from "./pages/PageResults";
import PageLanding from "./pages/PageLanding";
import PageCreateAccount from "./pages/PageCreateAccount";
import PageUserSavedListings from "./pages/PageUserSavedListings";
import PageAdminHome from "./pages/PageAdminHome";

import PageAdminUserAccountsOverview from "./pages/PageAdminUserAccountsOverview";
import PageAdminUserAccountsRequests from "./pages/PageAdminUserAccountsRequests";
import PageAdminAccountsOverview from "./pages/PageAdminAccountsOverview";
import SignUp from "./components/SignUp";

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

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const [currentUsername, setCurrentUsername] = useState("");
  const [password, setPassword] = useState("");

  const [currentAccountType, setCurrentAccountType] = useState("");

  // if local storage has token, setState in context store
  useEffect(() => {
    if (localStorage.refreshToken) {
      setUserLoggedIn(true);
      setAccessToken(localStorage.accessToken);
      setRefreshToken(localStorage.refreshToken);
      setCurrentUsername(localStorage.currentUsername);
      setCurrentAccountType(localStorage.accountType);
    }
  }, []);

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
        userLoggedIn,
        setUserLoggedIn,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        currentUsername,
        setCurrentUsername,
        password,
        setPassword,
        currentAccountType,
        setCurrentAccountType,
      }}
    >
      <div className="container-fluid gx-0">
        <Routes>
          {/* shared routes both admin and users */}
          <Route
            exact
            path="/"
            element={
              <Navigate
                replace
                to={
                  userLoggedIn
                    ? currentAccountType === "admin"
                      ? "/admin-homepage"
                      : "/homepage"
                    : "/login"
                }
              />
            }
          />

          {/* Routes for User Accounts */}
          <Route path="/login" element={<PageLanding />} />
          <Route path="/create-account" element={<PageCreateAccount />} />
          <Route path="/homepage" element={<PageHome />} />
          <Route path="/search" element={<PageSearch />} />
          <Route path="/results" element={<PageResults />} />
          <Route path="/compare" element={<PageCompare />} />
          <Route path="/resources" element={<PageResources />} />
          <Route
            path="/user-saved-listings"
            element={<PageUserSavedListings />}
          />

          {/* Routes for Admin Accounts */}
          <Route path="/admin-homepage" element={<PageAdminHome />} />
          <Route
            path="/admin-user-accounts-overview"
            element={<PageAdminUserAccountsOverview />}
          />
          <Route
            path="/admin-user-accounts-requests"
            element={<PageAdminUserAccountsRequests />}
          />
          <Route
            path="/admin-accounts-overview"
            element={<PageAdminAccountsOverview />}
          />

          {/* Test Route */}
          <Route path="/test" element={<SignUp />} />
        </Routes>
      </div>
    </SomeContext.Provider>
  );
}

export default App;
