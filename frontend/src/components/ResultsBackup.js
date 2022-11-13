// Results component to display result
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import SomeContext from "../context/some-context";
import Data from "./Data";
import testData from "./testData";

import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";

const Results = () => {
  const someCtx = useContext(SomeContext);

  let resultFound = false;

  const checkResultFound = () => {
    if (someCtx.post.length !== 0) {
      resultFound = true;
    }
  };

  const printHeaders = () => {
    const headerArr = [
      "Save",
      "No.",
      "Street Name",
      "Block",
      "Storey Range",
      "Floor Area sqm",
      "Resale Price",
      "Remaining Lease",
    ];
    return (
      <thead size="sm">
        <tr size="sm">
          {headerArr.map((item, index) => {
            return (
              <th size="sm" key={index}>
                {item}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  const printResults = () => {
    return someCtx.post.map((item, index) => {
      const resultArr = [
        index + 1,
        index + 1,
        item.street_name,
        item.block,
        item.storey_range,
        item.floor_area_sqm,
        item.resale_price,
        item.remaining_lease,
      ];
      return (
        <tbody size="sm">
          <tr size="sm">
            {resultArr.map((item, index) => {
              return (
                <td size="sm" key={index}>
                  {item}
                </td>
              );
            })}
          </tr>
        </tbody>
      );
    });
  };

  const searchAgain = () => {
    someCtx.setTown("");
    someCtx.setFlatType("");
    someCtx.setFlatModel("");
    someCtx.setSearchCriteria(null);
    someCtx.setPost([]);
  };

  return (
    <div>
      <div className="results-header">
        <h4>Search Results</h4>

        <hr />

        <div className="row">
          <div className="col">
            <p>Town</p>
          </div>
          <div className="col">
            <p>{someCtx.town}</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <p>Flat Type</p>
          </div>
          <div className="col">
            <p>{someCtx.flatType}</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <p>Flat Model</p>
          </div>
          <div className="col">
            <p>{someCtx.flatModel}</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <p>Total Records Found</p>
          </div>
          <div className="col">
            {someCtx.post.length !== 0 ? (
              <p>{someCtx.post.length} records</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <Data checkResultFound={checkResultFound()} />

      <Table striped size="sm">
        {resultFound ? printHeaders() : ""}
        {printResults()}
      </Table>

      <div className="row">
        {/* <div className="col d-flex justify-content-center">
          <Button variant="success">Show More</Button>
        </div> */}
        <div className="col d-flex justify-content-center">
          <NavLink to="/search">
            <Button variant="danger" onClick={searchAgain}>
              Search Again
            </Button>
          </NavLink>
        </div>
      </div>

      <br />
    </div>
  );
};

export default Results;
