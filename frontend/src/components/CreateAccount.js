import React, { useRef, useState } from "react";
import { Form, FormLabel } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const CreateAccount = () => {
  const inputUsernameRef = useRef();
  const inputPasswordRef = useRef();
  const inputConfirmPasswordRef = useRef();

  const inputNameRef = useRef();
  const inputCurrentResidentialTownRef = useRef();
  const inputCurrentResidentialFlatTypeRef = useRef();
  const inputCurrentResidentialFlatModelRef = useRef();
  const inputCurrentMonthlyCombinedIncomeRef = useRef();
  const inputCurrentYoungerAgeRef = useRef();

  const [townSelected, setTownSelected] = useState("");
  const [flatTypeSelected, setFlatTypeSelected] = useState("");
  const [flatModelSelected, setFlatModelSelected] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [successfulCreateAccount, setSuccessfulCreateAccount] = useState(null);

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

  const handleTownSelect = (event) => {
    event.preventDefault();
    console.log(`Town Selected: ${event.target.value.toUpperCase()}`);
    setTownSelected(event.target.value.toUpperCase());
  };

  const handleFlatTypeSelect = (event) => {
    event.preventDefault();
    console.log(`Flat Type Selected: ${event.target.value.toUpperCase()}`);
    setFlatTypeSelected(event.target.value.toUpperCase());
  };

  const handleFlatModelSelect = (event) => {
    event.preventDefault();
    console.log(`Flat Model Selected: ${event.target.value}`);
    setFlatModelSelected(event.target.value);
  };

  const displayFlatModelOptions = () => {
    switch (flatTypeSelected) {
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

  const handleCreateAccount = (event) => {
    event.preventDefault();
    setSubmitted(true);

    passCreateAccountToBackend();
  };

  const passCreateAccountToBackend = async () => {
    const url = "http://127.0.0.1:5001/user-create-account";
    const body = {
      username: inputUsernameRef.current.value,
      password: inputPasswordRef.current.value,
    };

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const response = await res.json();

      console.log(response);

      // successful create account to backend, proceed to create account details to backend
      if (response.status === "ok") {
        passAccountDetailsToBackend();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const passAccountDetailsToBackend = async () => {
    const url = "http://127.0.0.1:5001/user-create-details";
    const body = {
      username: inputUsernameRef.current.value,
      givenName: inputNameRef.current.value,
      currentTown: inputCurrentResidentialTownRef.current.value,
      flatType: inputCurrentResidentialFlatTypeRef.current.value,
      flatModel: inputCurrentResidentialFlatModelRef.current.value,
      monthlyCombinedIncome: inputCurrentMonthlyCombinedIncomeRef.current.value,
      youngerAge: inputCurrentYoungerAgeRef.current.value,
    };

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const response = await res.json();

      console.log(response);

      // successful create account and create account details to backend
      // proceed to homepage
      if (response.status === "ok") {
        setSuccessfulCreateAccount(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container">
      <div className="row centered">
        <h4>Create an account</h4>
      </div>

      <div className="row centered">
        <p>Account Details</p>
      </div>

      <form onSubmit={handleCreateAccount}>
        <div className="row">
          <label>Username</label>
          <input
            id="username"
            type="username"
            ref={inputUsernameRef}
            placeholder="Max 20 characters"
          />
        </div>

        <div className="row">
          <label>Password</label>
          <input
            id="password"
            type="password"
            ref={inputPasswordRef}
            placeholder="Max 20 characters"
          />
        </div>

        <div className="row">
          <label>Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            ref={inputConfirmPasswordRef}
          />
        </div>

        <br />

        <div className="row centered">
          <p>Personal Details</p>
        </div>

        <div className="row">
          <div className="col-sm">
            <label>Name</label>
          </div>

          <div className="col-sm">
            <input
              id="name"
              type="name"
              ref={inputNameRef}
              placeholder="Max 20 characters"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <FormLabel>Current Residential Town</FormLabel>
          </div>
          <div className="col-sm">
            <Form.Select
              size="sm"
              onChange={handleTownSelect}
              ref={inputCurrentResidentialTownRef}
            >
              <option> </option>
              {townOptions.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </Form.Select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <FormLabel>Current Residential Flat Type</FormLabel>
          </div>
          <div className="col-sm">
            <Form.Select
              size="sm"
              onChange={handleFlatTypeSelect}
              ref={inputCurrentResidentialFlatTypeRef}
            >
              <option> </option>
              {flatTypeOptions.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </Form.Select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <FormLabel>Current Residential Flat Model</FormLabel>
          </div>
          <div className="col-sm">
            <Form.Select
              size="sm"
              onChange={handleFlatModelSelect}
              ref={inputCurrentResidentialFlatModelRef}
            >
              <option> </option>
              {flatTypeSelected ? displayFlatModelOptions() : ""}
            </Form.Select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <FormLabel>Current Monthly Combined Income</FormLabel>
          </div>
          <div className="col-sm">
            <input
              id="current-monthly-combined-income"
              type="number"
              ref={inputCurrentMonthlyCombinedIncomeRef}
              placeholder="To nearest cents"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <FormLabel>Current Younger Age</FormLabel>
          </div>
          <div className="col-sm">
            <input
              id="current-younger-age"
              type="number"
              ref={inputCurrentYoungerAgeRef}
              placeholder="Max 99"
            />
          </div>
        </div>

        <div className="row">
          <button type="submit">Sign up</button>
        </div>
      </form>
      {successfulCreateAccount && <Navigate to="/Homepage" />}
    </div>
  );
};

export default CreateAccount;
