import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Message from "./Message";
import { FormControl, TextField, IconButton, Link } from "@material-ui/core";
import Masonry from "react-masonry-css";
import SendIcon from "@material-ui/icons/Send";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import firebase from "firebase";
import db, { auth } from "./firebase";
import { UserProfileContext } from "./UserProfileContext";
import { animationClasses, colors } from "./AnimationValues";
import "./assets/css/Chat.css";
import Loader from "./Loader";

function Chat() {
  const [input, setInput] = useState("");
  const [[email], , [loading, handleLoading]] = useContext(UserProfileContext);
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: {
        text: "hello",
        email: "gautam03gt@gmail.com",
        blobColor: "#fdae78",
        blobSize: 200,
        animationClassName: "animation1",
        timestamp: 1,
      },
    },
    {
      id: 2,
      message: {
        text: "hey",
        email: "gautam3gt@gmail.com",
        blobColor: "#cd2a98",
        blobSize: 200,
        animationClassName: "animation2",
        timestamp: 2,
      },
    },
    {
      id: 3,
      message: {
        text: "hey guys",
        email: "gautamgt@gmail.com",
        blobColor: "#a0a0f0",
        blobSize: 210,
        animationClassName: "animation3",
        timestamp: 3,
      },
    },
  ]);
  const [welcomeText, setWelcomeText] = useState("Welcome to BlurbSay!");

  setTimeout(() => setWelcomeText("BlurbSay"), 60000);

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

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      handleLoading(200);
      db.collection("blobs")
        .add({
          text: input,
          blobSize: Math.floor(Math.random() * (225 - 175) + 175),
          blobColor: colors[Math.floor(Math.random() * colors.length)],
          animationClassName:
            animationClasses[
              Math.floor(Math.random() * animationClasses.length)
            ],
          email: email,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .catch((err) => alert(err.message));
      setInput("");
    }
  };
  return (
    <div className="chat__main">
      <div className="chat__welcome">
        <h2 className="chat__welcomeText">{welcomeText}</h2>
        <Link
          className="chat__signout"
          onClick={() => {
            auth.signOut();
            return <Redirect to="/signin" />;
          }}
          variant="subtitle1"
          color="primary"
        >
          <IconButton className="chat__signout__icon" variant="contained">
            <ExitToAppIcon />
          </IconButton>
          <div className="chat__signout__text">Log out</div>
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
          {messages.map(({ id, message }) => (
            <Message key={id} message={message} email={email} id={id} />
          ))}
        </Masonry>
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
