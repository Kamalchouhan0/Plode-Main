import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import renderImage from "../../source/importImg";
import MainSlider from "../ReusableComponents/MainSlider/MainSlider";
import biboxSelectStyle from "./biboxSelection.module.css";

function BiboxSelection() {
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

  const selectDevice = () => {
    sessionStorage.setItem("connectedDevice", "Ace");
    history.push("/deviceSelection");
    window.location.reload(false);
  };

  return (
    <div className={biboxSelectStyle.Select_Device}>
      <div className={biboxSelectStyle.Select_Device_Panel}>
        {" "}
        <img
          className={biboxSelectStyle.Back_Button}
          src={renderImage("backBtn")}
          onClick={gobackUrl}
        ></img>{" "}
        <h1 className={biboxSelectStyle.Title}>Select Your Device</h1>
        {isHelp == false ? (
          <img
            className={biboxSelectStyle.Help_Button}
            src={renderImage("helpBtnInActive")}
            onClick={handleHelpBtn}
          ></img>
        ) : (
          <div className={biboxSelectStyle.mod}>
            <MainSlider />
          </div>
        )}
        {isHelp ? (
          <img
            className={biboxSelectStyle.helpClose}
            src={renderImage("clos")}
            onClick={handleHelpBtn}
          ></img>
        ) : null}
        {isHelp ? (
          <div>
            <img
              className={biboxSelectStyle.PC_Image}
              style={{ zIndex: "-1" }}
              src={renderImage("PC")}
              onClick={selectDevice}
            ></img>
            <p style={{ zIndex: "-1" }} className={biboxSelectStyle.Play_PC}>
              Play Computer
            </p>
          </div>
        ) : (
          <div>
            {" "}
            <img
              className={biboxSelectStyle.PC_Image}
              src={renderImage("PC")}
              onClick={selectDevice}
            ></img>
            <p className={biboxSelectStyle.Play_PC}>Play Computer</p>
          </div>
        )}
      </div>
      <div style={{ position: "absolute", bottom: "2px", right: "5px" }}>
        <span
          style={{
            fontSize: "15px",
            color: "grey",
            fontFamily: "Halcyon_Regular",
          }}
        >
          Version: 0.1.11
        </span>
      </div>
    </div>
  );
}

export default BiboxSelection;

/**
 * css back btn
 * help active
 *
 */
