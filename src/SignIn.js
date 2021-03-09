import React, { useState, useEffect, useContext } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ErrorIcon from "@material-ui/icons/Error";
import { auth } from "./firebase";
import { UserProfileContext } from "./UserProfileContext";
import "./assets/css/SignIn.css";
import { Redirect } from "react-router-dom";
// import Loader from "./Loader";

function Copyright() {
  return <p>Copyright © BlurbSay {new Date().getFullYear()}.</p>;
}

export default function SignIn() {
  const [[email, setEmail], , [, handleLoading]] = useContext(
    UserProfileContext
  );
  const [error, setError] = useState([]);
  const handleError = (err) => {
    setError(err);
    setTimeout(() => setError({}), 10000);
  };
  const actionCodeSettings = {
    url: "https://blurbsay.web.app/signin",
    handleCodeInApp: true,
  };
  const [emailSent, setEmailSent] = useState(false);
  useEffect(() => {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      let email_ = window.localStorage.getItem("emailForSignIn");
      if (!email_) {
        email_ = prompt("Please provide your email for confirmation");
      }
      auth
        .signInWithEmailLink(email_, window.location.href)
        .then((authUser) => {
          window.localStorage.removeItem("emailForSignIn");
          return <Redirect to="/" />;
        })
        .catch((err) => handleError(err));
    }
  }, [email]);
  const signIn = (e) => {
    e.preventDefault();
    handleLoading(true);
    auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then((authUser) => {
        setError({});
        setEmailSent(true);
        window.localStorage.setItem("emailForSignIn", email);
        handleLoading(false);
      })
      .catch((err) => {
        handleError(err);
        handleLoading(false);
      });
  };
  return (
    <section className="signIn__container">
      <header>
        <span aria-hidden="true" className="signIn__icon__container">
          <LockOutlinedIcon />
        </span>
        <h1>Sign in to BlurbSay</h1>
      </header>
      <div>
        {/* <p className="error">
          <span aria-hidden="true" className="error__icon">
            <ErrorIcon />
          </span>
          <span className="error__text">
            A Network Error (Such As Timeout, Interrupted Connection Or
            Unreachable Host) Has Occurred.
          </span>
        </p> */}
        <p
          className="error"
          style={{
            display: `${error.message ? "flex" : "none"}`,
            height: "auto",
          }}
          aria-hidden={error.message ? false : true}
        >
          <span aria-hidden="true" className="error__icon">
            <ErrorIcon />
          </span>
          <span className="error__text">{error.message}</span>
        </p>
        <form
          className="signIn__form"
          onSubmit={(e) => {
            signIn(e);
          }}
        >
          <input
            type="email"
            className="signIn__email"
            placeholder="Enter your email address"
            required
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="email"
          />

          <button
            className="signIn__button"
            type="submit"
            // onClick={(e) => {
            //   signIn(e);
            // }}
          >
            {emailSent ? "Link Sent! Send Again?" : "Get Sign In Link"}
          </button>
        </form>
      </div>
      <div className="copyright">
        <Copyright />
      </div>
    </section>
  );
}
