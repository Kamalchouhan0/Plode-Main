import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MuscStyle from "./MuscSlider.module.css";
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
export class MuscSlider extends Component {
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
        <div className={MuscStyle.container}></div>
        <Slider {...settings}>
          <div className={MuscStyle.wdt}>
            <img
              className={MuscStyle.img}
              src={"../../Bisoft_UI/Help screen/Play/Group 3189@2x.png"}
              className={MuscStyle.img}
            />
            <div className={MuscStyle.Hel}>
              <p className={MuscStyle.Hel_P}>
                {" "}
                Help Button will explain all the features and functionality of
                the entire app for each screen{" "}
              </p>
            </div>

            <div className={MuscStyle.Rem}>
              <p className={MuscStyle.Rem_P}>
                When the app is connected to the Play Computer, the icon will be
                GREEN in colour, & when disconnected, the icon will turn RED. If
                the app gets disconnected from the Play computer, then on top of
                this button, it’ll attempt to connect automatically.
              </p>
            </div>
          </div>
          {/* <div className="wdt>
            <img
              style={{ height: "40px" }}
              src={}
              className="img"
            />
          </div> */}
          <div className={MuscStyle.wdt}>
            <img
              className={MuscStyle.img}
              src={"../../Bisoft_UI/Help screen/Play/Group 3190@2x.png"}
              className={MuscStyle.img}
            />
            <div className={MuscStyle.con}>
              <p className={MuscStyle.con_P}>
                In Playcomputer tone mode, user needs to press the keys on the
                piano to make the playcomputer play the respective tones.
              </p>
            </div>
          </div>
          <div className={MuscStyle.wdt}>
            <img
              className={MuscStyle.img}
              src={"../../Bisoft_UI/Help screen/Play/Group 3191@2x.png"}
              className={MuscStyle.img}
            />
            <div className={MuscStyle.Mus}>
              <p className={MuscStyle.Mus_P}>
                Toggle switch to switch between Playcomputer playing tones or
                app playing tones.
              </p>
            </div>
          </div>
          <div className={MuscStyle.wdt}>
            <img
              className={MuscStyle.img}
              src={"../../Bisoft_UI/Help screen/Play/Group 3192@2x.png"}
              className={MuscStyle.img}
            />
            <div className={MuscStyle.Cam}>
              <p className={MuscStyle.Cam_P}>
                • In app tone mode, the user touches the playcomputer’s touch
                pads & the app will play the corresponding tones.
                <br />• The user needs to touch the 3 touch pads on the
                playcomputer’s edge connector.
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

export default MuscSlider;
