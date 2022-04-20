import React, {
  useState,
  DragEvent,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import Popup from "./Popup";
import "./myflowchart.css";
import Panel1 from "../logic/pannel/";
import { Button, Modal } from "react-bootstrap";
import { v4 } from "uuid";
import CustomDragLayer from "../logic/connection/CustomDragLayer";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import closeImg from "../../../../Assets/img/close.png";
import io from "socket.io-client";
import _ from "lodash";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Connection,
  Edge,
  ElementId,
  Node,
  Handle,
  getConnectedEdges,
  getOutgoers,
  getIncomers,
  isValidConnection,
} from "react-flow-renderer";

import start from "../../../../Assets/flowchart/start.png";
import fxvariable from "../../../../Assets/flowchart/action.png";
import wait from "../../../../Assets/flowchart/wait.png";
import condition2 from "../../../../Assets/flowchart/decision.png";
import loop from "../../../../Assets/flowchart/repeat.png";
import repeat from "../../../../Assets/flowchart/loop.png";
import end from "../../../../Assets/flowchart/stopButton.png";
import Sidebar from "./Sidebar";
import { useLocalStorage } from "../../../LocalStorage/LocalStorage";
import "./dnd.css";
import "../../style.css";
import dagre from "dagre";
import { element, elementType } from "prop-types";
import { param } from "jquery";
import renderPrgImage from "../../../../source/programImg";
import flowchartImg from "../../../../Assets/img/simulate bar@2x.png";
import secondaryImg from "../../../../Assets/img/save - secondary.png";
import strokeImg from "../../../../Assets/img/button 52x52 - stroke.png";
import connectionImg from "../../../../Assets/usb - off@2x.png";
const Sizes = {
  Button: 30,
  Border: 5,
  OneRow: 68,
};
const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "25%",
    width: " 30%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    border: "5px solid #FF8C19",
    borderRadius: "15px",
    zIndex: "10000",
  },
};

let initialElements = [
  {
    id: "0",
    type: "output",
    data: {
      label: "<Fragment />",
      elType: "node",
      specificElType: "if",
    },
    xPos: 546,
    yPos: 174,
    isDragging: false,
    isInitialized: true,
    snapGrid: [15, 15],
    snapToGrid: false,
    selectNodesOnDrag: true,
    onClick: "ƒ onElementClick() {}",
    onNodeDrag: "ƒ onNodeDrag() {}",
    scale: 1,
    selected: true,
    isDraggable: true,
    isSelectable: true,
    isConnectable: true,
    resizeObserver: {
      disconnect: "ƒ disconnect() {}",
      observe: "ƒ observe() {}",
      unobserve: "ƒ unobserve() {}",
    },
  },
];
var socket = io.connect("http://localhost:3008");
let d = "M 120 450 l 170 -100";
let modal;
const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};
let flagPos = 0;
let id = parseInt(sessionStorage.getItem("flowchart-elements-id")) || 6;
let eid = 0;
const getId = () => `${id++}`;
const getEid = () => `${eid++}`;
var Panel = Panel1("");
const text = (type, _id) => {
  if (type == "start") {
    // console.log("start");

    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${start})`,
            bottom: "38px",
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "if") {
    // console.log("if");
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${condition2})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="source"
          position="bottom"
          style={{ left: 90, top: 35 }}
          id="d"
        />
        <Handle position="left" style={{ left: 140, top: 10 }} id="rYes" />
        <Handle
          type="source"
          position="left"
          style={{ left: 140, top: 30 }}
          id="rNo"
        />
      </>
    );
  }
  if (type == "wait") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${wait})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle position="bottom" style={{ left: 90, top: 35 }} id="b" />
      </>
    );
  }
  if (type == "output") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${fxvariable})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="source"
          position="bottom"
          style={{ left: 90, top: 35 }}
          id="d"
        />
      </>
    );
  }
  if (type == "loop") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${loop})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="source"
          position="bottom"
          style={{ left: 90, top: 35 }}
          id="d"
        />
        <Handle
          type="source"
          position="right"
          style={{ left: 140, top: 20 }}
          id="r"
        />
      </>
    );
  }
  if (type == "end/repeat") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${repeat})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "end") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${end})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
};

const text1 = (type, _id) => {
  if (type == "start") {
    // console.log("start");

    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${start})`,
            bottom: "38px",
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "if") {
    // console.log("if");
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${condition2})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "wait") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${wait})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "output") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${fxvariable})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "loop") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${loop})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "end/repeat") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${repeat})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "end") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${end})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
};

