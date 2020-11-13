import React from "react";
import { CircularProgress } from "@material-ui/core";
import "./assets/css/Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <CircularProgress className="loader__icon" />
    </div>
  );
};

export default Loader;
