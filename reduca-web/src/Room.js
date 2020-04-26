import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import * as faceapi from 'face-api.js'
import { Link, useParams } from 'react-router-dom';
import Analysis from "./Analysis";
import TranscriptHistory from "./TranscriptHistory";
import User from "./User";
import Chat from "./Chat";

const colors = ['red', 'green', 'blue'];

const servers = {iceServers: [
  {urls: 'stun:stun.services.mozilla.com'},
  {urls: 'stun:stun.l.google.com:19302'},
]};

const datosMedia = [
  {
    data: {
      battery: 0.7,
      design: .8,
      useful: 0.9,
      speed: 0.67,
      weight: 0.8
    },
    meta: { color: 'blue' }
  }
];

export default ({
  db,
  user,
}) => {
  if(!db) return null;
  const { room_id } = useParams();
  const video1 = useRef();
  const video2 = useRef();
  const [ userMuted, setUserMuted ] = useState(false);
  const [ faceMuted, setFaceMuted ] = useState(0);
  const [ globalMuted, setGlobalMuted ] = useState(false);
  const [ user_data, setUserData ] = useState([]);
  const [ chat_history, setChatHistory ] = useState([]);
  const [ transcript_history, setTranscriptHistory ] = useState([]);
  const [ sender, setSender ] = useState();
  const [ transcript_modal_opened, setTranscriptModalOpened ] = useState();
  const [ video_connected, setVideoConnected ] = useState();
  const [ recognition, setRecognition ] = useState();
  const [ pc, setPc ] = useState();
  const [ id, setId ] = useState(Math.floor(Math.random()*1000000000));
  const [ transcript, setTranscript ] = useState('Hello World');
  const [ stream, setStream ] = useState();
  const [ graph, setGraph ] = useState(datosMedia);
  const room_name = 'messages_'.concat(process.env.NODE_ENV).concat('_').concat(room_id)
  const sendMessage = useCallback((senderId, data) => {
    db.collection(room_name).add({ sender: senderId, message: data }).then(msg => {
      msg.delete();
    });
  }, [ db, room_name ]);
  useEffect(() => {
    let mute = (userMuted || (faceMuted < 10));
    //console.log(`Setting global mute ${mute} - ${userMuted} - ${faceMuted}`);
    setGlobalMuted(mute);
  }, [faceMuted, userMuted]);
  useEffect(() => {
    const track = stream && stream.getAudioTracks()[0];
    console.log(`Muting: ${globalMuted}`);
    if(track) track.enabled = !globalMuted;
  }, [globalMuted, stream]);
  const readMessage = data => {
    const msg = JSON.parse(data.message);
    const sender = data.sender;
    if (sender != id) {
      if(msg.transcript != null){
	setTranscript(msg.transcript);
      } else if (msg.ice != undefined)
	pc.addIceCandidate(new RTCIceCandidate(msg.ice));
      else if (msg.sdp.type == "offer")
	pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
	.then(() => pc.createAnswer())
	.then(answer => pc.setLocalDescription(answer))
	.then(() => sendMessage(id, JSON.stringify({'sdp': pc.localDescription})));
      else if (msg.sdp.type == "answer")
	pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
    }
  };
  const showFriendsFace = () => {
    pc.createOffer()
      .then(offer => pc.setLocalDescription(offer) )
      .then(() => sendMessage(id, JSON.stringify({'sdp': pc.localDescription})) )
  }
  const showMyFace = () => {
    const recognition = new window.webkitSpeechRecognition();
    setRecognition(recognition);
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.start();
    let last_index = -1;
    recognition.onresult = function(event) {
      const results = Array.from(event.results);
      const last_final_line_index = results.map(l => l.isFinal).lastIndexOf(true);
      const non_final_lines = results.slice(last_final_line_index);
      const last_final_line = results[last_final_line_index];
      const last_final_transcript = last_final_line && last_final_line[0] && last_final_line[0].transcript;
      const last_transcript = results.slice(last_final_line_index+1).map(l => l && l[0] && l[0].transcript).join(' ');
      const lines = [ last_final_transcript, last_transcript ];
      sendMessage(id, JSON.stringify({transcript: lines.filter(f => f).join('.\n')}))
      if(last_final_line_index !== last_index){
	last_index = last_final_line_index;
	db.collection('transcripts').add({
	  user,
	  sender: id,
	  text: last_final_transcript,
	  room_id,
	  timestamp: (new Date()).getTime(),
	});
      }
    }

    return navigator.mediaDevices.getUserMedia({audio:true, video: { width: 1280, height: 720 }})
      .then(stream => {
	video1.current.srcObject = stream
	video1.current.play();
	setStream(stream);
	return stream;
      })
      .then(stream => {
	const video_track = stream.getVideoTracks()[0];
	pc.addTrack(video_track, stream);
	const audio_track = stream.getAudioTracks()[0];
	return pc.addTrack(audio_track, stream);
      });
  }

  const timeout = t => new Promise(res => setTimeout(res, t))

  const calculateNext = (prev_data={}, data={}) => {
    return Object.fromEntries(Object.entries(data).map(([k,v]) => (
      [k, ((prev_data[k] || 0)*29+v)/30]
    )));
  }
  
  const onPlay = (who, ref) => async e => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    const video = ref.current;
    const displaySize = { width: video.width, height: video.height };
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
      if(who === 'own'){
	if(detections.length){
          setFaceMuted(prev => Math.min(prev + 2, 20))
          const expressions = detections[0].expressions;
          // debugger;
          setUserData(prev_data => ({
            ...prev_data,
            [who]: Object.assign({}, calculateNext(prev_data[who], expressions)),
          }));
	} else {
          // console.log("No hay cara")
          setFaceMuted(prev => Math.max(prev - 1, 0))
	}
      }
    }, 200)
  };

  const disconnect = (spc=pc) => {
    sender && spc.removeTrack(sender);
    if(video1.current) video1.current.srcObject = null;
    recognition && recognition.stop();
    stream && stream.getTracks().forEach(track => track.stop());
  }
  
  useEffect(() => {
    const pc = new RTCPeerConnection(servers);
    setPc(pc);
    return disconnect;
  }, []);
  
  useEffect(() => {
    if(!db || !sendMessage || !pc) return
    db.collection(room_name).onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
	if(change.type === 'added'){
	  const doc = change.doc.data();
	  readMessage(doc)
	}
      })
    });
    const yourId = Math.floor(Math.random()*1000000000);
    pc.onicecandidate = (event => event.candidate 
      ? sendMessage(yourId, JSON.stringify({'ice': event.candidate}))
      : console.log("Sent All Ice")
    );
    pc.onaddstream = (event => {
      video2.current.srcObject = event.stream;
      video2.current.play();
    });
  }, [pc, db, sendMessage]);

  const getRandomData = (seed) => [{
    data: {
      battery: Math.random(),
      design: Math.random(),
      useful: Math.random(),
      speed: Math.random(),
      weight: Math.random(),
    },
    meta: { 
      color: 'red' 
    }
  }];  

  
  const room_users = useMemo(() => {
    const all = chat_history.concat(transcript_history);
    const u = all.reduce((p,c) => ({...p, [c.user]: (p[c.user] || []).concat(c)}), {})
    return Object.entries(u).map(([k,v]) => {
      const median_score = v.reduce((p,c) => p + (c.score || 0), 0)/v.length;
      return {email: k, messages: v, score: median_score, data: getRandomData(k)}
    });
  }, [chat_history, transcript_history]);
  
  return (
    <div className="" style={{position: 'relative'}}>
      <div className="classGrid3">
        <div className="leftColumn" style={{height: '95vh', display: 'flex', flexDirection: 'column'}}>
          <Analysis datosGraph={Object.values(user_data).map((u,i) => ({data: u, meta: {color: colors[i]}}))}></Analysis>
	  <div style={{overflow: 'auto'}}>
	    {room_users.map(u => (
	      <User 
		name={u.email}
		status="Conected"
		score={u.score}
		data={u.data}
		onStudentClick={() => {setGraph(u.data)}}
	      />
	  ))}
          </div>
        </div>

        <div className="centerColumn" style={{width:'100%'}}>
          <iframe
            style={{
              width: '100%',
              height: '85vh',
              overflow: 'hidden',
              border: '0px',
            }}
            scrolling='no'
            src={`https://witeboard.com/educo-${room_id}`}
          />
          {transcript && (
            <div
	      onClick={() => setTranscriptModalOpened(o => !o)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4em',
                height: '15vh',
                bottom: '2em',
                left: 0,
                right: 0,
                bottom: 0,
                position: 'relative'
              }}
            >
              <div style={{
                height: transcript_modal_opened ? '90vh' : '3em',
                transition: 'height 1s',
                backgroundColor: 'gray',
                color: 'lightGray',
                borderRadius: '10px',
                padding: '0.5em',
                width: '100%',
                overflow: 'auto',
                position: transcript_modal_opened ? 'absolute' : 'relative',
                bottom: 30,
	     }}>
		<div style={{display: transcript_modal_opened ? 'block' : 'none'}}>
		  <TranscriptHistory room_id={room_id} db={db} onDataLoad={setTranscriptHistory}/>
		</div>
		<div style={{display: !transcript_modal_opened ? 'block' : 'none'}}>
		  {(transcript || '').split('\n').map(line => <div>{line}</div>)}
		</div>
	      </div>
	    </div>
          )}
      </div>
      
        <div className="rightColumn">
          <div id="buttons" style={{width: "100%", display: 'flex', justifyContent: 'space-between', marginBottom:'0.5rem'}}>
            <div style={{cursor: 'pointer', paddingBottom: '0.5em'}}
              onClick={() => {
                if(!video_connected){
                  showMyFace().then(sender => {
                    setSender(sender);
                    showFriendsFace();
                  });
                } else {
                  disconnect();
                }
                setVideoConnected(n => !n);
              }}
            >
              <div className= "flexCenter boton">
                <i className="fa fa-video-camera" style={{color: !video_connected ? 'black' : 'red', fontSize: '1.5em'}}></i>
              </div>
            </div>
            <div className= "flexCenter boton" onClick={e => setUserMuted(m => !m)}>
                <i class="fas fa-microphone-alt" style={{color: !video_connected || globalMuted ? 'black' : 'red', fontSize: '1.5em'}}></i>
            </div>
            <div className= "flexCenter boton">
                <i class="fas fa-external-link-alt" style={{color: 'black', fontSize: '1.5em'}}></i>
            </div>
            <div className= "flexCenter boton">
                <i class="fas fa-ellipsis-v" style={{color: 'black', fontSize: '1.5em'}}></i>
            </div>
          </div>
           
          <div id="videos">
            <video style={{ width: '100%'}} className='video' autoPlay muted ref={video1} onPlay={onPlay('own', video1)}/>
            <video style={{ width: '100%'}} className='video' autoPlay ref={video2} onPlay={onPlay('other', video2)}/>
          </div>
	        <Chat db={db} user={user} room_id={room_id} onDataLoad={setChatHistory}/>
        </div>
      </div>
    </div>
  
  )
}
