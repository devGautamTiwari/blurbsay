import React, { useState, useContext } from "react";
import firebase from "firebase";
import db from "./firebase";
import { UserProfileContext } from "./UserProfileContext";
import { isMobile } from "react-device-detect";
import { animationClasses, colors } from "./AnimationValues";
import SendIcon from "@material-ui/icons/Send";
import "./assets/css/Footer.css";

const Footer = () => {
  const [input, setInput] = useState("");
  const [[email], , [, handleLoading]] = useContext(UserProfileContext);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      handleLoading(true);
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
        .then(() => handleLoading(false))
        .catch((err) => alert(err.message));
      setInput("");
      e.target.innerText = "";
    }
  };

  return (
    <footer>
      <form className="footer__form">
        <div
          className="footer__input"
          placeholder="Type a message..."
          // value={input}
          onInput={(e) => setInput(e.target.innerText.trim())}
          onKeyPress={(e) => {
            if (!isMobile) {
              if (!e.shiftKey && e.key === "Enter") {
                e.preventDefault();
                sendMessage(e);
              }
            }
          }}
          autoFocus
          contentEditable
        />
        <button
          className="footer__iconButton"
          disabled={!input.trim()}
          type="submit"
          onClick={sendMessage}
        >
          <SendIcon />
        </button>
      </form>
    </footer>
  );
};

export default Footer;
