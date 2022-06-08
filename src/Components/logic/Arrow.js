import React from "react";

var createReactClass = require("create-react-class");

var PureRenderMixin = require("react-addons-pure-render-mixin");

var Arrow = createReactClass({
  mixins: [PureRenderMixin],
  render() {
    const { cx, cy, color, rotated, data } = this.props;
    return (
      <g
        transform={
          "translate(" +
          cx +
          "," +
          cy +
          ") " +
          (cx === 153
            ? "translate(-1,-29) , rotate(90)"
            : cx == 106.67653718043597 || cx == 140.67653718043596
            ? "translate(100,5509)"
            : cy == 51
            ? "rotate(270), translate(30)"
            : data
            ? "rotate(180)"
            : color == "\t#FF4500" || color == "\t#FF4500 "
            ? "translate(100,5509)"
            : rotated
            ? "rotate(90) "
            : "") +
          "translate(-17,-14)"
        }
        fill={rotated != true && color != "#3FD0C1" ? "#039486" : color}
        stroke="none"
        // stroke={rotated && color != "#3FD0C1" ? "#000000" : "none"}
        strokeWidth="2"
      >
        <polygon points="0,9 20,9 20,0 34,14 20,28 20,19 0,19" />
        <polyline
          //stroke={rotated && color != "#3FD0C1" ? "none" : "white"}
          stroke="white"
          strokeWidth="1"
          fill="none"
          points="20,0 34,14 20,28"
        />
      </g>
    );
  },
});

export default Arrow;
