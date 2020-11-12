import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  // useLayoutEffect
} from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
} from "@material-ui/core";
import { isMobile } from "react-device-detect";
import { SVG } from "@svgdotjs/svg.js";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";
import db from "./firebase";
import animationValues from "./AnimationValues";
import "./assets/css/Message.css";
import { Unsubscribe } from "@material-ui/icons";

const Message = forwardRef((props, ref) => {
  // const blobRef = useRef(null);
  const [text, setText] = useState(props.message.text);
  const [editMode, setEditMode] = useState(false);
  const isUser = props.email === props.message.email;
  const [isAnimating, setIsAnimating] = useState(true);
  const [rendered, setRendered] = useState(false);
  const updateMessage = (id, text_) => {
    db.collection("blobs").doc(id).set(
      {
        text: text_,
        edited: true,
      },
      { merge: true }
    );
    setEditMode(false);
  };
  // useEffect(() => {
  //   if (!rendered) {
  //     var blobText = SVG("#text__" + props.id).text(text);
  //     blobText.attr("dominant-baseline", "middle");
  //     setRendered(true);
  //   }
  // }, []);
  // useLayoutEffect(() => {
  //   var topPos, blobPos, onScroll;
  //   const bindAnimation = () => {
  //     topPos = (element) => element.getBoundingClientRect().top;
  //     blobPos = topPos(blobRef.current);
  //   };

  //   bindAnimation();
  //   onScroll = () => {
  //     const scrollPos = window.scrollY + window.innerHeight;
  //     if (blobPos < scrollPos) {
  //       setIsAnimating(true);
  //     } else if (blobPos >= scrollPos) {
  //       setIsAnimating(false);
  //     }
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   const unsubscribe = () => {
  //     window.removeEventListener("scroll", onScroll);
  //   };
  //   return () => window.removeEventListener("scroll", onScroll);
  //   // return bindAnimation();
  // }, []);

  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <div className="message__blob">
        <svg
          className="message__blobSvg"
          // id="message__blobSvg"
          viewBox={`0 0 ${props.message.blobSize} ${props.message.blobSize}`}
          // viewBox={`0 0 250 250`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id={`text__${props.id}`}>
            <path
              fill={props.message.blobColor}
              transform={`translate(${props.message.blobSize / 2}, ${
                props.message.blobSize / 2
              })`}
            >
              <animate
                attributeName="d"
                values={animationValues[props.message.animationClassName]}
                keyTimes="0; 0.2; 0.4; 0.6; 0.8; 1"
                calcMode="paced"
                dur={isAnimating ? "2s" : "0s"}
                repeatCount="indefinite"
                begin={`${Math.random()}s`}
              />
            </path>
            {/* <text
              className="message__blobText"
              dominantBaseline="middle"
              textAnchor="middle"
              transform={`translate(${props.message.blobSize / 2}, ${
                props.message.blobSize / 2
              })`}
            ></text> */}
            <foreignObject
              // x="10"
              // y="10"
              // // transform={`translate(-${props.message.blobSize / 2}, -${
              // //   props.message.blobSize / 2
              // // })`}
              width={props.message.blobSize - 10}
              height={props.message.blobSize - 10}
            >
              <p
                xmlns="http://www.w3.org/1999/xhtml"
                className="message__blobText"
              >
                {text}
              </p>
            </foreignObject>
          </g>
        </svg>
      </div>
      {isUser && (
        <div className="message__options">
          {/* <IconButton
            className="message__edit"
            onClick={(e) => {
              setEditMode(!editMode);
            }}
            >
            <EditIcon color="primary" />
          </IconButton> */}

          <IconButton
            className="message__delete"
            onClick={() => db.collection("blobs").doc(props.id).delete()}
          >
            <DeleteIcon color="error" />
          </IconButton>
          {/* <p>{"test\ntest"}</p> */}
        </div>
      )}
      {/* <p className="message__username">
        {!isUser && props.message.email}
        {props.message.edited && !isUser && " (edited)"}
      </p> */}
      {/* <center>
        <p>{props.message.text}</p>
      </center> */}
      {/* <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          {!editMode ? (
            <Typography
              color="textPrimary"
              className={`message__text ${isUser && "message__userText"}`}
              variant="h6"
              component="h6"
            >
              {text}
            </Typography>
          ) : (
            <form>
              <TextField
                value={text}
                variant="outlined"
                multiline
                size="small"
                onChange={(e) => setText(e.target.value)}
                onBlur={() => {
                  updateMessage(props.id, text);
                }}
                onKeyPress={(e) => {
                  if (!isMobile) {
                    if (!e.shiftKey && e.key === "Enter") {
                      e.preventDefault();
                      updateMessage(props.id, text);
                    }
                  }
                }}
              />
              <IconButton
                className="message__iconButton"
                disabled={!text}
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => updateMessage(props.id, text)}
              >
                <SendIcon />
              </IconButton>
            </form>
          )}
        </CardContent>
      </Card> */}
    </div>
  );
});

export default Message;
