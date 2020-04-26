import React, { useState, useEffect, useMemo } from "react";
import TextToSpeech from './TextToSpeech.js';
import Score from './Score.js'

const Chat = ({ db, room_id, user, onDataLoad }) => {
  const [messages, setMessages] = useState([]);
  const [ new_message, setNewMessage ] = useState('');
  let query = useMemo(() => db.collection("chat").where('room_id', '==', room_id), [db, room_id]);
  useEffect(() => {
    query.onSnapshot(
      querySnapshot => {
	let messages = []
        querySnapshot.forEach(doc => messages.push(doc.data()));
	const sorted = messages.sort((m1, m2) => m1.timestamp - m2.timestamp);
	setMessages(sorted);
	onDataLoad(sorted);
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }, [query]);
  const sendMessage = () => {
    db.collection("chat").add({
      user,
      sender: 'test',
      text: new_message ,
      room_id,
      timestamp: new Date().getTime(),
    })
  }
  return (
    <div>
      <div>Chat:</div>
      {messages.map((m,i) => (
	<div
	  key={i}
	  style={{
	    margin: '0.3em',
	    display: 'flex',
	    padding: '0.3em',
	    border: '1px solid grey',
	    borderRadius: '3px',
	    alignItems: 'center',
	    backgroundColor: 'lightgrey',
	  }}>
	  <span style={{flex: 1}}>{m.text}</span>
	  <TextToSpeech text={m.text}/>
	  {m.score != null && <Score score={m.score}/>}
	</div>
      ))}
      <div style={{display: 'flex', alignItems: 'center'}}>
	<input
	  type='text'
	  value={new_message}
	  style={{flex: 1, padding: '0.4em', borderRadius: '3px'}}
	  onChange={e => setNewMessage(e.target.value)}
	/>
	<button disabled={!new_message} onClick={sendMessage}>
	  Enviar
	</button>
      </div>
    </div>
  );
};

export default Chat;
