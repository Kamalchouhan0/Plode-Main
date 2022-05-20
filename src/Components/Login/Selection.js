import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import learn from "../../Assets/Learn button.png";
import play from "../../Assets/play button.png";
import program from "../../Assets/program button.png";
import renderImage from "../../source/importImg";
import SMSlider from "../ReusableComponents/SelectModeSlider/SMSlider";
import SelectionStyle from "./Selection.module.css";

function Selection(props) {
  let history = useHistory();

  const gobackUrl = () => {
    history.push("/deviceSelection");
  };

  const [isHelp, setHelp] = useState(false);

  const handleHelpBtn = (e) => {
    if (isHelp == true) {
      setHelp(false);
    } else {
      setHelp(true);
    }
  };
  const playBtn = () => {
    history.push("/introduction");
  };
  const programBtn = () => {
    localStorage.setItem("programMode", "program");

    history.push("/visualProgram");
  };
  const learnBtn = () => {
    window.location.assign("https://tinkerbunker.com/courses/play-computer/");
  };

  useEffect(() => {
    console.log(JSON.parse(sessionStorage.getItem("user")), "KAMAL");
    let no_port = props.webserialPort.name;
    let gg = sessionStorage.getItem("Hardware");
    console.log("PORT Data", gg);
    if (no_port == "Not Connected" && gg != "No Hardware") {
      history.push("/deviceSelection");
    }
    if (no_port == "Not Connected") {
      console.log(JSON.parse(sessionStorage.getItem("webSerialPortList")));
      console.log("SERIAL PORT NOT CONNECTED");
    } else {
      OpenReadComPort();
    }
  }, []);

  const OpenReadComPort = async () => {
    const p_Port = props.webserialPort; //redux props
    if (p_Port == null) {
      history.push("/deviceSelection");
    }
    console.log(p_Port, "p_Port");
    try {
      console.log("OPENED");
      await p_Port.open({ baudRate: 120000 });
    } catch (e) {
      console.log(e);
    }

    console.log(p_Port, "p_Port");
  };

  return (
    <div className={SelectionStyle.Main_Select}>
      <div className={SelectionStyle.Select_Header}>
        <div>
          <img
            className={SelectionStyle.Back_Btn}
            src={renderImage("backBtn")}
            onClick={gobackUrl}
          ></img>
        </div>
        <div>
          <p className={SelectionStyle.Play_Comp}>Play Computer</p>
        </div>
        <div></div>
        <div>
          {isHelp == false ? (
            <img
              className={SelectionStyle.Help_Bttn}
              src={renderImage("helpBtnInActive")}
              onClick={handleHelpBtn}
            ></img>
          ) : (
            <div className={SelectionStyle.S_slide}>
              <SMSlider />
            </div>
          )}
          {isHelp ? (
            <img
              className={SelectionStyle.helpClose}
              src={renderImage("clos")}
              onClick={handleHelpBtn}
            ></img>
          ) : null}
        </div>
      </div>
      <div></div>
      <div className={SelectionStyle.Play_Body}>
        <div></div>

        <div className={SelectionStyle.Play_Div}>
          <div
            style={{
              height: "65%",
              width: "85%",
              marginTop: "15%",
              marginLeft: "10%",
              cursor: "pointer",
            }}
            onClick={playBtn}
          ></div>
          <div>
            <img className={SelectionStyle.Play_Button} src={play}></img>

            <h1 className={SelectionStyle.Play_txt} onClick={playBtn}>
              Play
            </h1>
          </div>
        </div>

        <div></div>
        <div>
          <div
            style={{
              height: "65%",
              width: "83%",
              marginTop: "15%",
              marginLeft: "5%",

              cursor: "pointer",
            }}
            onClick={learnBtn}
          ></div>
          <img className={SelectionStyle.Learn_Button} src={learn}></img>
          <h1 className={SelectionStyle.Learn_txt} onClick={learnBtn}>
            Learn
          </h1>
        </div>
        <div></div>
        <div>
          <div
            style={{
              height: "65%",
              width: "75%",
              marginTop: "15%",
              marginLeft: "5%",

              cursor: "pointer",
            }}
            onClick={programBtn}
          ></div>
          <div>
            <img className={SelectionStyle.Program_Button} src={program}></img>
            <h1 className={SelectionStyle.Program_txt} onClick={programBtn}>
              Code
            </h1>
          </div>
        </div>

        <div></div>
      </div>
      <div></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);

  return {
    webserialPort: state.webSerial,
  };
};

export default connect(mapStateToProps)(Selection);
