import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/Homepage"
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/Search"
            >
              Search
            </NavLink>
          </li>

          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/Compare"
            >
              Compare
            </NavLink>
          </li>

          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/Resources"
            >
              Resources
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
