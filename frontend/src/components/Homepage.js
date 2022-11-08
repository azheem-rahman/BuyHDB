// Homepage Component to choose between showing Search options or Results
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import styles from "./NavBar.module.css";

const Homepage = () => {
  return (
    <div className="homepage-header">
      <h1>BuyResale</h1>
      <p>
        See past transaction records for resale HDB flats within the past 2
        years
      </p>
      <NavLink className="btn btn-primary" to="/Search">
        Start Search
      </NavLink>
    </div>
  );
};

export default Homepage;
