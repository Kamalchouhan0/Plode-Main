import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CamStyle from "./CamSlider.module.css";
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
          right: "-290px",
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
export class CamSlider extends Component {
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
        <div class="container"></div>
        <Slider {...settings}>
          <div className={CamStyle.wdt}>
            <img className={CamStyle.img} src={renderImage("Cam1")} />
            <div className={CamStyle.Hdg}>
              <p className={CamStyle.Hdg_P}>
                {" "}
                Help Button will explain all the features and functionality of
                the entire app for each screen{" "}
              </p>
            </div>
            <div className={CamStyle.Mdl}>
              <p className={CamStyle.Mdl_P}>
                When the app is connected to the Play Computer, the icon will be
                GREEN in colour, & when disconnected, the icon will turn RED. If
                the app gets disconnected from the Play computer, then on top of
                this button, it’ll attempt to connect automatically.
              </p>
            </div>
          </div>

          <div className={CamStyle.wdt}>
            <img className={CamStyle.img} src={renderImage("Cam2")} />
            <div className={CamStyle.con}>
              <p className={CamStyle.con_P}>
                {" "}
                Working <br /> • The front camera of your Computer/Laptop is
                enabled in this mode.
                <br /> • The camera will detect the tilt position of the your
                head, like - tilt left, tilt right, tilt up, tilt down & center,
                along with smile face. The detected positions by the app, will
                send a command to the Playcomputer to perform a certain action.
              </p>
            </div>
          </div>

          <div className={CamStyle.wdt}>
            <img className={CamStyle.img} src={renderImage("Cam2")} />
            <div className={CamStyle.Mus}>
              <p className={CamStyle.Mus_P}>
                Requirements & permissions:
                <br />
                • For this to work properly, please allow the PLODE app to
                record video. <br />• Set permission to allow the app to access
                the camera when the app is running.
              </p>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

export default CamSlider;
