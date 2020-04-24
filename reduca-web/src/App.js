import React, {
    useState,
    useEffect,
} from 'react';
import logo from './logo.svg';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import './App.css';

const App = () => {
    const [ user, setUser ] = useState();
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
	db.collection("users").doc("PUp3fvntRc0TPsjEjSov").onSnapshot(u => u && setUser(u.data()));
    }, []);
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
	    Reduca {JSON.stringify(user)}
        </p>
      </header>
    </div>
  );
}

export default App;
