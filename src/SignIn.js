import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { auth } from "./firebase";
import { UserProfileContext } from "./UserProfileContext";

import "./SignIn.css";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {/* <Link color="inherit" href="https://material-ui.com/"> */}
      Messenger003 {/* </Link>{" "} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#F9C784",
    color: "#000000",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [
    [email, setEmail],
    [password, setPassword],
    [,],
    [,],
    [, setActiveComponent],
    [buttonDisabled, setButtonDisabled],
  ] = useContext(UserProfileContext);
  const [error, setError] = useState([]);
  const signIn = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setError({});
        if (!authUser.user.emailVerified) {
          setError({
            message: `Please verify your email address at ${authUser.user.email}`,
          });
        } else {
          setPassword("");
          alert("Signing you in...");
        }
      })
      .catch((err) => setError(err));
    setTimeout(() => {
      setButtonDisabled(false);
    }, 3000);
  };

  return (
    <Container component="main" className="signin__container" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Typography color="error">{error.message}</Typography>

        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              signIn(e);
            }}
            disabled={buttonDisabled}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                variant="body2"
                onClick={() => {
                  setError({});
                  if (email) {
                    auth
                      .sendPasswordResetEmail(email)
                      .then(() =>
                        alert("Password reset email sent successfully")
                      )
                      .catch((err) => setError(err));
                  } else {
                    setError({ message: "You need to enter your email first" });
                  }
                }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                variant="body2"
                onClick={() => setActiveComponent("SignUp")}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
