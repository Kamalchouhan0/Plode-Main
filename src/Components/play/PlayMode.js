import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import renderImage from "../../source/importImg";
// import { webSerialAction } from "../../redux/actions/index";
import ImgSlider from "../ReusableComponents/ImgSlider/ImgSlider";
import "./PlayMode.css";

const writePort = async (data) => {
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
};
function Play(props) {
  const PLAY = [
    "P".charCodeAt(),
    "L".charCodeAt(),
    "A".charCodeAt(),
    "Y".charCodeAt(),
  ];
  writePort(PLAY);
  let history = useHistory();

  const gobackUrl = () => {
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

  // const [p1, setP1] = useState({
  //   selected: false,
  //   port: {},
  // });

  // useEffect(async () => {
  //   try {
  //     const portList = await navigator.serial.getPorts();

  //     if (portList.length === 1) {
  //       console.log(portList, "Hardware connected");

  //       props.webSerialAction({ port: portList[0] });

  //       setP1({
  //         selected: true,
  //         port: portList[0],
  //       });
  //     } else {
  //       console.log("No hardware");

  //       setP1({ p1 });
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }, []);

  // console.log(p1, "render");
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

export default Play;
// const mapStateToProps = (state) => {
//   return {
//     webserialPort: state.webSerial,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     webSerialAction: (data) => {
//       console.log("mapDispatchToProps", data);
//       dispatch(webSerialAction(data));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Play);
