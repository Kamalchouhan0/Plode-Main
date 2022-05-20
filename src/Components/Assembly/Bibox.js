/**
 * This module exports a draggable Bibox which is drawn in Workspace
 * @module components/assembly/Bibox
 */

import React, { Component } from "react";

import { DragSource } from "react-dnd-old";

import ItemTypes from "./ItemTypes";
import ImageSizes from "./ImageSizes";

import DraggingInfo from "./DraggingInfo";

import renderPrgImage from "../../source/programImg";
import {
  devicePc,
  PlayComputerImg,
  PcinternalMicActive,
  PcinternalMicInActive,
  PcinternalTouchpadsInActive,
  PcinternalTouchpadsActive,
  PcinternalEYEInActive,
  PcinternalEYEActive,
  PcinternalTeethActive,
  PcinternalTeethInActive,
  Pcinternal4in1Active,
  Pcinternal4in1InActive,
} from "../../source/index";

var biboxImg;
var style = {
  position: "relative",
  cursor: "move",
  // backgroundImage: "url(images/Learn/tern.png)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "contain",
  maxWidth: "100%",
  height: "100%",
  width: "100%",
  zIndex: "1",

  // border: "1px solid blue",
};

const biboxSource = {
  beginDrag(props) {
    DraggingInfo.isDragging = true;
    console.log("dragging", props);
    var { left, top } = props;
    // left = left - 500;
    document.getElementById("PC_dragSource").style.opacity = 0;
    return { left, top };
  },
  endDrag() {
    DraggingInfo.isDragging = false;
  },
};

// var Bibox = React.createClass({

