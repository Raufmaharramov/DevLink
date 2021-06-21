/* eslint-disable default-case */
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";
import FlashMessages from "./components/FlashMessages";
import { useImmerReducer } from "use-immer";
import "./App.css";
function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("DevAppToken")),
    flashMessage: [],
    user: {
      username: localStorage.getItem("DevAppUser"),
      token: localStorage.getItem("DevAppToken"),
      avatar: localStorage.getItem("DevAppAvatar")
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "flashMessage":
        draft.flashMessage.push(action.value);
        return;
      case "login":
        draft.loggedIn = true;
        draft.user = action.value;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("DevAppAvatar", state.user.avatar);
      localStorage.setItem("DevAppToken", state.user.token);
      localStorage.setItem("DevAppUser", state.user.username);
    } else {
      localStorage.removeItem("DevAppAvatar");
      localStorage.removeItem("DevAppToken");
      localStorage.removeItem("DevAppUser");
    }
  }, [state.loggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Router>
          <Fragment>
            <FlashMessages />
            <Navbar />
            <Route exact path="/" component={Landing} />
            <section className="container">
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
export default App;
