import React, { useState, useEffect, useMemo } from "react";
import TextToSpeech from './TextToSpeech.js';
import Score from './Score.js'

export default ({ db, room_id }) => {
  const [messages, setMessages] = useState([]);
  const [ new_message, setNewMessage ] = useState('');
  let query = useMemo(() => db.collection("transcripts").where('room_id', '==', room_id), [db, room_id]);
  useEffect(() => {
    query.onSnapshot(
      querySnapshot => {
	let messages = []
        querySnapshot.forEach(doc => messages.push(doc.data()));
	setMessages(messages);
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }, [query]);
  return (
    <div>
      <div>Transcription:</div>
      <button onClick={e => {
        e.stopPropagation();
        debugger;
      }}>Descargar todo</button>
      {messages.map((m,i) => (
	<div
	  key={i}
	  onClick={e => e.stopPropagation()}
	  style={{
	    color: 'grey',
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
    </div>
  );
};

