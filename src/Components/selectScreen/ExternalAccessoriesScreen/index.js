import { React, useEffect } from "react";

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
            <img src={renderPrgImage("usbON")}></img>
          ) : (
            <img src={renderPrgImage("usbOFF")}></img>
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
export default connect(mapStateToProps)(ExternalAccessoriesScreen);
// export default ExternalAccessoriesScreen;
