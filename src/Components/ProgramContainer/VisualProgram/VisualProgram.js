import React, { useState } from "react";
import "./VisualProgram.css";
import { Link, useHistory } from "react-router-dom";

import renderPrgImage from "../../../source/programImg";
import VisualPrgm from "../../ReusableComponents/PrgmSlider/VisualPrgm/VisualPrgm";
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
function VisualProgram() {
  // const CREATE = [
  //   "C".charCodeAt(),
  //   "R".charCodeAt(),
  //   "E".charCodeAt(),
  //   "A".charCodeAt(),
  //   "T".charCodeAt(),
  //   "E".charCodeAt(),
  // ];
  // writePort(CREATE);

  const item1Styl = {
    backgroundImage: `url("${renderPrgImage("flowchartbasedgroupbutton")}")`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  };
  const item2Styl = {
    backgroundImage: `url("${renderPrgImage("projectbased")}")`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  };
  const item3Styl = {
    backgroundImage: `url("${renderPrgImage("blockbased")}")`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  };
  const item4Styl = {
    backgroundImage: `url("${renderPrgImage("Cgroupbutton")}")`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    opacity: "0.5",
  };
  const item5Styl = {
    backgroundImage: `url("${renderPrgImage("pythoncodingbutton")}")`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    opacity: "0.5",
  };
  const [isHelp, setHelp] = useState(false);

  const handleHelpBtn = (e) => {
    if (isHelp == true) {
      setHelp(false);
    } else {
      setHelp(true);
    }
  };
  function blockbasedbtn() {
    // window.location.assign("http://dev.bibox.in/");
    window.location.assign("https://blockbased.plode.org");
    // window.location.assign("http://localhost:3000/scratch");
  }

  const history = useHistory();
  return (
    <div className="visualProgram-container">
      <img
        src={renderPrgImage("backBtn")}
        className="iconBtnSize VP-backbtn"
        onClick={() => {
          history.push("/Selection");
        }}
      />
      {isHelp == false ? (
        <img
          className="iconBtnSize helpiconBtnSize"
          src={renderPrgImage("helpBtnInActive")}
          style={{ marginRight: "25%" }}
          onClick={handleHelpBtn}
        ></img>
      ) : (
        <div className="S_slide">
          {" "}
          <VisualPrgm />{" "}
        </div>
      )}
      {isHelp ? (
        <img
          className="helpClose"
          src={renderPrgImage("closBtn")}
          onClick={handleHelpBtn}
        ></img>
      ) : null}

      <img
        src={renderPrgImage("programmenucard")}
        className="VP-programmenucard"
      />
      <p className="VP-txt-Menu">Code</p>

      <p className="VP-txt-Heading"> Visual Programming</p>

      <hr className="VP-hr" />

      <p className="VP-txt-Heading2"> Script Programming</p>

      <hr className="VP-hr2" />
      <div>
        {/* ITEM - 1 */}

        <Link to="/flow">
          <div className="VP-flowchartbased vp-item1" style={item1Styl}>
            <div className="VP-sub1">
              <p className="VP-sub-txt">
                Flowchart <br />
                Based
              </p>
            </div>
          </div>
        </Link>

        {/* ITEM - 2 */}
        <Link to="/programSelection">
          <div className="VP-programbased vp-item2" style={item2Styl}>
            <div className="VP-sub2">
              <p className="VP-sub2-txt">
                Project <br />
                Based
              </p>
            </div>
          </div>
        </Link>

        {/* Item 3*/}
        <div
          className="VP-blockbased vp-item3"
          style={item3Styl}
          onClick={blockbasedbtn}
        >
          <div className="VP-sub3">
            <p className="VP-sub3-txt">
              Block <br />
              Based
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#8ACDEA",
          opacity: "10%",
        }}
      ></div>
      {/* Item 4 */}
      <div className="VP-CCoding vp-item4" style={item4Styl}>
        <div className="VP-sub4">
          <p className="VP-sub4-txt">
            C <br />
            Coding
          </p>
        </div>
      </div>

      {/*Item 5 */}
      <div className="VP-pythoncodingbutton vp-item5" style={item5Styl}>
        <div className="VP-sub5">
          <p className="VP-sub5-txt">
            Python <br />
            Coding
          </p>
        </div>
      </div>
    </div>
  );
}

export default VisualProgram;
