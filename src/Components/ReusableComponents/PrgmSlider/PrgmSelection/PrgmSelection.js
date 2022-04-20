import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SelectionStyle from "./PrgmSelection.module.css";
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
export class PrgmSelection extends Component {
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
        <div className={SelectionStyle.container}></div>
        <Slider {...settings}>
          <div className={SelectionStyle.wdt}>
            <img
              className={SelectionStyle.img}
              src={renderPrgImage("SelectionPrgf1")}
              className={SelectionStyle.img}
            />
            <div className={SelectionStyle.Hel}>
              <p className={SelectionStyle.Hel_P}>
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
          <div className={SelectionStyle.wdt}>
            <img
              className={SelectionStyle.img}
              src={renderPrgImage("SelectionPrgf2")}
              className={SelectionStyle.img}
            />
            <div className={SelectionStyle.con}>
              <p className={SelectionStyle.con_P}>
                To begin a new project with a fresh start, use this button
              </p>
            </div>
          </div>
          <div className={SelectionStyle.wdt}>
            <img
              className={SelectionStyle.img}
              src={renderPrgImage("SelectionPrgf3")}
              className={SelectionStyle.img}
            />
            <div className={SelectionStyle.Mus}>
              <p className={SelectionStyle.Mus_P}>
                To load and open your already saved projects, click on this
                button & select from the list.
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

export default PrgmSelection;
