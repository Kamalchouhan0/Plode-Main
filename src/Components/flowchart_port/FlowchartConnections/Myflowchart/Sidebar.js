import React, {
  useState,
  memo,
  useEffect,
} from "react";
import { useDrag } from "react-dnd-latest";
import { getEmptyImage } from "react-dnd-html5-backend-latest";
import { useHistory } from "react-router-dom";
import "./dnd.css";

let flagI = -1,offset, elements;
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

  var index1,index2,index3,index4;
  const onDragStart = async (event, nodeType) => {
  
 
    let zoomVal = document.querySelector(".react-flow__nodes");
    let edgeZoom = document.querySelector(".react-flow__edges");
    console.log("zoom", edgeZoom.children[1]);
    document.querySelector(".react-flow__nodes").style.transform =
      document
        .querySelector(".react-flow__nodes")
        .style.transform.slice(0, zoomVal.style.transform.search("scale") - 1) +
      " scale(1)";
    document.querySelector(".react-flow__edges").children[1].style.transform =
      document
        .querySelector(".react-flow__edges")
        .children[1].style.transform.slice(
          0,
          zoomVal.style.transform.search("scale") - 1
        ) + " scale(1)";
    offset = JSON.parse(sessionStorage.getItem("planeOffset"));
    flagI = -1;
    sessionStorage.setItem("application/reactflow/connect", flagI);
    elements = JSON.parse(sessionStorage.getItem("flowchart-elements"));
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";

    if (nodeType === "start") {
      setTimeout(function () {
        document.querySelector("#foo").classList.add("myClass");
      }, 200);
    }
  };
  const onDrag = async (event, nodeType) => {
    console.log(window.devicePixelRatio,window.screen.width,window.screen.height, "sidebar===>");
    let screenOffsetX=0,screenOffsetY=0
    if(window.screen.width!=1920&&window.screen.height!=1080){
      screenOffsetX=0;screenOffsetY=-27;
    }else{
      screenOffsetX=0;screenOffsetY=0
    }
    let xOffset = 0,
      yOffset = 0;

    if (offset != null) {
      xOffset = offset.x;
      yOffset = offset.y;
    }
    for (let i = 0; i < Object.keys(elements).length; i++) {
      if (elements[i] != null && elements[i] != undefined) {
        if (elements[i].data != null && elements[i].data != undefined) {
          console.log(
            "GSKTRUE",
            event.clientX - (elements[i].position.x + xOffset),
            event.clientY - (elements[i].position.y + yOffset),
            "xc,yc",
            event.clientX,
            event.clientY,
            "xe,ye",
            elements[i].position.x + 204,
            elements[i].position.y + 80
          );
          let m, d;
          console.log(
            "after position calc",
            event.clientX - (elements[i].position.x + xOffset),
            event.clientY - (elements[i].position.y + yOffset),

            xOffset,
            yOffset
          );
          if (
            event.clientX - (elements[i].position.x + xOffset) >= 200 &&
            event.clientX - (elements[i].position.x + xOffset) <= 270 &&
            event.clientY - (elements[i].position.y + yOffset) >= 115+screenOffsetY &&
            event.clientY - (elements[i].position.y + yOffset) <= 165+screenOffsetY
          ) {
            if (elements[i].data.specificElType == "if") {
              if (
                event.clientX - (elements[i].position.x + xOffset) <= 204 + 5 &&
                event.clientX - (elements[i].position.x + xOffset) >= 204 - 5
              )
                sourceHandle = "d";
              if (
                event.clientX - (elements[i].position.x + xOffset) <= 261 + 5 &&
                event.clientX - (elements[i].position.x + xOffset) >= 261 - 5 &&
                event.clientY - (elements[i].position.y + yOffset) <= 125 + 5+screenOffsetY &&
                event.clientY - (elements[i].position.y + yOffset) >= 125 - 5+screenOffsetY
              ) {
                sourceHandle = "rYes";
              } else if (
                event.clientX - (elements[i].position.x + xOffset) <= 261 + 5 &&
                event.clientX - (elements[i].position.x + xOffset) >= 261 - 5 &&
                event.clientY - (elements[i].position.y + yOffset) <= 146 + 5+screenOffsetY &&
                event.clientY - (elements[i].position.y + yOffset) >= 146 - 5+screenOffsetY
              ) {
                sourceHandle = "rNo";
              }
            } else if (elements[i].data.specificElType == "loop") {
              if (
                event.clientX - (elements[i].position.x + xOffset) <= 261 + 5 &&
                event.clientX - (elements[i].position.x + xOffset) >= 261 - 5
              ) {
                sourceHandle = await "r";
              } else if (
                event.clientX - (elements[i].position.x + xOffset) <= 205 + 5 &&
                event.clientX - (elements[i].position.x + xOffset) >= 205 - 5
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
              index1 =-await elements.findIndex(
                (e) =>
                  e.source === elements[flagI].id && e.sourceHandle === "d"
              );
              index2 =-await elements.findIndex(
                (e) =>
                  e.source === elements[flagI].id && e.sourceHandle === "rYes"
              );
              index3 =-await elements.findIndex(
                (e) =>
                  e.source === elements[flagI].id && e.sourceHandle === "rNo"
              );
              index4 =-await elements.findIndex(
                (e) =>
                  e.source === elements[flagI].id && e.sourceHandle === "r"
              );
            break;
          }
        }
      }
    }
    try {
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      console.log("gsk index",index1,index2,index3)
      // var index2 = await elements.findIndex(
      //   (e) =>
      //     e.target === params.target && e.targetHandle === params.targetHandle
      // );
      if (flagI != -1 ) {
        let mx = 0,
          my = 0;
        if (flagI == 0&&index1>=0) {
          mx = 60;
          my = 0;
        } else if (sourceHandle == "d"&&index1>=0) {
          mx = 60;
          my = 40;
        } else if (sourceHandle == "rYes"&&index2>=0) {
          mx = 115;
          my = 10;
        } else if (sourceHandle == "rNo"&&index3>=0) {
          mx = 115;
          my = 30;
        }else if(sourceHandle == "r"&&index4>=0) {
          
          mx = 115;
          my = 20;
        }else {ctx.clearRect(0, 0, 1775, 884);return;}
        console.log("gskconnect", mx, my, sourceHandle);
       
        ctx.beginPath();
        ctx.moveTo(
          elements[flagI].position.x + xOffset + mx,
          elements[flagI].position.y + yOffset + my
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
        console.log("planeOffset", xOffset, yOffset);
        let cx =
          Math.abs(
            event.clientX - 124 - (elements[flagI].position.x + xOffset) + 60
          ) / 2;
        let cy =
          Math.abs(
            event.clientY + -105 -screenOffsetY- (elements[flagI].position.y + yOffset)
          ) / 2;
        if (event.clientX - 144 < elements[flagI].position.x + xOffset + 60)
          cx = cx + event.clientX - 144;
        else cx = cx + elements[flagI].position.x + xOffset;
        if (event.clientY - 105 -screenOffsetY< elements[flagI].position.y + yOffset)
          cy = cy + event.clientY - 105-screenOffsetY;
        else cy = cy + elements[flagI].position.y + yOffset;
        ctx.quadraticCurveTo(cx, cy, event.clientX - 144, event.clientY - 118+13-screenOffsetY);
        ctx.lineWidth = 2.725;
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
    if(sessionStorage.getItem("planeOffset")!=null)
    if(sessionStorage.getItem("planeOffset").zoom!=1){
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@gsk")
      setTimeout(()=>{history.push("/flow/digital-analog");
      history.push("/flow/flowchart");},0)
      sessionStorage.setItem("planeOffset",null)
    }
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
