// Homepage Component to choose between showing Search options or Results
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import styles from "./NavBar.module.css";

const Homepage = () => {
  return (
    <div>
      <div className="homepage-header">
        <div className="navbar">
          <NavBar />
        </div>
        <div className="header">
          <h2>See Recent HDB Resale Transaction Records</h2>
          <NavLink className="btn btn-primary" to="/Search">
            Start Search
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
