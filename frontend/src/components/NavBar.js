import React, { useState, useContext } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import styles from "./NavBar.module.css";

import BuyHDBLogo2 from "../assets/BuyHDBLogo2.jpg";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SomeContext from "../context/some-context";

import RequestDeleteAccountModal from "./RequestDeleteAccountModal";

const NavBar = () => {
  const someCtx = useContext(SomeContext);

  const [requestDeleteAccountModalOpen, setRequestDeleteAccountModalOpen] =
    useState(false);

  const [requestDeleteAccountSuccess, setRequestDeleteAccountSuccess] =
    useState(false);

  const handleRequestDeleteAccountClick = () => {
    // setRequestDeleteAccountModalOpen to true so that modal pops up
    setRequestDeleteAccountModalOpen(true);
  };

  const handleRequestDeleteAccountModalConfirm = () => {
    // setRequestDeleteAccountModalOpen to false so that modal closes
    setRequestDeleteAccountModalOpen(false);

    // update backend to send in request to delete user account
    requestDeleteAccountToBackend();
  };

  const handleRequestDeleteAccountModalCancel = () => {
    // setRequestDeleteAccountModalOpen to false so that modal closes
    setRequestDeleteAccountModalOpen(false);
  };

  const requestDeleteAccountToBackend = async () => {
    try {
      const url = "http://127.0.0.1:5001/user-create-delete-request";

      const body = {
        username: someCtx.currentUsername,
      };

      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const response = await res.json();
      console.log(response);

      // log user out of homepage
      setRequestDeleteAccountSuccess(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogOut = () => {
    // clear local storage
    localStorage.clear();

    // clear data in context store
    someCtx.setUserLoggedIn(false);
    someCtx.setCurrentUsername("");
    someCtx.setAccessToken("");
    someCtx.setRefreshToken("");
    someCtx.setCurrentAccountType("");
  };

  return (
    <Navbar className="navbar-static-top" expand="sm" variant="light">
      <Container>
        {requestDeleteAccountModalOpen && (
          <RequestDeleteAccountModal
            title="Delete Account Request"
            message="We're sad to see you go! You have requested to delete your account with BuyHDB. 
            Please click 'Confirm' to proceed."
            confirmClicked={handleRequestDeleteAccountModalConfirm}
            cancel={handleRequestDeleteAccountModalCancel}
          ></RequestDeleteAccountModal>
        )}
        <Navbar.Brand as={Link} to="/homepage">
          <img className={styles.navbarbuyhdblogo} src={BuyHDBLogo2} alt="" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/search">
              Search
            </Nav.Link>
            <Nav.Link as={Link} to="/resources">
              Resources
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/calculator">
              Calculator
            </Nav.Link> */}

            <NavDropdown
              title={`Hi, ${someCtx.currentUsername}`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/user-saved-listings">
                View Saved Listings
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleRequestDeleteAccountClick}>
                Request Delete Account
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item as={Link} to="/" onClick={handleLogOut}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {requestDeleteAccountSuccess && <Navigate to="/login" />}
    </Navbar>
  );
};

export default NavBar;
