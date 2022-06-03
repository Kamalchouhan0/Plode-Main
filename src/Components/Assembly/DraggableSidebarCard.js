import React, { Component } from "react";
import data from "../concept/data";
import { DragSource } from "react-dnd-old";
import ItemTypes from "./ItemTypes";
import DraggingInfo from "./DraggingInfo";
import { getEmptyImage } from "react-dnd-html5-backend-old";
import renderCompImg from "../../source/Comp_Img";

const cardSource = {
  beginDrag(props) {
    sessionStorage.setItem("dragingItem", props.type);

    DraggingInfo.isDragging = true;
    return { type: props.type };
  },
  endDrag: () => {
    DraggingInfo.isDragging = false;
    DraggingInfo.newComponentPort = null;
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }
  render() {
    const { isDragging, connectDragSource, type } = this.props;
    console.log("draggable", this.props);
    var widthSize;
    var leftPro;

    if (type == "dual_splitter" || type == "ultrasonic_sensor") {
      widthSize = "80%";

      leftPro = "7%";
    } else if (type == "RGB" || type == "mp3" || type == "OLED") {
      widthSize = "80%";

      leftPro = "7%";
    } else {
      widthSize = "60%";

      leftPro = "22%";
    }

    if (type == "play_shield" && this.props.shield == true) {
      return (
        <img
          style={{
            zIndex: "50",
            opacity: "1",

            width: widthSize,
            position: "absolute",
            top: "12%",
            left: leftPro,
            objectFit: "fill",
            transform: "scale(1.45,1.45)",
            opacity: 0.5,
            // marginLeft: "-125px",
            // marginTop: "20px",
          }}
          // src={`images/oldImages/component_` + type + ".png"}
          src={renderCompImg(type)}
        />
      );
    }

    return connectDragSource(
      // <img style={{ height: "120px", width: "80px", position: "absolute", marginLeft: "-125px", marginTop: "20px" }} src={`images/oldImages/component_` + type + '.png'} />
      // "dual_splitter"  "ultrasonic_sensor"

      <img
        style={{
          zIndex: "50",
          opacity: "1",

          width: widthSize,
          position: "absolute",
          top: "12%",
          left: leftPro,
          objectFit: "fill",
          transform: "scale(1.45,1.45)",
          // marginLeft: "-125px",
          // marginTop: "20px",
        }}
        // src={`images/oldImages/component_` + type + ".png"}
        src={renderCompImg(type)}
      />

      // <img
      //   style={{
      //     zIndex: "100",
      //     opacity: "1",
      //     height: "110px",
      //     width: "40%",
      //     position: "absolute",
      //     top: "12%",
      //     left: "20%",
      //     objectFit: "fill",
      //     // marginLeft: "-125px",
      //     // marginTop: "20px",
      //   }}
      //   src={`images/oldImages/component_` + type + ".png"}
      // />
    );
  }
}

// export default Card;
export default DragSource(ItemTypes.COMPONENT, cardSource, collect)(Card);
