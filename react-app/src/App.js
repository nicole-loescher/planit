import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/auth";
import SplashPage from './components/SplashPage'
import { useDispatch } from "react-redux";
import Party from "./components/Party";
import OneParty from "./components/Party/OneParty";
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await dispatch(authenticate())
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} authenticated={authenticated} />  
      <img className='banner_img' src='https://myplanits.s3-us-west-1.amazonaws.com/space-party.jpg' alt='space banner'/>  
        <Switch>
          <Route path="/" exact={true} authenticated={authenticated}>
          <SplashPage authenticated={authenticated}/>
          </Route>
          <Route path="/login" exact={true}>
            <LoginForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
          </Route>
          <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
            <UsersList/>
          </ProtectedRoute>
          <ProtectedRoute path="/planits/create" exact={true} authenticated={authenticated}>
            <Party />
          </ProtectedRoute>
          <ProtectedRoute path="/planits/:id" exact={true} authenticated={authenticated}>
            <OneParty />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
            <User />
          </ProtectedRoute>
          <Route >
            <ErrorPage />
          </Route>
        </Switch>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
