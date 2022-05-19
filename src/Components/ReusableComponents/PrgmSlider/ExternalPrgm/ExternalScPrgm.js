import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ExternalStyle from "./ExternalScPrgm.module.css";
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
export class ExternalScPrgm extends Component {
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
        <div className={ExternalStyle.container}></div>
        <Slider {...settings}>
          <div className={ExternalStyle.wdt}>
            <img
              className={ExternalStyle.img}
              src={renderPrgImage("ExternalPrgf2")}
            />
            <div className={ExternalStyle.con}>
              <p className={ExternalStyle.con_P}>
                A scrollable list of all the external accessories - both input &
                output type are present here. User can select any or all of them
                from this list.
              </p>
            </div>
          </div>
          <div className={ExternalStyle.wdt}>
            <img
              className={ExternalStyle.img}
              src={renderPrgImage("ExternalPrgf3")}
            />
            <div className={ExternalStyle.Mus}>
              <p className={ExternalStyle.Mus_P}>
                All external accessories that are selected from the list appear
                here to be used for the next set of screens.
              </p>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

export default ExternalScPrgm;
