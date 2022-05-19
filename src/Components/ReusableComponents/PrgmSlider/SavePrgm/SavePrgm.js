import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SaveStyle from "./SavePrgm.module.css";
import renderPrgImage from "../../../../source/programImg";
import renderImage from "../../../../source/importImg";
function SampleNextArrow(props) {
  const { className, onClick } = props;
  var style = {
    fontSize: "0",
    lineHeight: "0",
    position: "absolute",
    top: "50%",
    display: "block",
    width: "20px",
    height: "20px",
    padding: "0",
    transform: "translate(0, -50%)",
    cursor: "pointer",
    color: "transparent",
    border: "none",
    outline: "none",
    background: "transparent",
  };
  return (
    <div>
      <div
        className={"slick-arrow"}
        style={{
          ...style,
          right: "-320px",
          height: "25%",
          zIndex: "0",
          width: "25%",
          cursor: "default",
        }}
      >
        <img
          src={renderImage("rightArrow")}
          style={{ width: "30%", cursor: "grab" }}
          onClick={onClick}
        ></img>
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  var style = {
    fontSize: "0",
    lineHeight: "0",
    position: "absolute",
    top: "50%",
    display: "block",
    width: "20px",
    height: "20px",
    padding: "0",
    transform: "translate(0, -50%)",
    cursor: "pointer",
    color: "transparent",
    border: "none",
    outline: "none",
    background: "transparent",
  };
  return (
    <div
      className={"slick-arrow"}
      style={{
        ...style,
        left: "-20px",
        display: "block",
        height: "25%",
        width: "25%",
        zIndex: "1000",
        cursor: "default",
      }}
    >
      <img
        src={renderImage("leftArrow")}
        style={{ width: "30%", cursor: "grab", zIndex: "1000" }}
        onClick={onClick}
      ></img>
    </div>
  );
}
export class SavePrgm extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div>
        <div className={SaveStyle.container}></div>
        <Slider {...settings}>
          {/* <div className="wdt>
            <img
              style={{ height: "40px" }}
              src={}
              className="img"
            />
          </div> */}
          <div className={SaveStyle.wdt}>
            <img className={SaveStyle.img} src={renderPrgImage("SavePrgf1")} />
            <div className={SaveStyle.con}>
              <p className={SaveStyle.con_P}>
                For saving the program created, enter the required fields of the
                project like “name of the project”, “short description of the
                project” and “any live video link of the project uploaded”.
                Note: The project description and live video link is not
                mandatory to enter.
              </p>
            </div>
          </div>
          <div className={SaveStyle.wdt}>
            <img className={SaveStyle.img} src={renderPrgImage("SavePrgf2")} />
            <div className={SaveStyle.Cam}>
              <p className={SaveStyle.Cam_P}>
                Use this button, when you want to upload the program to the
                playcomputer, for it to start functioning as created in the
                program.
              </p>
            </div>
          </div>

          <div className={SaveStyle.wdt}>
            <img className={SaveStyle.img} src={renderPrgImage("SavePrgf3")} />
            <div className={SaveStyle.Mus}>
              <p className={SaveStyle.Mus_P}>
                Use this button to save your project after entering the details.
              </p>
            </div>
          </div>

          {/* <div className="wdt">
            <img className="img" src={"assets/w2.png"} className="img" />
          </div> */}
        </Slider>
      </div>
    );
  }
}

export default SavePrgm;
