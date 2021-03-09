import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./assets/css/Header.css";
const Header = () => {
  const [welcomeText, setWelcomeText] = useState("Welcome to BlurbSay!");

  setTimeout(() => setWelcomeText("BlurbSay"), 60000);
  return (
    <nav className="header">
      <h2 className="header__welcomeText">{welcomeText}</h2>
      <Link
        className="header__signout"
        onClick={() => {
          auth.signOut();
        }}
        to="/signin"
      >
        <button className="header__signout__btn">
          <ExitToAppIcon className="header__signout__icon" />
        </button>
        <p className="header__signout__text">Log out</p>
      </Link>
    </nav>
  );
};

export default Header;
