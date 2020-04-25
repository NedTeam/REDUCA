import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "./App.css";

const App = () => {
  const [user, setUser] = useState();
  const [newMail, setNewMail] = useState();
  const [newPass, setNewPass] = useState();
  const [mail, setMail] = useState();
  const [pass, setPass] = useState();
  const [login, setLogin] = useState();

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
    db.collection("users")
      .doc("PUp3fvntRc0TPsjEjSov")
      .onSnapshot(u => u && setUser(u.data()));

    //authentication state observer
    firebase.auth().onAuthStateChanged(function(u) {
      if (u) {
        setLogin(u.email);
      } else {
        // No user is signed in.
      }
    });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newMail, newPass)
      .catch(function(error) {
        // Handle Errors here.
        alert("New User Creation Error: " + error.message);
        // ...
      });
  };

  const handleLogin = event => {
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
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin}>
        <label>
          User:
          <input
            type="text"
            value={mail}
            onChange={e => setMail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
        </label>
        <input type="submit" value="Enviar" />
      </form>
      <h2>SIGN UP AS A NEW USER</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User:
          <input
            type="text"
            value={newMail}
            onChange={e => setNewMail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={newPass}
            onChange={e => setNewPass(e.target.value)}
          />
        </label>
        <input type="submit" value="Enviar" />
      </form>
      <h2>Current User:</h2>
      <div id="currentUser">{login}</div>
    </div>
  );
};

export default App;

{
  /* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
	    Reduca {JSON.stringify(user)}
        </p>
      </header>
    </div> */
}
