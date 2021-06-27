/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
// packages
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useImmerReducer } from "use-immer";
// Components
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";
import FlashMessages from "./components/FlashMessages";
import Dashboard from "./components/Dashboard";
import CreateProfile from "./components/CreateProfile";
import EditProfile from "./components/EditProfile";
import AddExperience from "./components/AddExperience";
import AddEducation from "./components/AddEducation";
import Profiles from "./components/Profiles";
import Profile from "./components/Profile";
import Account from "./components/Account";
import Posts from "./components/Posts";
import "./App.css";

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("DevAppToken")),
    flashMessage: [],
    user: {
      username: localStorage.getItem("DevAppUser"),
      token: localStorage.getItem("DevAppToken"),
      avatar: localStorage.getItem("DevAppAvatar"),
      id: localStorage.getItem("DevAppId")
    },
    profile: null,
    profiles: [],
    post: null,
    posts: [],
    likes: [],
    repos: null,
    loading: true
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "id":
        draft.id = action.data;
        return;
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case "flashMessage":
        draft.flashMessage.push(action.value);
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "profile":
        draft.profile = action.data;
        return;
      case "noprofile":
        draft.profile = null;
        return;
      case "profiles":
        draft.profiles = action.data;
        return;
      case "post":
        draft.post = action.data;
        return;
      case "posts":
        draft.posts = action.data;
        return;
      case "like":
        draft.posts.map(post => (post._id === action.data.id ? (post.likes = action.data.likes) : post));
        return;
      case "isloading":
        draft.loading = true;
        return;
      case "notloading":
        draft.loading = false;
        return;
      case "gotrepos":
        draft.repos = action.data;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("DevAppUser", state.user.username);
      localStorage.setItem("DevAppToken", state.user.token);
      localStorage.setItem("DevAppAvatar", state.user.avatar);
      localStorage.setItem("DevAppId", state.user.id);
    } else {
      localStorage.removeItem("DevAppAvatar");
      localStorage.removeItem("DevAppToken");
      localStorage.removeItem("DevAppUser");
      localStorage.removeItem("DevAppId");
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
                <Route exact path="/account" component={Account} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/profile/:user_id" component={Profile} />
                <Route exact path="/create-profile" component={CreateProfile} />
                <Route exact path="/edit-profile" component={EditProfile} />
                <Route exact path="/add-experience" component={AddExperience} />
                <Route exact path="/add-education" component={AddEducation} />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
export default App;
