import React from "react";
const SplashScreen = () => {
  const style = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: "absolute",
    margin: "auto"
  };
  return <img src="/static/loader.svg" style={style} alt="Please Wait" />;
};

export default SplashScreen;
