import React, { useState, useEffect } from "react";
import "./sim.css";
import PortValuesRangeMapping from "../../logic/PortValuesRangeMapping";
import PopupCard from "../../../Assets/Bisoft_UI/SimulationSliders/ui/popup-card.png";
import PopupCardSm from "../../../Assets/Bisoft_UI/SimulationSliders/ui/popup-card-small.png";
import a1 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/a1.png";
import a2 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/a2.png";
import b1 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/b1.png";
import b2 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/b2.png";
import c1 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/c1.png";
import c2 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/c2.png";
import d1 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/d1.png";
import d2 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/d2.png";
import rgb1 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/rgb1.png";
import distance from "../../../Assets/Bisoft_UI/SimulationSliders/ui/distance.png";
import light from "../../../Assets/Bisoft_UI/SimulationSliders/ui/light.png";
import gesture from "../../../Assets/Bisoft_UI/SimulationSliders/ui/gesture.png";
import t0 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/t0.png";
import t1 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/t1.png";
import t2 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/t2.png";
import mic from "../../../Assets/Bisoft_UI/SimulationSliders/ui/mic.png";
import temp from "../../../Assets/Bisoft_UI/SimulationSliders/ui/temp.png";

function InputSlider(props) {
  useEffect(() => {
    //let data = JSON.parse(sessionStorage.getItem("simulate"));
    var data = [];
    for (const [key, value] of Object.entries(assembly.PortConnections)) {
      if (key == "A1" && value != null) {
        if (
          assembly.PortConnections[key].type == "led" ||
          assembly.PortConnections[key].type == "laser" ||
          assembly.PortConnections[key].type == "led_1c"
        ) {
        } else {
          data = [
            ...data,
            {
              componentName: assembly.PortConnections[key].type,
              port: key,
              value: a1Value,
            },
          ];
        }
      } else if (key == "A2" && value != null) {
        if (
          assembly.PortConnections[key].type == "led" ||
          assembly.PortConnections[key].type == "laser" ||
          assembly.PortConnections[key].type == "led_1c"
        ) {
        } else {
          data = [
            ...data,
            {
              componentName: assembly.PortConnections[key].type,
              port: key,
              value: a2Value,
            },
          ];
        }
      } else if (key == "B1" && value != null) {
        if (
          assembly.PortConnections[key].type == "led" ||
          assembly.PortConnections[key].type == "laser" ||
          assembly.PortConnections[key].type == "led_1c"
        ) {
        } else {
          data = [
            ...data,
            {
              componentName: assembly.PortConnections[key].type,
              port: key,
              value: b1Value,
            },
          ];
        }
      } else if (key == "B2" && value != null) {
        if (
          assembly.PortConnections[key].type == "led" ||
          assembly.PortConnections[key].type == "laser" ||
          assembly.PortConnections[key].type == "led_1c"
        ) {
        } else {
          data = [
            ...data,
            {
              componentName: assembly.PortConnections[key].type,
              port: key,
              value: b2Value,
            },
          ];
        }
      } else if (key == "C1" && value != null) {
        if (
          assembly.PortConnections[key].type == "led" ||
          assembly.PortConnections[key].type == "laser" ||
          assembly.PortConnections[key].type == "led_1c"
        ) {
        } else {
          data = [
            ...data,
            {
              componentName: assembly.PortConnections[key].type,
              port: key,
              value: c1Value,
            },
          ];
        }
      } else if (key == "C2" && value != null) {
        if (
          assembly.PortConnections[key].type == "led" ||
          assembly.PortConnections[key].type == "laser" ||
          assembly.PortConnections[key].type == "led_1c"
        ) {
        } else {
          data = [
            ...data,
            {
              componentName: assembly.PortConnections[key].type,
              port: key,
              value: c2Value,
            },
          ];
        }
      } else if (key == "D1" && value != null) {
        if (
          assembly.PortConnections[key].type == "led" ||
          assembly.PortConnections[key].type == "laser" ||
          assembly.PortConnections[key].type == "led_1c"
        ) {
        } else {
          data = [
            ...data,
            {
              componentName: assembly.PortConnections[key].type,
              port: key,
              value: c1Value,
            },
          ];
        }
      } else if (key == "D2" && value != null) {
        if (
          assembly.PortConnections[key].type == "led" ||
          assembly.PortConnections[key].type == "laser" ||
          assembly.PortConnections[key].type == "led_1c"
        ) {
        } else {
          data = [
            ...data,
            {
              componentName: assembly.PortConnections[key].type,
              port: key,
              value: d2Value,
            },
          ];
        }
      }
    }
    data = [
      ...data,
      {
        componentName: "TouchZero",
        port: "A",
        value: t0Value,
      },
      { componentName: "TouchOne", port: "B", value: t1Value },
      { componentName: "TouchTwo", port: "C", value: t2Value },
      { componentName: "Mic", port: "Mic", value: micValue },
      { componentName: "Temp", port: "Temp", value: tempValue },
      { componentName: "Fourin1SensorD", port: "D", value: fourin1D },
      { componentName: "Fourin1SensorL", port: "D", value: fourin1L },
      { componentName: "Fourin1SensorG", port: "D", value: fourin1G },
      { componentName: "Fourin1SensorCRed", port: "D", value: fourin1CRed },
      { componentName: "Fourin1SensorCGreen", port: "D", value: fourin1CGreen },
      { componentName: "Fourin1SensorCBlue", port: "D", value: fourin1CBlue },
    ];
    sessionStorage.setItem("simulate", JSON.stringify(data));
  });
  const [a1Value, seta1Value] = useState(0);
  const [a2Value, seta2Value] = useState(0);
  const [b1Value, setb1Value] = useState(0);
  const [b2Value, setb2Value] = useState(0);
  const [d1Value, setd1Value] = useState(0);
  const [d2Value, setd2Value] = useState(0);
  const [c1Value, setc1Value] = useState(0);
  const [c2Value, setc2Value] = useState(0);
  const [fourin1CRed, setfourin1CRed] = useState(0);
  const [fourin1CGreen, setfourin1CGreen] = useState(0);
  const [fourin1CBlue, setfourin1CBlue] = useState(0);
  const [fourin1D, setfourin1D] = useState(0);
  const [fourin1L, setfourin1L] = useState(0);
  const [fourin1G, setfourin1G] = useState(0);
  const [t0Value, sett0Value] = useState(0);
  const [t1Value, sett1Value] = useState(0);
  const [t2Value, sett2Value] = useState(0);
  const [micValue, setmicValue] = useState(0);
  const [tempValue, settempValue] = useState(0);

  let a1State = false,
    a2State = false,
    b1State = false,
    b2State = false,
    c1State = false,
    c2State = false,
    d1State = false,
    d2State = false,
    fourin1CState = false,
    fourin1DState = false,
    fourin1GState = false,
    fourin1LState = false,
    t0State = false,
    t1State = false,
    t2State = false,
    micState = false,
    tempState = false;
  console.log("ip slider", b1State);
  const assembly = JSON.parse(sessionStorage.getItem("assembly"));
  const internalAccessories = JSON.parse(
    sessionStorage.getItem("concept")
  ).internalaccessories;
  for (const [key, value] of Object.entries(assembly.PortConnections)) {
    console.log(key, value);
    if (value != null) {
      //   let range =
      //     PortValuesRangeMapping[key][assembly.PortConnections[key].type]();
      //   console.log("range", assembly.PortConnections[key].type, range);
    }
    if (key == "A1" && value != null) {
      if (
        assembly.PortConnections[key].type == "led" ||
        assembly.PortConnections[key].type == "laser" ||
        assembly.PortConnections[key].type == "led_1c" ||
        assembly.PortConnections[key].type == "OLED" ||
        assembly.PortConnections[key].type == "Mp3" ||
        assembly.PortConnections[key].type == "RGB"
      ) {
        a1State = false;
      } else {
        var a1range =
          PortValuesRangeMapping[key][assembly.PortConnections[key].type]();
        a1State = true;
      }
    } else if (key == "A2" && value != null) {
      if (
        assembly.PortConnections[key].type == "led" ||
        assembly.PortConnections[key].type == "laser" ||
        assembly.PortConnections[key].type == "led_1c"
      ) {
        a2State = false;
      } else {
        var a2range =
          PortValuesRangeMapping[key][assembly.PortConnections[key].type]();
        a2State = true;
      }
    } else if (key == "B1" && value != null) {
      if (
        assembly.PortConnections[key].type == "led" ||
        assembly.PortConnections[key].type == "laser" ||
        assembly.PortConnections[key].type == "led_1c"
      ) {
        b1State = false;
      } else {
        var b1range =
          PortValuesRangeMapping[key][assembly.PortConnections[key].type]();
        b1State = true;
      }
    } else if (key == "B2" && value != null) {
      if (
        assembly.PortConnections[key].type == "led" ||
        assembly.PortConnections[key].type == "laser" ||
        assembly.PortConnections[key].type == "led_1c"
      ) {
        b2State = false;
      } else {
        var b2range =
          PortValuesRangeMapping[key][assembly.PortConnections[key].type]();
        b2State = true;
      }
    } else if (key == "C1" && value != null) {
      if (
        assembly.PortConnections[key].type == "led" ||
        assembly.PortConnections[key].type == "laser" ||
        assembly.PortConnections[key].type == "led_1c"
      ) {
        c1State = false;
      } else {
        var c1range =
          PortValuesRangeMapping[key][assembly.PortConnections[key].type]();
        c1State = true;
      }
    } else if (key == "C2" && value != null) {
      if (
        assembly.PortConnections[key].type == "led" ||
        assembly.PortConnections[key].type == "laser" ||
        assembly.PortConnections[key].type == "led_1c"
      ) {
        c2State = false;
      } else {
        c2State = true;
        var c2range =
          PortValuesRangeMapping[key][assembly.PortConnections[key].type]();
      }
    } else if (key == "D1" && value != null) {
      if (
        assembly.PortConnections[key].type == "led" ||
        assembly.PortConnections[key].type == "laser" ||
        assembly.PortConnections[key].type == "led_1c"
      ) {
        d1State = false;
      } else {
        var d1range =
          PortValuesRangeMapping[key][assembly.PortConnections[key].type]();
        d1State = true;
      }
    } else if (key == "D2" && value != null) {
      if (
        assembly.PortConnections[key].type == "led" ||
        assembly.PortConnections[key].type == "laser" ||
        assembly.PortConnections[key].type == "led_1c"
      ) {
        d2State = false;
      } else {
        var d2range =
          PortValuesRangeMapping[key][assembly.PortConnections[key].type]();
        d2State = true;
      }
    }
  }
  fourin1CState = internalAccessories.Four_in_one_sensor["isColorSensor"];
  fourin1GState = internalAccessories.Four_in_one_sensor["isGestureSensor"];
  fourin1LState = internalAccessories.Four_in_one_sensor["isLightSensor"];
  fourin1DState = internalAccessories.Four_in_one_sensor["isDistanceSensors"];
  t0State = internalAccessories["isTouchZero"];
  t1State = internalAccessories["isTouchOne"];
  t2State = internalAccessories["isTouchTwo"];
  micState = internalAccessories["isMic"];
  tempState = internalAccessories["isTemperature"];
  console.log(a1State, b2State);
  if (true) {
    if (a1range == undefined) {
      a1range = { min: 0, max: 0 };
    }
    if (a2range == undefined) {
      a2range = { min: 0, max: 0 };
    }
    if (b1range == undefined) {
      b1range = { min: 0, max: 0 };
    }
    if (b2range == undefined) {
      b2range = { min: 0, max: 0 };
    }
    if (c1range == undefined) {
      c1range = { min: 0, max: 0 };
    }
    if (c2range == undefined) {
      c2range = { min: 0, max: 0 };
    }
    if (d1range == undefined) {
      d1range = { min: 0, max: 0 };
    }
    if (d2range == undefined) {
      d2range = { min: 0, max: 0 };
    }

    return (
      <div className="conatainer" id="input-slider">
        {/* <!-- popup cards 1 --> a1 & a2 */}
        {a1State || a2State ? (
          <div className="boxSim">
            <img src={PopupCard} className="popupcard" />
            <div className="details card1">
              <div className="image_detail">
                <img src={a1} className="label" />
                <input
                  type="range"
                  className="rng"
                  disabled={!a1State}
                  min={a1range.min || 0}
                  max={a1range.max || 0}
                  value={a1Value}
                  onChange={(e) => {
                    seta1Value(e.target.value);
                  }}
                />
                <span className="inp_val">{a1Value}</span>
              </div>
              <div className="image_detail">
                <img src={a2} className="label" />
                <input
                  type="range"
                  className="rnga1"
                  disabled={!a2State}
                  min={a2range.min || 0}
                  max={a2range.max || 0}
                  value={a2Value}
                  onChange={(e) => {
                    seta2Value(e.target.value);
                  }}
                />
                <span className="inp_val">{a2Value}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* <!-- popup cards 2 --> c1 & c2*/}
        {c1State || c2State ? (
          <div className="boxSim">
            <img src={PopupCard} className="popupcard" />
            <div className="details card2">
              <div className="image_detail">
                <img src={c1} className="label" />
                <div className="c1_image"></div>
                <input
                  type="range"
                  className="rng"
                  disabled={!c1State}
                  min={c1range.min || 0}
                  max={c1range.max || 0}
                  value={c1Value}
                  onChange={(e) => {
                    setc1Value(e.target.value);
                  }}
                />
                <span className="inp_val">{c1Value}</span>
              </div>

              <div className="image_detail">
                <img src={c2} className="label" />
                <div className="c2_image"></div>
                <input
                  type="range"
                  className="rngc2"
                  disabled={!c2State}
                  min={c2range.min || 0}
                  max={c2range.max || 0}
                  value={c2Value}
                  onChange={(e) => {
                    setc2Value(e.target.value);
                  }}
                />
                <span className="inp_val"> {c2Value}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* <!-- popup cards 3 --> b1 & b2 */}
        {b1State || b2State ? (
          <div className="boxSim">
            <img src={PopupCard} className="popupcard" />
            <div className="details card3">
              <div className="image_detail">
                <img src={b1} className="label" />
                <input
                  type="range"
                  className="rng"
                  disabled={!b1State}
                  min={b1range.min || 0}
                  max={b1range.max || 0}
                  value={b1Value}
                  onChange={(e) => {
                    setb1Value(e.target.value);
                  }}
                />
                <span className="inp_val">{b1Value}</span>
              </div>

              <div className="image_detail">
                <img src={[b2]} className="label" />
                <input
                  type="range"
                  className="rngb2"
                  disabled={!b2State}
                  min={b2range.min || 0}
                  max={b2range.max || 0}
                  value={b2Value}
                  onChange={(e) => {
                    setb2Value(e.target.value);
                  }}
                />
                <span className="inp_val">{b2Value}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* <!-- popup cards 4 --> d1 & d2*/}
        {d1State || d2State ? (
          <div className="boxSim">
            <img src={PopupCard} className="popupcard" />
            <div className="details card4">
              <div className="d1image_detail">
                <img src={d1} className="label" />
                <div className="d1_image"></div>
                <input
                  type="range"
                  className="rng"
                  disabled={!d1State}
                  min={d1range.min || 0}
                  max={d1range.max || 0}
                  value={d1Value}
                  onChange={(e) => {
                    setd1Value(e.target.value);
                  }}
                />
                <span className="inp_val">{d1Value}</span>
              </div>

              <div className="d2image_detail">
                <img src={d2} className="label" />
                <div className="d2_image"></div>
                <input
                  type="range"
                  className="rngd2"
                  disabled={!d2State}
                  min={d2range.min || 0}
                  max={d2range.max || 0}
                  value={d2Value}
                  onChange={(e) => {
                    setd2Value(e.target.value);
                  }}
                />
                <span className="inp_val">{d2Value}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* <!-- popup cards 5 --> */}

        {/* <!-- popup cards 7 --> 4in1 colour*/}
        {fourin1CState ? (
          <div className="boxSim">
            <img src={PopupCard} id="rgb" className="popupcard" />

            <div className="details card7">
              <div>
                <img src={rgb1} className="label" />
                <div className="b_image"></div>
                <input
                  type="range"
                  className="rng"
                  id="input_red"
                  min={0}
                  max={255}
                  value={fourin1CRed}
                  onChange={(e) => {
                    setfourin1CRed(e.target.value);
                  }}
                />
                <span className="inp_val">{fourin1CRed}</span>
              </div>

              <div>
                <img src={rgb1} className="label" />
                <div className="b_image"></div>
                <input
                  type="range"
                  className="rng"
                  id="input_blue"
                  min={0}
                  max={255}
                  value={fourin1CBlue}
                  onChange={(e) => {
                    setfourin1CBlue(e.target.value);
                  }}
                />
                <span className="inp_val">{fourin1CBlue}</span>
              </div>

              <div>
                <img src={rgb1} className="label" />
                <div className="b_image"></div>
                <input
                  type="range"
                  className="rng"
                  id="input_green"
                  min={0}
                  max={255}
                  value={fourin1CGreen}
                  onChange={(e) => {
                    setfourin1CGreen(e.target.value);
                  }}
                />
                <span className="inp_val">{fourin1CGreen}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* <!-- popup cards 8 --> 4in1 dlg*/}
        {fourin1DState || fourin1LState || fourin1GState ? (
          <div className="boxSim">
            <img src={PopupCard} className="popupcard" />
            <div className="details card8">
              <div>
                <img src={distance} className="label" />
                <div className="dlg_image"></div>
                <input
                  type="range"
                  className="rng"
                  disabled={!fourin1DState}
                  min={0}
                  max={255}
                  value={fourin1D}
                  onChange={(e) => {
                    setfourin1D(e.target.value);
                  }}
                />
                <span className="inp_val">{fourin1D}</span>
              </div>

              <div>
                <img src={light} className="label" />
                <div className="dlg_image"></div>
                <input
                  type="range"
                  className="rng"
                  disabled={!fourin1LState}
                  min={0}
                  max={255}
                  value={fourin1L}
                  onChange={(e) => {
                    setfourin1L(e.target.value);
                  }}
                />
                <span className="inp_val">{fourin1L}</span>
              </div>

              <div>
                <img src={gesture} className="label" />
                <div className="dlg_image"></div>
                <input
                  type="range"
                  className="rng"
                  disabled={!fourin1GState}
                  min={0}
                  max={3}
                  value={fourin1G}
                  onChange={(e) => {
                    setfourin1G(e.target.value);
                  }}
                />
                <span className="inp_val">{fourin1G}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* <!-- popup cards 9.5 --> T0 */}
        {t0State ? (
          <div className="boxSimSm">
            <img src={PopupCardSm} className="popupcard" id="t0popup" />
            <div className="details card9-5">
              <div>
                <img src={t0} className="label" />
                <div className="ninth_image"></div>
                <input
                  type="range"
                  className="rng"
                  min={0}
                  max={1024}
                  value={t0Value}
                  onChange={(e) => {
                    sett0Value(e.target.value);
                  }}
                />
                <span className="inp_val">{t0Value}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* <!-- popup cards 9.6 --> T1 */}
        {t1State ? (
          <div className="boxSimSm">
            <img src={PopupCardSm} className="popupcard" id="t0popup" />
            <div className="details card9-5">
              <div>
                <img src={t1} className="label" />
                <div className="ninth_image"></div>
                <input
                  type="range"
                  className="rng"
                  min={0}
                  max={1024}
                  value={t1Value}
                  onChange={(e) => {
                    sett1Value(e.target.value);
                  }}
                />
                <span className="inp_val">{t1Value}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* <!-- popup cards 9.7 --> T2*/}
        {t2State ? (
          <div className="boxSimSm">
            <img src={PopupCardSm} className="popupcard" id="t0popup" />
            <div className="details card9-5">
              <div>
                <img src={t2} className="label" />
                <div className="ninth_image"></div>
                <input
                  type="range"
                  className="rng"
                  min={0}
                  max={1024}
                  value={t2Value}
                  onChange={(e) => {
                    sett2Value(e.target.value);
                  }}
                />
                <span className="inp_val">{t2Value}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* <!-- popup cards 10 --> Mic */}
        {micState ? (
          <div className="boxSimSm">
            <img src={PopupCardSm} className="popupcard" />
            <div className="details card10">
              <div>
                <div
                  className="imgBox"
                  id="Card5_toggle_A1"
                  style={{ marginTop: "5%" }}
                >
                  <img src={mic} className="label" id="Card5_toggle_A1_Img" />
                </div>
                <input
                  type="range"
                  className="rng"
                  min={0}
                  max={65535}
                  value={micValue}
                  onChange={(e) => {
                    setmicValue(e.target.value);
                  }}
                />
                <span className="inp_val">{micValue}</span>
              </div>
            </div>
          </div>
        ) : null}
        {/* <!-- popup cards 11 --> Temp */}
        {tempState ? (
          <div className="boxSimSm">
            <img src={PopupCardSm} className="popupcard" />
            <div className="details card10">
              <div>
                <div
                  className="imgBox"
                  id="Card5_toggle_A1"
                  style={{ marginTop: "5%" }}
                >
                  <img src={temp} className="label" id="Card5_toggle_A1_Img" />
                </div>
                <input
                  type="range"
                  className="rng"
                  min={0}
                  max={255}
                  value={tempValue}
                  onChange={(e) => {
                    settempValue(e.target.value);
                  }}
                />
                <span className="inp_val">{tempValue}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default InputSlider;
