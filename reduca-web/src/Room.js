import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';

const servers = {iceServers: [
  {urls: 'stun:stun.services.mozilla.com'},
  {urls: 'stun:stun.l.google.com:19302'},
]};

export default ({
  db,
}) => {
  if(!db) return null;
  const video1 = useRef();
  const video2 = useRef();
  const [ pc, setPc ] = useState();
  const [ id, setId ] = useState(Math.floor(Math.random()*1000000000));
  const sendMessage = useCallback((senderId, data) => {
    db.collection("messages").add({ sender: senderId, message: data }).then(msg => {
      msg.delete();
    });
  }, [ db ]);
  const readMessage = data => {
    const msg = JSON.parse(data.message);
    const sender = data.sender;
    if (sender != id) {
      if (msg.ice != undefined)
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
      .then(() => sendMessage(id, JSON.stringify({'sdp': pc.localDescription})) );
  }
  const showMyFace = () => {
    navigator.mediaDevices.getUserMedia({audio:true, video:true})
      .then(stream => {
	video1.current.srcObject = stream
	video1.current.play();
	return stream;
      })
      .then(stream => pc.addStream(stream));
  }

  useEffect(() => {
    const pc = new RTCPeerConnection(servers);
    setPc(pc);
  }, [])
  
  useEffect(() => {
    if(!db || !sendMessage || !pc) return
    showMyFace();
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
    <div>
      <video autoplay muted ref={video1}/>
      <video autoplay ref={video2}/>
      <button onClick={showFriendsFace}>Conectar</button>
    </div>
  )
}
