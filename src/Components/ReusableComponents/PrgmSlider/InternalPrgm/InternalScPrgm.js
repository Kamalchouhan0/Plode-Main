import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import InternalStyle from "./InternalScPrgm.module.css";
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
export class InternalScPrgm extends Component {
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
        <div className={InternalStyle.container}></div>
        <Slider {...settings}>
          <div className={InternalStyle.wdt}>
            <img
              className={InternalStyle.img}
              src={renderPrgImage("InternalPrgf1")}
            />
            <div className={InternalStyle.Hel}>
              <p className={InternalStyle.Hel_P}>
                {" "}
                To save the new project or overwrite the saved & loaded project.
              </p>
            </div>
            <div className={InternalStyle.Cam1}>
              <p className={InternalStyle.Cam1_P}>
                Bluetooth connection status; red: disconnected, green:
                connected.
              </p>
            </div>
            <div className={InternalStyle.Cam2}>
              <p className={InternalStyle.Cam2_P}>
                To go back to the new project / your project screen
              </p>
            </div>
            <div className={InternalStyle.Cam3}>
              <p className={InternalStyle.Cam3_P}>
                To go to external accessories screen
              </p>
            </div>
          </div>

          <div className={InternalStyle.wdt}>
            <img
              className={InternalStyle.img}
              src={renderPrgImage("InternalPrgf2")}
            />
            <div className={InternalStyle.con}>
              <p className={InternalStyle.con_P}>
                All Internal accessories input or output that are enabled are
                highlighted on the playcomputer at the respective positions.
              </p>
            </div>
          </div>
          <div className={InternalStyle.wdt}>
            <img
              className={InternalStyle.img}
              src={renderPrgImage("InternalPrgf3")}
            />
            <div className={InternalStyle.Mus}>
              <p className={InternalStyle.Mus_P}>
                The list of all the internal accessories- Input type, that can
                be enabled or disabled.
              </p>
            </div>
          </div>

          <div className={InternalStyle.wdt}>
            <img
              className={InternalStyle.img}
              src={renderPrgImage("InternalPrgf4")}
            />
            <div className={InternalStyle.Cam}>
              <p className={InternalStyle.Cam_P}>
                The list of the internal accessories - output type, that can be
                enabled or diabled
              </p>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

export default InternalScPrgm;
