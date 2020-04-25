import React, { useState, useEffect } from "react";

const Chat = ({ db }) => {
  const [messages, setMessages] = useState([]);
  let query = db.collection("messages");
  useEffect(() => {
    query.onSnapshot(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          let newMessages = [...messages, doc.data().message];
          setMessages(newMessages);
        });
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
  });
  return <div>Mensajes: {messages}</div>;
};

export default Chat;
