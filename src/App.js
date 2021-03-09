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
import Loader from "./Loader";

function APP() {
  const [[, setEmail], [user, setUser], [loading, handleLoading]] = useContext(
    UserProfileContext
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      handleLoading(true);
      if (authUser) {
        setUser(authUser);
        setEmail(authUser.email);
        // return <Redirect to="/" />;
      } else {
        setUser(null);
        setEmail("");
        // return <Redirect to="/signin" />;
      }
      handleLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
  return (
    <div className="App">
      {loading && <Loader />}
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Chat /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/signin">
            {!user ? <SignIn /> : <Redirect to="/" />}
          </Route>
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
