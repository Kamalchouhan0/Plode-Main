import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ReactLoading from "react-loading";
import SelectionStyle from "./Selection.module.css";
import renderImage from "../../source/importImg";
import Iframe from "react-iframe";
function Load() {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const gobackurl = () => {
    // window.location.assign("./Selection");
    history.push("/Selection");
  };

  // useEffect(() => {
  //   window.location.assign("https://tinkerbunker.com/courses/play-computer/");
  // });

  return (
    <div>
      <div
        style={{
          position: "absolute",
          background: "none",
          zIndex: 3,
        }}
      >
        <img
          className={SelectionStyle.Back_Btn}
          src={renderImage("backBtn")}
          onClick={gobackurl}
        ></img>
        {loading ? (
          <ReactLoading
            type="spokes"
            height="100px"
            width="100px"
            color="#f59f0a"
            className={SelectionStyle.load_gif}
          />
        ) : null}

        {/* <h1 className={SelectionStyle.load_gif}>Loading</h1> */}
      </div>

      <Iframe
        url="https://tinkerbunker.com/courses/play-computer/"
        width={window.innerWidth}
        height={window.innerHeight}
        id="myId"
        onLoad={() => {
          setLoading(false);
        }}
        className="myClassname"
        display="initial"
        position="relative"
      />
    </div>
  );
}

export default Load;
