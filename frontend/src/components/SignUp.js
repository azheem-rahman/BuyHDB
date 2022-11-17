import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import BuyHDBLogo2 from "../assets/BuyHDBLogo2.jpg";
import { NavLink, Navigate } from "react-router-dom";

import { useState, useContext, useRef } from "react";
import SomeContext from "../context/some-context";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const theme = createTheme();

const SignUp = () => {
  const someCtx = useContext(SomeContext);

  const inputUsernameRef = useRef();
  const inputPasswordRef = useRef();

  const [showPassword, setShowPassword] = useState();

  const [accountLoginCreated, setAccountLoginCreated] = useState(false);
  const [accountDetailsCreated, setAccountDetailsCreated] = useState(false);

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
  const [incorrectLoginDetails, setIncorrectLoginDetails] = useState(false);
  const [errorUsernameTaken, setErrorUsernameTaken] = useState(false);
  const [incorrectPersonalDetails, setIncorrectPersonalDetails] =
    useState(false);
  const [errorNumbersOnly, setErrorNumbersOnly] = useState(false);
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

  const handleClickShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          return (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          );
        });
      case "2 ROOM":
        return flatModelOptionsTwoRoom.map((item, index) => {
          return (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          );
        });
      case "3 ROOM":
        return flatModelOptionsThreeRoom.map((item, index) => {
          return (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          );
        });
      case "4 ROOM":
        return flatModelOptionsFourRoom.map((item, index) => {
          return (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          );
        });
      case "5 ROOM":
        return flatModelOptionsFiveRoom.map((item, index) => {
          return (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          );
        });
      case "EXECUTIVE":
        return flatModelOptionsExecutive.map((item, index) => {
          return (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          );
        });
      case "MULTI-GENERATION":
        return flatModelOptionsMultiGeneration.map((item, index) => {
          return (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          );
        });
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  const handleCreateAccount = (event) => {
    event.preventDefault();
    setSubmitted(true);

    console.log(inputUsernameRef.current.value);
    console.log(inputPasswordRef.current.value);

    // if account has been created but errors in personal details,
    // skip creating personal account again to prevent duplicate,
    // proceed to passing account details to backend
    if (accountLoginCreated) {
      passAccountDetailsToBackend();
    } else {
      passCreateAccountToBackend();
    }
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
      // unsuccessful create account to backend, highlight error at input box
      if (response.status === "ok") {
        setAccountLoginCreated(true);
        passAccountDetailsToBackend();

        someCtx.setCurrentUsername(response.username);
        localStorage.setItem("currentUsername", response.username);

        someCtx.setAccessToken(response.accessToken);
        // to store access token from login response to localstorage
        localStorage.setItem("accessToken", response.accessToken);

        someCtx.setRefreshToken(response.refreshToken);
        // to store refresh token from login response to localstorage
        localStorage.setItem("refreshToken", response.refreshToken);

        someCtx.setCurrentAccountType("user");
        localStorage.setItem("accountType", "user");
      } else {
        if (response.message === "username taken") {
          setErrorUsernameTaken(true);
          setIncorrectLoginDetails(true);
        } else {
          setIncorrectLoginDetails(true);
        }
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

        someCtx.setUserLoggedIn(true);
      } else {
        if (
          response.errorMessage.includes(
            "invalid input syntax for type numeric:"
          )
        ) {
          setErrorNumbersOnly(true);
          setIncorrectPersonalDetails(true);
        } else {
          setIncorrectPersonalDetails(true);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={BuyHDBLogo2} style={{ height: 100 }} />
          <Typography component="h1" variant="h5" style={{ marginBottom: 30 }}>
            Sign up
          </Typography>
          <Typography component="h1" variant="subtitle1">
            Login Details
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleCreateAccount}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {incorrectLoginDetails ? (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    error
                    name="username"
                    id="username"
                    label="Username"
                    autoFocus
                    inputRef={inputUsernameRef}
                    helperText={
                      errorUsernameTaken
                        ? "Username not available"
                        : "Max 20 characters"
                    }
                  />
                ) : (
                  <TextField
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    inputRef={inputUsernameRef}
                    helperText="Max 20 characters"
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                {incorrectLoginDetails ? (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    error
                    name="password"
                    id="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    inputRef={inputPasswordRef}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword && <Visibility />}
                            {!showPassword && <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    helperText="Max 20 characters"
                  />
                ) : (
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    inputRef={inputPasswordRef}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword && <Visibility />}
                            {!showPassword && <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    helperText="Max 20 characters"
                  />
                )}
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="subtitle1">
                  Personal Details
                </Typography>
              </Grid>

              <Grid item xs={12}>
                {incorrectPersonalDetails ? (
                  <TextField
                    required
                    fullWidth
                    error
                    name="given-name"
                    id="given-name"
                    label="First Name"
                    inputRef={inputNameRef}
                    helperText="Max 20 characters"
                  />
                ) : (
                  <TextField
                    required
                    fullWidth
                    name="given-name"
                    label="First Name"
                    id="given-name"
                    inputRef={inputNameRef}
                    helperText="Max 20 characters"
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                {incorrectPersonalDetails ? (
                  <TextField
                    name="current-town"
                    required
                    fullWidth
                    error
                    id="current-town"
                    label="Current Residential Town"
                    inputRef={inputCurrentResidentialTownRef}
                    onChange={handleTownSelect}
                    defaultValue=""
                    select
                    helperText="Select 1 Town"
                  >
                    {townOptions.map((town, index) => {
                      return (
                        <MenuItem value={town} key={index}>
                          {town}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                ) : (
                  <TextField
                    name="current-town"
                    required
                    fullWidth
                    id="current-town"
                    label="Current Residential Town"
                    inputRef={inputCurrentResidentialTownRef}
                    onChange={handleTownSelect}
                    defaultValue=""
                    select
                  >
                    {townOptions.map((town, index) => {
                      return (
                        <MenuItem value={town} key={index}>
                          {town}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              </Grid>

              <Grid item xs={12}>
                {incorrectPersonalDetails ? (
                  <TextField
                    name="current-flat-type"
                    required
                    fullWidth
                    error
                    id="current-flat-type"
                    label="Current Flat Type"
                    inputRef={inputCurrentResidentialFlatTypeRef}
                    onChange={handleFlatTypeSelect}
                    defaultValue=""
                    select
                    helperText="Select 1 Flat Type"
                  >
                    {flatTypeOptions.map((flatType, index) => {
                      return (
                        <MenuItem value={flatType} key={index}>
                          {flatType}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                ) : (
                  <TextField
                    name="current-flat-type"
                    required
                    fullWidth
                    id="current-flat-type"
                    label="Current Flat Type"
                    inputRef={inputCurrentResidentialFlatTypeRef}
                    onChange={handleFlatTypeSelect}
                    defaultValue=""
                    select
                  >
                    {flatTypeOptions.map((flatType, index) => {
                      return (
                        <MenuItem value={flatType} key={index}>
                          {flatType}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              </Grid>

              <Grid item xs={12}>
                {incorrectPersonalDetails ? (
                  <TextField
                    name="current-flat-model"
                    required
                    fullWidth
                    error
                    id="current-flat-model"
                    label="Current Flat Model"
                    inputRef={inputCurrentResidentialFlatModelRef}
                    onChange={handleFlatModelSelect}
                    defaultValue=""
                    select
                    helperText="Select 1 Flat Model"
                  >
                    <MenuItem></MenuItem>
                    {flatTypeSelected ? displayFlatModelOptions() : ""}
                  </TextField>
                ) : (
                  <TextField
                    name="current-flat-model"
                    required
                    fullWidth
                    id="current-flat-model"
                    label="Current Flat Model"
                    inputRef={inputCurrentResidentialFlatModelRef}
                    onChange={handleFlatModelSelect}
                    defaultValue=""
                    select
                  >
                    <MenuItem></MenuItem>
                    {flatTypeSelected ? displayFlatModelOptions() : ""}
                  </TextField>
                )}
              </Grid>

              <Grid item xs={12}>
                {incorrectPersonalDetails ? (
                  <TextField
                    required
                    fullWidth
                    error
                    name="current-monthly-combined-income"
                    label="Current Monthly Combined Income"
                    id="current-monthly-combined-income"
                    inputRef={inputCurrentMonthlyCombinedIncomeRef}
                    helperText={
                      errorNumbersOnly
                        ? "Enter numbers only"
                        : "Combined household income"
                    }
                  />
                ) : (
                  <TextField
                    required
                    fullWidth
                    name="current-monthly-combined-income"
                    label="Current Monthly Combined Income"
                    id="current-monthly-combined-income"
                    inputRef={inputCurrentMonthlyCombinedIncomeRef}
                    helperText="Combined household income"
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                {incorrectPersonalDetails ? (
                  <TextField
                    required
                    fullWidth
                    error
                    name="current-younger-age"
                    label="Current Younger Age"
                    id="current-younger-age"
                    inputRef={inputCurrentYoungerAgeRef}
                    helperText={
                      errorNumbersOnly
                        ? "Enter numbers only"
                        : "Input the younger age between you / spouse"
                    }
                  />
                ) : (
                  <TextField
                    required
                    fullWidth
                    name="current-younger-age"
                    label="Current Younger Age"
                    id="current-younger-age"
                    inputRef={inputCurrentYoungerAgeRef}
                    helperText="Input the younger age between you / spouse"
                  />
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login" variant="body2">
                  {"Already have an account? Sign in"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      {successfulCreateAccount && <Navigate to="/homepage" />}
    </ThemeProvider>
  );
};

export default SignUp;
