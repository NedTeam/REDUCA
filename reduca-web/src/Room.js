import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';

import './Room.css';

import { Link, useParams } from 'react-router-dom';
const servers = {iceServers: [
  {urls: 'stun:stun.services.mozilla.com'},
  {urls: 'stun:stun.l.google.com:19302'},
]};

export default ({
  db,
  functions,
}) => {
  if(!db) return null;
  const { room_id } = useParams();
  const video1 = useRef();
  const video2 = useRef();
  const [ sender, setSender ] = useState();
  const [ video_connected, setVideoConnected ] = useState();
  const [ recognition, setRecognition ] = useState();
  const [ pc, setPc ] = useState();
  const [ id, setId ] = useState(Math.floor(Math.random()*1000000000));
  const [ transcript, setTranscript ] = useState('');
  const [ stream, setStream ] = useState();
  const getSentiment = message => {
    console.log(functions);
    const fn = functions.httpsCallable('testml');
    fn(message).then(res => {debugger})
  }
  const sendMessage = useCallback((senderId, data) => {
    const room_name = process.env.NODE_ENV.concat('_').concat(room_id)
    db.collection(`messages-${room_name}`).add({ sender: senderId, message: data }).then(msg => {
      msg.delete();
    });
  }, [ db, room_id ]);
  const readMessage = data => {
    const msg = JSON.parse(data.message);
    const sender = data.sender;
    if (sender != id) {
      if(msg.transcript){
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
    recognition.start();
    recognition.onresult = function(event) {
      sendMessage(id, JSON.stringify({transcript: Array.from(event.results).slice(-1)[0][0].transcript}))
    }
    return navigator.mediaDevices.getUserMedia({audio:true, video:true})
      .then(stream => {
	video1.current.srcObject = stream
	video1.current.play();
	setStream(stream);
	return stream;
      })
      .then(stream => {
	const track = stream.getVideoTracks()[0];
	return pc.addTrack(track, stream)
      });
  }

  const disconnect = () => {
    pc.removeTrack(sender);
    video1.current.srcObject = null;
    recognition && recognition.stop();
    stream && stream.getTracks().forEach(track => track.stop());
  }
  
  useEffect(() => {
    //getSentiment('Hey there');
    const pc = new RTCPeerConnection(servers);
    setPc(pc);
    // const interval_id = setTimeout(3000, () => showFriendsFace());
    // return () => clearInterval(interval_id);
  }, []);
  
  useEffect(() => {
    if(!db || !sendMessage || !pc) return
    db.collection('messages').onSnapshot(snapshot => {
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
  return (
    <div className="" style={{position: 'relative'}}>
      <div className="classGrid3">
	<div style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, zIndex: -1}}>
	  <div style={{
            position: 'absolute',
	    left: 0,
	    bottom: 0,
            margin: '1em',
	    minWidth: '200px',
	    width: '20vw',
	  }}>
	    <video style={{ boxShadow: '5px 5px 10px #888888', width: '100%', height: '100%'}} autoPlay muted ref={video1}/>
	  </div>
	  <div style={{
            position: 'absolute',
            right: 0,
	    bottom: 0,
            margin: '1em',
	    minWidth: '200px',
	    width: '20vw',
	  }}>
	    <video style={{ boxShadow: '5px 5px 10px #888888', width: '100%', height: '100%'}} autoPlay ref={video2} />
	  </div>
	</div>
        <div className="leftColumn">
          <div style={{padding: '0.5em'}}>
            <div style={{paddingBottom: "2vh", backgroundColor:'rgba(192,192,192,0.8)', padding: '0.4em', borderRadius:'1em'}}>
              <i className="fa fa-search fa-xl" style={{color: 'black', fontSize: '1.5em', display: 'inline', paddingRight: '12vh', paddingLeft: '1vh'}}></i>
              <i className="fa fa-search fa-xl" style={{color: 'black', fontSize: '1.5em', display: 'inline', paddingRight: '1vh'}}></i>
              <i className="fa fa-search fa-xl" style={{color: 'black', fontSize: '1.5em', display: 'inline', paddingRight: '1vh'}}></i>
            </div>
          </div>
          <div style={{padding: '0.5em'}}>
            <div className="userGrid2 flexCenter" style={{backgroundColor:'rgba(192,192,192,0.8)', padding: '0.4em', borderRadius:'1em'}}>
              <div style={{textAlign: 'center'}}>
                <img className="avatarIcon" src={"https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"}/>
                </div>
              <div>
                <p style={{paddingLeft: '0.5em', lineHeight: '50%', fontSize: '1.2em'}}><b>John Doe</b></p>
                <p style={{paddingLeft: '1em', lineHeight: '80%', color:'#181818'}}>Status</p>
              </div>
            </div>
          </div>
          <div style={{padding: '0.5em'}}>
            <div className="userGrid2 flexCenter" style={{backgroundColor:'rgba(192,192,192,0.8)', padding: '0.4em', borderRadius:'1em'}}>
              <div style={{textAlign: 'center'}}>
                <img className="avatarIcon" src={"https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"}/>
                </div>
              <div>
                <p style={{paddingLeft: '0.5em', lineHeight: '50%', fontSize: '1.2em'}}><b>John Doe</b></p>
                <p style={{paddingLeft: '1em', lineHeight: '80%', color:'#181818'}}>Status</p>
              </div>
            </div>
          </div>
        </div> 
        <div style={{position: 'relative'}}>
	  <iframe
	    style={{
	      width: '100%',
	      height: '100%',
	      overflow: 'hidden',
	      border: '0px',
	    }}
	    scrolling='no'
	    src={`https://wbo.ophir.dev/boards/${room_id}`}
	  />
	  {transcript && (
	    <div
	      style={{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '1.4em',
		position: 'absolute',
		bottom: 10,
		left: 0,
		right: 0,
		height: '2em',
	      }}
	    >
	      <div style={{
		backgroundColor: 'gray',
		color: 'lightGray',
		borderRadius: '10px',
		padding: '0.5em',	     
              }}>
		{transcript}
	      </div>
	    </div>
	  )}
        </div>
        <div className="rightColumn">
          <div
	    style={{cursor: 'pointer', padding: '0.5em'}}
	    onClick={() => {
	      if(!video_connected){
		showMyFace().then(sender => {
		  setSender(sender);
		  showFriendsFace();
		});
	      }  else {
		disconnect();
	      }
	      setVideoConnected(n => !n);
	    }}
	  >
            <div className= "flexCenter" style={{backgroundColor:'rgba(192,192,192,0.8)', padding: '1em', borderRadius:'1em', textAlign: 'center', height: '2.2em', width: '2.2em'}}>
            <i className="fa fa-video-camera" style={{color: 'black', fontSize: '1.5em'}}></i>
              <p
		style={{lineHeight:'1%', fontSize: '0.8em'}}
	      >
		{video_connected ? 'On' : 'Off'}
	      </p>
            </div>
          </div>
          <div style={{padding: '0.5em'}}>
            <div className= "flexCenter" style={{backgroundColor:'rgba(192,192,192,0.8)', padding: '1em', borderRadius:'1em', textAlign: 'center', height: '2.2em', width: '2.2em'}}>
            <i class="fa fa-video-camera" style={{color: 'black', fontSize: '1.5em'}}></i>
            <p style={{lineHeight:'1%', fontSize: '0.8em'}}>On</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
