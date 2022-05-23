import React, { useEffect } from "react";
import { useHistory } from "react-router";
import ReactLoading from "react-loading";
import SelectionStyle from "./Selection.module.css";
import renderImage from "../../source/importImg";

function Load() {
  let history = useHistory();

  const gobackurl = () => {
    window.location.assign("./Selection");
  };

  useEffect(() => {
    window.location.assign("https://tinkerbunker.com/courses/play-computer/");
  });

  return (
    <div>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: " 90vh",
          background: "white",
        }}
      >
        <img
          className={SelectionStyle.Back_Btn}
          src={renderImage("backBtn")}
          onClick={gobackurl}
        ></img>
        <ReactLoading
          type="spokes"
          height="100px"
          width="100px"
          color="blue"
          className={SelectionStyle.load_gif}
        />

        <h1 className={SelectionStyle.load_gif}>Loading</h1>
      </div>
    </div>
  );
}

export default Load;
