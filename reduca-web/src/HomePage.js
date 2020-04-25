import React from 'react'
import RoomList from './RoomList';
import Room from './Room';

import {
  Switch,
  Route,
  Link
} from "react-router-dom";


export default ({ db, user }) => {
  return (
    <div>
      <Switch>
	<Route exact path="/home">
	  <RoomList db={db} user={user}/>
	</Route>
	<Route path="/home/room/:room_id">
	  <Room db={db} user={user}/>
	</Route>
      </Switch>
    </div>
  )
}
