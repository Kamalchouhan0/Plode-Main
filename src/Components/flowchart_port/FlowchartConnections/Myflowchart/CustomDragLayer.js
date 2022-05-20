import { useDragLayer } from "react-dnd-latest";

import Background_if from "../../../../Assets/flowchart/Group 5566@2x.png";
import Background_loop from "../../../../Assets/flowchart/Group 5570@2x.png";
import Background_wait from "../../../../Assets/flowchart/Group 5572@2x.png";
import Background_repeat from "../../../../Assets/flowchart/Group 5571@2x.png";
import Background_output from "../../../../Assets/flowchart/Group 5565@2x.png";

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 100,
  top: 10,
  width: "100%",
  height: "100%",
};
function getItemStyles(initialOffset, currentOffset, xOffset, yOffset, type) {
  let Background;
  if (type == "wait") Background = Background_wait;
  else if (type == "if") Background = Background_if;
  else if (type == "output") Background = Background_output;
  else if (type == "loop") Background = Background_loop;
  else if (type == "repeat") Background = Background_repeat;
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  let height = 52,
    width = 120;

  let { x, y } = currentOffset;
  x = x - xOffset;
  y = y - yOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    backgroundImage: `url(${Background}) `,
    height: `${height}px`,
    width: `${width}px`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  
    transform,
    WebkitTransform: transform,
  };
}
export const CustomDragLayer = (props) => {
  const { itemType, isDragging, item, initialOffset, currentOffset, delta } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
      delta: monitor.getDifferenceFromInitialOffset(),
    }));
  const myStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Sans-Serif",
  };
  function renderItem() {
    var elem, style;
    elem = document.querySelector(".dndnode_if_dot");

    console.log("gskcss");

    console.log("GSKITEM", initialOffset, currentOffset);
    switch (item.id) {
      case "if":
        return (
          <div
           
            style={getItemStyles(initialOffset, currentOffset, 158, 35, "if")}
            id="if_dot"
          ></div>
        ); 
      case "loop":
        return (
          <div
            className="dndnode_loop_dot"
            style={getItemStyles(initialOffset, currentOffset, 158, 35, "loop")}
          ></div>
        );
      case "wait":
        return (
          <div
            className="dndnode_wait_dot"
            style={getItemStyles(initialOffset, currentOffset, 158, 35, "wait")}
          ></div>
        );
      case "output":
        return (
          <div
            className="dndnode_output_dot"
            style={getItemStyles(
              initialOffset,
              currentOffset,
              158,
              35,
              "output"
            )}
          ></div>
        );
      case "end/repeat":
        return (
          <div
            className="dndnode_end/repeat"
            style={getItemStyles(
              initialOffset,
              currentOffset,
              158,
              35,
              "repeat"
            )}
          ></div>
        );
      default:
        return <h1>hello</h1>;
    }
  }
  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div>{renderItem()}</div>
    </div>
  );
};
