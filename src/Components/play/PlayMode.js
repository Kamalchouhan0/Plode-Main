import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import renderImage from "../../source/importImg";
import { webSerialAction } from "../../redux/actions/index";
import ImgSlider from "../ReusableComponents/ImgSlider/ImgSlider";
import "./PlayMode.css";

function Play(props) {
  const PLAY = [
    "P".charCodeAt(),
    "L".charCodeAt(),
    "A".charCodeAt(),
    "Y".charCodeAt(),
  ];
  setTimeout(() => {
    writePort(PLAY);
  }, 1000);

  let history = useHistory();

  const gobackUrl = () => {
    history.goBack();
  };
  const [isHelp, setHelp] = useState(false);
  const [isUsb, setUsb] = useState(false);

  const handleHelpBtn = (e) => {
    if (isHelp == true) {
      setHelp(false);
    } else {
      setHelp(true);
    }
  };
  const divstyle = {
    height: "90%",
    width: "90%",
    marginTop: "5%",
    marginLeft: "5%",
    cursor: "pointer",
  };

  const RemoteBtn = () => {
    history.push("/remote-Ace");
  };
  const SpeechBtn = () => {
    console.log("SPEECH CLICKED");
    history.push("/speak");
  };
  const MusicBtn = () => {
    history.push("/music");
  };
  const CameraBtn = () => {
    history.push("/camera");
  };

  async function writePort(data) {
    console.log("Wdata", data);
    try {
      const filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }];
      const ports = await navigator.serial.getPorts({ filters });

      console.log("portsss", ports);

      console.log("portsss", ports[0].writable);
      // const outputStream = ports[0].writable,
      const writer = ports[0].writable.getWriter();
      // writer = outputStream.getWriter();
      if (data != "notWrite") {
        const Wdata = data;

        console.log("Wdata", Wdata);

        const data1 = new Uint8Array(Wdata); //  82, 76, 0, 0, 0, 82, 0, 0, 0, 66, 0, 0, 1, 0, 1,

        console.log("send data:+", data1);
        await writer.write(data1);
      }
      writer.releaseLock();
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    let no_port = props.webSerial;
    if (no_port.name != "Not Connected" || no_port.readable != null) {
      console.log("WORKING>>>>>>>>");
      OpenReadComPort();
    }
  });

  useEffect(async () => {
    navigator.serial.addEventListener("connect", (e) => {
      setUsb(true);
      // var user = 1;
      // sessionStorage.setItem("user", JSON.stringify(user));
    });

    navigator.serial.addEventListener("disconnect", async (e) => {
      setUsb(false);
      // var user = 0;
      // sessionStorage.setItem("user", JSON.stringify(user));
      const p_Port = props.webSerial;
      try {
        await p_Port.close();
      } catch (e) {}
    });

    try {
      const filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }];
      const portList = await navigator.serial.getPorts({ filters });

      if (portList.length === 1) {
        console.log(portList, "Hardware connected");

        await props.webSerialAction({ port: portList[0] }); // dispatching function of redux

        // setP1({
        //   selected: true,
        //   port: portList[0],
        // });
      } else {
        console.log("No hardware");

        // setP1({ p1 });
      }
    } catch (err) {
      console.log(err.message);
    }
  });

  const OpenReadComPort = async () => {
    const p_Port = props.webSerial;

    console.log(props, "p_Port");
    if (p_Port.onconnect == null) {
      console.log("TRUE");
      let v = 1;
      sessionStorage.setItem("user", JSON.stringify(v));
    }
    try {
      console.log("OPENED");
      await p_Port.open({ baudRate: 120000 });
    } catch (e) {
      console.log(e);
      // p_Port.close();
      // await p_Port.open({ baudRate: 120000 });
    }

    writePort("notWrite");
    console.log(p_Port, "p_Port");
  };
  return (
    <div className="Main_Play">
      <div>
        <img
          className="Back_Btn"
          src={renderImage("backBtn")}
          onClick={gobackUrl}
        ></img>
        <img className="Play_Card" src={renderImage("PlayCard_Svg")}></img>
        <h1 className="Play_txxt">Play</h1>
        {isHelp == false ? (
          <img
            className="Help_Button"
            src={renderImage("helpBtnInActive")}
            onClick={handleHelpBtn}
          ></img>
        ) : (
          <div className="IMG-slide">
            <ImgSlider />
          </div>
        )}
        {isHelp ? (
          <img
            className="help_close"
            src={renderImage("clos")}
            onClick={handleHelpBtn}
          ></img>
        ) : null}
      </div>
      <div className="Play_Functions">
        <div></div>
        {isHelp ? (
          <div style={{ zIndex: "-10" }}>
            <Link to="/remote">
              <img
                className="Remote_Card"
                src={renderImage("RemoteCard_Svg")}
              ></img>

              <h1 className="Remote_txt">Remote </h1>
            </Link>
          </div>
        ) : (
          <div>
            <div style={divstyle} onClick={RemoteBtn}></div>
            <img
              className="Remote_Card"
              src={renderImage("RemoteCard_Svg")}
            ></img>

            <h1 className="Remote_txt" onClick={RemoteBtn}>
              Remote
            </h1>
          </div>
        )}

        <div></div>

        {isHelp ? (
          <div style={{ zIndex: "-10" }}>
            <Link to="/speak">
              <img
                className="Speech_Card"
                src={renderImage("SpeechCard_Svg")}
              ></img>

              <h1 className="Speech_txt">Speech</h1>
            </Link>
          </div>
        ) : (
          <div>
            <div style={divstyle} onClick={SpeechBtn}></div>

            <img
              className="Speech_Card"
              src={renderImage("SpeechCard_Svg")}
            ></img>

            <h1 className="Speech_txt" onClick={SpeechBtn}>
              Speech
            </h1>
          </div>
        )}
        <div></div>

        {isHelp ? (
          <div style={{ zIndex: "-10" }}>
            <Link to="/music">
              <img
                className="Music_Card"
                src={renderImage("MusicCard_Svg")}
              ></img>

              <h1 className="Music_txt">Music</h1>
            </Link>
          </div>
        ) : (
          <div>
            <div style={divstyle} onClick={MusicBtn}></div>
            <img
              className="Music_Card"
              src={renderImage("MusicCard_Svg")}
            ></img>

            <h1 className="Music_txt" onClick={MusicBtn}>
              Music
            </h1>
          </div>
        )}

        <div></div>

        {isHelp ? (
          <div style={{ zIndex: "-10" }}>
            <Link to="/camera">
              <img
                className="Camera_Card"
                src={renderImage("Camera_Svg")}
              ></img>

              <h1 className="Camera_txt">Camera</h1>
            </Link>
          </div>
        ) : (
          <div>
            <div style={divstyle} onClick={CameraBtn}></div>
            <img className="Camera_Card" src={renderImage("Camera_Svg")}></img>

            <h1 className="Camera_txt" onClick={CameraBtn}>
              Camera
            </h1>
          </div>
        )}

        <div></div>

        <div></div>
      </div>
      <div></div>
    </div>
  );
}

// export default Play;
const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Play);
