import React, { useState, useEffect, useContext, useRef } from "react";
import { Redirect } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Message from "./Message";
import {
  FormControl,
  TextField,
  // Input,
  IconButton,
  Link,
} from "@material-ui/core";
// import FlipMove from "react-flip-move";
import Masonry from "react-masonry-css";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import db, { auth } from "./firebase";
import { UserProfileContext } from "./UserProfileContext";
import "./assets/css/Chat.css";

function Chat() {
  const [input, setInput] = useState("");
  const [[email]] = useContext(UserProfileContext);
  const [messages, setMessages] = useState([]);
  // const messagesEndRef = useRef(null);
  useEffect(() => {
    const unsubscribe = db
      .collection("blobs")
      .orderBy("timestamp", "desc")
      .limit(100)
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
        // messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      });

    return () => unsubscribe();

    // setUsername(user.displayName);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      db.collection("blobs").add({
        text: input,
        // username: username,
        blobSize: Math.floor(Math.random() * (225 - 175) + 175),
        blobColor: colors[Math.floor(Math.random() * colors.length)],
        animationClassName:
          animationClasses[Math.floor(Math.random() * animationClasses.length)],
        email: email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    }
  };
  const colors = [
    "#FF0066",
    "#8A3FFC",
    "#F1C21B",
    "#08BDBA",
    "#0F62FE",
    "#24A148",
    "#FA4D56",
    "#A7F0BA",
    "#9EF0F0",
    "#BAE6FF",
    "#D0E2FF",
    "#E8DAFF",
    "#FFD6E8",
    "#264653",
    "#2a9d8f",
    "#e9c46a",
    "#f4a261",
    "#e76f51",
    "#e63946",
    "#f1faee",
    "#a8dadc",
    "#457b9d",
    "#1d3557",
    "#fca311",
    "#14213d",
    "#03045e",
    "#00b4d8",
    "#ffba08",
    "#d00000",
    "#e85d04",
    "#ffafcc",
    "#6930c3",
    "#7400b8",
    "#48bfe3",
    "#64dfdf",
    "#80ffdb",
    "#ef476f",
    "#ffd166",
    "#06d6a0",
    "#e07a5f",
    "#f72585",
    "#3a0ca3",
    "#e2afff",
    "#fff3b0",
    "#e09f3e",
    "#9e2a2b",
    "#ffff3f",
    "#fdfffc",
  ];
  const animationClasses = [
    "animation1",
    "animation2",
    "animation3",
    "animation4",
    "animation5",
    "animation6",
  ];
  return (
    <div className="chat__main">
      <div className="chat__welcome">
        <h2
          style={{
            marginLeft: "18px",
          }}
        >
          Welcome to BlurbSay!
        </h2>
        <Link
          className="chat__signout"
          onClick={() => {
            auth.signOut();
            return <Redirect to="/signin" />;
          }}
          variant="subtitle1"
          color="primary"
        >
          Log out
        </Link>
      </div>
      <div className="chat__chat">
        <Masonry
          breakpointCols={{
            default: 4,
            1200: 4,
            1024: 3,
            768: 2,
            500: 1,
          }}
          className="chat__masonrygrid"
          columnClassName="chat__masonrygrid__column"
        >
          {/* <FlipMove className="chat__flipmove"></FlipMove> */}
          {messages.map(({ id, message }) => (
            <Message
              key={id}
              // username={username}
              message={message}
              email={email}
              id={id}
            />
          ))}
        </Masonry>
        {/* <div ref={messagesEndRef} /> */}
      </div>
      <div>
        <form className="chat__form">
          <FormControl className="chat__formControl">
            <TextField
              className="chat__input"
              variant="outlined"
              placeholder="Type a message..."
              value={input}
              multiline
              size="small"
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (!isMobile) {
                  if (!e.shiftKey && e.key === "Enter") {
                    e.preventDefault();
                    sendMessage(e);
                  }
                }
              }}
              autoFocus
            />
            <IconButton
              className="chat__iconButton"
              disabled={!input}
              variant="contained"
              color="primary"
              type="submit"
              onClick={sendMessage}
            >
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>
      </div>
    </div>
  );
}

export default Chat;
