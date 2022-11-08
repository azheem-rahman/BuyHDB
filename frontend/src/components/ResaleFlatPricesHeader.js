import React from "react";
import styles from "./ResaleFlatPricesHeader.module.css";

const ResaleFlatPricesHeader = () => {
  return (
    <div className="container">
      <div className={styles.resale_flat_prices_header}>
        <h4>Resale Flat Prices</h4>
        <p>
          Check the transacted prices for resale flats. The data is based on
          registered resale applications and is updated daily.
        </p>
      </div>
    </div>
  );
};

export default ResaleFlatPricesHeader;