class Bibox extends Component {
  componentDidMount() {}
  useEffect() {}
  typeCheck = () => {
    this.removeComponent();
  };
  removeComponent = () => {
    console.log("remove shield", this.props);
    var shield = sessionStorage.getItem("shield");
    if (shield == "true") {
      sessionStorage.setItem("shield", "false");
      this.props.removeFromWorkspace({ type: "play_shield" });
    }

    this.forceUpdate();
  };
  render() {
    let Url;
    let Device = sessionStorage.getItem("connectedDevice");
    let shield = sessionStorage.getItem("shield");

    if (Device == "Ace" && shield == "false") {
      // Url = "images/login/pc_1.png";
      Url = renderPrgImage("PlayComputerImg");
    } else if (Device == "Ace" && shield == "true") {
      // Url = "images/login/pc_1.png";
      Url = renderPrgImage("PlayComputerwithShieldImg");
    } else if (Device == "Humanoid") {
      Url = "images/login/humanoid_img.png";
    } else {
      Url = "images/login/login_illus_tern@2x.png";
    }
    var { left, top, scale, connectDragSource, isDragging, workspaceConnect } =
      this.props;
    console.log("bprops", this.props);
    if (isDragging) {
      return null;
    }
    // left = left + 200;
    if (sessionStorage.getItem("connectedDevice") == "Tern") {
      var height = ImageSizes[ItemTypes.BIBOX][1] * scale + 15;
      var width = ImageSizes[ItemTypes.BIBOX][0] * scale - 17;
    } else if (sessionStorage.getItem("connectedDevice") == "Humanoid") {
      var height = ImageSizes[ItemTypes.BIBOX][1] * scale;
      var width = ImageSizes[ItemTypes.BIBOX][0] * scale;
    } else if (
      sessionStorage.getItem("connectedDevice") == "Ace" &&
      sessionStorage.getItem("shield") == "true"
    ) {
      scale = 1;
      var height = ImageSizes[ItemTypes.BIBOX][1] * scale;
      var width = ImageSizes[ItemTypes.BIBOX][0] * scale;
    } else {
      var height = ImageSizes[ItemTypes.BIBOX][1] * scale;
      var width = ImageSizes[ItemTypes.BIBOX][0] * scale;
    }

    // ISACTIVE_DATA
    let isCheckedMic = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isMic"];
    let isCheckedEyeLeft = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isLeftEye"];
    let isCheckedEyeRight = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isRightEye"];
    let isCheckedSimeleFour = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isSmileFour"];
    let isCheckedSimeleOne = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isSmileOne"];
    let isCheckedSimeleThree = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isSmileThree"];
    let isCheckedSimeleTwo = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isSmileTwo"];
    let isCheckedTouchOne = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isTouchOne"];
    let isCheckedTouchTwo = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isTouchTwo"];
    let isCheckedTouchZero = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isTouchZero"];

    let isCheckedTouchOneOutput = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isTouchOneOutput"];
    let isCheckedTouchTwoOutput = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isTouchTwoOutput"];
    let isCheckedTouchZeroOutput = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isTouchZeroOutput"];

    let isCheckedbuzzer = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isbuzzer"];
    let isCheckedColorSensor = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories.Four_in_one_sensor["isColorSensor"];
    let isCheckedDistanceSensors = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories.Four_in_one_sensor["isDistanceSensors"];
    let isCheckedGestureSensor = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories.Four_in_one_sensor["isGestureSensor"];
    let isCheckedLightSensor = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories.Four_in_one_sensor["isLightSensor"];

    let TouchPads = {
      isCheckedTouchZero,
      isCheckedTouchOne,
      isCheckedTouchTwo,
    };

    console.log("kkkkkkkkkkDATA:_____>>", height, width);
    if (Device == "Ace" && shield == "false") {
      // if (left != 328 && top != 162) {
      //   //conditon to escape first load and values offset for mouse to center on PC image while dragging
      //   left = left - 120;
      //   top = top - 100;
      // }
      console.log("initial left nd right", left, top);
      return connectDragSource(
        // PLEASE NOTE THIS IS ONLY FOR ACE/PLAYCOMPUTER
        <div
          id="PC_dragSource"
          style={{
            ...style,
            left,
            top,
            height,
            width,
            backgroundImage: `url("${Url}")`,
            overflow: "visible",

            // background: "red",
          }}
          //onDoubleClick={() => this.typeCheck(this)}
        >
          {isCheckedMic ? (
            <img
              src={renderPrgImage("PcinternalMicActive")}
              style={{
                height: "35%",
                width: "15%",
                marginTop: "-100px",
                marginLeft: "42%",
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalMicInActive")}
              style={{
                height: "35%",
                width: "15%",
                marginTop: "-100px",
                marginLeft: "42%",
              }}
            />
          )}

          {/*LEFT EYE  */}
          {isCheckedEyeLeft ? (
            <img
              src={renderPrgImage("PcinternalEYEActive")}
              style={{
                height: "8%",
                width: "10%",
                position: "absolute",
                top: "31%",
                left: "34%",
                transform: `translate(-34%,-31%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalEYEInActive")}
              style={{
                height: "8%",
                width: "10%",
                position: "absolute",
                top: "31%",
                left: "34%",
                transform: `translate(-34%,-31%)`,
              }}
            />
          )}

          {/*RIGHT EYE  */}
          {isCheckedEyeRight ? (
            <img
              src={renderPrgImage("PcinternalEYEActive")}
              style={{
                height: "8%",
                width: "10%",
                position: "absolute",
                top: "31%",
                left: "67.5%",
                transform: `translate(-67.5%,-31%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalEYEInActive")}
              style={{
                height: "8%",
                width: "10%",
                position: "absolute",
                top: "31%",
                left: "67.5%",
                transform: `translate(-67.5%,-31%)`,
              }}
            />
          )}

          {/* 1-teeth Active*/}
          {isCheckedSimeleOne ? (
            <img
              src={renderPrgImage("PcinternalTeethActive")}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "60%",
                left: "40.4%",
                transform: `translate(-40.4%,-60%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalTeethInActive")}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "60%",
                left: "40.4%",
                transform: `translate(-40.4%,-60%)`,
              }}
            />
          )}
          {/* 2-teeth Active*/}
          {isCheckedSimeleTwo ? (
            <img
              src={renderPrgImage("PcinternalTeethActive")}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "61%",
                left: "43.5%",
                transform: `translate(-43.5%,-61%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalTeethInActive")}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "61%",
                left: "43.5%",
                transform: `translate(-43.5%,-61%)`,
              }}
            />
          )}

          {/* 4-in-1 Sensor  */}
          {isCheckedColorSensor ||
          isCheckedDistanceSensors ||
          isCheckedGestureSensor ||
          isCheckedLightSensor ? (
            <img
              src={renderPrgImage("Pcinternal4in1Active")}
              style={{
                height: "5%",
                width: "8%",
                position: "absolute",
                left: "48.5%",
                top: "61%",
                transform: `translate(-30%,-61%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("Pcinternal4in1InActive")}
              style={{
                height: "5%",
                width: "8%",
                position: "absolute",
                left: "48.5%",
                top: "61%",
                transform: `translate(-30%,-61%)`,
              }}
            />
          )}

          {/* 3-teeth Active*/}
          {isCheckedSimeleThree ? (
            <img
              src={renderPrgImage("PcinternalTeethActive")}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "61%",
                left: "57%",
                transform: `translate(-57%,-61%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalTeethInActive")}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "61%",
                left: "57%",
                transform: `translate(-57%,-61%)`,
              }}
            />
          )}

          {/* 4-teeth Active*/}
          {isCheckedSimeleFour ? (
            <img
              src={renderPrgImage("PcinternalTeethActive")}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "60%",
                left: "60.3%",
                transform: `translate(-60.3%,-60%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalTeethInActive")}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "60%",
                left: "60.3%",
                transform: `translate(-60.3%,-60%)`,
              }}
            />
          )}

          {/*  0 Touch Pad*/}
          {isCheckedTouchZero || isCheckedTouchZeroOutput ? (
            <img
              src={renderPrgImage("PcinternalTouchpadsActive")}
              style={{
                height: "14%",
                width: "8%",
                position: "absolute",
                left: "14%",
                bottom: "4.5%",
                transform: `translate(-30%,0%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalTouchpadsInActive")}
              style={{
                height: "14%",
                width: "8%",
                position: "absolute",
                left: "14%",
                bottom: "4.5%",
                transform: `translate(-30%,0%)`,
              }}
            />
          )}

          {/*  1 Touch Pad*/}
          {isCheckedTouchOne || isCheckedTouchOneOutput ? (
            <img
              src={renderPrgImage("PcinternalTouchpadsActive")}
              style={{
                height: "14%",
                width: "8%",
                position: "absolute",
                left: "30%",
                bottom: "4.5%",
                transform: `translate(-30%,0%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalTouchpadsInActive")}
              style={{
                height: "14%",
                width: "8%",
                position: "absolute",
                left: "30%",
                bottom: "4.5%",
                transform: `translate(-30%,0%)`,
              }}
            />
          )}

          {/*  2 Touch Pad*/}
          {isCheckedTouchTwo || isCheckedTouchTwoOutput ? (
            <img
              src={renderPrgImage("PcinternalTouchpadsActive")}
              style={{
                height: "14%",
                width: "8%",
                position: "absolute",
                left: "48.5%",
                bottom: "4.5%",
                transform: `translate(-30%,0%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalTouchpadsInActive")}
              style={{
                height: "14%",
                width: "8%",
                position: "absolute",
                left: "48.5%",
                bottom: "4.5%",
                transform: `translate(-30%,0%)`,
              }}
            />
          )}

          <p
            style={{
              fontSize: "18px",
              height: "5%",
              width: "20%",
              position: "fixed",
              marginTop: "18.5%",
              marginLeft: "1.8%",
              color: "#707070",
            }}
          >
            {isCheckedTouchZero ? this.props.rangeA1 : null}
            {/* {this.props.responceTp0} */}
          </p>

          <p
            style={{
              fontSize: "18px",
              // backgroundColor: "blue",
              height: "5%",
              width: "20%",
              position: "fixed",
              marginTop: "18.5%",
              marginLeft: "5.2%",
              color: "#707070",
            }}
          >
            {isCheckedTouchOne ? this.props.temp : null}
          </p>
          <p
            style={{
              fontSize: "18px",
              height: "5%",
              width: "20%",
              position: "fixed",
              marginTop: "18.5%",
              marginLeft: "8.5%",
              color: "#707070",
            }}
          >
            {/* {this.props.responceTp2} */}
            {isCheckedTouchTwo ? this.props.one : null}
          </p>
          <p
            style={{
              fontSize: "18px",
              // height: "5%",
              // width: "5%",
              position: "absolute",
              top: "85%",
              marginTop: "-102.5%",
              marginLeft: "68%",
              color: "#707070",
            }}
          >
            {this.props.mic}
          </p>
        </div>

        // OLD RENDER IMG
        // <img
        //   className="user-select"
        //   src={renderPrgImage Url}
        //   id="biboxClass"
        //   style={{
        //     ...style,
        //     left,
        //     top,
        //     height,
        //     width,
        //     border: "1px solid red",
        //   }}
        // />
        // </div>
      );
    } else if (Device == "Ace" && shield == "true") {
      return connectDragSource(
        // PLEASE NOTE THIS IS ONLY FOR ACE/PLAYCOMPUTER
        <div
          id="PC_dragSource"
          style={{
            ...style,
            left,
            top,
            height,
            width,
            backgroundImage: `url("${Url}")`,
            overflow: "visible",

            // background: "red",
          }}
          onDoubleClick={() => this.typeCheck(this)}
        >
          {isCheckedMic ? (
            <img
              src={renderPrgImage("PcinternalMicActive")}
              style={{
                height: "26%",
                width: "15%",
                marginTop: "-84px",
                marginLeft: "41.5%",
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalMicInActive")}
              style={{
                height: "26%",
                width: "15%",
                marginTop: "-84px",
                marginLeft: "41.5%",
              }}
            />
          )}

          {/*LEFT EYE  */}
          {isCheckedEyeLeft ? (
            <img
              src={renderPrgImage("PcinternalEYEActive")}
              style={{
                height: "5%",
                width: "8%",
                position: "absolute",
                top: "19%",
                left: "40%",
                transform: `translate(-34%,-31%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalEYEInActive")}
              style={{
                height: "5%",
                width: "8%",
                position: "absolute",
                top: "19%",
                left: "40%",
                transform: `translate(-34%,-31%)`,
              }}
            />
          )}

          {/*RIGHT EYE  */}
          {isCheckedEyeRight ? (
            <img
              src={renderPrgImage("PcinternalEYEActive")}
              style={{
                height: "5%",
                width: "8%",
                position: "absolute",
                top: "19%",
                left: "58.5%",
                transform: `translate(-67.5%,-31%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalEYEInActive")}
              style={{
                height: "5%",
                width: "8%",
                position: "absolute",
                top: "19%",
                left: "58.5%",
                transform: `translate(-67.5%,-31%)`,
              }}
            />
          )}

          {/* 1-teeth Active*/}
          {isCheckedSimeleOne ? (
            <img
              src={renderPrgImage("PcinternalTeethActive")}
              style={{
                height: "2%",
                width: "1.7%",
                position: "absolute",
                top: "34%",
                left: "43.4%",
                transform: `translate(-40.4%,-60%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalTeethInActive")}
              style={{
                height: "2%",
                width: "1.7%",
                position: "absolute",
                top: "34%",
                left: "43.4%",
                transform: `translate(-40.4%,-60%)`,
              }}
            />
          )}
          {/* 2-teeth Active*/}
          {isCheckedSimeleTwo ? (
            <img
              src={renderPrgImage("PcinternalTeethActive")}
              style={{
                height: "2%",
                width: "1.7%",
                position: "absolute",
                top: "35%",
                left: "45.5%",
                transform: `translate(-43.5%,-61%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalTeethInActive")}
              style={{
                height: "2%",
                width: "1.7%",
                position: "absolute",
                top: "35%",
                left: "45.5%",
                transform: `translate(-43.5%,-61%)`,
              }}
            />
          )}

          {/* 4-in-1 Sensor  */}
          {isCheckedColorSensor ||
          isCheckedDistanceSensors ||
          isCheckedGestureSensor ||
          isCheckedLightSensor ? (
            <img
              src={renderPrgImage("Pcinternal4in1Active")}
              style={{
                height: "2%",
                width: "3%",
                position: "absolute",
                left: "48.5%",
                top: "35%",
                transform: `translate(-30%,-61%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("Pcinternal4in1InActive")}
              style={{
                height: "2%",
                width: "3%",
                position: "absolute",
                left: "48.5%",
                top: "35%",
                transform: `translate(-30%,-61%)`,
              }}
            />
          )}

          {/* 3-teeth Active*/}
          {isCheckedSimeleThree ? (
            <img
              src={renderPrgImage("PcinternalTeethActive")}
              style={{
                height: "2%",
                width: "1.7%",
                position: "absolute",
                top: "35%",
                left: "52.5%",
                transform: `translate(-57%,-61%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalTeethInActive")}
              style={{
                height: "2%",
                width: "1.7%",
                position: "absolute",
                top: "35%",
                left: "52.5%",
                transform: `translate(-57%,-61%)`,
              }}
            />
          )}

          {/* 4-teeth Active*/}
          {isCheckedSimeleFour ? (
            <img
              src={renderPrgImage("PcinternalTeethActive")}
              style={{
                height: "2%",
                width: "1.7%",
                position: "absolute",
                top: "34%",
                left: "54.5%",
                transform: `translate(-60.3%,-60%)`,
              }}
            />
          ) : (
            <img
              src={renderPrgImage("PcinternalTeethInActive")}
              style={{
                height: "2%",
                width: "1.7%",
                position: "absolute",
                top: "34%",
                left: "54.5%",
                transform: `translate(-60.3%,-60%)`,
              }}
            />
          )}
        </div>

        // OLD RENDER IMG
        // <img
        //   className="user-select"
        //   src={renderPrgImage Url}
        //   id="biboxClass"
        //   style={{
        //     ...style,
        //     left,
        //     top,
        //     height,
        //     width,
        //     border: "1px solid red",
        //   }}
        // />
        // </div>
      );
    } else {
      return connectDragSource(
        <img
          className="user-select"
          src={Url}
          id="biboxClass"
          style={{
            ...style,
            left,
            top,
            height,
            width,
            // border: "1px solid red",
          }}
        />
      );
    }
  }
}
// });

export default DragSource(ItemTypes.BIBOX, biboxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Bibox);
