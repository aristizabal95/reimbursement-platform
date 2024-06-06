import React, { useState } from "react";

const ImageMagnifier = ({ detail }) => {
  // Taken from:
  // https://codesandbox.io/p/sandbox/image-magnifier-3jsqs?file=%2Fsrc%2FApp.tsx%3A57%2C1-85%2C14&from-embed=
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  const handleMouseEnter = (e) => {
    // update image size and turn-on magnifier
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    elem.style.opacity = "0.5";
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const handleMouseMove = (e) => {
    // update cursor position
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();

    // calculate cursor position on the image
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setXY([x, y]);
  };

  const handleMouseLeave = (e) => {
    const elem = e.currentTarget;
    elem.style.opacity = "1";
    setShowMagnifier(false);
  };

  const [magnifierHeight, magnifieWidth, zoomLevel] = [96, 130, 4];
  const divStyle = {
    display: showMagnifier ? "" : "none",
    // set size of magnifier
    height: `${magnifierHeight}px`,
    width: `${magnifieWidth}px`,
    top: `${y - magnifierHeight / 2}px`,
    left: `${x - magnifieWidth / 2}px`,
    backgroundImage: `url('${detail.url}')`,
    backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
    backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
    backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
  };

  return (
    <figure className="relative overflow-hidden block">
      <img
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="sourceref"
        alt="source"
        src={detail.url}
      ></img>
      <div
        className="absolute opacity-100 pl-4 border-gray bg-white bg-no-repeat pointer-events-none"
        style={divStyle}
      ></div>
    </figure>
  );
};

export default ImageMagnifier;
