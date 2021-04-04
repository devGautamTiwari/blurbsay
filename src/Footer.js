import React, { useState, useContext, useRef } from "react";
import firebase from "firebase";
import db from "./firebase";
import { UserProfileContext } from "./UserProfileContext";
import { isMobile } from "react-device-detect";
import { animationClasses, colors } from "./AnimationValues";
import SendIcon from "@material-ui/icons/Send";
import "./assets/css/Footer.css";

const Footer = () => {
  const [input, setInput] = useState("");
  const inputField = useRef(null);
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
          email,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => handleLoading(false))
        .catch((err) => {
          alert(err.message);
          handleLoading(false);
        });
      setInput("");
      inputField.current.innerText = "";
    }
  };

  return (
    <footer>
      <form className="footer__form">
        <div
          className="footer__input"
          placeholder="Type a message..."
          ref={inputField}
          onInput={(e) => setInput(e.target.innerText.trim())}
          onKeyPress={
            !isMobile &&
            ((e) => {
              if (!e.shiftKey && e.key === "Enter") {
                e.preventDefault();
                sendMessage(e);
              }
            })
          }
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
