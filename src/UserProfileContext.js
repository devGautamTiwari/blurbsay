import React, { useState, createContext } from "react";

const UserProfileContext = createContext();

const UserProfileProvider = (props) => {
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLoading = (milliseconds = 2000) => {
    setLoading(true);
    setTimeout(() => setLoading(false), milliseconds);
  };
  // const [activeComponent, setActiveComponent] = useState("SignIn");
  // const [canAccess, setCanAccess] = useState(false);

  return (
    <UserProfileContext.Provider
      value={[
        [email, setEmail],
        [user, setUser],
        [loading, handleLoading],
        // [authComponent, setAuthComponent],
        // [canAccess, setCanAccess],
      ]}
    >
      {props.children}
    </UserProfileContext.Provider>
  );
};

export { UserProfileContext, UserProfileProvider };
