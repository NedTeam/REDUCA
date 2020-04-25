import React from "react";

let synth = window.speechSynthesis;

const setSpeech = voice => {
  return new Promise(function(resolve, reject) {
    let id;

    id = setInterval(() => {
      if (synth.getVoices().length !== 0) {
        let voices = synth.getVoices();
        resolve(voices[voice]);
        clearInterval(id);
      }
    }, 10);
  });
};

const speak = () => {
  let voice = setSpeech(1);
  voice.then(v => {
    let utterThis = new SpeechSynthesisUtterance("hi, how are you mate?");
    utterThis.voice = v;
    synth.speak(utterThis);
  });
};

const TextToSpeech = () => {
  return <button onClick={speak}>Speak</button>;
};

export default TextToSpeech;
