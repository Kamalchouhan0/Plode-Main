import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import VisualStyle from "./VisualPrgm.module.css";
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
export class VisualPrgm extends Component {
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
        <div className={VisualStyle.container}></div>
        <Slider {...settings}>
          <div className={VisualStyle.wdt}>
            <img
              className={VisualStyle.img}
              src={renderPrgImage("VirtualPrgf1")}
            />
            <div className={VisualStyle.Hel}>
              <p className={VisualStyle.Hel_P}>
                {" "}
                Help Button will explain all the features and functionality of
                the entire app for each screen{" "}
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
          <div className={VisualStyle.wdt}>
            <img
              className={VisualStyle.img}
              src={renderPrgImage("VirtualPrgf2")}
            />
            <div className={VisualStyle.con}>
              <p className={VisualStyle.con_P}>
                This is a minimalist approach that won’t dwell on the
                technicalities of electronics, but rather teaches you to select
                ideal components, assemble them and program them using visual
                elements.
              </p>
            </div>
          </div>
          <div className={VisualStyle.wdt}>
            <img
              className={VisualStyle.img}
              src={renderPrgImage("VirtualPrgf3")}
            />
            <div className={VisualStyle.Mus}>
              <p className={VisualStyle.Mus_P}>
                Here you will probe a bit deeper into the technicalities. You
                will also be equipped to configure the ports as well as program
                it. Furthermore, you will understand the concepts of open-ended
                programming and parallel programming.
              </p>
            </div>
          </div>
          <div className={VisualStyle.wdt}>
            <img
              className={VisualStyle.img}
              src={renderPrgImage("VirtualPrgf4")}
            />
            <div className={VisualStyle.Cam}>
              <p className={VisualStyle.Cam_P}>
                This level utilises the powerhouse that is Scratch. Closely
                resembling textual programming, you will learn to create
                programs involving variables and complex mathematical
                expressions.
              </p>
            </div>
          </div>

          <div className={VisualStyle.wdt}>
            <img
              className={VisualStyle.img}
              src={renderPrgImage("VirtualPrgf5")}
            />
            <div className={VisualStyle.Ca}>
              <p className={VisualStyle.Ca_P}>
                In the final step to becoming a full-fledged coder, all your
                skills will be honed and sharpened through a detailed and well
                laid-out course covering the most sought-after languages of
                today; C and Python.
              </p>
            </div>
          </div>

          <div className={VisualStyle.wdt}>
            <img
              className={VisualStyle.img}
              src={renderPrgImage("VirtualPrgf6")}
            />
            <div className={VisualStyle.Camr}>
              <p className={VisualStyle.Camr_P}>
                In the final step to becoming a full-fledged coder, all your
                skills will be honed and sharpened through a detailed and well
                laid-out course covering the most sought-after languages of
                today; C and Python.
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

export default VisualPrgm;
