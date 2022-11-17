import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import BuyHDBLogo2 from "../assets/BuyHDBLogo2.jpg";
import LoginCreateAccountSideImage from "../assets/LoginCreateAccountSideImage.jpg";

import { useState, useContext, useRef } from "react";
import { Navigate, NavLink } from "react-router-dom";

import SomeContext from "../context/some-context";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const theme = createTheme();

const SignInSide = () => {
  const someCtx = useContext(SomeContext);

  const inputUsernameRef = useRef();
  const inputPasswordRef = useRef();

  const [showPassword, setShowPassword] = useState(false);

  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

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

  const passLoginDetailsToBackend = async () => {
    const url = "http://127.0.0.1:5001/login";
    const body = {
      username: inputUsernameRef.current.value,
      password: inputPasswordRef.current.value,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const response = await res.json();

      console.log(response);

      // successful login
      if (response.status === "ok") {
        someCtx.setUserLoggedIn(true);

        localStorage.setItem("currentUsername", response.username);
        someCtx.setCurrentUsername(response.username);

        // to store access token from login response to localstorage
        localStorage.setItem("accessToken", response.accessToken);
        someCtx.setAccessToken(response.accessToken);

        // to store refresh token from login response to localstorage
        localStorage.setItem("refreshToken", response.refreshToken);
        someCtx.setRefreshToken(response.refreshToken);

        // if account is Admin
        if (response.accountType === "user") {
          localStorage.setItem("accountType", response.accountType);
          someCtx.setCurrentAccountType("user");
        }

        // if account is User
        if (response.accountType === "admin") {
          localStorage.setItem("accountType", response.accountType);
          someCtx.setCurrentAccountType("admin");
        }
      }
      // unsuccessful login
      else {
        setIncorrectCredentials(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const data = new FormData(event.currentTarget);
    // console.log({
    //   username: data.get("username"),
    //   password: data.get("password"),
    // });

    // console.log(inputUsernameRef.current.value);
    // console.log(inputPasswordRef.current.value);

    passLoginDetailsToBackend();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LoginCreateAccountSideImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={BuyHDBLogo2} style={{ height: 100 }} />
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {incorrectCredentials ? (
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
                  helperText="Incorrect username"
                />
              ) : (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  id="username"
                  autoFocus
                  inputRef={inputUsernameRef}
                />
              )}

              {incorrectCredentials ? (
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
                  helperText="Incorrect password"
                />
              ) : (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
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
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <NavLink to="/create-account" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* to redirect to user homepage if user account */}
      {someCtx.userLoggedIn && someCtx.currentAccountType === "user" && (
        <Navigate to="/homepage" />
      )}

      {/* to redirect to admin homepage if admin account */}
      {someCtx.userLoggedIn && someCtx.currentAccountType === "admin" && (
        <Navigate to="/admin-homepage" />
      )}
    </ThemeProvider>
  );
};

export default SignInSide;
