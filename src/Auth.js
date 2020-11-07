import React, { useContext } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { UserProfileContext } from "./UserProfileContext";

const Auth = () => {
  const [, , , , [activeComponent]] = useContext(UserProfileContext);
  //   const AuthComponents = { SignIn: <SignIn />, SignUp: <SignUp /> };
  return <>{activeComponent === "SignIn" ? <SignIn /> : <SignUp />}</>;
  //   AuthComponents[authComponent];
};

export default Auth;
