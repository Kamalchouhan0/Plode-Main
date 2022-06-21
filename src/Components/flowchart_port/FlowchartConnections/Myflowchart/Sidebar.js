import React, { useState, memo, useEffect } from "react";
import { useDrag } from "react-dnd-latest";
import { getEmptyImage } from "react-dnd-html5-backend-latest";
import { useHistory } from "react-router-dom";
import "./dnd.css";

let flagI = -1,
  offset,
  elements;
let sourceHandle;
const Sidebar = memo(function Sidebar(props) {
  const history = useHistory();
  let title, left, top;
  const [id, setId] = useState("nan");

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: "yellow",
      item: { id, left, top, title },
      canDrag: true,
      collect: (monitor) => ({
        isDragging: monitor,
      }),
    }),
    [id, left, top, title]
  );

  var index1, index2, index3, index4;
  function getCoords(elem) {
    // crossbrowser version

    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
      x: Math.round(left) - 145,
      y: Math.round(top) - 96,
      id: parseInt(elem.dataset.id),
    };
  }
  let zoom;
  const onDragStart = async (event, nodeType) => {
    zoom = JSON.parse(sessionStorage.getItem("planeOffset")) || 1;

    if (zoom != 1) zoom = zoom.zoom;
    let global = document.getElementsByClassName("react-flow__nodes")[0];

    let zoomVal = document.querySelector(".react-flow__nodes");
    let edgeZoom = document.querySelector(".react-flow__edges");
    console.log("zoom", edgeZoom.children[1]);
    // document.querySelector(".react-flow__nodes").style.transform =
    //   document
    //     .querySelector(".react-flow__nodes")
    //     .style.transform.slice(0, zoomVal.style.transform.search("scale") - 1) +
    //   " scale(1)";
    // document.querySelector(".react-flow__edges").children[1].style.transform =
    //   document
    //     .querySelector(".react-flow__edges")
    //     .children[1].style.transform.slice(
    //       0,
    //       zoomVal.style.transform.search("scale") - 1
    //     ) + " scale(1)";
    offset = JSON.parse(sessionStorage.getItem("planeOffset"));
    flagI = -1;
    sessionStorage.setItem("application/reactflow/connect", flagI);
    elements = JSON.parse(sessionStorage.getItem("flowchart-elements"));
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
    try {
      global = global.childNodes;
      for (let i = 0; i < global.length; i++) {
        let temp = await getCoords(global[i]);
        let index = await elements.findIndex((e) => e.id === `${temp.id}`);
        globalpass[index] = temp;
      }
      console.log(globalpass, "getCoords");
    } catch (e) {}
    if (nodeType === "start") {
      setTimeout(function () {
        document.querySelector("#foo").classList.add("myClass");
      }, 200);
    }
  };
  let globalpass = []; //= document.getElementsByClassName("react-flow__nodes")[0];

  const onDrag = async (event, nodeType) => {
    console.log(
      window.devicePixelRatio,
      window.screen.width,
      window.screen.height,
      globalpass,
      "sidebar===>"
    );
    let screenOffsetX = 0,
      screenOffsetY = 0;
    if (window.screen.width != 1920 && window.screen.height != 1080) {
      screenOffsetX = 0;
      screenOffsetY = -27;
    } else {
      screenOffsetX = 0;
      screenOffsetY = 0;
    }
    let xOffset = 0,
      yOffset = 0;

    // if (offset != null) {
    //   xOffset = offset.x;
    //   yOffset = offset.y;
    // }
    console.time("sidebar_autoconnect");

    for (let i = 0; i < Object.keys(elements).length; i++) {
      if (elements[i] != null && elements[i] != undefined) {
        if (elements[i].data != null && elements[i].data != undefined) {
          console.log(
            "after position calc ",
            event.clientX - globalpass[i].x,
            event.clientY - globalpass[i].y,
            "after position calc d",
            event.clientX - globalpass[i].x - 62 * (zoom - 1),
            event.clientY - globalpass[i].y - 62 * (zoom - 1),
            "after position calc rNo",
            event.clientX - globalpass[i].x - 117 * (zoom - 1),
            event.clientY - globalpass[i].y - 62 * (zoom - 1)
          );
          if (
            event.clientX - (globalpass[i].x + xOffset) - 61 * (zoom - 1) >=
              200 &&
            event.clientX - (globalpass[i].x + xOffset) - 61 * (zoom - 1) <=
              325 &&
            event.clientY - (globalpass[i].y + yOffset) - 61 * (zoom - 1) >=
              90 + screenOffsetY &&
            event.clientY - (globalpass[i].y + yOffset) - 61 * (zoom - 1) <=
              165 + screenOffsetY
          ) {
            if (elements[i].data.specificElType == "if") {
              if (
                event.clientX - (globalpass[i].x + xOffset) - 61 * (zoom - 1) <=
                  204 + 5 &&
                event.clientX - (globalpass[i].x + xOffset) - 61 * (zoom - 1) >=
                  204 - 5
              )
                sourceHandle = "d";
              if (
                event.clientX -
                  (globalpass[i].x + xOffset) -
                  115 * (zoom - 1) <=
                  261 + 5 &&
                event.clientX -
                  (globalpass[i].x + xOffset) -
                  115 * (zoom - 1) >=
                  261 - 5 &&
                event.clientY - (globalpass[i].y + yOffset) - 30 * (zoom - 1) <=
                  125 + 5 + screenOffsetY &&
                event.clientY - (globalpass[i].y + yOffset) - 30 * (zoom - 1) >=
                  125 - 5 + screenOffsetY
              ) {
                sourceHandle = "rYes";
              } else if (
                event.clientX -
                  (globalpass[i].x + xOffset) -
                  115 * (zoom - 1) <=
                  261 + 5 &&
                event.clientX -
                  (globalpass[i].x + xOffset) -
                  115 * (zoom - 1) >=
                  261 - 5 &&
                event.clientY - (globalpass[i].y + yOffset) - 50 * (zoom - 1) <=
                  146 + 5 + screenOffsetY &&
                event.clientY - (globalpass[i].y + yOffset) - 50 * (zoom - 1) >=
                  146 - 5 + screenOffsetY
              ) {
                sourceHandle = "rNo";
              }
            } else if (elements[i].data.specificElType == "loop") {
              if (
                event.clientX -
                  (globalpass[i].x + xOffset) -
                  117 * (zoom - 1) <=
                  261 + 5 &&
                event.clientX -
                  (globalpass[i].x + xOffset) -
                  117 * (zoom - 1) >=
                  261 - 5
              ) {
                sourceHandle = await "r";
              } else if (
                event.clientX - (globalpass[i].x + xOffset) - 61 * (zoom - 1) <=
                  205 + 5 &&
                event.clientX - (globalpass[i].x + xOffset) - 61 * (zoom - 1) >=
                  205 - 5
              ) {
                sourceHandle = await "d";
              }
              console.log("KHBIBHIKBIKBIK", sourceHandle);
            } else sourceHandle = "d";

            flagI = i;

            if (sourceHandle != undefined) {
              let send = { index: i, sourceHandle: sourceHandle, flag: true };
              sessionStorage.setItem(
                "application/reactflow/connect",
                JSON.stringify(send)
              );
              console.log("gsk handle", sourceHandle, flagI);
            }
            index1 = -(await elements.findIndex(
              (e) => e.source === elements[flagI].id && e.sourceHandle === "d"
            ));
            index2 = -(await elements.findIndex(
              (e) =>
                e.source === elements[flagI].id && e.sourceHandle === "rYes"
            ));
            index3 = -(await elements.findIndex(
              (e) => e.source === elements[flagI].id && e.sourceHandle === "rNo"
            ));
            index4 = -(await elements.findIndex(
              (e) => e.source === elements[flagI].id && e.sourceHandle === "r"
            ));
            break;
          }
        }
      }
    }

    console.timeEnd("sidebar_autoconnect");
    try {
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      console.log("gsk index", index1, index2, index3);
      // var index2 = await elements.findIndex(
      //   (e) =>
      //     e.target === params.target && e.targetHandle === params.targetHandle
      // );
      if (flagI != -1) {
        let mx = 0,
          my = 0;
        if (flagI == 0 && index1 >= 0) {
          mx = 60 * zoom;
          my = 0;
        } else if (sourceHandle == "d" && index1 >= 0) {
          mx = 60 * zoom;
          my = 40 * zoom;
        } else if (sourceHandle == "rYes" && index2 >= 0) {
          mx = 115 * zoom;
          my = 10 * zoom;
        } else if (sourceHandle == "rNo" && index3 >= 0) {
          mx = 115 * zoom;
          my = 30 * zoom;
        } else if (sourceHandle == "r" && index4 >= 0) {
          mx = 115 * zoom;
          my = 20 * zoom;
        } else {
          ctx.clearRect(0, 0, 1775, 884);
          return;
        }
        console.log("gskconnect", mx, my, sourceHandle);

        ctx.beginPath();
        ctx.moveTo(
          globalpass[flagI].x + xOffset + mx,
          globalpass[flagI].y + yOffset + my
        );
        // ctx.bezierCurveTo(
        //   10,
        //   10,
        //   18,
        //   10,
        //   event.clientX - 124,
        //   event.clientY - 105
        // );

        // xOffset += elements[flagI].position.x;
        // yOffset += elements[flagI].position.y;
        console.log("planeOffset", event.clientX, yOffset);
        if (event.clientX == 0 || event.clientY == 0) return;
        let cx =
          Math.abs(event.clientX - 124 - (globalpass[flagI].x + xOffset) + 60) /
          2;
        let cy =
          Math.abs(
            event.clientY +
              -105 -
              screenOffsetY -
              (globalpass[flagI].y + yOffset)
          ) / 2;
        if (event.clientX - 144 < globalpass[flagI].x + xOffset + 60)
          cx = cx + event.clientX - 144;
        else cx = cx + globalpass[flagI].x + xOffset;
        if (event.clientY - 105 - screenOffsetY < globalpass[flagI].y + yOffset)
          cy = cy + event.clientY - 105 - screenOffsetY;
        else cy = cy + globalpass[flagI].y + yOffset;
        ctx.quadraticCurveTo(
          cx,
          cy,
          event.clientX - 144,
          event.clientY - 118 + 13 - screenOffsetY
        );
        ctx.lineWidth = 2.725 * zoom;
        ctx.strokeStyle = "green";
        ctx.clearRect(0, 0, 1775, 884);
        ctx.stroke();
      }
    } catch (e) {
      ctx.clearRect(0, 0, 1775, 884);
      console.log(e);
    }
  };
  const onMouseEnter = async (event) => {
    setId(await event.target.attributes[2].nodeValue);
    console.log(id, "gskMouse");
  };
  const onDragEnd = (event) => {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 1755, 884);
    let send = { index: -1, sourceHandle: undefined, flag: false };
    sessionStorage.setItem(
      "application/reactflow/connect",
      JSON.stringify(send)
    );
    // let zoom;

    // if (sessionStorage.getItem("planeOffset") != "null")
    //   zoom = JSON.parse(sessionStorage.getItem("planeOffset")).zoom;
    // else zoom = 1;

    // if (zoom != 1) {
    //   setTimeout(() => {
    //     history.push("/flow/digital-analog");
    //     history.push("/flow/flowchart");
    //   }, 0);
    //   sessionStorage.setItem("planeOffset", null);
    // }
  };
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);
  return (
    <>
      <aside id="sidebar">
        <div className="description" ref={drag}>
          <div
            className="dndnode_start myClass"
            value="starts"
            onDragStart={(event) => onDragStart(event, "start")}
            onDrag={(event) => onDrag(event, "start")}
            draggable
            id="foo"
          ></div>
          <div
            //ref={drag}
            className="dndnode_if"
            onDragStart={(event) => onDragStart(event, "if")}
            onDrag={(event) => onDrag(event, "if")}
            onDragEnd={(event) => onDragEnd(event)}
            draggable
            id="if"
            onMouseEnter={onMouseEnter}
          ></div>
          <div
            className="dndnode_loop"
            onDragStart={(event) => onDragStart(event, "loop")}
            onDrag={(event) => onDrag(event, "loop")}
            onDragEnd={(event) => onDragEnd(event)}
            draggable
            id="loop"
            onMouseEnter={onMouseEnter}
          ></div>
          <div
            className="dndnode_output"
            onDragStart={(event) => onDragStart(event, "output")}
            onDrag={(event) => onDrag(event, "output")}
            onDragEnd={(event) => onDragEnd(event)}
            draggable
            id="output"
            onMouseEnter={onMouseEnter}
            //ref={drag}
          ></div>
          <div
            className="dndnode_wait"
            onDragStart={(event) => onDragStart(event, "wait")}
            onDrag={(event) => onDrag(event, "wait")}
            onDragEnd={(event) => onDragEnd(event)}
            draggable
            //ref={drag}
            id="wait"
            onMouseEnter={onMouseEnter}
          ></div>
          <div
            className="dndnode_end-repeat"
            onDragStart={(event) => onDragStart(event, "end/repeat")}
            onDrag={(event) => onDrag(event, "end/repeat")}
            onDragEnd={(event) => onDragEnd(event)}
            draggable
            id="end/repeat"
            onMouseEnter={onMouseEnter}
          ></div>

          {/* <Example /> */}
        </div>
      </aside>
    </>
  );
});

export default Sidebar;