let prevElement = [
  {
    id: "0",

    position: { x: 500, y: 65 },
    type: `input`,
    data: {
      label: text1(`start`, 0),
      elType: "node",
      specificElType: `start`,
      data_id: [0],
    },
  },
  //   {
  //     id: "1",
  //     draggable:false,
  //     style: { zIndex: -3 },
  //     position: { x: 30, y: 100 },
  //     type: `output`,
  //     data: {
  //       label: text1(`if`,1),
  //       elType: "node",
  //       specificElType: `if`,
  //     },
  //   },
  //   {
  //     id: "2",
  //     draggable:false,
  //     style: { zIndex: -3 },
  //     position: {x: 30, y: 180 },
  //     type: `output`,
  //     data: {
  //       label: text1(`loop`,2),
  //       elType: "node",
  //       specificElType: `loop`,
  //     },
  //   },
  //   {
  //     id: "3",
  //     draggable:false,
  //     style: { zIndex: -3 },
  //     position: {x: 30, y: 260 },
  //     type: `output`,
  //     data: {
  //       label: text1(`output`,3),
  //       elType: "node",
  //       specificElType: `output`,
  //     },
  //   },
  //   {
  //     id: "4",
  //     draggable:false,
  //     style: { zIndex: -3 },
  //     position: {x: 30, y: 340 },
  //     type: `output`,
  //     data: {
  //       label: text1(`wait`,4),
  //       elType: "node",
  //       specificElType: `wait`,
  //     },
  //   },
  //   {
  //     id: "5",
  //     draggable:false,
  //     style: { zIndex: -3 },
  //     position: {x: 30, y: 420 },
  //     type: `output`,
  //     data: {
  //       label: text1(`end/repeat`,5),
  //       elType: "node",
  //       specificElType: `end/repeat`,
  //     },
  //   },
];
const FlowSessionStorage = async () => {};
if (JSON.parse(sessionStorage.getItem("flowchart-elements")) !== null) {
  let a = JSON.parse(sessionStorage.getItem("flowchart-elements"));
  let length = 0;
  for (let i in a) {
    if (a[i].id === "0") {
      let pushingElement = {
        id: "0",
        position: a[i].position,
        type: a[i].type,
        data: {
          elType: a[i].data.elType,
          specificElType: a[i].data.specificElType,
          label: text(`${a[i].data.specificElType}`, "0"),
          data_id: [0],
        },
      };
      prevElement[0] = pushingElement;
    }
    if (a[i].id != "0" && a[i].id.search("reactflow") == -1) {
      let pushingElement = {
        id: a[i].id,
        position: a[i].position,
        type: a[i].type,
        data: {
          elType: a[i].data.elType,
          specificElType: a[i].data.specificElType,
          label: text(`${a[i].data.specificElType}`, a[i].id),
          data_id: a[i].data.data_id,
        },
      };
      prevElement.push(pushingElement);
    } else if (a[i].id.search("reactflow") !== -1 && a[i].id != "0") {
      let pushingElement = {
        source: a[i].source,
        sourceHandle: a[i].sourceHandle,
        target: a[i].target,
        targetHandle: a[i].targetHandle,
        id: a[i].id,
      };
      prevElement.push(pushingElement);
    }
  }
}
let prevReactFlowInstance = null;
let x = [];
let y = [];
let dictX = {};
let dictY = {};
var head; // head of list
let ele;
//reaggrange code for dagregrph
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
let nodeWidth = 172;
let nodeHeight = 36;
/* Node Class */
class LinkedNode {
  // Constructor to create a new node
  constructor(d) {
    this.data = d;
    this.next = null;
  }
}
const getSessionStorageOrDefault = (key, defaultValue) => {
  let storedElements = sessionStorage.getItem(key);
  if (!storedElements) {
    return defaultValue;
  }
  let stored = JSON.parse(storedElements);
  if (stored.length > 0) {
    for (let i = 0; i < stored.length; i++) {
      if (stored[i].data != null && stored[i].data != undefined) {
        if (
          stored[i].data.elType !== undefined &&
          stored[i].data.elType !== null &&
          stored[i].data.elType == "node"
        ) {
          stored[i].data.label = text(
            stored[i].data.specificElType,
            stored[i].id
          );
        }
      }
    }
  } else {
    return defaultValue;
  }
  console.log(stored);
  return stored;
};
const flowKey = "example-flow";
const DnDFlow = () => {
  const history = useHistory();
  const [reactFlowInstance, setReactFlowInstance] = useState();
  const [x1Pos, setx1Pos] = useState();
  const [y1Pos, sety1Pos] = useState();
  const [x2Pos, setx2Pos] = useState();
  const [y2Pos, sety2Pos] = useState();
  const [passEnd, setPassEnd] = useState();
  const [showPopup, setShowPopUp] = useState(false);
  const [data, setData] = useLocalStorage("element_data");
  const [elements, setElements] = useState(prevElement);

  // const [edges,setEdges] = useState([]);
  //layout code start
  const [nodes, setNodes, onNodesChange] = useState();
  const [edges, setEdges, onEdgesChange] = useState();

  const getLayoutedElements = (nodes, edges, direction = "TB") => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? "left" : "top";
      node.sourcePosition = isHorizontal ? "right" : "bottom";

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth + 80,
        y: nodeWithPosition.y - nodeHeight + 80,
      };

      return node;
    });

    return { nodes, edges };
  };

  const addNode = useCallback(() => {
    setElements((els) => {
      console.log(els);
      return [
        ...els,
        {
          id: "0",
          type: "input", // input node
          data: { label: "Input Node", specificElType: "start" },

          id: "0",

          position: { x: 500, y: 65 },
          type: `input`,
          data: {
            label: text(`start`, 0),
            elType: "node",
            specificElType: `start`,
          },
        },
      ];
    });
  }, []);
  function click(x, y) {
    var ev = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
      screenX: x,
      screenY: y,
    });

    var el = document.elementFromPoint(x, y);

    el.dispatchEvent(ev);
  }
  //linked list add node at the end
  function append(new_data) {
    /* 1. Allocate the Node &
         2. Put in the data
         3. Set next as null */
    var new_node = new LinkedNode(new_data);

    /* 4. If the Linked List is empty, then make the
             new node as head */
    if (head == null) {
      head = new LinkedNode(new_data);
      return;
    }

    /* 4. This new node is going to be the last node, so
           make next of it as null */
    new_node.next = null;

    /* 5. Else traverse till the last node */
    var last = head;
    while (last.next != null) last = last.next;

    /* 6. Change the next of last node */
    last.next = new_node;
    return;
  }
  //linked list traversal
  function printList() {
    var n = head;
    while (n != null) {
      document.write(n.data + " ");
      n = n.next;
    }
  }
  //end
  useLayoutEffect(() => {
    return () => {
      // console.log("unmounting-", typeof elements, elements);

      // setData(elements);
      // console.log("=====>=====>@@@###@@@@@===>", data);
      // let prev = [];
      // data.map((el) => {
      //   let pre = {
      //     id: el.id,
      //     type: el.type, // input node
      //     data: {
      //       label: text(el.data.specificElType, el.id),
      //       elType: el.data.elType,
      //       specificElType: el.data.specificElType,
      //     },
      //   };
      //   // prevElement.push(pre);
      //   //prev += pre;
      // });
      // console.log("+++==>", prev);

      prevElement = elements;
      // console.log(JSON.parse(sessionStorage.getItem("element_data")));
      // console.log("unmounting-", prevElement);
      // console.log(
      //   JSON.parse(sessionStorage.getItem("element_data")) ==
      //     JSON.stringify(prevElement)
      // );

      prevReactFlowInstance = reactFlowInstance;
    };
  });
  useEffect(() => {
    console.log("rerendering!!!!!");
    let storeElements = _.cloneDeep(elements);
    for (let i = 0; i < storeElements.length; i++) {
      if (
        storeElements[i].data != null &&
        storeElements[i].data !== undefined
      ) {
        if (
          storeElements[i].data.label != null &&
          storeElements[i].data.label !== undefined
        ) {
          delete storeElements[i].data.label;
        }
      }
    }
    console.log(storeElements);
    sessionStorage.setItem("flowchart-elements", JSON.stringify(storeElements));
    sessionStorage.setItem("flowchart-elements-id", JSON.stringify(id));
  });
  const onConnect = async (params, top, down) => {
    // console.log("connect called", params.source, params.sourceHandle);
    if (top === undefined && down === undefined) {
      await elements.map((e) => {
        if (e.id === params.source) top = e;
        if (e.id === params.target) down = e;
      });
    }

    // console.log(
    //   await down.data.data_id.indexOf(top.id),
    //   await top.data.data_id.indexOf(down.id),
    //   "GSK"
    // );
    // if (
    //   (await down.data.data_id.indexOf(parseInt(top.id))) !== -1 ||
    //   (await top.data.data_id.indexOf(parseInt(down.id))) !== -1
    // )
    //   return;
    if (
      params.source == "1" ||
      params.target == "1" ||
      params.source == "2" ||
      params.target == "2" ||
      params.source == "3" ||
      params.target == "3" ||
      params.source == "4" ||
      params.target == "4" ||
      params.source == "5" ||
      params.target == "5"
    )
      return;
    var index1 = await elements.findIndex(
      (e) =>
        e.source === params.source && e.sourceHandle === params.sourceHandle
    );
    var index2 = await elements.findIndex(
      (e) =>
        e.target === params.target && e.targetHandle === params.targetHandle
    );
    console.log("&", params.target, params.source);
    if (index1 == -1 && index2 == -1 && params.target != params.source) {
      if (await connectMinning(down, top)) return;
      await setElements((elements) => addEdge(params, elements));

      // down.data.data_id = down.data.data_id.concat(top.data.data_id);
      let rev = await nodeGetReverse(
        [elements[0]],
        elements.filter((e) => e.id === params.source)[0]
      );

      console.log("hello PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP", rev);
      let revValue = await elements.filter((e) => e.id === params.target)[0];
      if (
        params.sourceHandle == "rYes" ||
        params.sourceHandle == "rNo" ||
        params.sourceHandle == "r"
      )
        rev = "false";
      if (rev == "false" && revValue.data.specificElType == "end/repeat")
        await setElements((els) =>
          els.map((el) => {
            if (el.id === `${params.target}`) {
              // it's important that you create a new object here
              // in order to notify react flow about the change
              console.log("@@done");
              el.data.specificElType = "end1";

              el.data.label = text(`end`, params.target);
            }

            return el;
          })
        );
      //   await setElements((els) =>
      //   els.map((el) => {
      //     if (el.id === `${params.target}`) {
      //       el.data.specificElType= "end"
      //     }
      //     return el;
      //   })
      // );
      click(260, 200);
    }
  };
  //circular bug fixing code
  const connectMinning = async (ele, data) => {
    let a = [];
    await nodeGet([ele], a);
    await nodeAddIfNo(a);
    await subprogramRecursive(a);
    let y = await connectMineSet(a, data);

    console.log(a, y, "mine");
    return y;
  };
  const connectMineSet = async (a, data) => {
    let y = false;
    for (let i in a) {
      if (a[i].id == data.id) return true;
      if (
        a[i].data.specificElType === "if" ||
        a[i].data.specificElType === "ifNo" ||
        a[i].data.specificElType === "loop"
      )
        y = await connectMineSet(a[i].subprogram, data);
      if (y) return y;
    }
    return y;
  };
  function search(arr, n, x, not) {
    let i;
    console.log(arr, "arr=>>>=>>===>");
    for (i = 0; i < n; i++) {
      console.log(arr[i], "arr=>>>=>>===>");
      if (arr[i] + 10 >= x && arr[i] - 10 <= x && i != not) return i;
    }
    return -1;
  }
  const dictSearch = (dict, x, not) => {
    for (var key in dict) {
      if (dict[key] + 10 >= x && dict[key] - 10 <= x && key != not) return key;
    }
    return -1;
  };
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);
  const flag = 0;
  const handler = async (e, chk) => {
    if (chk == "end") {
      const text = (type, _id) => {
        if (type == "end") {
          return (
            <>
              <div
                className="Image-render"
                style={{
                  backgroundImage: `url(${end})`,
                }}
                id="image-render"
                key={_id}
              ></div>
            </>
          );
        }
      };

      await setElements((els) =>
        els.map((el) => {
          if (el.id === `${e}`) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
            console.log("@@done");
            el.data.specificElType = "end";

            el.data.label = text(`end`, e);
          }

          return el;
        })
      );
    } else {
      const text = (type, _id) => {
        if (type == "end/repeat") {
          return (
            <>
              <div
                className="Image-render"
                style={{
                  backgroundImage: `url(${repeat})`,
                }}
                id="image-render"
                key={_id}
              ></div>
            </>
          );
        }
      };

      await setElements((els) =>
        els.map((el) => {
          if (el.id === `${e}`) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
            console.log("@@done");
            el.data.specificElType = "end/repeat";

            el.data.label = text(`end/repeat`, e);
          }

          return el;
        })
      );
    }

    // onDoubleClick();
    // onElementClick("hi", elements[0]);
  };

  //gsk onDrop
  // const onDrop = async (event) => {
  //   // console.log("event", event);
  //   event.preventDefault();

  //   const text = (type, _id) => {
  //     if (type == "start") {
  //       // console.log("start");

  //       return (
  //         <>
  //           <div
  //             className="Image-render"
  //             style={{
  //               backgroundImage: `url(${start})`,
  //               bottom: "38px",
  //             }}
  //             id="image-render"
  //             key={v4()}
  //           ></div>
  //         </>
  //       );
  //     }
  //     if (type == "if") {
  //       // console.log("if");
  //       return (
  //         <>
  //           <div
  //             className="Image-render"
  //             style={{
  //               backgroundImage: `url(${condition2})`,
  //             }}
  //             id="image-render"
  //             key={v4()}
  //           ></div>
  //           <Handle
  //             type="source"
  //             position="bottom"
  //             style={{ left: 90, top: 35 }}
  //             id="d"
  //           />
  //           <Handle position="left" style={{ left: 140, top: 10 }} id="rYes" />
  //           <Handle
  //             type="source"
  //             position="left"
  //             style={{ left: 140, top: 30 }}
  //             id="rNo"
  //           />
  //         </>
  //       );
  //     }
  //     if (type == "wait") {
  //       return (
  //         <>
  //           <div
  //             className="Image-render"
  //             style={{
  //               backgroundImage: `url(${wait})`,
  //             }}
  //             id="image-render"
  //             key={v4()}
  //           ></div>
  //           <Handle position="bottom" style={{ left: 90, top: 35 }} id="d" />
  //         </>
  //       );
  //     }
  //     if (type == "output") {
  //       return (
  //         <>
  //           <div
  //             className="Image-render"
  //             style={{
  //               backgroundImage: `url(${fxvariable})`,
  //             }}
  //             id="image-render"
  //             key={v4()}
  //           ></div>
  //           <Handle
  //             type="source"
  //             position="bottom"
  //             style={{ left: 90, top: 35 }}
  //             id="d"
  //           />
  //         </>
  //       );
  //     }
  //     if (type == "loop") {
  //       return (
  //         <>
  //           <div
  //             className="Image-render"
  //             style={{
  //               backgroundImage: `url(${loop})`,
  //             }}
  //             id="image-render"
  //             key={v4()}
  //           ></div>
  //           <Handle
  //             type="source"
  //             position="bottom"
  //             style={{ left: 90, top: 35 }}
  //             id="d"
  //           />
  //           <Handle
  //             type="source"
  //             position="right"
  //             style={{ left: 140, top: 20 }}
  //             id="r"
  //           />
  //         </>
  //       );
  //     }
  //     if (type == "end/repeat") {
  //       return (
  //         <>
  //           <div
  //             className="Image-render"
  //             style={{
  //               backgroundImage: `url(${repeat})`,
  //             }}
  //             id="image-render"
  //             key={v4()}
  //           ></div>
  //         </>
  //       );
  //     }
  //     if (type == "end") {
  //       return (
  //         <>
  //           <div
  //             className="Image-render"
  //             style={{
  //               backgroundImage: `url(${end})`,
  //             }}
  //             id="image-render"
  //             key={v4()}
  //           ></div>
  //         </>
  //       );
  //     }
  //   };
  //   if (reactFlowInstance) {
  //     const type = event.dataTransfer.getData("application/reactflow");
  //     console.log("Type@@@@@@@@@@@@@@@@@@@@@@@@@@@", typeof type);
  //     if (type == null || type == "") return;
  //     const position = reactFlowInstance.project({
  //       x: event.clientX - 230,
  //       y: event.clientY - 80,
  //     });
  //     const connected = false;
  //     var nodeType;
  //     if (type == "start") nodeType = "input";
  //     else if (type == "end/repeat") nodeType = "output";
  //     else nodeType = "output";
  //     // console.log("node type", nodeType);
  //     let newNode;
  //     if (type == "if"||type == "loop") {
  //       newNode = {
  //         id: `${getId()}`,
  //         subprogram: [],
  //         position,
  //         type: `${nodeType}`,
  //         data: {
  //           label: text(`${type}`, id),
  //           elType: "node",
  //           specificElType: `${type}`,

  //         },
  //       };
  //     } else {
  //       newNode = {
  //         id: `${getId()}`,

  //         position,
  //         type: `${nodeType}`,
  //         data: {
  //           label: text(`${type}`, id),
  //           elType: "node",
  //           specificElType: `${type}`,

  //         },
  //       };
  //     }

  //     await setElements([...elements, newNode]);
  //     console.log("node:===>postion===>", newNode.position);
  //     // if (newNode.id === "0") {
  //     //   setx1Pos(newNode.position.x);
  //     //   sety1Pos(newNode.position.y);
  //     // } else {
  //     // setx2Pos(newNode.position.x);
  //     // sety2Pos(newNode.position.y);
  //     // }
  //     dictX[newNode.id] = newNode.position.x;
  //     dictY[newNode.id] = newNode.position.y;
  //     x[newNode.id] = newNode.position.x;
  //     y[newNode.id] = newNode.position.y;
  //     // let resultx = search(x, x.length - 1, event.clientX);
  //     // let resulty = search(y, y.length - 1, event.clientY - 40);
  //     // console.log(resultx, resulty);
  //     // let curPos;
  //     // if (resultx != -1 && resulty != -1) {
  //     //   setx1Pos(event.clientX);
  //     //   sety1Pos(event.clientY - 40);
  //     //   curPos = resultx;
  //     // }
  //     // console.log("elemnt", await elements);
  //     // console.log("node:", newNode);
  //   }
  // };
  // shashank onDrop
  const onDrop = async (event) => {
    // console.log("event", event);
    event.preventDefault();

    const text = (type, _id) => {
      if (type == "start") {
        // console.log("start");

        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${start})`,
                bottom: "38px",
              }}
              id="image-render"
              key={v4()}
            ></div>
          </>
        );
      }
      if (type == "if") {
        // console.log("if");
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${condition2})`,
              }}
              id="image-render"
              key={v4()}
            ></div>
            <Handle
              type="source"
              position="bottom"
              style={{ left: 90, top: 35 }}
              id="d"
            />
            <Handle position="left" style={{ left: 140, top: 10 }} id="rYes" />
            <Handle
              type="source"
              position="left"
              style={{ left: 140, top: 30 }}
              id="rNo"
            />
          </>
        );
      }
      if (type == "wait") {
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${wait})`,
              }}
              id="image-render"
              key={v4()}
            ></div>
            <Handle position="bottom" style={{ left: 90, top: 35 }} id="d" />
          </>
        );
      }
      if (type == "output") {
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${fxvariable})`,
              }}
              id="image-render"
              key={v4()}
            ></div>
            <Handle
              type="source"
              position="bottom"
              style={{ left: 90, top: 35 }}
              id="d"
            />
          </>
        );
      }
      if (type == "loop") {
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${loop})`,
              }}
              id="image-render"
              key={v4()}
            ></div>
            <Handle
              type="source"
              position="bottom"
              style={{ left: 90, top: 35 }}
              id="d"
            />
            <Handle
              type="source"
              position="right"
              style={{ left: 140, top: 20 }}
              id="r"
            />
          </>
        );
      }
      if (type == "end/repeat") {
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${repeat})`,
              }}
              id="image-render"
              key={v4()}
            ></div>
          </>
        );
      }
      if (type == "end") {
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${end})`,
              }}
              id="image-render"
              key={v4()}
            ></div>
          </>
        );
      }
    };
    if (reactFlowInstance) {
      const type = event.dataTransfer.getData("application/reactflow");
      console.log("Type@@@@@@@@@@@@@@@@@@@@@@@@@@@", typeof type);
      if (type == null || type == "") return;
      const position = reactFlowInstance.project({
        x: event.clientX - 230,
        y: event.clientY - 110,
      });
      const connected = false;
      var nodeType;
      if (type == "start") nodeType = "input";
      else if (type == "end/repeat") nodeType = "output";
      else nodeType = "output";
      // console.log("node type", nodeType);
      let newNode;
      if (type == "if" || type == "loop") {
        newNode = {
          id: `${getId()}`,

          subprogram: [],
          position,
          type: `${nodeType}`,
          data: {
            label: text(`${type}`, id),
            elType: "node",
            specificElType: `${type}`,
            data_id: [id - 1],
          },
        };
      } else {
        newNode = {
          id: `${getId()}`,

          position,
          type: `${nodeType}`,
          data: {
            label: text(`${type}`, id),
            elType: "node",
            specificElType: `${type}`,
            data_id: [id - 1],
          },
        };
      }

      await setElements([...elements, newNode]);
      let sourceHandle = "d";
      for (let i = 0; i < Object.keys(elements).length; i++) {
        if (elements[i] != null && elements[i] != undefined) {
          if (elements[i].data != null && elements[i].data != undefined) {
            if (
              newNode.position.x <= elements[i].position.x + 30 &&
              newNode.position.y <= elements[i].position.y + 30 &&
              newNode.position.x >= elements[i].position.x - 30 &&
              newNode.position.y >= elements[i].position.y - 30 &&
              newNode.id != elements[i].id
            ) {
              //founded target newNode at index i
              //addEdge to target newNode by checking x and y positions
              console.log(
                "( " +
                  newNode.position.x +
                  " , " +
                  newNode.position.y +
                  " ) " +
                  newNode.data.specificElType +
                  " newNode"
              );
              console.log(
                "( " +
                  elements[i].position.x +
                  " , " +
                  elements[i].position.y +
                  " ) " +
                  elements[i].data.specificElType +
                  " Element"
              );

              if (elements[i].data.specificElType == "loop") {
                if (newNode.position.y - 15 <= elements[i].position.y) {
                  sourceHandle = "d";
                  console.log("KHBIBHIKBIKBIK");
                } else if (
                  newNode.position.x > elements[i].position.x &&
                  newNode.position.y > elements[i].position.y
                ) {
                  sourceHandle = "r";
                }
              }
              if (elements[i].data.specificElType == "if") {
                if (
                  newNode.position.x > elements[i].position.x &&
                  newNode.position.y > elements[i].position.y
                ) {
                  sourceHandle = "rYes";
                } else if (
                  newNode.position.x > elements[i].position.x &&
                  newNode.position.y < elements[i].position.y
                ) {
                  sourceHandle = "rNo";
                } else sourceHandle = "d";
              }
              /*     console.log("source : " + elements[i].id);
              console.log("target : " + `${newNode.id}`); */
              let connect = {
                source: elements[i].id,
                sourceHandle: sourceHandle,
                target: `${newNode.id}`,
                targetHandle: null,
              };
              onConnect(connect, elements[i], newNode);
              break;
            }
          }
        }
      }
      console.log("node:===>postion===>", newNode.position);
      // if (newNode.id === "0") {
      //   setx1Pos(newNode.position.x);
      //   sety1Pos(newNode.position.y);
      // } else {
      // setx2Pos(newNode.position.x);
      // sety2Pos(newNode.position.y);
      // }
      dictX[newNode.id] = newNode.position.x;
      dictY[newNode.id] = newNode.position.y;
      x[newNode.id] = newNode.position.x;
      y[newNode.id] = newNode.position.y;
      // let resultx = search(x, x.length - 1, event.clientX);
      // let resulty = search(y, y.length - 1, event.clientY - 40);
      // console.log(resultx, resulty);
      // let curPos;
      // if (resultx != -1 && resulty != -1) {
      //   setx1Pos(event.clientX);
      //   sety1Pos(event.clientY - 40);
      //   curPos = resultx;
      // }
      // console.log("elemnt", await elements);
      // console.log("node:", newNode);
    }
  };

  function getKeyByValue(object, value) {
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        if (object[prop] === value) return prop;
      }
    }
  }
  //gsk onDrag
  // const onNodeDrag = async (event, node) => {
  //   event.preventDefault();
  //   console.log("@", elements, event.clientX, event.clientY);

  //   // console.log("@", dictX, dictY);

  //   // dictX[node.id] = node.position.x;
  //   // dictY[node.id] = node.position.y;

  //   // let ele = elements.map((ele) => {
  //   //   if (ele.id != node.id && ele.id.search("react") == -1) {
  //   //     if (
  //   //       ele.position.x + 10 >= node.position.x &&
  //   //       ele.position.x - 10 <= node.position.x &&
  //   //       ele.position.y + 10 >= node.position.y &&
  //   //       ele.position.y - 10 <= node.position.y
  //   //     ) {
  //   //       return ele;
  //   //     }
  //   //   }
  //   // });
  //   // console.log("@", ele);
  //   // ele = [];
  //   // for (let i = 0; i < Object.keys(elements).length; i++) {
  //   //   if (elements[i].id != node.id && elements[i].id.search("react") == -1) {
  //   //     if (
  //   //       elements[i].position.x + 10 >= node.position.x &&
  //   //       elements[i].position.x - 10 <= node.position.x &&
  //   //       elements[i].position.y + 10 >= node.position.y &&
  //   //       elements[i].position.y - 10 <= node.position.y
  //   //     ) {
  //   //       ele = i;
  //   //       console.log("@@", i);
  //   //       break;
  //   //     }
  //   //   }
  //   // }

  //   // if (ele != null) {
  //   //   console.log("@", ele);
  //   //   let sourceHandle = "b";

  //   //   // if (elements[ele].data.specificElType == "loop") {
  //   //   //   if (elements[ele].position.x >= node.position.x) sourceHandle = "r";
  //   //   //   else sourceHandle = "b";
  //   //   // } else if (elements[ele].data.specificElType == "if") {
  //   //   //   if (
  //   //   //     elements[ele].position.x >= node.position.x &&
  //   //   //     elements[ele].position.y <= node.position.y
  //   //   //   )
  //   //   //     sourceHandle = "rYes";
  //   //   //   else if (
  //   //   //     elements[ele].position.x >= node.position.x &&
  //   //   //     elements[ele].position.y >= node.position.y
  //   //   //   )
  //   //   //     sourceHandle = "rNo";
  //   //   //   else sourceHandle = "b";
  //   //   // }
  //   //   // console.log("@", elements, node.id, elements[ele], sourceHandle);

  //   //   // let connect = {
  //   //   //   source: `${ele}`,
  //   //   //   sourceHandle: sourceHandle,
  //   //   //   target: `${node.id}`,
  //   //   //   targetHandle: null,
  //   //   // };
  //   //   // onConnect(connect);
  //   // }

  //   // gsk code 14/2/22 remove array mismatch error but used connect to connect once
  //   // x[node.id] = node.position.x;
  //   // y[node.id] = node.position.y;

  //   // let posX = dictSearch(x, node.position.x, node.id);
  //   // let posY = dictSearch(y, node.position.y, node.id);
  //   // if (posX == posY && posX != -1 && posY != -1) {
  //   //   let sourceHandle;

  //   //   if (elements[posX].data.specificElType == "loop") {
  //   //     if (x[posX] >= node.position.x) sourceHandle = "r";
  //   //     else sourceHandle = "b";
  //   //   } else if (elements[posX].data.specificElType == "if") {
  //   //     if (x[posX] >= node.position.x && y[posY] <= node.position.y)
  //   //       sourceHandle = "rYes";
  //   //     else if (x[posX] >= node.position.x && y[posY] >= node.position.y)
  //   //       sourceHandle = "rNo";
  //   //     else sourceHandle = "b";
  //   //   }
  //   //   console.log("@", elements, node.id, posX, sourceHandle);

  //   //   let connect = {
  //   //     source: `${posX}`,
  //   //     sourceHandle: sourceHandle,
  //   //     target: `${node.id}`,
  //   //     targetHandle: null,
  //   //   };
  //   //   onConnect(connect);
  //   // }
  //   //gsk 14/02/22 end
  //   // console.log(elements, Object.keys(elements).length);
  //   // let indexE = 0;
  //   // elements.map((ele) => {
  //   //   if (node.id == ele.id) return;
  //   //   indexE++;
  //   // });
  //   // console.log("@@@@@@@@@@=======>@@@@@@@====>", parseInt(node.id) + eid);
  //   // x[parseInt(node.id) + eid] = node.position.x;
  //   // y[parseInt(node.id) + eid] = node.position.y;
  //   // console.log("position x and y", x, y, "node =>", node.id, elements, node);
  //   //gsk update code with remove error
  //   // let posX = search(x, x.length, node.position.x, node.id);
  //   // let posY = search(y, y.length, node.position.y, node.id);
  //   // if (posX == posY && posX != -1 && posY != -1) {
  //   //   console.log(
  //   //     "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
  //   //     node.id,
  //   //     posX,
  //   //     elements[posX].data.specificElType,
  //   //     elements[posX].data.edgeCount
  //   //   );
  //   //   //10/2/2022
  //   //   if (elements[posX].data.specificElType == "start") {
  //   //     if (elements[posX].data.edgeCount == 1) return;
  //   //   } else if (elements[posX].data.specificElType == "if") {
  //   //     if (elements[posX].data.edgeCount == 3) return;
  //   //   } else if (elements[posX].data.specificElType == "loop") {
  //   //     if (elements[posX].data.edgeCount == 2) return;
  //   //   } else if (elements[posX].data.specificElType == "wait") {
  //   //     if (elements[posX].data.edgeCount == 1) return;
  //   //   } else if (elements[posX].data.specificElType == "output") {
  //   //     if (elements[posX].data.edgeCount == 1) return;
  //   //   }

  //   //   let id = parseInt(node.id) + 1;
  //   //   let source_handle = "rYes";
  //   //   if (elements[posX].data.specificElType == "if") {
  //   //     if (elements[posX].data.edgeCount == 0) source_handle = "rYes";
  //   //     else if (elements[posX].data.edgeCount == 1) source_handle = "rNo";
  //   //     else if (elements[posX].data.edgeCount == 2) source_handle = "b";
  //   //   } else if (elements[posX].data.specificElType == "loop") {
  //   //     if (elements[posX].data.edgeCount == 0) source_handle = "r";
  //   //     else if (elements[posX].data.edgeCount == 1) source_handle = "b";
  //   //   }

  //   //   let flag = 0;
  //   //   elements.map((ele) => {
  //   //     if (ele.id == `e${id}`) flag = 1;
  //   //   });
  //   //   if (flag == 1) return;
  //   //   setElements((elements) =>
  //   //     addEdge(
  //   //       {
  //   //         // id: `${id}`,
  //   //         // type: "source",

  //   //         id: `e${id}`,
  //   //         source: `${posX}`,
  //   //         target: `${node.id}`,
  //   //         type: "source",
  //   //         sourceHandle: source_handle,
  //   //       },
  //   //       elements
  //   //     )
  //   //   );
  //   //   console.log("edge added=====>@@@@@", source_handle);
  //   //   append(posX);
  //   //   append(node.id);
  //   //   if (dict[posX] == node.id) return;
  //   //   dict[posX] = node.id;
  //   //   dict[node.id] = posX;
  //   //   elements[posX].data.edgeCount++;
  //   //   return;
  //   // }
  //   //gsk update code end
  //   //gsk older connect code
  //   // if (dict[node.id] != null) node.data.connected = true;
  //   // if (!node.data.connected) {
  //   //   let posX = search(x, x.length, node.position.x, node.id);
  //   //   let posY = search(y, y.length, node.position.y, node.id);
  //   //   if (posX == posY && posX != -1 && posY != -1) {
  //   //     console.log(
  //   //       "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
  //   //       node.id,
  //   //       posX
  //   //     );
  //   //     // if (elements[posX].data.connected == true) return;
  //   //     dict[posX] = node.id;
  //   //     dict[node.id] = posX;
  //   //     node.data.connected = true;

  //   //     elements.map((el) => {
  //   //       if (el.id === `${posX}`) {
  //   //         el.data.connected = true;
  //   //       }
  //   //     });

  //   //     setElements((elements) =>
  //   //       addEdge(
  //   //         {
  //   //           id: `e${node.id}`,
  //   //           type: "source",

  //   //           source: `${posX}`,
  //   //           target: `${node.id}`,

  //   //           sourceHandle: "b",
  //   //           position: "right",
  //   //         },
  //   //         elements
  //   //       )
  //   //     );
  //   //   }

  //   //   console.log(posX, posY, node.connected, node);

  //   //   // node.connected = true;
  //   // }

  //   flagPos++;
  //   if (event.clientX <= 80) {
  //     var index = await elements.findIndex((e) => e.id === node.id);
  //     if (index != -1) {
  //       setElements(
  //         elements.filter(
  //           (e) =>
  //             e.id !== node.id && e.source !== node.id && e.target != node.id
  //         )
  //       );
  //       if (elements[index].type == "input") {
  //         // setTimeout(function () {
  //         //   document.querySelector("#foo").classList.remove("myClass");
  //         // }, 200);
  //         addNode();
  //       }
  //     }

  //     // let elementNew = [];

  //     // for (let i = 0; i < Object.keys(elements).length; i++) {
  //     //   if (elements[i].id.search("react") == -1) {
  //     //     elementNew[elements[i].id] = elements[i];
  //     //     x[i] = elements[i].position.x;
  //     //     y[i] = elements[i].position.y;
  //     //   }
  //     // }
  //     // console.log("@@@@", elementNew);
  //     // setElements(elementNew, []);
  //     // // for (let i = 0, j = 0; i < Object.keys(elements).length; i++) {
  //     // //   if (elements[i].id.search("react") != -1) {
  //     // //     elementNew[Object.keys(elements).length - 1 + j] = elements[i];
  //     // //     j++;
  //     // //   }
  //     // // }
  //     // setElements(elementNew, []);
  //     // var index = await elements.findIndex((e) => e.id === node.id);
  //     // if (index != -1) {
  //     //   setElements(
  //     //     elements.filter(
  //     //       (e) =>
  //     //         e.id !== node.id && e.source !== node.id && e.target != node.id
  //     //     )
  //     //   );
  //     // }

  //     // console.log("@@@", elements);
  //     // // elements[dict[node.id]].data.edgeCount--;
  //     // // printList();
  //     // // console.log(elements[dict[node.id]], "elements");
  //     // // dict[dict[node.id]] = -1;
  //     // // dict[node.id] = -1;
  //   }
  // };

  //shashank onDrag
  const onNodeDrag = async (event, node) => {
    event.preventDefault();
    console.log(elements);

    //console.log("NODE  : " , node);
    //for node elements less than sidebar

    if (event.clientX <= 30) {
      var index = await elements.findIndex(
        (e) => e.id === node.id && e.id !== "0"
      );
      console.log("ENTERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR", index);
      if (index != -1) {
        setElements(
          elements.filter(
            (e) =>
              e.id !== node.id && e.source !== node.id && e.target != node.id
          )
        );
        if (elements[index].type == "input") {
          setTimeout(function () {
            document.querySelector("#foo").classList.remove("myClass");
          }, 200);
        }
      }
    }
    /*     console.log("elements :  ------------------------------ ")
    console.log(elements);
    console.log("node :  ------------------------------ ")
    console.log(elements);  */
    /* ================================================================= */

    /* 
    ele = [];
    for (let i = 0; i < Object.keys(elements).length; i++) {
      if (elements[i].id != node.id && elements[i].id.search("react") == -1) {
        if (
          ( (node.position.x) <= (elements[i].position.x + 10) ) && 
          ( (node.position.y) <= (elements[i].position.y + 10 ) ) && 
          ( (node.position.x) >= (elements[i].position.x -10)) && 
          ( (node.position.y) >= (elements[i].position.y -10))
        ) {
          ele = i;
          //console.log("@@", i);
          break;
        }
      }
    }

    if (ele != null) {
      //console.log("@", ele);
      let sourceHandle = "b";

      if(elements[ele] != null && elements[ele] != undefined) {
        if(elements[ele].data != null && elements[ele].data != undefined) {
            if (elements[ele].data.specificElType == "loop") {
              if (elements[ele].position.x >= node.position.x) sourceHandle = "r";
              else sourceHandle = "b";
            } 
            else if (elements[ele].data.specificElType == "if") {
                    if (elements[ele].position.x >= node.position.x && elements[ele].position.y <= node.position.y){
                      sourceHandle = "rYes";
                    }
                    else if (elements[ele].position.x >= node.position.x && elements[ele].position.y >= node.position.y){
                      sourceHandle = "rNo";
                    }
                    else sourceHandle = "b";
            } 
             console.log("Target Node :  ", elements[ele].data.specificElType );
            console.log("Drag Node :  ", node.data.specificElType ); 
        }
      }
      //console.log("@", elements, node.id, elements[ele], sourceHandle);

      let connect = {
        source: `${ele}`,
        sourceHandle: sourceHandle,
        target: `${node.id}`,
        targetHandle: null,
      };
      onConnect(connect);
    } */

    //console.log( "Outside Log ( " + (node.position.x) + " , " + (node.position.y) + " ) "+ node.data.specificElType +" node");
    // Shashank's code -1
    let sourceHandle = "d";

    for (let i = 0; i < Object.keys(elements).length; i++) {
      if (elements[i] != null && elements[i] != undefined) {
        if (elements[i].data != null && elements[i].data != undefined) {
          if (
            node.position.x <= elements[i].position.x + 25 &&
            node.position.y <= elements[i].position.y + 25 &&
            node.position.x >= elements[i].position.x - 25 &&
            node.position.y >= elements[i].position.y - 25 &&
            node.id != elements[i].id
          ) {
            //founded target node at index i
            //addEdge to target node by checking x and y positions
            if (
              elements[i].id == "1" ||
              elements[i].id == "2" ||
              elements[i].id == "3" ||
              elements[i].id == "4" ||
              elements[i].id == "5"
            )
              break;
            console.log(
              "( " +
                node.position.x +
                " , " +
                node.position.y +
                " ) " +
                node.data.specificElType +
                " node"
            );
            console.log(
              "( " +
                elements[i].position.x +
                " , " +
                elements[i].position.y +
                " ) " +
                elements[i].data.specificElType +
                " Element"
            );

            if (elements[i].data.specificElType == "loop") {
              if (node.position.y - 15 <= elements[i].position.y) {
                sourceHandle = "d";
                console.log("KHBIBHIKBIKBIK");
              } else if (
                node.position.x > elements[i].position.x &&
                node.position.y > elements[i].position.y
              ) {
                sourceHandle = "r";
              }
            }
            if (elements[i].data.specificElType == "if") {
              if (
                node.position.x > elements[i].position.x &&
                node.position.y > elements[i].position.y
              ) {
                sourceHandle = "rYes";
              } else if (
                node.position.x > elements[i].position.x &&
                node.position.y < elements[i].position.y
              ) {
                sourceHandle = "rNo";
              } else sourceHandle = "d";
            }
            /*     console.log("source : " + elements[i].id);
              console.log("target : " + `${node.id}`); */
            let connect = {
              source: elements[i].id,
              sourceHandle: sourceHandle,
              target: `${node.id}`,
              targetHandle: null,
            };
            await onConnect(connect, elements[i], node);

            break;
          }
        }
      }
    }
  };

  const onNodeDragStop = async (event, node) => {
    await setElements((els) =>
      els.map((el) => {
        if (el.id === `${node.id}`) {
          el.position.x = node.position.x;
          el.position.y = node.position.y;
        }
        return el;
      })
    );
  };

  var toDeleteEdge = null;
  var selectedNode = null;

  const onSelectionChange = async (node) => {
    // console.log("selected", node);
  };
  let modalType;

  const onElementClick = async (event, element) => {
    // if(element.id==='0'){
    //   let prevElement = [
    //     {
    //       id: getId(),
    //       position: { x: 500, y: 65 },
    //       type: `input`,
    //       data: {
    //         label: text(`start`, id),
    //         elType: "node",
    //         specificElType: `start`,
    //       },
    //     },
    //     ...elements
    //   ];
    //   setElements(prevElement)
    // }
    if (element.id.search("react") != -1) {
      toDeleteEdge = element.id;
      await setElements((elements) =>
        addEdge(
          {
            id: `${element.id}`,
            type: "source",

            style: { stroke: "red" },
            source: `${element.source}`,
            target: `${element.target}`,

            sourceHandle: `${element.sourceHandle}`,
            targetHandle: `${element.targetHandle}`,
          },
          elements
        )
      );
      console.log("to delete edge", toDeleteEdge);
      return;
    }
    modalType = element.data.specificElType;
    modal = element.id;
    console.log("element clicked", element);
    if (element.data) {
      //if node
      selectedNode = element.id;
      // console.log("selected node", selectedNode);
    }
    //if edge
    else {
      toDeleteEdge = element.id;
      console.log("to delete edge", toDeleteEdge);
    }
    return element.id;
  };

  const onNodeMouseEnter = async (event, node) => {
    if (node.id === "1") {
      let prevElement = [
        {
          id: getId(),
          style: { zIndex: `${id}` },
          position: { x: 30, y: 100 },
          type: `output`,
          data: {
            label: text(`if`, id),
            elType: "node",
            specificElType: `if`,
          },
        },
        ...elements,
      ];
      await setElements(prevElement);
    } else if (node.id === "2") {
      let prevElement = [
        {
          id: getId(),
          style: { zIndex: `${id}` },
          position: { x: 30, y: 180 },
          type: `output`,
          data: {
            label: text(`loop`, id),
            elType: "node",
            specificElType: `loop`,
          },
        },
        ...elements,
      ];
      await setElements(prevElement);
    } else if (node.id === "3") {
      let prevElement = [
        {
          id: getId(),
          style: { zIndex: `${id}` },
          position: { x: 30, y: 260 },
          type: `output`,
          data: {
            label: text(`output`, id),
            elType: "node",
            specificElType: `output`,
          },
        },
        ...elements,
      ];
      setElements(prevElement);
    } else if (node.id === "4") {
      let prevElement = [
        {
          id: getId(),
          style: { zIndex: `${id}` },
          position: { x: 30, y: 340 },
          type: `output`,
          data: {
            label: text(`wait`, id),
            elType: "node",
            specificElType: `wait`,
          },
        },
        ...elements,
      ];
      await setElements(prevElement);
    } else if (node.id === "5") {
      let prevElement = [
        {
          id: getId(),
          style: { zIndex: `${id}` },
          position: { x: 30, y: 420 },
          type: `output`,
          data: {
            label: text(`end/repeat`, id),
            elType: "node",
            specificElType: `end/repeat`,
          },
        },
        ...elements,
      ];
      await setElements(prevElement);
    }

    console.log(node, "MOUSE ENETER ENTER EENTER ENTER ENTER ENETER");
  };
  const onNodeMouseLeave = async (event, node) => {
    if (parseInt(node.id) > 5) {
      if (node.position.x === 30)
        setElements(elements.filter((e) => e.id !== node.id));
    }
  };
  const onDoubleClick = async (event, element) => {
    console.log("double clicked==>", modal);
    console.log(modalType);
    if (modalType === "end/repeat") {
      Panel = Panel1("end");
      handleShow();
      setPassEnd(modal);
    } else if (modalType === "wait") {
      Panel = Panel1("wait");
      handleShow();
    } else if (modalType === "if") {
      Panel = Panel1("condition");
      handleShow();
    } else if (modalType === "loop") {
      Panel = Panel1("loop");
      handleShow();
    } else if (modalType === "output") {
      Panel = Panel1("output");
      handleShow();
    } else if (modalType === "end") {
      Panel = Panel1("end");
      handleShow();
    }

    var index = await elements.findIndex((e) => e.id === toDeleteEdge);
    if (index != -1) {
      //edge is double clicked
      setElements(elements.filter((node) => node.id !== toDeleteEdge));
      toDeleteEdge = null;
      console.log(toDeleteEdge);
    }
  };

  async function togglePopup() {
    // console.log("toggled");
    // console.log(showPopup);
    await setShowPopUp(!showPopup);
    // console.log(showPopup);
  }

  const [show, setShow] = useState(false);
  const waitArray = (i) => {
    let a = [];
    a.push(sessionStorage.getItem(`milliSec${i}`));
    a.push(sessionStorage.getItem(`sec${i}`));
    a.push(sessionStorage.getItem(`min${i}`));
    a.push(sessionStorage.getItem(`hr${i}`));
    return a;
  };
  const loopArray = (i) => {
    return sessionStorage.getItem(`loop${i}`);
  };
  const outputArray = (i) => {
    let a = [];
    a.push(sessionStorage.getItem(`a1${i}`));
    a.push(sessionStorage.getItem(`a2${i}`));
    a.push(sessionStorage.getItem(`b1${i}`));
    a.push(sessionStorage.getItem(`b2${i}`));
    a.push(sessionStorage.getItem(`c1${i}`));
    a.push(sessionStorage.getItem(`c2${i}`));
    a.push(sessionStorage.getItem(`d1${i}`));
    a.push(sessionStorage.getItem(`d2${i}`));
    a.push(sessionStorage.getItem(`t0${i}`));
    a.push(sessionStorage.getItem(`t1${i}`));
    a.push(sessionStorage.getItem(`t2${i}`));
    a.push(sessionStorage.getItem(`le${i}`));
    a.push(sessionStorage.getItem(`re${i}`));
    a.push(sessionStorage.getItem(`buzz${i}`));
    a.push(sessionStorage.getItem(`s1${i}`));
    a.push(sessionStorage.getItem(`s2${i}`));
    a.push(sessionStorage.getItem(`s3${i}`));
    a.push(sessionStorage.getItem(`s4${i}`));
    a.push(sessionStorage.getItem(`a1Chk${i}`));
    a.push(sessionStorage.getItem(`a2Chk${i}`));
    a.push(sessionStorage.getItem(`b1Chk${i}`));
    a.push(sessionStorage.getItem(`b2Chk${i}`));
    a.push(sessionStorage.getItem(`c1Chk${i}`));
    a.push(sessionStorage.getItem(`c2Chk${i}`));
    a.push(sessionStorage.getItem(`d1Chk${i}`));
    a.push(sessionStorage.getItem(`d2Chk${i}`));
    a.push(sessionStorage.getItem(`t0Chk${i}`));
    a.push(sessionStorage.getItem(`t1Chk${i}`));
    a.push(sessionStorage.getItem(`t2Chk${i}`));
    a.push(sessionStorage.getItem(`leR${i}`));
    a.push(sessionStorage.getItem(`leG${i}`));
    a.push(sessionStorage.getItem(`leB${i}`));
    a.push(sessionStorage.getItem(`reR${i}`));
    a.push(sessionStorage.getItem(`reG${i}`));
    a.push(sessionStorage.getItem(`reB${i}`));
    a.push(sessionStorage.getItem(`buzzChk${i}`));
    a.push(sessionStorage.getItem(`s1Chk${i}`));
    a.push(sessionStorage.getItem(`s2Chk${i}`));
    a.push(sessionStorage.getItem(`s3Chk${i}`));
    a.push(sessionStorage.getItem(`s4Chk${i}`));
    return a;
  };
  const ifArray = (i) => {
    let a = [];
    a.push(sessionStorage.getItem(`ifSelect${i}`));
    a.push(sessionStorage.getItem(`ifValue${i}`));
    a.push(sessionStorage.getItem(`ifValue2${i}`));
    a.push(sessionStorage.getItem(`gt${i}`));
    a.push(sessionStorage.getItem(`lt${i}`));
    a.push(sessionStorage.getItem(`bw${i}`));
    a.push(sessionStorage.getItem(`eq${i}`));
    a.push(sessionStorage.getItem(`ne${i}`));
    return a;
  };
  // let aNode =[]
  const index_check = (m) => {
    let i;
    for (i = 0; i < m.length; i++) {
      if (m[i].sourceHandle === "d") {
        break;
      }
    }
    return i;
  };
  const index_check_2 = (m) => {
    let i;
    if (m.length == 2)
      for (i = 0; i < m.length; i++) {
        if (
          m[i].sourceHandle === "r" ||
          m[i].sourceHandle === "rYes" ||
          m[i].sourceHandle === "rNo"
        )
          break;
      }
    else {
      for (i = 0; i < m.length; i++) {
        if (
          m[i].sourceHandle === "r" ||
          m[i].sourceHandle === "rYes" ||
          m[i].sourceHandle === "rNo"
        )
          break;
      }
    }
    return 0;
  };

  const nodeGet = async (n, a) => {
    console.log("nodedebug   else  ", n[0], n);
    if (Object.keys(n).length === 0) return;
    let element = await elements.filter(
      (e) => e.targetHandle === undefined || e.sourceHandle === "d"
    );

    // if(n[0]!=undefined)
    //   if(n[0].data.specificElType=="if"||n[0].data.specificElType=="loop"){
    //    let ed =await elements.filter(
    //       (e) =>
    //         e.id.search("react")!==-1&&e.sourceHandle!==null&&e.sourceHandle!=='b'&&e.source==n[0].id
    //     )

    //     let m =getConnectedEdges([n[0]],ed)

    //     s= index_check(m)
    //     console.log(m,s,"MMMMMMMSSSSMSMSMSMSM")
    //   }
    // if(n.length>=2){
    //   // aNode =[...aNode,n[s]]

    //   aNode.push(n[s])
    //   n=getOutgoers (n[s],element)
    // }
    // else{
    // aNode =[...aNode,n[0]]

    a.push(n[0]);

    n = await getOutgoers(n[0], element);

    // }

    await nodeGet(n, a);
  };

  const nodeGetAlign = async (n, a) => {
    console.log("nodedebug   else  ", n[0], n);
    if (Object.keys(n).length === 0) {
      for (let i in a)
        await setElements((els) =>
          els.map((el) => {
            if (el.id === `${a[i].id}`) {
              console.log("@@done");
              el = a[i];
            }

            return el;
          })
        );
      return;
    }

    let element = await elements.filter(
      (e) => e.targetHandle === undefined || e.sourceHandle === "d"
    );

    // if(n[0]!=undefined)
    //   if(n[0].data.specificElType=="if"||n[0].data.specificElType=="loop"){
    //    let ed =await elements.filter(
    //       (e) =>
    //         e.id.search("react")!==-1&&e.sourceHandle!==null&&e.sourceHandle!=='b'&&e.source==n[0].id
    //     )

    //     let m =getConnectedEdges([n[0]],ed)

    //     s= index_check(m)
    //     console.log(m,s,"MMMMMMMSSSSMSMSMSMSM")
    //   }
    // if(n.length>=2){
    //   // aNode =[...aNode,n[s]]

    //   aNode.push(n[s])
    //   n=getOutgoers (n[s],element)
    // }
    // else{
    // aNode =[...aNode,n[0]]

    a.push(n[0]);
    a[a.length - 1].position.x = nodeWidth;

    a[a.length - 1].position.y = nodeHeight;
    nodeHeight = nodeHeight + 100;
    n = await getOutgoers(n[0], element);

    // }

    await nodeGetAlign(n, a);
  };
  const nodeGetReverse = async (n, m) => {
    console.log("nodedebug   else  ", n[0], n, m, elements);
    if (Object.keys(n).length === 0) {
      console.log("flase++++++++");
      return "false";
    } else if (n[0].id === m.id) {
      console.log("true++++++++");
      return "true";
    }

    let element = await elements.filter(
      (e) => e.targetHandle === undefined || e.sourceHandle === "d"
    );

    n = await getOutgoers(n[0], element);

    return await nodeGetReverse(n, m);
  };
  // const nodeGetReverse=async (n) =>{
  //   console.log("nodedebug   else  ",n)
  //   if(n.data.specificElType==="start")
  //     return true;
  //     let  element =await elements.filter(
  //       (e) =>
  //         e.targetHandle===undefined||e.sourceHandle==='d'
  //     )
  //     n =await getIncomers(n,element)

  //     await nodeGetReverse(n)

  // }
  const nodeGet2 = async (n, a) => {
    console.log("nodedebug   else  ", n[0], n);
    if (Object.keys(n).length === 0) return a;
    let element = await elements.filter(
      (e) => e.targetHandle === undefined || e.sourceHandle === "d"
    );

    // if(n[0]!=undefined)
    //   if(n[0].data.specificElType=="if"||n[0].data.specificElType=="loop"){
    //    let ed =await elements.filter(
    //       (e) =>
    //         e.id.search("react")!==-1&&e.sourceHandle!==null&&e.sourceHandle!=='b'&&e.source==n[0].id
    //     )

    //     let m =getConnectedEdges([n[0]],ed)

    //     s= index_check(m)
    //     console.log(m,s,"MMMMMMMSSSSMSMSMSMSM")
    //   }
    // if(n.length>=2){
    //   // aNode =[...aNode,n[s]]

    //   aNode.push(n[s])
    //   n=getOutgoers (n[s],element)
    // }
    // else{
    // aNode =[...aNode,n[0]]

    a.push(n[0]);

    n = await getOutgoers(n[0], element);

    // }

    await nodeGet2(n, a);
  };
  const portInfo = (n) => {
    let obj = null;
    let signalType = "analog";

    if (JSON.parse(sessionStorage.getItem(`${n}`))) {
      obj = {
        type: "led",
        index: 0,
        signalType: signalType,
      };
      if (!JSON.parse(sessionStorage.getItem(`${n}DIGI`)))
        obj = {
          type: "tact_switch",
          index: 0,
        };
    }

    return obj;
  };
  const nodeAddIfNo = async (n) => {
    for (let i = 0; i < n.length; i++)
      if ((await n[i].data.specificElType) === "if") {
        let a = {
          id: await n[i].id,
          subprogram: [],
          type: "output",
          data: {
            elType: "node",
            specificElType: "ifNo",
          },
        };
        await n.splice(i + 1, 0, a);
      }
  };

  var params = {
    screen: "hexa",
    logic: {
      end: {
        type: "end",
        state: "repeat",
      },
    },
    components: {
      A1: portInfo("A1"),
      A2: portInfo("A2"),
      B1: portInfo("B1"),
      B2: portInfo("B2"),
      C1: portInfo("C1"),
      C2: portInfo("C2"),
      D1: portInfo("D1"),
      D2: portInfo("D2"),
      E1: null,
      E2: null,
      F1: null,
      F2: null,
      G1: null,
      G2: null,
      H1: null,
      H2: null,
      I1: null,
      I2: null,
      M1: null,
      M2: null,
      A: portInfo("A1"),
      B: portInfo("B1"),
      C: portInfo("C1"),
      D: portInfo("D1"),
      E: null,
      F: null,
      G: null,
      H: null,
      I: null,
      AB: null,
      FG: null,
      ECHI: null,
      STPM: null,
      FOUR_in_ONE_Sensor: null,
      MICROPHONE: null,
      TEMPERATURE: null,
      TouchZero: null,
      TouchOne: null,
      TouchTwo: null,
    },

    internalaccessories: {
      Four_in_one_sensor: {
        isDistanceSensors:
          JSON.parse(sessionStorage.getItem("isDistanceSensors")) || false,
        isGestureSensor:
          JSON.parse(sessionStorage.getItem("isGestureSensor")) || false,
        isLightSensor:
          JSON.parse(sessionStorage.getItem("isLightSensor")) || false,
        isColorSensor:
          JSON.parse(sessionStorage.getItem("isColorSensor")) || false,
      },
      isFour_in_one_sensor:
        JSON.parse(sessionStorage.getItem("isColorSensor")) ||
        JSON.parse(sessionStorage.getItem("isGestureSensor")) ||
        JSON.parse(sessionStorage.getItem("isLightSensor")) ||
        JSON.parse(sessionStorage.getItem("isColorSensor")) ||
        false,
      isTouchZero: JSON.parse(sessionStorage.getItem("isTouchZero")) || false,
      isTouchOne: JSON.parse(sessionStorage.getItem("isTouchOne")) || false,
      isTouchTwo: JSON.parse(sessionStorage.getItem("isTouchTwo")) || false,
      isTouchZeroOutput:
        JSON.parse(sessionStorage.getItem("isTouchZeroOutput")) || false,
      isTouchOneOutput:
        JSON.parse(sessionStorage.getItem("isTouchOneOutput")) || false,
      isTouchTwoOutput:
        JSON.parse(sessionStorage.getItem("isTouchTwoOutput")) || false,
      isMic: JSON.parse(sessionStorage.getItem("isMic")) || false,
      isTemperature:
        JSON.parse(sessionStorage.getItem("isTemperature")) || false,
      isLeftEye: JSON.parse(sessionStorage.getItem("isEyeLeft")) || false,
      isRightEye: JSON.parse(sessionStorage.getItem("isEyeRight")) || false,
      isbuzzer: JSON.parse(sessionStorage.getItem("isBuzzer")) || false,
      isSmileOne: JSON.parse(sessionStorage.getItem("isSmileOne")) || false,
      isSmileTwo: JSON.parse(sessionStorage.getItem("isSmileTwo")) || false,
      isSmileThree: JSON.parse(sessionStorage.getItem("isSmileThree")) || false,
      isSmileFour: JSON.parse(sessionStorage.getItem("isSmileFour")) || false,
    },
  };
  const propertyPanelConversion = async (testSingleD, programSend) => {
    console.log(Object.entries(testSingleD));
    for (let i = 0; i < testSingleD.length; i++) {
      console.log("testSingleD......", testSingleD[i]);
      if (testSingleD[i].data.specificElType == "wait") {
        let a = waitArray(testSingleD[i].id);
        programSend.push({
          id: testSingleD[i].id,
          type: "wait",
          state: { ms: a[0] || 0, s: a[1] || 0, m: a[2] || 0, h: a[3] || 0 },
        });
      } else if (testSingleD[i].data.specificElType === "output") {
        let a = outputArray(testSingleD[i].id);
        console.log("aaaaaa", a);

        programSend.push({
          id: testSingleD[i].id,
          type: "hardware",
          state: {
            assignTouchZeroOutput: Boolean(
              Boolean(a[26] === "true" || parseInt(a[26]))
            ),
            valueTouchZeroOutput: parseInt(a[8]),
            assignTouchOneOutput: Boolean(
              Boolean(a[27] === "true" || parseInt(a[27]))
            ),
            valueTouchOneOutput: parseInt(a[9]),
            assignTouchTwoOutput: Boolean(
              Boolean(a[28] === "true" || parseInt(a[28]))
            ),
            valueTouchTwoOutput: parseInt(a[10]),
            assignLeftEye: Boolean(a[11] === "true" || parseInt(a[11])),
            assignLeftEyeR: Boolean(a[11] === "true" || parseInt(a[11])),
            assignLeftEyeG: Boolean(a[11] === "true" || parseInt(a[11])),
            assignLeftEyeB: Boolean(a[11] === "true" || parseInt(a[11])),
            valueLeftEyeR: parseInt(a[29]),
            valueLeftEyeG: parseInt(a[30]),
            valueLeftEyeB: parseInt(a[31]),
            assignRightEye: Boolean(a[12] === "true" || parseInt(a[12])),
            assignRightEyeR: Boolean(a[12] === "true" || parseInt(a[12])),
            assignRightEyeG: Boolean(a[12] === "true" || parseInt(a[12])),
            assignRightEyeB: Boolean(a[12] === "true" || parseInt(a[12])),
            valueRightEyeR: parseInt(a[32]),
            valueRightEyeG: parseInt(a[33]),
            valueRightEyeB: parseInt(a[34]),
            assignBuzzer: Boolean(a[35] === "true" || parseInt(a[35])),
            assignBuzzerFrequency: false,
            assignBuzzerTone: Boolean(a[35] === "true" || parseInt(a[35])),
            valueBuzzerFrequency: 0,
            valueBuzzerTone: parseInt(a[13]),
            assignSmileOne: Boolean(a[36] === "true" || parseInt(a[36])),
            valueSmileOne: parseInt(a[14]),
            assignSmileTwo: Boolean(a[37] === "true" || parseInt(a[37])),
            valueSmileTwo: parseInt(a[15]),
            assignSmileThree: Boolean(a[38] === "true" || parseInt(a[38])),
            valueSmileThree: parseInt(a[16]),
            assignSmileFour: Boolean(a[39] === "true" || parseInt(a[39])),
            valueSmileFour: parseInt(a[17]),
            assignA1: Boolean(a[18] === "true" || parseInt(a[18])),
            valueA1: parseInt(a[0]),
            assignA2: Boolean(a[19] === "true" || parseInt(a[19])),
            valueA2: parseInt(a[1]),
            assignB1: Boolean(a[20] === "true" || parseInt(a[20])),
            valueB1: parseInt(a[2]),
            assignB2: Boolean(a[21] === "true" || parseInt(a[21])),
            valueB2: parseInt(a[3]),
            assignC1: Boolean(a[22] === "true" || parseInt(a[22])),
            valueC1: parseInt(a[4]),
            assignC2: Boolean(a[23] === "true" || parseInt(a[23])),
            valueC2: parseInt(a[5]),
            assignD1: Boolean(a[24] === "true" || parseInt(a[24])),
            valueD1: parseInt(a[6]),
            assignD2: Boolean(a[25] === "true" || parseInt(a[25])),
            valueD2: parseInt(a[7]),
          },
        });
      } else if (testSingleD[i].data.specificElType === "loop") {
        let send = [];
        if (testSingleD[i].subprogram.length != 0)
          await propertyPanelConversion(testSingleD[i].subprogram, send);
        let state;
        if (loopArray(testSingleD[i].id) == null) state = {};
        else
          state = {
            times: loopArray(testSingleD[i].id),
          };
        programSend.push({
          type: "loop",
          state: state,
          id: testSingleD[i].id,
          subprogram: send,
        });
      } else if (testSingleD[i].data.specificElType === "if") {
        let send = [];
        if (testSingleD[i].subprogram.length != 0)
          await propertyPanelConversion(testSingleD[i].subprogram, send);
        let a = ifArray(testSingleD[i].id);
        console.log("IFFFFFFFFFFFFFFF", a);
        let source = "battery";
        let condition = "gt";
        if (a[0] === "touchZero") source = "TouchZero";
        else if (a[0] === "touchOne") source = "TouchOne";
        else if (a[0] === "touchTwo") source = "TouchTwo";
        else if (a[0] === "temperature") source = "TEMPERATURE";
        else if (a[0] === "microphone") source = "MICROPHONE";
        else if (a[0] === "distanceSensor") source = "4-IN-1 SENSOR  →  DIST";
        else if (a[0] === "gestureSensor") source = "4-IN-1 SENSOR  →  GESTURE";
        else if (a[0] === "lightSensor") source = "4-IN-1 SENSOR  →  LIGHT";
        else if (a[0] === "colorSensorRed") source = "4-IN-1 SENSOR  →  RED";
        else if (a[0] === "colorSensorGreen")
          source = "4-IN-1 SENSOR  →  GREEN";
        else if (a[0] === "colorSensorBlue") source = "4-IN-1 SENSOR  →  BLUE";
        else if (a[0] === "port A1") source = "A1";
        else if (a[0] === "port A2") source = "A2";
        else if (a[0] === "port B1") source = "B1";
        else if (a[0] === "port B2") source = "B2";
        else if (a[0] === "port C1") source = "C1";
        else if (a[0] === "port C2") source = "C2";
        else if (a[0] === "port D1") source = "D1";
        else if (a[0] === "port D2") source = "D2";
        else if (a[0] === "port E1") source = "E1";
        else if (a[0] === "port E2") source = "E2";
        else if (a[0] === "port F1") source = "F1";
        else if (a[0] === "port F2") source = "M2";
        else if (a[0] === "port M1") source = "M1";
        else if (a[0] === "port M2") source = "M2";
        else if (a[0] === "port M3") source = "M3";
        else if (a[0] === "port M4") source = "M4";
        if (a[3] === "true") condition = "gt";
        else if (a[4] === "true") condition = "lt";
        else if (a[5] === "true") condition = "bw";
        else if (a[6] === "true") condition = "eq";
        else if (a[7] === "true") condition = "ne";
        programSend.push({
          type: "sensor",
          state: {
            source: source,
            value: parseInt(a[1]),
            value2: parseInt(a[2]),
            hour: 0,
            hour2: 0,
            minute: 0,
            minute2: 0,
            condition: condition,
          },
          subprogram: send,
        });
        // else if(testSingleD[i].data.specificElType === "end"){
        //   params.logic.end.state="end"
        // }
      } else if (testSingleD[i].data.specificElType === "ifNo") {
        let send = [];
        if (testSingleD[i].subprogram.length != 0)
          await propertyPanelConversion(testSingleD[i].subprogram, send);
        let a = ifArray(testSingleD[i].id);
        console.log("IFFFFFFFFFFFFFFF", a);
        let source = "battery";
        let condition = "lt";
        if (a[0] === "touchZero") source = "TouchZero";
        else if (a[0] === "touchOne") source = "TouchOne";
        else if (a[0] === "touchTwo") source = "TouchTwo";
        else if (a[0] === "temperature") source = "TEMPERATURE";
        else if (a[0] === "microphone") source = "MICROPHONE";
        else if (a[0] === "distanceSensor") source = "4-IN-1 SENSOR  →  DIST";
        else if (a[0] === "gestureSensor") source = "4-IN-1 SENSOR  →  GESTURE";
        else if (a[0] === "lightSensor") source = "4-IN-1 SENSOR  →  LIGHT";
        else if (a[0] === "colorSensorRed") source = "4-IN-1 SENSOR  →  RED";
        else if (a[0] === "colorSensorGreen")
          source = "4-IN-1 SENSOR  →  GREEN";
        else if (a[0] === "colorSensorBlue") source = "4-IN-1 SENSOR  →  BLUE";
        if (a[3] === "true") condition = "lt";
        else if (a[4] === "true") condition = "gt";
        else if (a[6] === "true") condition = "ne";
        else if (a[7] === "true") condition = "eq";
        if (a[5] === "true") condition = "nbw";

        programSend.push({
          type: "sensor",
          state: {
            source: source,
            value: parseInt(a[1]),
            value2: parseInt(a[2]),
            hour: 0,
            hour2: 0,
            minute: 0,
            minute2: 0,
            condition: condition,
          },
          subprogram: send,
        });
        // else if(testSingleD[i].data.specificElType === "end"){
        //   params.logic.end.state="end"
        // }
      }
    }
  };
  const subprogramRecursive = async (aNode) => {
    for (let i in aNode) {
      // if(aNode[i].id===aNode[i+1].id)
      //   i=i+1
      // i=aNode.length-1
      // if(aNode[i].data.specificElType=="ifNo")
      //   subprogramRecursiveIfNo(aNode[i].subprogram)
      if (
        aNode[i].data.specificElType == "if" ||
        aNode[i].data.specificElType == "loop" ||
        aNode[i].data.specificElType == "ifNo"
      ) {
        aNode[i].subprogram = [];
        //  let ed =await elements.filter(
        //     (e) =>
        //       e.id.search("react")!==-1&&e.sourceHandle!==null&&e.sourceHandle!=='b'&&e.source==aNode[i].id
        //   )
        //   let m =getConnectedEdges([aNode[i]],ed)
        //   let s= index_check_2(m)
        // if(s==0)
        //   s=1
        // else
        //   s=0
        // s=((s==1)?0:1)
        if (aNode[i].data.specificElType == "if") {
          let element = await elements.filter(
            (e) => e.targetHandle === undefined || e.sourceHandle === "rYes" //||e.sourceHandle==='rNo'
          );
          let y = getOutgoers(aNode[i], element);
          await nodeGet(y, aNode[i].subprogram);
          await nodeAddIfNo(aNode[i].subprogram);
          await subprogramRecursive(aNode[i].subprogram);
        } else if (aNode[i].data.specificElType == "ifNo") {
          let element = await elements.filter(
            (e) => e.targetHandle === undefined || e.sourceHandle === "rNo" //||e.sourceHandle==='rNo'
          );
          let y = getOutgoers(aNode[i], element);
          await nodeGet(y, aNode[i].subprogram);
          await nodeAddIfNo(aNode[i].subprogram);
          await subprogramRecursive(aNode[i].subprogram);
        } else if (aNode[i].data.specificElType == "loop") {
          let element = await elements.filter(
            (e) => e.targetHandle === undefined || e.sourceHandle === "r" //||e.sourceHandle==='rNo'
          );
          let y = getOutgoers(aNode[i], element);
          await nodeGet(y, aNode[i].subprogram);
          await nodeAddIfNo(aNode[i].subprogram);
          await subprogramRecursive(aNode[i].subprogram);
        }
      }
      // else if(aNode[i].data.specificElType=="ifNo"){
      //   aNode[i].subprogram=[]
      // //  let ed =await elements.filter(
      // //     (e) =>
      // //       e.id.search("react")!==-1&&e.sourceHandle!==null&&e.sourceHandle!=='b'&&e.source==aNode[i].id
      // //   )
      // //   let m =getConnectedEdges([aNode[i]],ed)
      // //   let s= index_check_2(m)
      //   // if(s==0)
      //   //   s=1
      //   // else
      //   //   s=0
      //   // s=((s==1)?0:1)
      //   let  element =await elements.filter(
      //     (e) =>
      //       e.targetHandle===undefined||e.sourceHandle==='r'||e.sourceHandle==='rNo'
      //   )
      //   let y= getOutgoers (aNode[i],element)
      //   // console.log("aNode============================>======>",aNode[i],y,s,m,y[s])
      //   // aNode[i].subprogram.push(y[0])
      //   console.log("aNode=================######===========>======>",y)
      //   // y= getOutgoers (y[0],element)

      //     await nodeGet2(y,aNode[i].subprogram)
      //   console.log("aNode============================>======>",y,aNode[i].subprogram)

      //   await subprogramRecursive(aNode[i].subprogram)
      //   await nodeAddIfNo(aNode[i].subprogram)
      // }
    }
  };
  const subprogramRecursiveAlign = async (aNode) => {
    for (let i in aNode) {
      // if(aNode[i].id===aNode[i+1].id)
      //   i=i+1
      // i=aNode.length-1
      // if(aNode[i].data.specificElType=="ifNo")
      //   subprogramRecursiveIfNo(aNode[i].subprogram)
      if (
        aNode[i].data.specificElType == "if" ||
        aNode[i].data.specificElType == "loop" ||
        aNode[i].data.specificElType == "ifNo"
      ) {
        aNode[i].subprogram = [];
        //  let ed =await elements.filter(
        //     (e) =>
        //       e.id.search("react")!==-1&&e.sourceHandle!==null&&e.sourceHandle!=='b'&&e.source==aNode[i].id
        //   )
        //   let m =getConnectedEdges([aNode[i]],ed)
        //   let s= index_check_2(m)
        // if(s==0)
        //   s=1
        // else
        //   s=0
        // s=((s==1)?0:1)
        if (aNode[i].data.specificElType == "if") {
          let element = await elements.filter(
            (e) => e.targetHandle === undefined || e.sourceHandle === "rYes" //||e.sourceHandle==='rNo'
          );
          let y = getOutgoers(aNode[i], element);
          nodeWidth = aNode[i].position.x + 200;
          nodeHeight = aNode[i].position.y;
          await nodeGetAlign(y, aNode[i].subprogram);
          await nodeAddIfNo(aNode[i].subprogram);
          await subprogramRecursiveAlign(aNode[i].subprogram);
        } else if (aNode[i].data.specificElType == "ifNo") {
          let element = await elements.filter(
            (e) => e.targetHandle === undefined || e.sourceHandle === "rNo" //||e.sourceHandle==='rNo'
          );
          let y = getOutgoers(aNode[i], element);
          nodeWidth = nodeWidth + 100;
          await nodeGetAlign(y, aNode[i].subprogram);
          await nodeAddIfNo(aNode[i].subprogram);
          await subprogramRecursiveAlign(aNode[i].subprogram);
        } else if (aNode[i].data.specificElType == "loop") {
          let element = await elements.filter(
            (e) => e.targetHandle === undefined || e.sourceHandle === "r" //||e.sourceHandle==='rNo'
          );
          let y = getOutgoers(aNode[i], element);
          nodeWidth = aNode[i].position.x + 200;
          nodeHeight = aNode[i].position.y;
          await nodeGetAlign(y, aNode[i].subprogram);

          await nodeAddIfNo(aNode[i].subprogram);
          await subprogramRecursiveAlign(aNode[i].subprogram);
        }
      }
      // else if(aNode[i].data.specificElType=="ifNo"){
      //   aNode[i].subprogram=[]
      // //  let ed =await elements.filter(
      // //     (e) =>
      // //       e.id.search("react")!==-1&&e.sourceHandle!==null&&e.sourceHandle!=='b'&&e.source==aNode[i].id
      // //   )
      // //   let m =getConnectedEdges([aNode[i]],ed)
      // //   let s= index_check_2(m)
      //   // if(s==0)
      //   //   s=1
      //   // else
      //   //   s=0
      //   // s=((s==1)?0:1)
      //   let  element =await elements.filter(
      //     (e) =>
      //       e.targetHandle===undefined||e.sourceHandle==='r'||e.sourceHandle==='rNo'
      //   )
      //   let y= getOutgoers (aNode[i],element)
      //   // console.log("aNode============================>======>",aNode[i],y,s,m,y[s])
      //   // aNode[i].subprogram.push(y[0])
      //   console.log("aNode=================######===========>======>",y)
      //   // y= getOutgoers (y[0],element)

      //     await nodeGet2(y,aNode[i].subprogram)
      //   console.log("aNode============================>======>",y,aNode[i].subprogram)

      //   await subprogramRecursive(aNode[i].subprogram)
      //   await nodeAddIfNo(aNode[i].subprogram)
      // }
    }
  };
  const subprogramRecursiveIfNo = async (aNode) => {
    for (let i in aNode) {
      // if(aNode[i].id===aNode[i+1].id)
      //   i=i+1
      // i=aNode.length-1
      // if(aNode[i].data.specificElType=="loop"){
      //   subprogramRecursive(aNode[i].subprogram)
      // }
      if (aNode[i].data.specificElType == "ifNo") {
        aNode[i].subprogram = [];
        //  let ed =await elements.filter(
        //     (e) =>
        //       e.id.search("react")!==-1&&e.sourceHandle!==null&&e.sourceHandle!=='b'&&e.source==aNode[i].id
        //   )
        //   let m =getConnectedEdges([aNode[i]],ed)
        //   let s= index_check_2(m)
        // if(s==0)
        //   s=1
        // else
        //   s=0
        // s=((s==1)?0:1)
        let element = await elements.filter(
          (e) =>
            e.targetHandle === undefined ||
            e.sourceHandle === "r" ||
            e.sourceHandle === "rNo"
        );
        let y = getOutgoers(aNode[i], element);
        // console.log("aNode============================>======>",aNode[i],y,s,m,y[s])
        // aNode[i].subprogram.push(y[0])
        console.log("aNode=================######===========>======>", y);
        // y= getOutgoers (y[0],element)

        await nodeGet2(y, aNode[i].subprogram);
        console.log(
          "aNode============================>======>",
          y,
          aNode[i].subprogram
        );

        await subprogramRecursiveIfNo(aNode[i].subprogram);
        await nodeAddIfNo(aNode[i].subprogram);
      }
    }
  };

  const sendBytes = async () => {
    //aNode global changed
    let aNode = [],
      aNode1 = [],
      y = [],
      testSingleD = [];

    y = getOutgoers(elements[0], elements);

    await nodeGet(y, aNode);
    await nodeAddIfNo(aNode);
    // await nodeAddIfNo(aNode)
    // await nodeGet(y,aNode1)
    // let  ed =await elements.filter(
    //   (e) =>
    //     e.id.search("react")!==-1&&e.sourceHandle!==null&&e.sourceHandle!=='b'
    // )

    await subprogramRecursive(aNode);

    // for( let i =0;i<aNode.length;i++){
    //   if(aNode[i].id==="2")
    //     aNode.splice(i,)
    // }
    console.log(">>>>>>>>>>>>>>>>>>>>>", aNode);

    //  await subprogramRecursiveIfNo(aNode)
    //  await subprogramRecursive(aNode1)
    // for (let i in aNode){
    //   if(aNode[i].data.specificElType=="if"||aNode[i].data.specificElType=="loop"){
    //     ed =await elements.filter(
    //       (e) =>
    //         e.id.search("react")!==-1&&e.sourceHandle!==null&&e.sourceHandle!=='b'
    //     )
    //     let m =getConnectedEdges([aNode[i]],ed)
    //     let s= index_check_2(m)
    //     // if(s==0)
    //     //   s=1
    //     // else
    //     //   s=0
    //     // s=((s==1)?0:1)
    //     y= getOutgoers (aNode[i],elements)
    //     console.log("aNode============================>======>",aNode[i],y,s,m,y[s])
    //     aNode[i].subprogram.push(y[s])
    //     y= getOutgoers (y[s],elements)
    //     await nodeGet(y,aNode[i].subprogram)
    //   }
    // }
    console.log(">>>>>>>>>>>>>>>>>>>>>", aNode, aNode1);
    testSingleD = aNode;
    // while(Object.keys(y).length!==0){
    //   // console.log(y,"++")
    //   z.push(ytest)
    //   testSingleD.push(y[0])
    //   y= getOutgoers (y[0],elements)
    //   ytest= getOutgoers (ytest,elements)

    // }
    console.log("sendBytes", testSingleD);
    let programSend = [];
    programSend.push({
      type: "start",
      state: {
        bic1: false,
        bic2: false,
        bic3: false,
        bid2: false,
        bif1: false,
        bif2: false,
        bif3: false,
      },
      bic1: false,
      bic2: false,
      bic3: false,
      bid2: false,
      bif1: false,
      bif2: false,
      bif3: false,
      bid3: false,
      bid1: false,
      bmp3: false,
      id: "10",
    });

    await propertyPanelConversion(testSingleD, programSend);
    if (testSingleD[testSingleD.length - 1].data.specificElType === "end") {
      params.logic.end.state = "end";
    }
    // if(testSingleD[i].data.specificElType=="wait"){
    //   let a= waitArray(testSingleD[i].id)
    //   programSend.push({
    //     id: testSingleD[i].id,
    //     type: "wait",
    //     state:{ms:a[0]||0,s:a[1]||0,m:a[2]||0,h:a[3]||0}
    //   })
    // }
    // else if(testSingleD[i].data.specificElType === "output"){
    //   let a= outputArray(testSingleD[i].id)
    //   console.log("aaaaaa",a)

    //   programSend.push({
    //     id: testSingleD[i].id,
    //     type: 'hardware',
    //     state: {
    //       assignTouchZeroOutput: Boolean( Boolean(a[26]==="true"||parseInt(a[26]))),
    //       valueTouchZeroOutput: parseInt(a[8]),
    //       assignTouchOneOutput: Boolean( Boolean(a[27]==="true"||parseInt(a[27]))),
    //       valueTouchOneOutput: parseInt(a[9]),
    //       assignTouchTwoOutput: Boolean( Boolean(a[28]==="true"||parseInt(a[28]))),
    //       valueTouchTwoOutput: parseInt(a[10]),
    //       assignLeftEye: Boolean(a[11]==="true"||parseInt(a[11])),
    //       assignLeftEyeR:Boolean(a[11]==="true"||parseInt(a[11])),
    //       assignLeftEyeG:Boolean(a[11]==="true"||parseInt(a[11])),
    //       assignLeftEyeB: Boolean(a[11]==="true"||parseInt(a[11])),
    //       valueLeftEyeR: parseInt(a[29]),
    //       valueLeftEyeG: parseInt(a[30]),
    //       valueLeftEyeB: parseInt(a[31]),
    //       assignRightEye: Boolean(a[12]==="true"||parseInt(a[12])),
    //       assignRightEyeR: Boolean(a[12]==="true"||parseInt(a[12])),
    //       assignRightEyeG: Boolean(a[12]==="true"||parseInt(a[12])),
    //       assignRightEyeB: Boolean(a[12]==="true"||parseInt(a[12])),
    //       valueRightEyeR:parseInt(a[32]),
    //       valueRightEyeG: parseInt(a[33]),
    //       valueRightEyeB:parseInt(a[34]),
    //       assignBuzzer: Boolean(a[35]==="true"||parseInt(a[35])),
    //       assignBuzzerFrequency:false,
    //       assignBuzzerTone: Boolean(a[35]==="true"||parseInt(a[35])),
    //       valueBuzzerFrequency: 0,
    //       valueBuzzerTone:parseInt(a[13]),
    //       assignSmileOne: Boolean(a[36]==="true"||parseInt(a[36])),
    //       valueSmileOne: parseInt(a[14]),
    //       assignSmileTwo:Boolean(a[37]==="true"||parseInt(a[37])),
    //       valueSmileTwo: parseInt(a[15]),
    //       assignSmileThree: Boolean(a[38]==="true"||parseInt(a[38])),
    //       valueSmileThree: parseInt(a[16]),
    //       assignSmileFour:Boolean(a[39]==="true"||parseInt(a[39])),
    //       valueSmileFour: parseInt(a[17]),
    //       assignA1: Boolean(a[18]==="true"||parseInt(a[18])),
    //       valueA1: parseInt(a[0]),
    //       assignA2: Boolean(a[19]==="true"||parseInt(a[19])),
    //       valueA2: parseInt(a[1]),
    //       assignB1: Boolean(a[20]==="true"||parseInt(a[20])),
    //       valueB1: parseInt(a[2]),
    //       assignB2: Boolean(a[21]==="true"||parseInt(a[21])),
    //       valueB2: parseInt(a[3]),
    //       assignC1: Boolean(a[22]==="true"||parseInt(a[22])),
    //       valueC1: parseInt(a[4]),
    //       assignC2: Boolean(a[23]==="true"||parseInt(a[23])),
    //       valueC2: parseInt(a[5]),
    //       assignD1: Boolean(a[24]==="true"||parseInt(a[24])),
    //       valueD1: parseInt(a[6]),
    //       assignD2: Boolean(a[25]==="true"||parseInt(a[25])),
    //       valueD2: parseInt(a[7]),
    //     },
    //   })
    // }
    // else if(testSingleD[i].data.specificElType === "end"){
    //   params.logic.end.state="end"
    // }

    console.log(programSend, "=======>????");
    Object.assign(params.logic, { program: programSend });
    console.log(
      "helloo testtt",
      Object.keys(params.logic).length,
      params.logic
    );

    Object.assign(params.logic, {
      insertState: false,
      offset: {
        left: 0,
        top: 0,
      },
      scale: 1,
      currentProgramGuide: -1,
      active: [-1, -1],
      bottomPanel: "border",
    });
    console.log(params);
    socket.emit("/getSimulateBytes", { code: params });
  };
  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      console.log("clicked==>");
      // eventFire(document.getElementById("image-render"), "click");
      click(260, 200);
    }, 0);
  };
  let nodeX = 100;
  let nodeY = 100;
  const handleShow = () => setShow(true);
  // console.log(elements, "=====>======>element=====>");
  let resetX = 0,
    resetY = 0;

  const align = async () => {
    let a = [];

    await nodeGet([elements[0]], a);
    await nodeAddIfNo(a);
    await subprogramRecursive(a);
    console.log("aaAAAAAAAAAAAAAAA", a);
    // for (let i in a)
    //     await setElements((els) =>
    //     els.map((el) => {
    //       if (el.id === `${a[i].id}`) {
    //         console.log("@@done");
    //         el=a[i]
    //       }

    //       return el;
    //     })
    //   );
    // await reArrange(a)
    await posAlignOld(a, nodeX, nodeY);
    console.log("aaAAAAAAAAAAAAAAA", a, nodeX, nodeY);
    largX = a[0].position.x;
    await alignOffset(a);
    await alignOffsetMoving();
    console.log("GGGGGGGJ", largX, offsetElement, nonOffsetElement);
    history.push("/flow/digital-analog");
    history.push("/flow/flowchart");
  };
  const reArrange = async (a) => {
    for (let i in a) {
      if (a[i].data.specificElType == "ifNo") {
        let temp = a[i];
        a[i] = a[i - 1];
        a[i - 1] = temp;
        await reArrange(a[i - 1].subprogram);
        await reArrange(a[i].subprogram);
      }
    }
  };
  let largX,
    nonOffsetElement = [],
    offsetElement = [];
  const alignOffset = async (a) => {
    for (let i in a) {
      await elements.map((ele) => {
        if (ele.id === a[i].id) {
          nonOffsetElement.push(ele.id);
          if (ele.position.x >= largX) largX = ele.position.x;
        }
      });
      await alignOffset(a[i].subprogram);
    }
  };
  const alignOffsetMoving = async () => {
    await elements.map((ele) => {
      if (ele.id.search("react") == -1) {
        offsetElement.push(ele.id);
      }
    });
    for (let i in offsetElement) {
      nonOffsetElement.map((ele) => {
        console.log("GJ");
        if (ele == offsetElement[i]) offsetElement[i] = -1;
      });
    }
    offsetElement = offsetElement.filter((e) => e !== -1);
    let addon = 100;
    for (let i in offsetElement) {
      await setElements((els) =>
        els.map((el) => {
          if (el.id === offsetElement[i]) {
            el.position.x = 400 + largX + addon;
          }

          return el;
        })
      );
      addon = addon + 100;
    }
  };
  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem("flowKey", JSON.stringify(flow));
    }
  }, [reactFlowInstance]);
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem("flowKey"));

      if (flow) {
        setElements(flow || []);
      }
    };

    restoreFlow();
  }, [setElements]);
  const posAlignOld = async (a, nodeX, nodeY) => {
    let n;
    for (let i in a) {
      if (Object.keys(a).length === 0) return { nodeY, nodeX };
      else if (
        a[i].data.specificElType === "loop" ||
        a[i].data.specificElType === "if"
      ) {
        a[i].position.x = nodeX;
        a[i].position.y = nodeY;
        // let y=nodeY
        // await posAlign(a[i].subprogram,nodeX+200,nodeY)
        if (a[i].data.specificElType !== "if") {
          n = await posAlignOld(a[i].subprogram, nodeX + 200, nodeY + 50);
          nodeY = n.nodeY;
        } else {
          n = await posAlignOld(a[i].subprogram, nodeX + 500, nodeY + 50);
        }
      } else if (a[i].data.specificElType === "ifNo") {
        await setElements((els) =>
          els.map((el) => {
            if (el.id === `${a[i].id}` && el.data.specificElType !== "ifNo") {
              el.position.x = nodeX;
              el.position.y = nodeY;
            }

            return el;
          })
        );
        if (a[i - 1].subprogram.length === 0)
          n = await posAlignOld(a[i].subprogram, nodeX + 200, nodeY + 50);
        else
          n = await posAlignOld(
            a[i].subprogram,
            nodeX + 200,
            a[i - 1].subprogram[a[i - 1].subprogram.length - 1].position.y
          );
        nodeY = n.nodeY;
      } else {
        a[i].position.x = nodeX;
        a[i].position.y = nodeY;
        nodeY = nodeY + 100;
      }
    }
    for (let i in a)
      await setElements((els) =>
        els.map((el) => {
          if (el.id === `${a[i].id}` && a[i].data.specificElType !== "ifNo") {
            console.log("@@done");
            el = a[i];
          }

          return el;
        })
      );
    return { nodeY };
  };
  // const postAlignIf=async(n,x,y)=>{
  //   for(let i in a){
  //     if(a[i].data.specificElType==="if"){
  //       els.map((el) => {
  //         if (el.id === `${a[i].id}`&&el.data.specificElType!=="ifNo") {
  //           el.position.x=nodeX
  //           el.position.y=nodeY
  //         }

  //         return el;
  //       })
  //     }
  //   }
  // }

  const clear = async () => {
    // let transformValue =document.getElementsByClassName("react-flow__nodes")[0].style.transform;
    // let transformValueB =document.getElementsByClassName("react-flow__node")[0].style.transform;
    // console.log(transformValue,transformValueB,"PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
    // document.getElementsByClassName("react-flow__node")[0].setAttribute("style","translate(500px, -65px)");
    sessionStorage.setItem("flowchart-elements", null);
    sessionStorage.setItem("flowchart-elements-id", null);
    setElements([
      {
        id: "0",
        position: { x: 500, y: 65 },
        type: `input`,
        data: {
          label: text1(`start`, 0),
          elType: "node",
          specificElType: `start`,
        },
      },
    ]);
  };
  const onPaneScroll = async (event) => {
    console.log(event);
  };
  // if (reactFlowInstance) {
  //   const flow = reactFlowInstance.toObject();
  //   sessionStorage.setItem("flow_Key", JSON.stringify(flow));
  // }
  const backBtnAction = () => {
    history.push("/flow/digital-analog");
  };
  return (
    <>
      <div className="HeaderContainer">
        <div
          style={{
            height: "10%",
            width: "100%",
            // border: "1px solid red",
            // background: "red",
            position: "absolute",
            userSelect: "none",
          }}
        >
          <div
            className="flowchart-navbarContainer navbarContainer"
            style={{ zIndex: "1000" }}
          >
            <div className="flowchart-navbar_content navbar_content">
              <div className="flowchart-navbar_new navbar_new" href="/">
                Select Ports
              </div>
              <div
                className="flowchart-navbar_new navbar_new"
                href="/input-output"
                eventKey="link-1"
              >
                Input/Output
              </div>
              <div
                className="flowchart-navbar_new navbar_new"
                href="/digital-analog"
                eventKey="link-2"
              >
                Digital/Analog
              </div>
              <div
                className="flowchart-navbar_new navbar_new isActive"
                href="/flowchart"
                eventKey="link-3"
              >
                Flowchart
              </div>
            </div>
            <img
              src={flowchartImg}
              style={{
                height: "100%",
                width: "52%",
                position: "relative",
                right: "25vw",
              }}
            />
            <div className="flowchart-navbar-Action navbar-Action">
              <img
                className="flowchart-iconBtnSize iconBtnSize"
                style={{ width: "61px", height: "61px", marginRight: "10px" }}
                src={secondaryImg}
              ></img>
              <img
                className="flowchart-iconBtnSize iconBtnSize"
                style={{ width: "61px", height: "61px", marginRight: "10px" }}
                src={secondaryImg}
                onClick={clear}
              ></img>
              <img
                className="flowchart-iconBtnSize iconBtnSize"
                style={{ width: "61px", height: "61px", marginRight: "10px" }}
                src={secondaryImg}
                onClick={align}
              ></img>
              <img
                className="flowchart-iconBtnSize iconBtnSize"
                style={{ width: "61px", height: "61px", marginRight: "10px" }}
                src={strokeImg}
              ></img>
              <img style={{ marginRight: "0px" }} src={connectionImg}></img>
            </div>
          </div>
        </div>
      </div>
      <div className="dndflow">
        {console.log(x, y, "===>array>")}
        <ReactFlowProvider>
          <Sidebar />
          <div className="reactflow-wrapper">
            <ReactFlow
              elements={elements}
              onConnect={onConnect}
              onElementsRemove={onElementsRemove}
              onLoad={onLoad}
              onDrop={onDrop}
              onSelectionChange={onSelectionChange}
              onDoubleClick={onDoubleClick}
              onElementClick={onElementClick}
              onDragOver={onDragOver}
              zoomOnDoubleClick={false}
              onNodeDrag={onNodeDrag}
              onNodeDragStop={onNodeDragStop}
              onNodeMouseLeave={onNodeMouseLeave}
              onNodeMouseEnter={onNodeMouseEnter}
              onPaneScroll={onPaneScroll}
              className="react-flow-screen"
              style={{ height: "88.3vh", width: "inherit" }}
              id="reactFlow"
            ></ReactFlow>
            {showPopup ? <Popup /> : null}
          </div>
        </ReactFlowProvider>
        {/* <div className="controls">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </div> */}
        {/* <button onClick={sendBytes}>send bytes</button> */}
        {/* <button onClick={align}>Align</button>
        <button onClick={clear}>clear</button> */}
        {/* <button onClick={onSave}>save</button>
      <button onClick={onRestore}>restore</button> */}
        <Modal show={show} onHide={handleClose}>
          <img
            className="panelcloseImg"
            onClick={handleClose}
            src={closeImg}
            alt="close"
            style={{
              position: "relative",
              height: "60px",
              width: "60px",
              top: "125px",
              zIndex: "1",
              left: "215%",
              cursor: "pointer",
            }}
          />
          <Modal.Body>
            <Panel
              value={{ ms: 0, s: 0, m: 0, h: 16 }}
              state={{ h: 0, m: 0, ms: 0, s: 0 }}
              check={modal}
              onChange={() => {
                console.log("hello===>");
              }}
              current={"sensor"}
              handler={handler}
              passEnd={passEnd}
            />
          </Modal.Body>
        </Modal>
      </div>
      <div className="SelectScreenBottom">
        <div className="bottom-child">
          {/* <Link to="/programSelection"> */}
          <img
            className="iconBtnSize imgBackBtn"
            src={renderPrgImage("backBtn")}
            onClick={backBtnAction}
          />
          {/* </Link> */}

          <img
            className="iconBtnSize imgNextBtn"
            src={renderPrgImage("uploadBtn")}
            onClick={sendBytes}
          />
        </div>
      </div>
    </>
  );
};

export default DnDFlow;
