import React from "react";

let synth = window.speechSynthesis;

const setSpeech = lang => {
  return new Promise(function(resolve, reject) {
    let id;
    let i = 0;
    id = setInterval(() => {
      i++;
      if(i > 1000) reject('No voices available');
      let voices = synth.getVoices();
      if (voices.length !== 0) {
	const locale_voice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(lang));
        resolve(locale_voice || voices[0]);
        clearInterval(id);
      }
    }, 10);
  });
};

const speak = (lang, message) => {
  const voice = setSpeech(lang);
  voice.then(v => {
    let utterThis = new SpeechSynthesisUtterance(message);
    utterThis.voice = v;
    synth.speak(utterThis);
  });
};

const TextToSpeech = ({ text, lang }) => {
  return <i style={{margin: '0em 0.3em'}} className='fa fa-play' onClick={() => speak(lang, text)}/>
};

export default TextToSpeech;
