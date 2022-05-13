import React, { memo } from "react";
import renderPrgImage from "../../../source/programImg";
import { Handle } from "react-flow-renderer";
import CustomNodeFlow from "./Index";
// import {IllusLoginSrc} from '../../../source/source';
var assembly = JSON.parse(sessionStorage.getItem("assembly"));
export default memo(({ data }) => {
  var style = {
    position: "relative",
    cursor: "move",
    // backgroundImage: "url(images/Learn/tern.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",

    top: "-12px",
    height: "185px",
    width: "150px",
    zIndex: "1",
  };
  return (
    <>
      <Handle
        type="target"
        position="left"
        className="faltuA"
        style={{ background: "#555", top: 83 }}
        onConnect={(params) => console.log("handle onConnect", params)}
        id="d"
      />
      {/* <img
        src="Bisoft_UI/Main/PNG/PC_image@3x.png"
        alt="login"
        height="150px"
        width="150px"
      /> */}
      <div
        id="PC_sim"
        style={{
          ...style,
          backgroundImage: `url(${renderPrgImage("PCimg")})`,
          overflow: "visible",

          // background: "red",
        }}
      >
        <img
          //internal microphone
          id="PcinternalMic"
          src={renderPrgImage("PcinternalMicInActive")}
          style={{
            height: "43%",
            width: "25%",
            marginTop: "-75px",
            marginLeft: "37.5%",
          }}
          // onclick={(event) => {
          //   console.log(event, "i/p");
          //   //CustomNodeFlow.onElementClick(event, { id: "1", type: "input" });
          // }}
        />
        <img
          //left eye
          id="PcinternalLeftEYE"
          src={renderPrgImage("PcinternalEYEInActive")}
          style={{
            height: "16%",
            width: "12%",
            position: "absolute",
            top: "31%",
            left: "34%",
            transform: "translate(-34%, -31%)",
          }}
        />
        <img
          //right eye
          id="PcinternalRightEYE"
          src={renderPrgImage("PcinternalEYEInActive")}
          style={{
            height: "16%",
            width: "12%",
            position: "absolute",
            top: "31%",
            left: "67.5%",
            transform: `translate(-67.5%,-31%)`,
          }}
        />
        <img
          //4 in 1 sensor
          id="PcInternal4in1"
          src={renderPrgImage("Pcinternal4in1InActive")}
          style={{
            height: "10%",
            width: "8%",
            position: "absolute",
            left: "49%",
            top: "61%",
            transform: "translate(-30%, -61%)",
          }}
        />
        <img
          //smile led 1
          id="PcSmLed1"
          src={renderPrgImage("PcinternalTeethInActive")}
          style={{
            height: "20%",
            width: "3%",
            position: "absolute",
            top: "60%",
            left: "40.4%",
            transform: "translate(-40.4%, -60%)",
          }}
        />
        <img
          //smile led 2
          id="PcSmLed2"
          src={renderPrgImage("PcinternalTeethInActive")}
          style={{
            height: "20%",
            width: "3%",
            position: "absolute",
            top: "61.5%",
            left: "43.7%",
            transform: "translate(-43.5%, -61%)",
          }}
        />
        <img
          //smile led 3
          id="PcSmLed3"
          src={renderPrgImage("PcinternalTeethInActive")}
          style={{
            height: "20%",
            width: "3%",
            position: "absolute",
            top: "61%",
            left: "57%",
            transform: "translate(-57%, -61%)",
          }}
        />
        <img
          //smile led 4
          id="PcSmLed4"
          src={renderPrgImage("PcinternalTeethInActive")}
          style={{
            height: "20%",
            width: "3%",
            position: "absolute",
            top: "60%",
            left: "60.5%",
            transform: "translate(-60.3%, -60%)",
          }}
        />
        <img
          //Touch Pad 0
          id="PcInternalTouchpad0"
          src={renderPrgImage("PcinternalTouchpadsInActive")}
          style={{
            height: "11%",
            width: "6%",
            position: "absolute",
            left: "14%",
            bottom: "8.5%",
            transform: "translate(-30%, 0%)",
          }}
        />
        <img
          //Touch Pad 1
          id="PcInternalTouchpad1"
          src={renderPrgImage("PcinternalTouchpadsInActive")}
          style={{
            height: "11%",
            width: "6%",
            position: "absolute",
            left: "30.25%",
            bottom: "8.5%",
            transform: "translate(-30%, 0%)",
          }}
        />
        <img
          //touch pad 2
          id="PcInternalTouchpad2"
          src={renderPrgImage("PcinternalTouchpadsInActive")}
          style={{
            height: "11%",
            width: "6%",
            position: "absolute",
            left: "48.75%",
            bottom: "8.5%",
            transform: "translate(-30%, 0%)",
          }}
        />
        <img
          //internal buzzer
          id="PcInternalBuzzer"
          src={renderPrgImage("PcinternalBuzzerInActive")}
          style={{
            height: "114%",
            width: "114%",
            position: "absolute",
            left: "27.75%",
            bottom: "34.5%",
            transform: "translate(-30%, 0%)",
          }}
        />
      </div>
      <Handle
        type="source"
        position="right"
        className="faltuB"
        id="a"
        style={{ top: 83, background: "#555" }}
      />
      <Handle
        type="source"
        position="right"
        className="faltuB"
        id="b"
        style={{ top: 108, background: "#555" }}
      />
      <Handle
        className="faltuA"
        type="source"
        position="left"
        style={{ background: "#555", top: 108 }}
        id="c"
      />
    </>
  );
});
