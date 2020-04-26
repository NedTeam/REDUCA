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

const getName = email => email && email.split('@')[0]

export default ({ db, room_id, onDataLoad }) => {
  const [ messages, setMessages ] = useState([]);
  const [ new_message, setNewMessage ] = useState('');
  const [ translate_to, setTranslateTo ] = useState(null);
  const [ translation, setTranslation ] = useState({});
  let query = useMemo(() => db.collection("transcripts").where('room_id', '==', room_id), [db, room_id]);
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
  const median_score = useMemo(() => messages.reduce((p,c) => p + (c.score || 0), 0)/messages.length,[messages]);
  useEffect(() => {if(translate_to){
    setTranslation({});
    Promise.all(messages.slice(0, 20).map(m => Promise.all([
      m.text,
      fetch(`https://europe-west1-euvsvirus-d0165.cloudfunctions.net/translate?text=${encodeURIComponent(m.text)}&lang=${translate_to}`)
	.then(r => r.ok && r.json() || Promise.reject(`Unexpected ${r.status} at ${r.url}`))
    ]))).then(res => setTranslation(res.reduce((p,c) => ({...p, [c[0]]: c[1].translation}), {})));
  }}, [translate_to])
  const translated = messages.map(m => translate_to ? translation[m.text] || "Loading..." : m.text);
  return (
    <div>
      <div style={{display: 'flex', alignItems: 'center', marginBottom:'1rem'}}>
	      <div>Transcription history:</div>
        <div style={{margin: 'auto'}}>
          <Score score={median_score}/>
        </div>
        <select
        value={translate_to}
        style={{height:'3rem', order: '2'}}
        onChange={e => setTranslateTo(e.target.value)}
        onClick={e => e.stopPropagation()}>
        <option value='null'>Language</option>
        <option value='es'>Español</option>
        <option value='en'>English</option>
        <option value='de'>Deutsch</option>
        <option value='fr'>Français</option>
      </select>
      <button className="enviar" style={{height:'3rem', order: '2', marginLeft:'1rem'}} onClick={e => {
        e.stopPropagation();
	download('transcript.txt', messages
          .map((t, i) => getName(t.user || '').concat(': ').concat(translated[i]))
	  .join('\n')
	);
      }}>Download</button>
      </div>
   
      {messages.map((m,i) => {
	return (
	  <div
	    key={i}
	    onClick={e => e.stopPropagation()}
	    style={{
	      color: 'grey',
	      display: 'flex',
	      padding: '0.3em',
	      border: '1px solid grey',
	      borderRadius: '3px',
	      alignItems: 'center',
	      backgroundColor: 'rgb(239, 239, 239)',
	    }}>
	    {m.user && <span><b>{getName(m.user)}</b>:&nbsp;</span>}
	    <span style={{flex: 1}}>{translated[i]}</span>
	    <TextToSpeech text={translated[i]}/>
	    {m.score != null && <Score score={m.score}/>}
	  </div>
	)
      })}
    </div>
  );
};

