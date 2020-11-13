import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { auth } from "./firebase";
import { UserProfileContext } from "./UserProfileContext";
import "./assets/css/SignIn.css";
import { Redirect } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "}
      BlurbSay
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
    backgroundColor: "#ffffff",
    color: "#333333",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [[email, setEmail]] = useContext(UserProfileContext);
  const [error, setError] = useState([]);
  const actionCodeSettings = {
    url: "https://blurbsay.web.app/signin",
    handleCodeInApp: true,
  };
  const [emailSent, setEmailSent] = useState(false);
  useEffect(() => {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      let email_ = window.localStorage.getItem("emailForSignIn");
      console.log(email);
      if (!email_) {
        email_ = prompt("Please provide your email for confirmation");
      }
      auth
        .signInWithEmailLink(email_, window.location.href)
        .then((authUser) => {
          window.localStorage.removeItem("emailForSignIn");
          return <Redirect to="/" />;
        })
        .catch((err) => setError(err));
    }
  }, []);
  const signIn = (e) => {
    e.preventDefault();
    auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then((authUser) => {
        setError({});
        setEmailSent(true);
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch((err) => setError(err));
  };

  return (
    <Container component="main" className="signin__container" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to BlurbSay
        </Typography>
        <Typography color="error">{error.message}</Typography>

        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className="signin__email"
                variant="outlined"
                placeholder="Email Address"
                required
                fullWidth
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Button
              className="signin__button"
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e) => {
                signIn(e);
              }}
            >
              {emailSent ? "Link Sent! Send Again?" : "Get Sign In Link"}
            </Button>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
