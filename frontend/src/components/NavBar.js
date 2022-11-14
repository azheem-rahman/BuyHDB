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
        <Navbar.Brand href="/homepage">
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

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}

            <NavDropdown
              title={`Hi, ${someCtx.currentUsername}`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/user-saved-listings">
                View Saved Listings
              </NavDropdown.Item>

              <NavDropdown.Divider />

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
