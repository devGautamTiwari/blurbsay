import React, { useState, useEffect, useContext, useRef } from "react";
// import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Message from "./Message";
import {
  FormControl,
  TextField,
  Input,
  IconButton,
  Link,
} from "@material-ui/core";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import db, { auth } from "./firebase";
import { UserProfileContext } from "./UserProfileContext";
import "./Chat.css";

function Chat() {
  const [input, setInput] = useState("");
  const [
    [email],
    ,
    [username],
    ,
    [, setActiveComponent],
    [buttonDisabled, setButtonDisabled],
  ] = useContext(UserProfileContext);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    const unsubscribe = db
      .collection("messages")
      .orderBy("timestamp", "asc")
      .limit(100)
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      });

    return () => unsubscribe();

    // setUsername(user.displayName);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      db.collection("messages").add({
        text: input,
        username: username,
        email: email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    }
  };

  return (
    <div className="chat__main">
      <div className="chat__welcome">
        <h2
          style={{
            marginLeft: "18px",
          }}
        >
          Welcome {username !== "" && username}!{" "}
        </h2>
        <Link
          className="chat__signout"
          onClick={() => {
            auth.signOut();
            setButtonDisabled(true);
            setTimeout(() => {
              setButtonDisabled(false);
            }, 4000);
            setActiveComponent("SignIn");
          }}
          disabled={buttonDisabled}
          variant="subtitle1"
          color="primary"
        >
          Sign out
        </Link>
      </div>
      <div className="chat__chat">
        <FlipMove className="chat__flipmove">
          {messages.map(({ id, message }) => (
            <Message
              key={id}
              username={username}
              message={message}
              email={email}
              id={id}
            />
          ))}
        </FlipMove>
        <div ref={messagesEndRef} />
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
