import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import firebase from "firebase";
import HomePage from "./HomePage";
import Login from "./Login.js";
import "firebase/auth";
import "firebase/firestore";
import "./App.css";

import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState();
  const [db, setDb] = useState();
  const [functions, setFunctions] = useState();
  
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBy7thcdptlNFSW0IqfJ7OI6SBtmpkZ_OU",
      authDomain: "euvsvirus-d0165.firebaseapp.com",
      databaseURL: "https://euvsvirus-d0165.firebaseio.com",
      projectId: "euvsvirus-d0165",
      storageBucket: "euvsvirus-d0165.appspot.com",
      messagingSenderId: "658551436420",
      appId: "1:658551436420:web:9c2aa64a04253e1824bed1"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const functions = firebase.functions();
    setDb(db);
    setFunctions(functions);
    //authentication state observer
    firebase.auth().onAuthStateChanged(function(u) {
      if (u) {
        setLogin(u.email);
	setLoading(false);
      } else {
	setLoading(false);
        // No user is signed in.
      }
    });
  }, []);

  const handleRegister = (event, mail, pass) => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(mail, pass)
      .catch(function(error) {
        // Handle Errors here.
        alert("New User Creation Error: " + error.message);
        // ...
      });
  };

  const handleLogin = (event, mail, pass) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(mail, pass)
      .catch(function(error) {
        // Handle Errors here.
        alert("Login Error: " + error.message);
        // ...
      });
  };

  return (
    <div>
      <Router>
	<Switch>
          {!loading && login ? (
            <Redirect exact from="/" to="/home" />
          ) : (
	    <Login handleLogin={handleLogin} handleRegister={handleRegister}/>
          )}
          <Route path="/home">
            <HomePage
	      user={login}
	      setUser={setLogin}
	      db={db}
	      functions={functions}
	    />
          </Route>
	</Switch>
      </Router>
    </div>
  );
};

export default App;
