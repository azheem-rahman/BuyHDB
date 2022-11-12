// Search component to take in user's input & selection choices
import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

import SomeContext from "../context/some-context";

import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/esm/FormLabel";

import styles from "./Search.module.css";

const Search = () => {
  const someCtx = useContext(SomeContext);

  //================================================//
  //=============== Reference Arrays ===============//
  //================================================//

  // array of all towns in SG, total 26 towns (tengah excluded)
  const townOptions = [
    "Ang Mo Kio",
    "Bedok",
    "Bishan",
    "Bukit Batok",
    "Bukit Merah",
    "Bukit Panjang",
    "Bukit Timah",
    "Central Area",
    "Choa Chu Kang",
    "Clementi",
    "Geylang",
    "Hougang",
    "Jurong East",
    "Jurong West",
    "Kallang Whampoa",
    "Marine Parade",
    "Pasir Ris",
    "Punggol",
    "Queenstown",
    "Sembawang",
    "Sengkang",
    "Serangoon",
    "Tampines",
    "Toa Payoh",
    "Woodlands",
    "Yishun",
  ];

  // array of all flat types in SG, total 7 flat types
  const flatTypeOptions = [
    "1 Room",
    "2 Room",
    "3 Room",
    "4 Room",
    "5 Room",
    "Executive",
    "Multi-Generation",
  ];

  // array of all flat model under each flat types, total 7 arrays
  const flatModelOptionsOneRoom = ["Improved"];

  const flatModelOptionsTwoRoom = [
    "2 Room",
    "DBSS",
    "Improved",
    "Model A",
    "Premium Apartment",
    "Standard",
  ];

  const flatModelOptionsThreeRoom = [
    "DBSS",
    "Improved",
    "Model A",
    "New Generation",
    "Premium Apartment",
    "Simplified",
    "Standard",
    "Terrace",
  ];

  const flatModelOptionsFourRoom = [
    "Adjoined Flat",
    "DBSS",
    "Improved",
    "Model A",
    "Model A2",
    "New Generation",
    "Premium Apartment",
    "Premium Apartment Loft",
    "Simplified",
    "Standard",
    "Terrace",
  ];

  const flatModelOptionsFiveRoom = [
    "3Gen",
    "Adjoined Flat",
    "DBSS",
    "Improved",
    "Improved-Maisonette",
    "Model A",
    "Model A-Maisonette",
    "Premium Apartment",
    "Premium Apartment Loft",
    "Standard",
  ];

  const flatModelOptionsExecutive = [
    "Adjoined Flat",
    "Apartment",
    "Maisonette",
    "Premium Apartment",
    "Premium Maisonette",
  ];

  const flatModelOptionsMultiGeneration = ["Multi Generation"];

  //=========================================//
  //=============== Functions ===============//
  //=========================================//

  const handleTownClick = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    const townSelected = event.target.value.replaceAll("_", " ");
    // replace underscore to whitespace in button id and then setTown with it
    someCtx.setTown(townSelected.toUpperCase());
  };

  const handleFlatTypeClick = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    const flatTypeSelected = event.target.value.replaceAll("_", " ");
    // replace underscore to whitespace in button id and then setTown with it
    someCtx.setFlatType(flatTypeSelected.toUpperCase());
  };

  const handleFlatModelClick = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    // replace underscore to whitespace in button id and then setTown with it
    someCtx.setFlatModel(event.target.value.replaceAll("_", " "));
  };

  useEffect(() => {
    if (someCtx.town && someCtx.flatType && someCtx.flatModel) {
      someCtx.setSearchCriteria(
        `${someCtx.town}, ${someCtx.flatType}, ${someCtx.flatModel}`
      );
    }
  });

  const displayFlatModelOptions = () => {
    switch (someCtx.flatType) {
      case "1 ROOM":
        return flatModelOptionsOneRoom.map((item, index) => {
          return <option key={index}>{item}</option>;
        });
      case "2 ROOM":
        return flatModelOptionsTwoRoom.map((item, index) => {
          return <option key={index}>{item}</option>;
        });
      case "3 ROOM":
        return flatModelOptionsThreeRoom.map((item, index) => {
          return <option key={index}>{item}</option>;
        });
      case "4 ROOM":
        return flatModelOptionsFourRoom.map((item, index) => {
          return <option key={index}>{item}</option>;
        });
      case "5 ROOM":
        return flatModelOptionsFiveRoom.map((item, index) => {
          return <option key={index}>{item}</option>;
        });
      case "EXECUTIVE":
        return flatModelOptionsExecutive.map((item, index) => {
          return <option key={index}>{item}</option>;
        });
      case "MULTI-GENERATION":
        return flatModelOptionsMultiGeneration.map((item, index) => {
          return <option key={index}>{item}</option>;
        });
    }
  };

  return (
    <div>
      <div className="container">
        <Form className={styles.searchForm}>
          <Form.Group className="mb-3" controlId="formSelectTown">
            <div className="row">
              <div className="col">
                <Form.Label>Select Town</Form.Label>
              </div>
              <div className="col">
                <Form.Select size="sm" onChange={handleTownClick}>
                  <option> </option>
                  {townOptions.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col">
                <FormLabel>Select Flat Type</FormLabel>
              </div>
              <div className="col">
                <Form.Select size="sm" onChange={handleFlatTypeClick}>
                  <option> </option>
                  {flatTypeOptions.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
                </Form.Select>
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col">
                <FormLabel>Select Flat Model</FormLabel>
              </div>
              <div className="col">
                <Form.Select size="sm" onChange={handleFlatModelClick}>
                  <option> </option>
                  {someCtx.flatType ? displayFlatModelOptions() : ""}
                </Form.Select>
              </div>
            </div>
            <br />
          </Form.Group>
        </Form>

        {someCtx.searchCriteria ? <Navigate to="/Results" /> : ""}
      </div>
    </div>
  );
};

export default Search;
