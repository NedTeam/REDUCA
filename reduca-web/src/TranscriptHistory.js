import React, { useState, useEffect, useMemo } from "react";
import TextToSpeech from './TextToSpeech.js';
import Score from './Score.js'

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export default ({ db, room_id }) => {
  const [messages, setMessages] = useState([]);
  const [ new_message, setNewMessage ] = useState('');
  let query = useMemo(() => db.collection("transcripts").where('room_id', '==', room_id), [db, room_id]);
  useEffect(() => {
    query.onSnapshot(
      querySnapshot => {
	let messages = []
        querySnapshot.forEach(doc => messages.push(doc.data()));
	setMessages(messages.sort((m1, m2) => m1.timestamp - m2.timestamp));
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }, [query]);
  const median_score = useMemo(() => messages.reduce((p,c) => p + (c.score || 0), 0)/messages.length,[messages]);
  return (
    <div>
      <div>Transcription:</div>
      <Score score={median_score}/>
      <button onClick={e => {
        e.stopPropagation();
	download('transcript.txt', messages
	  .map(t => (t.user || '').concat(': ').concat(t.text))
	  .join('\n')
	);
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
	  {m.user && <span><b>{m.user}</b>:&nbsp;</span>}
	  <span style={{flex: 1}}>{m.text}</span>
	  <TextToSpeech text={m.text}/>
	  {m.score != null && <Score score={m.score}/>}
	</div>
      ))}
    </div>
  );
};

