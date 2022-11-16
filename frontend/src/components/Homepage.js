// Homepage Component to choose between showing Search options or Results
import React, { useState } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import SomeContext from "../context/some-context";
import NavBar from "./NavBar";
import styles from "./NavBar.module.css";

import HeaderBackground from "../assets/HeaderBackground.jpg";

const Homepage = () => {
  const someCtx = useContext(SomeContext);

  return (
    <div>
      <NavBar />
      <div>
        <div
          className="homepage-header"
          style={{ margin: 0, padding: 0 }}
        ></div>

        <div className="container">
          <br />

          <div className="row">
            <h3>Recent News and Updates</h3>
          </div>

          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">
                    Record Deficit of $4.367 billion Incurred by HDB in FY 2021
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">31 Oct 2022</h6>
                  <p className="card-text">
                    In the Financial Year (FY) 2021, HDB incurred a record net
                    deficit of $4.367 billion before government grant.
                  </p>
                  <a
                    href="https://www.hdb.gov.sg/about-us/news-and-publications/press-releases/31102022-HDB-Annual-Report-FY2021"
                    className="card-link"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">
                    Upcoming Flat Supply and 3rd Quarter 2022 Public Housing
                    Data
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">28 Oct 2022</h6>
                  <p className="card-text">
                    This press release provides information on the upcoming flat
                    supply and the HDB resale and rental market in 3rd Quarter
                    2022.
                  </p>
                  <a
                    href="https://www.hdb.gov.sg/about-us/news-and-publications/press-releases/28102022-3Q2022-RPI"
                    className="card-link"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">
                    HDB Issues Rated Fixed Rate Green Notes
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">26 Oct 2022</h6>
                  <p className="card-text">
                    HDB has issued S$1.2 billion, 5-year Fixed Rate Green Notes
                    under its S$32 billion Multicurrency Medium Term Note
                    ("MTN") Programme.
                  </p>
                  <a
                    href="https://www.hdb.gov.sg/about-us/news-and-publications/press-releases/26102022-HDB-Issues-Rated-Fixed-Rate-Green-Notes"
                    className="card-link"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">
                    HDB to Offer Some 3,000 flats in Eastern Half of Ulu Pandan
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">13 Oct 2022</h6>
                  <p className="card-text">
                    HDB will launch about 3,000 Build-to-Order (BTO) flats
                    across three housing projects in the eastern half of Ulu
                    Pandan.
                  </p>
                  <a
                    href="https://www.hdb.gov.sg/about-us/news-and-publications/press-releases/13102022-First-of-Three-Ulu-Pandan-Housing-Projects-to-Launch-Next-Month"
                    className="card-link"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">
                    Four public housing estates zoned as car-lite areas
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">05 Oct 2022</h6>
                  <p className="card-text">
                    In support of Singapore’s move towards a more sustainable
                    and car-lite city, the Government has been taking active
                    steps to encourage this shift.
                  </p>
                  <a
                    href="https://www.hdb.gov.sg/about-us/news-and-publications/press-releases/05102055-Four-public-housing-estates-zoned-as-car-lite-areas"
                    className="card-link"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">
                    Flash Estimate Of 3rd Quarter 2022 Resale Price Index
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">03 Oct 2022</h6>
                  <p className="card-text">
                    HDB’s flash estimate of the 3rd Quarter 2022 Resale Price
                    Index (RPI) is 167.8, an increase of 2.4% over that in 2nd
                    Quarter 2022.
                  </p>
                  <a
                    href="https://www.hdb.gov.sg/about-us/news-and-publications/press-releases/03102022-Flash-Estimate-Of-3rd-Quarter-2022-Resale-Price-Index"
                    className="card-link"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer d-flex align-items-end">
          <div className="container centered">
            <h6>Created by Azheem</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

{
  /* <div className="navbar">
<NavBar />
</div>
<div className="homepage-header">
<h2>See Recent HDB Resale Transaction Records</h2>
<NavLink className="btn btn-primary" to="/Search">
  Start Search
</NavLink>
</div> */
}
