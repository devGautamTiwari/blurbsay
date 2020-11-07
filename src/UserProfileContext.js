import React, { useState, createContext } from "react";

const UserProfileContext = createContext();

const UserProfileProvider = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [activeComponent, setActiveComponent] = useState("SignIn");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // const [canAccess, setCanAccess] = useState(false);

  return (
    <UserProfileContext.Provider
      value={[
        [email, setEmail],
        [password, setPassword],
        [username, setUsername],
        [user, setUser],
        [activeComponent, setActiveComponent],
        [buttonDisabled, setButtonDisabled],
        // [authComponent, setAuthComponent],
        // [canAccess, setCanAccess],
      ]}
    >
      {props.children}
    </UserProfileContext.Provider>
  );
};

export { UserProfileContext, UserProfileProvider };
