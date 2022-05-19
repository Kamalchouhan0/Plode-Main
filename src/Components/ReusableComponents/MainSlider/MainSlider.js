import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MainStyle from "./MainSlider.module.css";
import renderImage from "../../../source/importImg";
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
export class MainSlider extends Component {
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
        <div className={MainStyle.container}></div>
        <Slider {...settings}>
          <div className={MainStyle.wdt}>
            <img className={MainStyle.img} src={renderImage("AddInfo")} />
            <div className={MainStyle.Hel}>
              <p className={MainStyle.Hel_P}>
                {" "}
                Help Button will explain all the features and functionality of
                the entire app for each screen{" "}
              </p>
            </div>
            <div className={MainStyle.Rem}>
              <p className={MainStyle.Rem_P}>
                {" "}
                Add Button to add or scan for new devices you like to program{" "}
              </p>
            </div>
          </div>

          <div className={MainStyle.wdt}>
            <img className={MainStyle.img} src={renderImage("PlyComp")} />
            <div className={MainStyle.con}>
              <p className={MainStyle.con_P}>
                Select the device you will be using from the list
              </p>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

export default MainSlider;
