/* eslint-disable default-case */
import React, { Fragment } from "react";
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
    flashMessage: []
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "flashMessage":
        draft.flashMessage.push(action.value);
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);
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
