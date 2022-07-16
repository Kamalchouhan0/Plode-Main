import html2canvas from "html2canvas";
import React, { Component } from "react";
import { createBrowserHistory } from "history";
import CustomNodeFlow from "../Simulate/DnD/Index";
import { Link } from "react-router-dom";
import renderPrgImage from "../../source/programImg";
import SavePrgm from "../ReusableComponents/PrgmSlider/SavePrgm/SavePrgm";
import "./saveFlow.css";

const axios = require("axios");
const history = createBrowserHistory();

class SaveFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      discription: "",
      link: "",
      imgURL: "",
      isHelp: false,
      keys: false,
      l: false,
    };
  }
  componentDidMount = () => {
    console.log(sessionStorage.length);
    var self = this;

    if (JSON.parse(sessionStorage.getItem("saveProps")) != null) {
      var div = (document.getElementById("assemblyShot").style.visibility =
        "hidden");
    } else {
      var div = document.getElementById("assemblyShot");

      for (let i = 0; i < sessionStorage.length; i++) {
        const keyss = sessionStorage.key(i);
        const ll = sessionStorage.getItem(keyss);
        this.setState({ keys: keyss });
        // localStorage.setItem(keyss, ll);
        this.setState({ l: ll });
        // this.state.keys = keyss;
        // this.state.l = ll;
        // const l = sessionStorage.getItem(keys);

        // const values = sessionStorage.value(i);
        // console.log(`${keyss}: ${sessionStorage.getItem(keyss)}`);
        // sessionStorage.setItem(`${keys}`, l);
      }
    }
    console.log("dataas", this.state.keys, this.state.l);

    var img = sessionStorage.getItem("IMGEURL");
    console.log("dataas", img);
    // if (
    //   sessionStorage.getItem("assempblyImageHTML") &&
    //   sessionStorage.getItem("assempblyImageHTML") != "" &&
    //   JSON.parse(sessionStorage.getItem("saveProps")) == null
    // ) {
    //   div.innerHTML = sessionStorage.getItem("assempblyImageHTML");
    //   html2canvas(div).then(function (canvas) {
    //     div.innerHTML = "";
    //     var img = canvas.toDataURL("image/png");
    //     sessionStorage.setItem("assempblyImageURI", img);
    //     var imgTag = document.getElementById("screenshot");
    self.setState({ imgURL: img });
    //     imgTag.src = img;
    //   });
    // }
    // var div = document.getElementById("assemblyShot");
    // div.innerHTML = sessionStorage.getItem("assempblyImageHTML");
  };

  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };
  helpBtn = (e) => {
    this.setState({ isHelp: !this.state.isHelp });
  };
  saveFlow = () => {
    console.log("SAVE BTN CLICK");
    let allData = {
      ...this.state,
      bytes: JSON.parse(sessionStorage.getItem("Bytes")),
    };
    // console.log("DATA BATA:", allData);
    let formData = JSON.parse(localStorage.getItem("FlowData")) || [];
    formData.push(allData);
    localStorage.setItem("FlowData", JSON.stringify(formData));
    // sessionStorage.setItem("projectData", JSON.stringify(allData));

    var x = document.getElementById("SaveAlert");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 1500);

    axios
      .post("http://localhost:3008/saveProject", allData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // console.log(response.data);
        console.log("ERROR", error.message);
      });

    var arr = Object.keys(sessionStorage);

    let history = {
      name: this.state.name,
      isSmileTwo: JSON.parse(sessionStorage.getItem("isSmileTwo")) || false,
      isColorSensor:
        JSON.parse(sessionStorage.getItem("isColorSensor")) || false,
      A: JSON.parse(sessionStorage.getItem("A")) || false,
      A1DIGI: JSON.parse(sessionStorage.getItem("A1DIGI")) || false,
      A2DIGI: JSON.parse(sessionStorage.getItem("A2DIGI")) || false,
      isGestureSensor:
        JSON.parse(sessionStorage.getItem("isGestureSensor")) || false,
      C1DIGI: JSON.parse(sessionStorage.getItem("C1DIGI")) || false,
      C2DIGI: JSON.parse(sessionStorage.getItem("C2DIGI")) || false,
      a1IO: JSON.parse(sessionStorage.getItem("a1-I/O")) || false,
      a2IO: JSON.parse(sessionStorage.getItem("a2-I/O")) || false,

      b1IO: JSON.parse(sessionStorage.getItem("b1-I/O")) || false,
      b2IO: JSON.parse(sessionStorage.getItem("b2-I/O")) || false,

      c1IO: JSON.parse(sessionStorage.getItem("c1-I/O")) || false,
      c2IO: JSON.parse(sessionStorage.getItem("c2-I/O")) || false,
      planeOffset: JSON.parse(sessionStorage.getItem("planeOffset")) || false,
      M2DIGI: JSON.parse(sessionStorage.getItem("M2DIGI")) || false,
      isBuzzer: JSON.parse(sessionStorage.getItem("isBuzzer")) || false,
      D2: JSON.parse(sessionStorage.getItem("D2")) || false,
      B1DIGI: JSON.parse(sessionStorage.getItem("B1DIGI")) || false,
      B2DIGI: JSON.parse(sessionStorage.getItem("B2DIGI")) || false,
      C: JSON.parse(sessionStorage.getItem("C")) || false,
      isSmileFour: JSON.parse(sessionStorage.getItem("isSmileFour")) || false,
      isTouchOneOutput:
        JSON.parse(sessionStorage.getItem("isTouchOneOutput")) || false,

      // Hardware: JSON.parse(sessionStorage.getItem("Hardware")) || false,
      isTouchOne: JSON.parse(sessionStorage.getItem("isTouchOne")) || false,
      m1IO: JSON.parse(sessionStorage.getItem("m1-I/O")) || false,
      flowchartelementsid:
        JSON.parse(sessionStorage.getItem("flowchart-elements-id")) || false,
      isDistanceSensors:
        JSON.parse(sessionStorage.getItem("isDistanceSensors")) || false,
      connect:
        JSON.parse(sessionStorage.getItem("application/reactflow/connect")) ||
        false,
      m3IO: JSON.parse(sessionStorage.getItem("m3-I/O")) || false,
      isSmileThree: JSON.parse(sessionStorage.getItem("isSmileThree")) || false,
      M3DIGI: JSON.parse(sessionStorage.getItem("M3DIGI")) || false,
      flowchartelements:
        JSON.parse(sessionStorage.getItem("flowchart-elements")) || false,
      m4IO: JSON.parse(sessionStorage.getItem("m4-I/O")) || false,

      M1DIGI: JSON.parse(sessionStorage.getItem("M1DIGI")) || false,
      isTouchTwo: JSON.parse(sessionStorage.getItem("isTouchTwo")) || false,
      B: JSON.parse(sessionStorage.getItem("B")) || false,
      F: JSON.parse(sessionStorage.getItem("F")) || false,
      F1: JSON.parse(sessionStorage.getItem("F1")) || false,
      play_btn: JSON.parse(sessionStorage.getItem("play_btn")) || false,
      isSmileOne: JSON.parse(sessionStorage.getItem("isSmileOne")) || false,
      A1: JSON.parse(sessionStorage.getItem("A1")) || false,
      A2: JSON.parse(sessionStorage.getItem("A2")) || false,
      isEyeLeft: JSON.parse(sessionStorage.getItem("isEyeLeft")) || false,
      D: JSON.parse(sessionStorage.getItem("D")) || false,
      m2IO: JSON.parse(sessionStorage.getItem("m2-I/O")) || false,
      isTouchZero: JSON.parse(sessionStorage.getItem("isTouchZero")) || false,
      isTemperature:
        JSON.parse(sessionStorage.getItem("isTemperature")) || false,
      connectedDevice:
        JSON.parse(sessionStorage.getItem(" connectedDevice")) || false,
      isTouchZeroOutput:
        JSON.parse(sessionStorage.getItem("isTouchZeroOutput")) || false,
      isEyeRight: JSON.parse(sessionStorage.getItem("isEyeRight")) || false,
      isMic: JSON.parse(sessionStorage.getItem("isMic")) || false,
      B1: JSON.parse(sessionStorage.getItem("B1")) || false,
      C1: JSON.parse(sessionStorage.getItem("C1")) || false,
      B2: JSON.parse(sessionStorage.getItem("B2")) || false,
      C2: JSON.parse(sessionStorage.getItem("C2")) || false,
      F2: JSON.parse(sessionStorage.getItem("F2")) || false,
      M4DIGI: JSON.parse(sessionStorage.getItem("M4DIGI")) || false,

      isLightSensor:
        JSON.parse(sessionStorage.getItem("isLightSensor")) || false,
      // flow-logic: JSON.parse(sessionStorage.getItem("flow-logic")) || false,
      isTouchTwoOutput:
        JSON.parse(sessionStorage.getItem("isTouchTwoOutput")) || false,

      flowlogic: JSON.parse(sessionStorage.getItem("flow-logic")) || false,
    };

    for (const i of arr) {
      if (i.includes("ifSelect")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("ifValue")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("gt")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("lt")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("ne")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("eq")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("bw")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("ifValue")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }

      if (i.includes("a1")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("a2")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("b1")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("b2")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("c1")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("c2")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("d1")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("d2")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("e1")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("e2")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("f1")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("f2")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("m1")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("m2")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("m3")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("m4")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("t0")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("t1")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("t2")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("le")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("re")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("buzz")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("s1")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("s2")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("s3")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("s4")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }

      if (i.includes("mp3")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("oled")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("countRGB")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("rgb")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }

      if (i.includes("valRGB1")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("valRGB2")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("valRGB3")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("valRGB4")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("valRGB5")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("valRGB6")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("valRGB7")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("valRGB8")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("valRGB9")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
      if (i.includes("valRGB10")) {
        console.log({ i });

        history = Object.assign(history, { [i]: sessionStorage.getItem(i) });
      }
    }
    console.log(history, "kghjfgyjhresg");

    let saveData = JSON.parse(localStorage.getItem("SavedFlowData")) || [];
    saveData.push(history);
    localStorage.setItem("SavedFlowData", JSON.stringify(saveData));
    // localStorage.setItem("SavedData", JSON.stringify(history));

    // const saveFile = async (blob) => {
    //   // const a = document.createElement("a");
    //   // console.log("OBJECT", this.state);
    //   // let aaa = this.state.name;
    //   // a.download = `${aaa}.json`;
    //   // a.href = URL.createObjectURL(blob);
    //   // a.addEventListener("click", (e) => {
    //   //   setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    //   // });
    //   // a.click();
    // };

    // const blob = new Blob([JSON.stringify(history, null, 2)], {
    //   type: "application/json",
    // });

    // saveFile(blob);
    // if (sessionStorage.getItem("saveProps") == null) {
    //   Object.keys(history).map((key, value) => {
    //     console.log("KEYS", key, value);
    //     switch (key) {
    //       case "concept": {
    //         sessionStorage.setItem("concept", history.concept);
    //       }
    //       case "assembly": {
    //         sessionStorage.setItem("assembly", history.assembly);
    //       }
    //       case "logic": {
    //         sessionStorage.setItem("logic", history.logic);
    //       }
    //       // case "concept": {
    //       //   sessionStorage.setItem("concept", history.concept);
    //       // }
    //       // case "concept": {
    //       //   sessionStorage.setItem("concept", history.concept);
    //       // }
    //     }
    //   });
    // }

    axios
      .post("http://localhost:3008/saveHistory", history)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // console.log(response.data);
        console.log("ERROR", error.message);
      });
  };

  saveData = () => {
    // console.log("dataas NEXT BTN", this.state.keys, this.state.l);
    // let flowSession_Data = JSON.parse(localStorage.getItem("SavedData"));

    // let names = JSON.parse(sessionStorage.getItem("saveProps")) || null;
    // console.log("KK", names);

    // for (let i = 0; i < flowSession_Data.length; i++) {
    //   if (names.name == flowSession_Data[i].name) {
    //     console.log("KK", flowSession_Data[i].concept);
    //     Object.keys(flowSession_Data[i]).map((key, value) => {
    //       console.log("KEYS", key, value);
    //       switch (key) {
    //         case "concept": {
    //           sessionStorage.setItem(
    //             "concept",
    //             JSON.stringify(flowSession_Data[i].concept)
    //           );
    //         }
    //         case "assembly": {
    //           sessionStorage.setItem(
    //             "assembly",
    //             JSON.stringify(flowSession_Data[i].assembly)
    //           );
    //         }
    //         case "logic": {
    //           sessionStorage.setItem(
    //             "logic",
    //             JSON.stringify(flowSession_Data[i].logic)
    //           );
    //         }
    //         // case "concept": {
    //         //   sessionStorage.setItem("concept", history.concept);
    //         // }
    //         // case "concept": {
    //         //   sessionStorage.setItem("concept", history.concept);
    //         // }
    //       }
    //     });
    //   }
    // }

    this.props.history.push("/flow/InternalAccessories");

    // console.log(history, "kghjfgyjhresg");
    // for (let i = 0; i < sessionStorage.length; i++) {
    //   const keys = sessionStorage.key(i);
    //   const l = sessionStorage.getItem(keys);
    //   // console.log("dataas", l);
    //   // const values = sessionStorage.value(i);
    //   // console.log(`${key}: ${sessionStorage.getItem(key)}`);
    //   sessionStorage.setItem(`${keys}`, l);
    // }
  };

  render() {
    // console.log("dtat", this.props.location.data.props);

    let v = JSON.parse(sessionStorage.getItem("saveFlowProps")) || null;
    return (
      <div
        style={{ height: "100vh", width: "100vw", position: "relative" }}
        className="savePageConatiner"
      >
        <div
          style={{
            position: "absolute",
            top: "3%",
            width: "95%",
            height: "10vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifyContent: "flex-start",
            // border: "1px solid red",
            marginLeft: "3%",
            position: "relative",
          }}
        >
          {v != null ? (
            <Link to="/flow/savedFlow">
              <img
                className="iconBtnSize imgBackBtn"
                src={renderPrgImage("backBtn")}
                style={{
                  marginTop: "1%",
                  marginRight: "3%",
                  cursor: "pointer",
                }}
                // onClick={() => (window.location.href = "/savedprogram")}
              />
            </Link>
          ) : (
            <Link to="/flow/flowchart">
              <img
                className="iconBtnSize imgBackBtn"
                src={renderPrgImage("backBtn")}
                style={{
                  marginTop: "1%",
                  marginRight: "3%",
                  cursor: "pointer",
                }}
                // onClick={() => (window.location.href = "/simulate")}
              />
            </Link>
          )}
          {/* <img
            className="iconBtnSize imgBackBtn"
            src={renderPrgImage("backBtn")}
            style={{ marginTop: "1%", marginRight: "3%", cursor: "pointer" }}
            onClick={() => (window.location.href = "/simulate")}
          /> */}
          <p className="saveFlowHeadingTxt">Save Your Project</p>

          {this.state.isHelp ? (
            <div className="Slide">
              <SavePrgm />
            </div>
          ) : (
            <img
              className="iconBtnSize imgBackBtn"
              src={renderPrgImage("helpBtnInActive")}
              style={{
                marginTop: "1%",
                marginRight: "1.5%",
                position: "absolute",
                right: "0",
                cursor: "pointer",
              }}
              onClick={this.helpBtn}
            />
          )}

          {this.state.isHelp ? (
            <img
              className="hpClose"
              src={renderPrgImage("closBtn")}
              onClick={this.helpBtn}
            ></img>
          ) : null}
        </div>
        <div className="item-2">
          <div className="SavePageinputdetails">
            {v != null ? (
              <input
                className="nameInputDetails saveFlowHeadingTxt2"
                type="text"
                name="name"
                value={"Name" + " ".repeat(23) + v.name}
                onChange={this.handleChange}
              />
            ) : (
              <input
                className="nameInputDetails saveFlowHeadingTxt2"
                type="text"
                name="name"
                placeholder="Name"
                onChange={this.handleChange}
              />
            )}
            {/* <input
              className="nameInputDetails saveFlowHeadingTxt2"
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
            /> */}

            {v != null ? (
              <textarea
                className="descriptionInputDetails saveFlowHeadingTxt2"
                name="discription"
                placeholder="Description"
                value={"Description" + "\n \n" + v.des}
                onChange={this.handleChange}
              />
            ) : (
              <textarea
                className="descriptionInputDetails saveFlowHeadingTxt2"
                name="discription"
                placeholder="Description"
                onChange={this.handleChange}
              />
            )}
            {/* <textarea
              className="descriptionInputDetails saveFlowHeadingTxt2"
              name="discription"
              placeholder="Description"
              onChange={this.handleChange}
            /> */}

            {v != null ? (
              <input
                className="nameInputDetails saveFlowHeadingTxt2"
                type="text"
                name="link"
                value={"Video Link" + " ".repeat(23) + v.link}
                onChange={this.handleChange}
              />
            ) : (
              <input
                className="nameInputDetails saveFlowHeadingTxt2"
                type="text"
                name="link"
                placeholder="Video Link"
                onChange={this.handleChange}
              />
            )}

            {/* <input
              className="nameInputDetails saveFlowHeadingTxt2"
              type="text"
              name="link"
              placeholder="Video Link.."
              onChange={this.handleChange}
            /> */}
          </div>
          <div className="SavePageImgdetails saveFlowHeadingTxt2">
            <p>Add Images</p>
            {/* <div
              style={{
                height: "70%",
                width: "90%",
                backgroundColor: "#F5F5F5",
                marginTop: "15px",
                border: "1px solid red",
              }}
            > */}{" "}
            {v != null ? (
              <div
                style={{
                  height: "70%",
                  width: "90%",
                  backgroundColor: "#F5F5F5",
                  marginTop: "15px",
                  // border: "1px solid red",
                }}
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "30px",
                  }}
                  src={v.ig}
                />
              </div>
            ) : (
              <div
                style={{
                  height: "70%",
                  width: "90%",
                  backgroundColor: "#F5F5F5",
                  marginTop: "15px",
                  // border: "1px solid red",
                }}
              >
                <img
                  id="screenshot"
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "30px",
                  }}
                  src={this.state.imgURL}
                />
              </div>
            )}
            {/* <img
                id="screenshot"
                style={{ height: "100%", width: "100%", borderRadius: "30px" }}
                src={this.state.imgURL}
              /> */}
            {/* </div> */}
            {v != null ? (
              <Link
                to={{
                  pathname: "/flow/InternalAccessories",
                  data: v.name,
                }}
              >
                <img
                  style={{
                    height: "60px",
                    width: "60px",
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    zIndex: "100",
                    cursor: "pointer",
                  }}
                  src={renderPrgImage("nextBtn")}
                  // onClick={() =>
                  //   (window.location.href = "/selectScreen/InternalAccessories")
                  // }
                  onClick={this.saveData}
                />
              </Link>
            ) : (
              <Link to="/flow/flowchart">
                <img
                  src={renderPrgImage("saveBtn")}
                  style={{
                    height: "75px",
                    width: "75px",
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    cursor: "pointer",
                  }}
                  onClick={this.saveFlow}
                />
              </Link>
            )}
            <div id="assemblyShot"></div>
            <div id="SaveAlert">Your Project has been Saved</div>
          </div>
        </div>
      </div>
    );
    // return (
    //   <div style={{ height: "100vh", width: "100vw" }}>
    //     {/* back button */}
    //     <img
    //       alt="adfaf"
    //       onClick={() => (window.location.href = "/#/simulate")}
    //       src="imagesplay/button_back.png"
    //       style={{
    //         position: "absolute",
    //         top: "10px",
    //         width: "50px",
    //         cursor: "pointer",
    //         left: "10px",
    //       }}
    //     />
    //     <div style={{ display: "inline-block", width: "60%", height: "100%" }}>
    //       <div className="main">
    //         <div>
    //           <label for="input1">Project Name:&nbsp;</label>
    //           <input
    //             id="input1"
    //             type="text"
    //             name="name"
    //             onChange={this.handleChange}
    //           ></input>
    //         </div>
    //         <div>
    //           <label for="input2">Discription:&nbsp;&nbsp;&nbsp;</label>
    //           <input
    //             id="input2"
    //             type="text"
    //             name="discription"
    //             style={{ height: "80px" }}
    //             onChange={this.handleChange}
    //           ></input>
    //         </div>
    //         <div>
    //           <label for="input3">Video Link:&nbsp;&nbsp;&nbsp;</label>
    //           <input
    //             id="input3"
    //             type="text"
    //             name="link"
    //             onChange={this.handleChange}
    //           ></input>
    //         </div>
    //       </div>
    //     </div>
    //     <div style={{ width: "40%", height: "100%", float: "right" }}>
    //       <div className="right_div">
    //         {/* <div id='screenshot' style={{backgroundImage:`url(${this.state.imgURL})`,height:"100%",width:"100%",backgroundSize:"contain"}}></div> */}
    //         <img
    //           id="screenshot"
    //           style={{ height: "100%", width: "100%", borderRadius: "30px" }}
    //           src={this.state.imgURL}
    //         />
    //       </div>
    //       <div style={{ position: "absolute", top: "88vh", left: "92vw" }}>
    //         <img
    //           onClick={this.save}
    //           src="images/Learn/learn_button_save.png"
    //           style={{ height: "50px", width: "50px" }}
    //         />
    //       </div>
    //     </div>
    //     <div id="assemblyShot"></div>
    //   </div>
    // );
  }
}

export default SaveFlow;
