import React, { CSSProperties } from "react";

export default function DividerMobile() {
  const containerStyle: CSSProperties = { width: "60%" };
  const wrapperStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    // margin: "0 auto",
    background:
      "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0))",
  };

  const dividerStyle: CSSProperties = {
    position: "relative",
    height: "1px",
    width: "100%",
    backgroundColor: "transparent",
    overflow: "hidden",
  };

  const blurStyle: CSSProperties = {
    content: "",
    position: "absolute",
    top: "0",
    left: "-5%",
    width: "200%",
    height: "100%",
    backgroundColor: "#000",
    filter: "blur(10px)",
  };

  const spanStyle: CSSProperties = {
    position: "absolute",
    top: "-10px",
    left: "5%",
    transform: "translateX(-5%)",
    padding: "0 10px",
    backgroundColor: "#fff",
  };

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <div style={dividerStyle}>
          <span style={blurStyle}></span>
          <span style={blurStyle}></span>
          <span style={spanStyle}></span>
        </div>
      </div>
    </div>
  );
}
