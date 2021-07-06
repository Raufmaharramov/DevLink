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
import Post from "./components/Post";
import PrivateRoute from "./components/PrivateRoute";
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
      case "posted":
        draft.posts = [action.data, ...draft.posts];
        return;
      case "postDeleted":
        draft.posts = draft.posts.filter(post => post._id !== action.data);
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
      case "nocomment":
        draft.post = { ...draft.post, comments: draft.post.comments.filter(com => com._id !== action.data) };
        return;
      case "comment":
        draft.post = { ...draft.post, comments: action.data };
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
                <PrivateRoute exact path="/account" component={Account} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="/profiles" component={Profiles} />
                <PrivateRoute exact path="/posts" component={Posts} />
                <PrivateRoute exact path="/post/:id" component={Post} />
                <Route exact path="/profile/:user_id" component={Profile} />
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
                <PrivateRoute exact path="/add-education" component={AddEducation} />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
export default App;
