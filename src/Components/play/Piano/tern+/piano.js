import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import unicodeToChar from "../../../../utils/unicodeToChar";
import { webSerialAction } from "../../../../redux/actions/index";
import renderImage from "../../../../source/importImg";
import MuscSlider from "../../../ReusableComponents/MuscSlider/MuscSlider";
import "./pianoo.css";

function Music(props) {
  let history = useHistory();

  const gobackUrl = () => {
    history.goBack();
  };

  var count = 0;

  const [isPianoKey, setPianoKey] = useState(true);
  const [isPcPiano, setPcPiano] = useState(false);

  const M1 = () => {
    let data = ["M".charCodeAt(), "0".charCodeAt()];
    writePort(data);
  };
  const M2 = () => {
    let data = ["M".charCodeAt(), "1".charCodeAt()];
    writePort(data);
  };
  const M3 = () => {
    let data = ["M".charCodeAt(), "2".charCodeAt()];
    writePort(data);
  };
  const M4 = () => {
    let data = ["M".charCodeAt(), "3".charCodeAt()];
    writePort(data);
  };
  const M5 = () => {
    let data = ["M".charCodeAt(), "4".charCodeAt()];
    writePort(data);
  };
  const M6 = () => {
    let data = ["M".charCodeAt(), "5".charCodeAt()];
    writePort(data);
  };
  const M7 = () => {
    let data = ["M".charCodeAt(), "6".charCodeAt()];
    writePort(data);
  };
  const M8 = () => {
    let data = ["M".charCodeAt(), "7".charCodeAt()];
    writePort(data);
  };
  const handlePianoKey = (e) => {
    if (isPianoKey) {
      setPianoKey(!isPianoKey);
      setPcPiano(!isPcPiano);
    } else {
      setPcPiano(!isPcPiano);
      setPianoKey(!isPianoKey);
    }
    var piano = { isPianoKey: isPianoKey, isPcPiano: isPcPiano };
    sessionStorage.setItem("piano", JSON.stringify(piano));
  };

  const handlePcPiano = (e) => {
    if (isPcPiano) {
      setPcPiano(!isPcPiano);
      setPianoKey(!isPianoKey);
    } else {
      setPcPiano(!isPcPiano);
      setPianoKey(!isPianoKey);
    }
    var piano = { isPianoKey: isPianoKey, isPcPiano: isPcPiano };
    sessionStorage.setItem("piano", JSON.stringify(piano));
  };
  const HdleUsb = async (e) => {
    const filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }];
    const port = await navigator.serial.requestPort({ filters });
    console.log("PORTS", port);
    if (port.onconnect == null) {
      setUsb(true);
    }
  };

  useEffect(() => {
    let no_port = props.webSerial.name;
    if (no_port == "Not Connected") {
      console.log(JSON.parse(sessionStorage.getItem("webSerialPortList")));
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
    });

    navigator.serial.addEventListener("disconnect", (e) => {
      setUsb(false);
      var user = 0;
      sessionStorage.setItem("user", JSON.stringify(user));
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
      console.log(e);
    }

    writePort("notWrite");

    console.log(p_Port, "p_Port");
  };
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  async function readLoop() {
    const port = props.webSerial;

    try {
      const portReader = port.readable.getReader();

      while (true) {
        const { value, done } = await portReader.read();

        var piano = JSON.parse(sessionStorage.getItem("piano"));
        console.log("done", piano.isPcPiano);
        if (piano.isPcPiano) break;
        const strg = unicodeToChar(value);
        let str = strg.trim();

        console.log(str, "uniCodeTOCHAR");

        if (str === "K494848") {
          console.log("VALUE IS COMING");
          var audio = new Audio(`${renderImage("AudioC")}`);
          audio.play();
          let data = ["K".charCodeAt(), "P".charCodeAt()];
          writePort(data);
        } else if (str === "K484948") {
          var audio = new Audio(`${renderImage("AudioD")}`);
          audio.play();
          let data = ["K".charCodeAt(), "P".charCodeAt()];
          writePort(data);
        } else if (str === "K484849") {
          var audio = new Audio(`${renderImage("AudioE")}`);
          audio.play();
          let data = ["K".charCodeAt(), "P".charCodeAt()];
          writePort(data);
        } else if (str === "K494948") {
          var audio = new Audio(`${renderImage("AudioF")}`);
          audio.play();
          let data = ["K".charCodeAt(), "P".charCodeAt()];
          writePort(data);
        } else if (str === "K484949") {
          var audio = new Audio(`${renderImage("AudioG")}`);
          audio.play();
          let data = ["K".charCodeAt(), "P".charCodeAt()];
          writePort(data);
        } else if (str === "K494849") {
          var audio = new Audio(`${renderImage("AudioA")}`);
          audio.play();
          let data = ["K".charCodeAt(), "P".charCodeAt()];
          writePort(data);
        } else if (str === "K494949") {
          var audio = new Audio(`${renderImage("AudioB")}`);
          audio.play();
          let data = ["K".charCodeAt(), "P".charCodeAt()];
          writePort(data);
        } else if (str === "K484848") {
          let data = ["K".charCodeAt(), "P".charCodeAt()];
          writePort(data);
        } else {
          let data = ["K".charCodeAt(), "P".charCodeAt()];
          writePort(data);
        }
      }
      portReader.releaseLock();
    } catch (e) {
      console.log(e);
    }
  }

  async function writePort(data) {
    try {
      const filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }];
      const ports = await navigator.serial.getPorts({ filters });
      console.log("portsss", ports);

      console.log("portsss", ports[0].writable);

      const writer = ports[0].writable.getWriter();

      const sata = data;
      const data1 = new Uint8Array(sata); // hello// 82, 76, 0, 0, 0, 82, 0, 0, 0, 66, 0, 0, 1, 0, 1,
      console.log("send data:+", data1);

      await writer.write(data1);

      writer.releaseLock();
    } catch (e) {
      console.log(e);
    }
  }

  if (isPcPiano) {
    let data = ["K".charCodeAt(), "P".charCodeAt()];

    writePort(data);
    readLoop();
    console.log("pcpiano on");
  }

  const [isHelp, setHelp] = useState(false);
  const [isUsb, setUsb] = useState(false);
  const handleHelpBtn = (e) => {
    if (isHelp == true) {
      setHelp(false);
    } else {
      setHelp(true);
      var audio = new Audio(`${renderImage("AudioB")}`);
      audio.play();
    }
  };

  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("user"));

    if (data === 1) {
      setUsb(true);
      console.log("LLLLLLLLLLLLLLL", data);
    } else {
      setUsb(false);
    }
  });

  return (
    <div className="Music-Main">
      <div className="Music_Header">
        <div>
          <img
            className="Back_BTNN"
            src={renderImage("backBtn")}
            onClick={gobackUrl}
          ></img>
        </div>
        <div>
          <p className="Play_Speech">Music</p>
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
              <MuscSlider />
            </div>
          )}
          {isHelp ? (
            <div>
              <img
                className="Ros"
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
      <div className="Music_Body">
        <div className="Piano">
          {isPianoKey == false ? null : (
            <div className="Piano_p">
              <div className=" a white a li" onClick={M1}></div>
              <div className="black as li"></div>
              <div className="white b li" onClick={M2}></div>
              <div className="black bs li"></div>
              <div className="white c li" onClick={M3}></div>

              <div className="white d li" onClick={M4}></div>
              <div className="black ds li"></div>
              <div className="white e li" onClick={M5}></div>
              <div className="black es li"></div>
              <div className="white f li" onClick={M6}></div>

              <div className="white g li" onClick={M7}></div>
              <div className="white h li" onClick={M8}></div>
              <div className="black hs li"></div>
            </div>
          )}
          {isPcPiano == false ? null : (
            <img className="Music_Ac" src={renderImage("PC")}></img>
          )}
        </div>
        <div className="">
          {isPianoKey == false ? null : (
            <img
              className="Disconnected"
              src={renderImage("Disconnected_Svg")}
            ></img>
          )}
          {isPcPiano == false ? null : (
            <img
              className="Disconnect"
              src={renderImage("Disconnected_Svg")}
            ></img>
          )}
        </div>
        <div className="">
          {isPianoKey == false ? null : (
            <img className="Music_Ace" src={renderImage("PC")}></img>
          )}
          {isPcPiano == false ? null : (
            <img
              className="Piano_Small"
              src={renderImage("Pianosmall_Svg")}
            ></img>
          )}
        </div>
        <div className="">
          <img
            className="Pianotoggle_Bg"
            src={renderImage("Pianotogglebg_Svg")}
          ></img>

          {isPianoKey == false ? (
            <img
              className="Piano_Keys"
              src={renderImage("PianokeysIA")}
              onClick={handlePianoKey}
            ></img>
          ) : (
            <img
              className="Piano_Keys"
              src={renderImage("PianokeysAc")}
              onClick={handlePianoKey}
            ></img>
          )}

          {isPcPiano == false ? (
            <img
              className="Pc_Piano"
              src={renderImage("PcpianoIA")}
              onClick={handlePcPiano}
            ></img>
          ) : (
            <img
              className="Pc_Piano"
              src={renderImage("PcpianoAc")}
              onClick={handlePcPiano}
            ></img>
          )}
        </div>
      </div>
      <div>
        {isPcPiano == false ? (
          <h3 className="Music_Instruc">
            Tap the keys of the piano to play music
          </h3>
        ) : (
          <h3 className="Music_Instruc2">
            Tap the touch pads on Play Computer to play music
          </h3>
        )}
      </div>
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Music);
