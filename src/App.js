import React, { useEffect, Suspense, lazy, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { auth } from "./firebase";
import { UserProfileProvider, UserProfileContext } from "./UserProfileContext";
import "./assets/css/App.css";
import Loader from "./Loader";

const Chat = lazy(() => import("./Chat"));
const SignIn = lazy(() => import("./SignIn"));

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
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/">
              {user ? <Chat /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path="/signin">
              {!user ? <SignIn /> : <Redirect to="/" />}
            </Route>
            <Redirect to="/" />
          </Switch>
        </Suspense>
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
