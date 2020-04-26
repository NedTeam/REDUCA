import React, { useState, useEffect, useMemo } from "react";

const Chat = ({ db }) => {
  const [messages, setMessages] = useState([]);
  let query = useMemo(() => db.collection("chat"), [db]);
  useEffect(() => {
    //Mirar linea 115 de room.js
    query.onSnapshot(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          setMessages(prevMessages => {
            return [...prevMessages, doc.data().text];
          });
        });
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }, [query]);
  return <div>Messages:{messages}</div>;
};

export default Chat;
