import React, { useEffect, useContext } from "react";
import Chat from "./Chat";
import Auth from "./Auth";
import { auth } from "./firebase";
import { UserProfileProvider, UserProfileContext } from "./UserProfileContext";
import "./App.css";

function APP() {
  const [
    [, setEmail],
    ,
    [, setUsername],
    [user, setUser],
    [activeComponent, setActiveComponent],
  ] = useContext(UserProfileContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        if (authUser.emailVerified) {
          setUser(authUser);
          setEmail(authUser.email);
          setUsername(authUser.displayName);
          setActiveComponent("Chat");
        } else {
          authUser
            .sendEmailVerification()
            .then(() => {
              alert(`Please verify your email at ${authUser.email}`);
            })
            .catch((err) => alert(err.message));
          auth.signOut();
        }
      } else {
        setUser(null);
        setUsername("");
        setEmail("");
        setActiveComponent("SignIn");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="App">
      {activeComponent === "Chat" ? <Chat /> : <Auth />}
    </div>
  );
}
const App = () => {
  return (
    <UserProfileProvider>
      <APP />
    </UserProfileProvider>
  );
};
export default App;
