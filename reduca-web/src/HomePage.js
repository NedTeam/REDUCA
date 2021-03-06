import React, {
  useEffect,
} from "react";
import RoomList from "./RoomList";
import Room from "./Room";
import firebase from "firebase";
import TextToSpeech from "./TextToSpeech";
import Chat from "./Chat";

import { Switch, Route, Link } from "react-router-dom";

export default ({ db, user, setUser }) => {
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(result => {
        setUser(false);
      });
  };

  return (
    <div>
      <Switch>
        <Route exact path="/home">
          <RoomList
            db={db}
            user={user}
            setUser={setUser}
            logout={logout}
          />
        </Route>
        <Route path="/home/room/:room_id">
          <Room db={db} user={user} />
        </Route>
      </Switch>
    </div>
  );
};
