import React, { Component } from "react";
import Data from "./data";
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    var colorofComponent;

    for (var i = 0; i < Data.length; i++) {
      if (Data[i].name == this.props.name) {
        colorofComponent = Data[i].color;
      }
    }

    return (
      <div
        id="coverflowElement"
        // title={this.props.curCard}
        cardId={this.props.cardId}
        style={{
          background: "#FFF",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            height: "96%",
            // backgroundImage: 'url("' + this.props.url + '")',

            backgroundImage:
              "url(" + process.env.PUBLIC_URL + `${this.props.url}` + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundColor: "rgba(255, 255, 255)",

            marginTop: "2%",
            marginLeft: "2%",
            marginRight: "2%",
            marginBottom: "2%",
            borderRadius: "16px 16px 16px 16px",
          }}
        />{" "}
      </div>
    );
  }
}

export default Card;
