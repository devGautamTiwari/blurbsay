import React, { forwardRef, useState, useLayoutEffect } from "react";
// import db from "./firebase";
// import DeleteIcon from "@material-ui/icons/Delete";
import animationValues from "./AnimationValues";
import "./assets/css/Message.css";

const Message = forwardRef((props, ref) => {
  const text = props.message.text;
  const isUser = props.email === props.message.email;
  const [isAnimating, setIsAnimating] = useState(true);
  const isInViewPort = (ele) => {
    const eleTop = ele.getBoundingClientRect().top;
    const eleOff = eleTop / 2;
    return eleOff >= -80 && eleOff <= window.innerHeight / 2 - 80;
  };
  useLayoutEffect(() => {
    const bindAnimation = () => {
      const eleInViewPort = isInViewPort(
        document.querySelector("#blob__" + props.id)
      );
      eleInViewPort ? setIsAnimating(true) : setIsAnimating(false);
    };
    document.addEventListener("scroll", bindAnimation);
    return () => document.removeEventListener("scroll", bindAnimation);
  }, []);

  return (
    <div
      ref={ref}
      className={`message${props.className ? " " + props.className : ""}${
        isUser ? " message__self" : " message__other"
      }`}
    >
      <div className="message__blob" id={`blob__${props.id}`}>
        <svg
          className="message__blobSvg"
          viewBox={`0 0 ${props.message.blobSize} ${props.message.blobSize}`}
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
                keyTimes="0; 0.3; 0.4; 0.6; 0.9; 1"
                calcMode="paced"
                dur={isAnimating ? "5.5s" : "0s"}
                repeatCount="indefinite"
                begin={`${Math.random()}s`}
              />
            </path>
            <foreignObject>
              <p
                xmlns="http://www.w3.org/1999/xhtml"
                className="message__blobText"
              >
                {text.trim()}
              </p>
            </foreignObject>
          </g>
        </svg>
      </div>
    </div>
  );
});

export default Message;
