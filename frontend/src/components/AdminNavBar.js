import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

import BuyHDBLogo2 from "../assets/BuyHDBLogo2.jpg";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SomeContext from "../context/some-context";

const NavBar = () => {
  const someCtx = useContext(SomeContext);

  return (
    <Navbar className="navbar-static-top" expand="sm" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/admin-homepage">
          <img className={styles.navbarbuyhdblogo} src={BuyHDBLogo2} alt="" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/admin-user-accounts-overview">
              User Accounts
            </Nav.Link>
            <Nav.Link as={Link} to="/admin-user-accounts-requests">
              Requests
            </Nav.Link>
            <Nav.Link as={Link} to="/admin-accounts-overview">
              Administrator
            </Nav.Link>

            <NavDropdown
              title={`Hi, ${someCtx.currentUsername}`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
