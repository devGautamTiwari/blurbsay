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
import db, { auth } from "./firebase";
import { UserProfileContext } from "./UserProfileContext";
import "./SignUp.css";
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [
    [email, setEmail],
    [password, setPassword],
    [username, setUsername],
    [,],
    [, setActiveComponent],
    [buttonDisabled, setButtonDisabled],
  ] = useContext(UserProfileContext);
  const [error, setError] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);

  const signUp = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (username === "") {
      setError({ message: "Username is required." });
    } else if (!usernameExists) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          authUser.user.updateProfile({
            displayName: username,
          });
          db.collection("usernames").add({
            username: username,
          });
          alert("User created successfully!");
        })
        .catch((err) => setError(err));
      setPassword("");
    }
    setTimeout(() => {
      setButtonDisabled(false);
    }, 3000);
  };

  const checkUsername = (e) => {
    setUsernameExists(false);
    setError({});
    db.collection("usernames")
      .where("username", "==", e.target.value)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(() => {
          setError({
            message: "Username already taken.",
          });
          setUsernameExists(true);
          return true;
        });
      })
      .catch((err) => setError(err));
    // auth.getUsers([{ username: username }]).then((usersResult) => {
    //   usersResult.users.forEach((userRecord) => {
    //     setusernameExists(false);
    //     return false;
    //   });
    // });
  };

  return (
    <Container component="main" className="signup__container" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Typography color="error">{error.message}</Typography>

        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                error={usernameExists ? true : false}
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  checkUsername(e);
                }}
                // onBlur={(e) => checkUsername(e)}
              />
            </Grid>
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
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              signUp(e);
            }}
            disabled={buttonDisabled}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                variant="body2"
                onClick={() => setActiveComponent("SignIn")}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
