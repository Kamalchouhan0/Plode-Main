import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import unicodeToChar from "../../../../utils/unicodeToChar";

import "./camera.css";
import { useHistory } from "react-router";
import { webSerialAction } from "../../../../redux/actions/index";

import renderImage from "../../../../source/importImg";

import * as facemesh from "@tensorflow-models/face-landmarks-detection";

import Webcam from "react-webcam";
import { useRef } from "react";
import CamSlider from "../../../ReusableComponents/CamSlider/CamSlider";
import { drawMesh } from "./utilities";

function Camera(props) {
  useEffect(() => {
    let data = ["C".charCodeAt(0), "0".charCodeAt(0)];
    writePort(data);
  }, []);
  const connectedACE = {
    height: "90%",
    width: "100%",
    backgroundImage: `url("/playImages/ace_con.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    position: "relative",
    left: "5px",
  };

  let history = useHistory();

  const gobackUrl = () => {
    let data = ["C".charCodeAt(0), "0".charCodeAt(0)];
    writePort(data);
    history.goBack();
  };

  const [isHelp, setHelp] = useState(false);

  const handleHelpBtn = (e) => {
    if (isHelp == true) {
      setHelp(false);
    } else {
      setHelp(true);
    }
  };
  const HdleUsb = async (e) => {
    const filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }];
    const port = await navigator.serial.requestPort({ filters });
    if (port.onconnect == null) {
      // window.location.reload(false);
      setUsb(true);
    }
  };
  // setup
  const webcamRef = useRef(null);

  const canvasRef = useRef(null);

  // DATA FACE
  let [faceData, setFaceData] = useState(false);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // facemesh
    const runFacemesh = async () => {
      // document.getElementById("loaderContainer").style.display = "block";

      const net = await facemesh.load(
        facemesh.SupportedPackages.mediapipeFacemesh,
        { maxFaces: "1", detectionConfidence: "0.9" }
      );

      // document.getElementById("loaderContainer").style.display = "none";

      console.log("net", net);
      setInterval(() => {
        // Get canvas context

        detect(net, ctx);
      }, 10);
    };

    const detect = async (net, ctx) => {
      console.log();

      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        // Set canvas width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Make Detections
        const face = await net.estimateFaces({
          input: video,
        });

        setFaceData(true);

        console.log("FACE", face);

        // // Get canvas context
        // const ctx = canvasRef.current.getContext("2d");

        if (ctx != null) {
          requestAnimationFrame(() => {
            drawMesh(face, ctx);
          });
        }
      }
    };

    runFacemesh();
  }, []);

  let interval;

  //const socket = io("http://localhost:3008");

  useEffect(() => {
    // let no_port = props.webserialPort.name;
    // if (no_port == "Not Connected") {
    //   console.log("SERIAL PORT NOT CONNECTED");
    // } else {
    interval = setInterval(() => {
      let data = localStorage.getItem("faceSide");
      let url = window.location.href;
      let path = "http://localhost:3008/camera";
      console.log("5ms : ", url);
      if (data === "Left") {
        let data = ["C".charCodeAt(), "2".charCodeAt()];
        console.log(" emit L ", data);
        // socket.emit("/camera", data);
        writePort(data);
      } else if (data === "Right") {
        let data = ["C".charCodeAt(), "1".charCodeAt()];
        // socket.emit("/camera", data);
        writePort(data);
        console.log("emit R ", data);
      } else if (data === "Center") {
        let data = ["C".charCodeAt(), "0".charCodeAt()];
        // socket.emit("/camera", data);
        writePort(data);
        console.log("emit C ", data);
      } else if (data === "Up") {
        let data = ["C".charCodeAt(), "3".charCodeAt()];
        // socket.emit("/camera", data);
        writePort(data);
        console.log("emit T ", data);
      } else if (data === "Down") {
        let data = ["C".charCodeAt(), "4".charCodeAt()];
        // socket.emit("/camera", data);
        writePort(data);
        console.log("emit B ", data);
      } else if (data === "Smile") {
        let data = ["C".charCodeAt(), "5".charCodeAt()];
        // socket.emit("/camera", data);
        writePort(data);
        console.log("emit S ", data);
      } else return;
    }, 500);
    return () => {
      clearInterval(interval);
    };
    // }
  }, []);
  console.log("interval", interval);

  const [isUsb, setUsb] = useState(false);

  //  WEB SERIAL   //
  useEffect(() => {
    let no_port = props.webSerial.name;
    if (no_port == "Not Connected") {
      console.log("SERIAL PORT NOT CONNECTED");
    } else {
      OpenReadComPort();
    }
  });
  useEffect(async () => {
    navigator.serial.addEventListener("connect", (e) => {
      setUsb(true);
      var user = 1;
      sessionStorage.setItem("user", JSON.stringify(user));
      const PLAY = [
        "P".charCodeAt(),
        "L".charCodeAt(),
        "A".charCodeAt(),
        "Y".charCodeAt(),
      ];
      setTimeout(() => {
        writePort(PLAY);
      }, 2000);
    });

    navigator.serial.addEventListener("disconnect", async (e) => {
      setUsb(false);
      var user = 0;
      sessionStorage.setItem("user", JSON.stringify(user));
      const p_Port = props.webSerial;
      try {
        await p_Port.close();
      } catch (e) {}
    });
    try {
      const portList = await navigator.serial.getPorts();

      if (portList.length === 1) {
        console.log(portList, "Hardware connected");

        await props.webSerialAction({ port: portList[0] }); // dispatching function of redux

        this.setState.p1({
          selected: true,
          port: portList[0],
        });
      } else {
        console.log("No hardware");

        this.setState.p1(this.state.p1);
      }
    } catch (err) {
      console.log(err.message);
    }
  });
  const OpenReadComPort = async () => {
    const p_Port = props.webSerial;
    console.log(p_Port, "p_Port");

    try {
      console.log("OPENED");
      await p_Port.open({ baudRate: 120000 });
    } catch (e) {
      // p_Port.close();
      // await p_Port.open({ baudRate: 120000 });
    }

    writePort("notWrite");
    // let portReader = p_Port.readable.getReader();

    // let portWriter = p_Port.writable.getWriter();

    setTimeout(async () => {
      try {
        let portReader = p_Port.readable.getReader();

        // let portWriter = portList.writable.getWriter();

        while (true) {
          const { value, done } = await portReader.read();
          console.log("value", value);
          console.log("done", done);

          const strg = unicodeToChar(value);
          let str = strg.trim();

          console.log(str, "uniCodeTOCHAR");
          if (done) {
            console.log("[readLoop] DONE", done);
            portReader.releaseLock();
            break;
          }
        }
      } catch (e) {
        console.log(e);
      }
    }, 1000);
    // while (true) {
    //   const { value, done } = await portReader.read();
    //   console.log("value", value);
    //   console.log("done", done);

    //   const str = unicodeToChar(value);

    //   console.log(str, "uniCodeTOCHAR");

    //   if (done) {
    //     console.log("[readLoop] DONE", done);
    //     portReader.releaseLock();
    //     break;
    //   }
    // }
    if (p_Port.ondisconnect == null) {
      setUsb(true);
    }
    console.log(p_Port, "p_Port");
  };
  async function writePort(data) {
    // const ports = await navigator.serial.getPorts();
    // console.log("portsss", ports);

    // console.log("portsss", ports[0].writable);
    // // const outputStream = ports[0].writable,
    // const writer = ports[0].writable.getWriter();
    // // writer = outputStream.getWriter();
    // if (data != "notWrite") {
    //   const sata = data;
    //   const data1 = new Uint8Array(sata); // hello// 82, 76, 0, 0, 0, 82, 0, 0, 0, 66, 0, 0, 1, 0, 1,
    //   console.log("send data:+", data1);
    //   await writer.write(data1);
    // }
    // writer.releaseLock();

    try {
      const filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }];
      const ports = await navigator.serial.getPorts({ filters });
      console.log("portsss", ports);

      console.log("portsss", ports[0].writable);
      // const outputStream = ports[0].writable,
      const writer = ports[0].writable.getWriter();
      // writer = outputStream.getWriter();
      const sata = data;
      const data1 = new Uint8Array(sata); // hello// 82, 76, 0, 0, 0, 82, 0, 0, 0, 66, 0, 0, 1, 0, 1,
      console.log("send data:+", data1);

      await writer.write(data1);

      writer.releaseLock();
    } catch (e) {
      console.log(e);
    }
  }

  // ++++++++++++++ //

  useEffect(() => {
    //socket.emit("_usbDetection", "Hi i am firoz");
    //socket.on("/usbDetection1", (data) => {
    // console.log("...............8", data);
    // // let kill = Array.from(data);
    // // console.log("...............5", kill);
    // if (data == 1) {
    //   setUsb(true);
    //   console.log("LLLLLLLLLLLLLLL", data);
    // } else {
    //   setUsb(false);
    // }
    // });
    let data = JSON.parse(sessionStorage.getItem("user"));

    if (data === 1) {
      setUsb(true);
      console.log("LLLLLLLLLLLLLLL", data);
    } else {
      setUsb(false);
    }
  });

  return (
    <div className="Camera-Main">
      <div className="Camera_Header">
        <div>
          <img
            className="Back_BTNN"
            src={renderImage("backBtn")}
            onClick={gobackUrl}
          ></img>
        </div>
        <div>
          {" "}
          <p className="Play_Speech">Camera</p>
        </div>
        <div></div>
        <div>
          {isHelp == false ? (
            <img
              className="Help_btn"
              src={renderImage("helpBtnInActive")}
              onClick={handleHelpBtn}
            ></img>
          ) : (
            <div className="Musc_Slider">
              <CamSlider />
            </div>
          )}
          {isHelp ? (
            <div>
              <img
                className="Crs"
                src={renderImage("clos")}
                onClick={handleHelpBtn}
              ></img>
            </div>
          ) : null}
        </div>
        <div>
          {" "}
          {isUsb ? (
            <img
              className="Bluetooth_Button"
              src={renderImage("UsbOn")}
              onClick={HdleUsb}
            ></img>
          ) : (
            <img
              className="Bluetooth_Button"
              src={renderImage("UsbOff")}
              onClick={HdleUsb}
            ></img>
          )}
        </div>
      </div>

      <div className="Camera123">
        <img className="PopUp_Card" src={renderImage("popup_Svg")}></img>
        {!faceData ? (
          <div id="loaderContainer">
            <div id="loader" class="Camera_loader"></div>
            <p
              className="loaderText"
              style={{
                marginLeft: "-17%",
                color: "black",

                textShadow: "0px 0px 2px white",
              }}
            >
              Loading AI Engine
            </p>
          </div>
        ) : (
          console.log("SO YES")
        )}
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            // marginLeft: "auto",
            // marginRight: "auto",
            left: "16%",
            right: 0,
            top: "25%",
            textAlign: "center",
            zIndex: 9,
            width: "30%",
            height: "50%",
            transform: "scaleX(-1)",
          }}
        />

        <canvas
          className="canvas"
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            top: "34.5%",
            left: "-38%",
            right: 0,
            textAlign: "center",
            zIndex: "9",
            width: "30%",
            height: "100% + 10%",

            display: "none",
            // height: "100%",
            // border: "2px solid red",
            display: "block",
          }}
        />
        <img
          className="Camera_Disconnected"
          src={renderImage("Disconnected_Svg")}
        ></img>

        <img className="Camera_Ace" src={renderImage("PC")}></img>
        {/* <h1>{faceData}</h1> */}
      </div>

      <div>
        <h3 className="Camera_Instruc">
          Tilt your head in different directions to see the Play Computer
          respond
        </h3>
      </div>
    </div>
  );
}
// export default Camera;

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    webSerialAction: (data) => {
      console.log("mapDispatchToProps", data);
      dispatch(webSerialAction(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
