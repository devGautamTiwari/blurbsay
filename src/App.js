import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Chat from "./Chat";
import SignIn from "./SignIn";
import { auth } from "./firebase";
import { UserProfileProvider, UserProfileContext } from "./UserProfileContext";
import "./assets/css/App.css";

function APP() {
  const [[, setEmail], [, setUsername], [user, setUser]] = useContext(
    UserProfileContext
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setEmail(authUser.email);
        setUsername(authUser.displayName);
      } else {
        setUser(null);
        setUsername("");
        setEmail("");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Chat /> : <Redirect to="signin" />}
          </Route>
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </Router>
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
