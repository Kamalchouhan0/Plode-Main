import { React, useEffect } from "react";
import { webSerialAction } from "../../../redux/actions/index";

import "./ExternalAccessories.css";

import { connect } from "react-redux";

import CenterMode from "../../concept/index";

import { useState } from "react";
import renderPrgImage from "../../../source/programImg";
import EXternalScPrgm from "../../ReusableComponents/PrgmSlider/ExternalPrgm/ExternalScPrgm";

function ExternalAccessoriesScreen(props) {
  console.log("props history", props);
  const [isusb, setUsb] = useState(false);

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
      // window.location.reload();
      setUsb(true);
    }
  };
  useEffect(() => {
    let no_port = props.webserialPort;
    if (typeof no_port !== undefined) {
      console.log("WORKING>>>>>>>>");
      OpenReadComPort();
    }

    let data = JSON.parse(sessionStorage.getItem("user"));

    if (data === 1) {
      setUsb(true);
      console.log("LLLLLLLLLLLLLLL", data);
    } else {
      setUsb(false);
    }
  });
  useEffect(async () => {
    navigator.serial.addEventListener("connect", (e) => {
      setUsb(true);
      var user = 1;
      sessionStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
      // const PLAY = [
      //   "P".charCodeAt(),
      //   "L".charCodeAt(),
      //   "A".charCodeAt(),
      //   "Y".charCodeAt(),
      // ];
      // setTimeout(() => {
      //   writePort(PLAY);
      // }, 1000);
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

    try {
      console.log("OPENED");
      await p_Port.open({ baudRate: 120000 });
    } catch (e) {
      console.log(e);
      // p_Port.close();
      // await p_Port.open({ baudRate: 120000 });
    }
    console.log(p_Port, "p_Port");
  };

  return (
    <div className="ExternalAccessories-Main">
      <div className="navbarContainer">
        <div className="navbar_content">
          <div className="navbar_new isActive">Select</div>
          <div className="navbar_new">Assemble</div>
          <div className="navbar_new">Code</div>
          <div className="navbar_new">Simulate</div>
        </div>

        <img
          src={renderPrgImage("selectbar")}
          style={{ height: "100%", width: "15%" }}
        />

        <div className="navbar-Action">
          {/* <img
            src={renderPrgImage("saveBtnActive")}
            className="iconBtnSize"
            style={{ marginRight: "25px", marginTop: "1%" }}
          /> */}

          {/* <img
            className="iconBtnSize"
            src={renderPrgImage("helpBtnInActive")}
            style={{ marginRight: "25px" }}
          /> */}

          {isHelp == false ? (
            <img
              className="iconBtnSize"
              src={renderPrgImage("helpBtnInActive")}
              style={{ marginRight: "2%", marginTop: "1%" }}
              onClick={handleHelpBtn}
            ></img>
          ) : (
            <div className="Ss_slide">
              {" "}
              <EXternalScPrgm />{" "}
            </div>
          )}
          {isHelp ? (
            <img
              className="helpClo"
              src={renderPrgImage("closBtn")}
              onClick={handleHelpBtn}
            ></img>
          ) : null}

          {isusb ? (
            <img src={renderPrgImage("usbON")} onClick={HdleUsb}></img>
          ) : (
            <img src={renderPrgImage("usbOFF")} onClick={HdleUsb}></img>
          )}
        </div>
      </div>

      <div style={{ width: "100%", height: "90vh" }}>
        <CenterMode history={props.history} />
      </div>

      {/* <CenterMode history={props.history} /> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  // return state;
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExternalAccessoriesScreen);
// export default ExternalAccessoriesScreen;
