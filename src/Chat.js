import React, { useState, useEffect, useContext } from "react";
import Message from "./Message";
import db from "./firebase";
import { UserProfileContext } from "./UserProfileContext";
import "./assets/css/Chat.css";
import Header from "./Header";
import Footer from "./Footer";

function Chat() {
  const [[email], , [, handleLoading]] = useContext(UserProfileContext);
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: {
        text: "hello",
        email: "",
        blobColor: "#fdae78",
        blobSize: 200,
        animationClassName: "animation1",
        timestamp: 1,
      },
    },
    {
      id: 2,
      message: {
        text: "hey you 😉",
        email: "",
        blobColor: "#cd2a98",
        blobSize: 200,
        animationClassName: "animation2",
        timestamp: 2,
      },
    },
    {
      id: 3,
      message: {
        text: "hey guys, loading your thoughts",
        email: "gautam03gt@gmail.com",
        blobColor: "#a0a0f0",
        blobSize: 210,
        animationClassName: "animation3",
        timestamp: 3,
      },
    },
    {
      id: 4,
      message: {
        text: "niccccccee!",
        email: "",
        blobColor: "#0faffa",
        blobSize: 210,
        animationClassName: "animation5",
        timestamp: 3,
      },
    },
    {
      id: 5,
      message: {
        text: "cool n sweet!",
        email: "",
        blobColor: "#ef0d8f",
        blobSize: 200,
        animationClassName: "animation4",
        timestamp: 4,
      },
    },
    {
      id: 6,
      message: {
        text: "what's up!",
        email: "",
        blobColor: "#d02d8a",
        blobSize: 190,
        animationClassName: "animation1",
        timestamp: 5,
      },
    },
    {
      id: 7,
      message: {
        text: "fineeee!",
        email: "",
        blobColor: "#eaa2ef",
        blobSize: 200,
        animationClassName: "animation6",
        timestamp: 6,
      },
    },
  ]);

  useEffect(() => {
    const unsubscribe = () => {
      handleLoading(true);
      db.collection("blobs")
        .orderBy("timestamp", "desc")
        .limit(100)
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
          );
        });
      handleLoading(false);
    };
    return unsubscribe();
  }, []);

  return (
    <div className="chat__main">
      <Header />
      <div className="chat__chat">
        <div className="chat__masonrygrid">
          {messages.map(({ id, message }) => (
            <Message
              key={id}
              message={message}
              email={email}
              id={id}
              className="chat__grid__item"
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Chat;
