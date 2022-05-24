import React, { useState, useLayoutEffect, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Popup from "./Popup";
import "./myflowchart.css";
import Panel1 from "../logic/pannel/";
import { connect } from "react-redux";
import { v4 } from "uuid";
import { CustomDragLayer } from "./CustomDragLayer.js";

import closeImg from "../../../../Assets/img/close.png";

import _ from "lodash";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Handle,
  getOutgoers,
} from "react-flow-renderer";

import start from "../../../../Assets/flowchart/start.png";
import fxvariable from "../../../../Assets/With name/Group 5544@2x.png";
import wait from "../../../../Assets/flowchart/wait.png";
import condition2 from "../../../../Assets/With name/Group 5545@2x.png";
import loop from "../../../../Assets/flowchart/repeat.png";
import repeat from "../../../../Assets/flowchart/loop.png";
import end from "../../../../Assets/flowchart/stopButton.png";
import Sidebar from "./Sidebar";
import { useLocalStorage } from "../../../LocalStorage/LocalStorage";
import "./dnd.css";
import "../../style.css";

import renderPrgImage from "../../../../source/programImg";
import flowchartImg from "../../../../Assets/img/simulate bar@2x.png";
import secondaryImg from "../../../../Assets/img/save - secondary.png";

import getBytes from "../../../Simulate/BytesGeneration/convertBytes";
import { webSerialAction } from "../../../../redux/actions/index";
import { useDrop, useDrag } from "react-dnd-latest";
import clearImage from "../../../../Assets/flowchart/clearProgram _inA.png";
import alignImage from "../../../../Assets/flowchart/button 52x52 - stroke.png";

let modal;
const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

let id = parseInt(sessionStorage.getItem("flowchart-elements-id")) || 6;

const getId = () => `${id++}`;

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
  if (type == "end" || type == "end1") {
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
  if (type == "end" || type == "endl") {
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
];

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

sessionStorage.setItem("planeOffset", null);

const DnDFlow = (props) => {
  const history = useHistory();
  const [reactFlowInstance, setReactFlowInstance] = useState();

  const [passEnd, setPassEnd] = useState();
  const [showPopup, setShowPopUp] = useState(false);
  const [data, setData] = useLocalStorage("element_data");
  const [elements, setElements] = useState(prevElement);
  const [endIf_loop, setendIf_loop] = useState(false);

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

  useLayoutEffect(() => {
    return () => {
      prevElement = elements;
    };
  });
  useEffect(() => {
    if (endIf_loop == true) {
      console.log("gsk end repeat enter@@", elements);
      setElements((els) =>
        els.map((el) => {
          if (el.id === `${elements[Object.keys(elements).length - 2].id}`) {
            console.log("gsk end repeat enter@@@@@@@@@@@@@@@@");
            // it's important that you create a new object here
            // in order to notify react flow about the change
            console.log("@@done");
            el.data.specificElType = "end1";

            el.data.label = text(`end`, params.target);
          }

          return el;
        })
      );
      setendIf_loop(false);
    }

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
    if (params.sourceHandle == undefined) params.sourceHandle = "d";

    if (top === undefined && down === undefined) {
      await elements.map((e) => {
        if (e.id === params.source) top = e;
        if (e.id === params.target) down = e;
      });
    }

    var index1 = await elements.findIndex(
      (e) =>
        e.source === params.source && e.sourceHandle === params.sourceHandle
    );
    var index2 = await elements.findIndex(
      (e) =>
        e.target === params.target && e.targetHandle === params.targetHandle
    );

    if (index1 == -1 && index2 == -1 && params.target != params.source) {
      if (await connectMinning(down, top)) return;
      await setElements((elements) => addEdge(params, elements));

      let rev = await nodeGetReverse(
        [elements[0]],
        elements.filter((e) => e.id === params.source)[0]
      );

      let revValue = await elements.filter((e) => e.id === params.target)[0];
      if (
        params.sourceHandle == "rYes" ||
        params.sourceHandle == "rNo" ||
        params.sourceHandle == "r"
      )
        rev = "false";

      if (
        rev == "false" &&
        revValue == undefined &&
        down.data.specificElType == "end/repeat"
      ) {
        setendIf_loop(true);

        setTimeout(() => {
          console.log("gsk end repeat enter", rev, down, elements);
        }, 1000);
      } else if (
        rev == "false" &&
        revValue.data.specificElType == "end/repeat"
      ) {
        await setElements((els) =>
          els.map((el) => {
            if (el.id === `${params.target}`) {
              el.data.specificElType = "end1";

              el.data.label = text(`end`, params.target);
            }
            return el;
          })
        );
      }
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
  };

  // shashank onDrop
  const onDrop = async (event) => {
    // console.log("event", event);
    try {
      event.preventDefault();

      if (reactFlowInstance) {
        const type = event.dataTransfer.getData("application/reactflow");
        console.log("Type@@@@@@@@@@@@@@@@@@@@@@@@@@@", typeof type);
        if (type == null || type == "") return;
        const position = reactFlowInstance.project({
          x: event.clientX - 230,
          y: event.clientY - 110,
        });

        var nodeType;
        if (type == "start") nodeType = "input";
        else if (type == "end/repeat") nodeType = "output";
        else nodeType = "output";

        let newNode;
        if (type == "if" || type == "loop") {
          newNode = await {
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
          newNode = await {
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

        const connect_line = JSON.parse(
          sessionStorage.getItem("application/reactflow/connect")
        );
        if (connect_line.index != -1) {
          let connect = {
            source: elements[parseInt(connect_line.index)].id,
            sourceHandle: connect_line.sourceHandle,
            target: `${newNode.id}`,
            targetHandle: null,
          };
          console.log("planegsk", connect_line, newNode.id, connect);
          await onConnect(
            connect,
            elements[parseInt(connect_line.index)],
            newNode
          );
        }
        console.log("node:===>postion===>", newNode.position);
      }
    } catch (e) {}
  };

  //shashank onDrag
  const onNodeDrag = async (event, node) => {
    event.preventDefault();

    if (event.clientX <= 30) {
      var index = await elements.findIndex(
        (e) => e.id === node.id && e.id !== "0"
      );

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

    let sourceHandle = "d";

    for (let i = 0; i < Object.keys(elements).length; i++) {
      if (elements[i] != null && elements[i] != undefined) {
        if (elements[i].data != null && elements[i].data != undefined) {
          if (
            node.position.x <= elements[i].position.x + 60 &&
            node.position.y <= elements[i].position.y + 40 &&
            node.position.x >= elements[i].position.x - 60 &&
            node.position.y >= elements[i].position.y - 40 &&
            node.id != elements[i].id
          ) {
            if (
              elements[i].id == "1" ||
              elements[i].id == "2" ||
              elements[i].id == "3" ||
              elements[i].id == "4" ||
              elements[i].id == "5"
            )
              break;
            //founded target node at index i
            //addEdge to target node by checking x and y positions
            let sourceHandle;

            if (elements[i].data.specificElType == "loop") {
              if (
                node.position.x - elements[i].position.x <= 57 + 5 &&
                node.position.x - elements[i].position.x >= 57 - 5
              ) {
                sourceHandle = await "r";
              } else if (
                node.position.x - elements[i].position.x <= 5 &&
                node.position.x - elements[i].position.x >= -5
              ) {
                sourceHandle = await "d";
              }
              console.log("KHBIBHIKBIKBIK", sourceHandle);
            }
            if (elements[i].data.specificElType == "if") {
              if (
                node.position.x - elements[i].position.x <= 5 &&
                node.position.x - elements[i].position.x >= -5
              )
                sourceHandle = "d";
              if (
                node.position.x - elements[i].position.x <= 56 + 5 &&
                node.position.x - elements[i].position.x >= 56 - 5 &&
                node.position.y - elements[i].position.y <= 11 + 5 &&
                node.position.y - elements[i].position.y >= 11 - 5
              ) {
                sourceHandle = "rYes";
              } else if (
                node.position.x - elements[i].position.x <= 57 + 5 &&
                node.position.x - elements[i].position.x >= 57 - 5 &&
                node.position.y - elements[i].position.y <= 31 + 5 &&
                node.position.y - elements[i].position.y >= 31 - 5
              ) {
                sourceHandle = "rNo";
              }
            }
            /*     console.log("source : " + elements[i].id);
              console.log("target : " + `${node.id}`); */
            let connect = {
              source: elements[i].id,
              sourceHandle: await sourceHandle,
              target: `${node.id}`,
              targetHandle: null,
            };

            if (
              sourceHandle !== undefined ||
              elements[i].data.specificElType == "start" ||
              elements[i].data.specificElType == "output" ||
              elements[i].data.specificElType == "wait" ||
              elements[i].data.specificElType == "end/repeat"
            ) {
              await onConnect(connect, elements[i], node);
            }

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

  let modalType;

  const onElementClick = async (event, element) => {
    if (element.id.search("react") != -1) {
      toDeleteEdge = element.id;

      console.log("to delete edge", toDeleteEdge);
      return;
    }
    modalType = element.data.specificElType;
    modal = element.id;
    console.log("element clicked", element);
    if (element.data) {
      selectedNode = element.id;
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
  const nodeGet = async (n, a) => {
    console.log("nodedebug   else  ", n[0], n);
    if (Object.keys(n).length === 0) return;
    let element = await elements.filter(
      (e) => e.targetHandle === undefined || e.sourceHandle === "d"
    );

    a.push(n[0]);

    n = await getOutgoers(n[0], element);

    await nodeGet(n, a);
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
      }
    }
  };
  const subprogramRecursive = async (aNode) => {
    for (let i in aNode) {
      if (
        aNode[i].data.specificElType == "if" ||
        aNode[i].data.specificElType == "loop" ||
        aNode[i].data.specificElType == "ifNo"
      ) {
        aNode[i].subprogram = [];

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
    }
  };

  const [uploadOpen, setuploadOpen] = useState(false);
  const sendBytes = async () => {
    //aNode global changed
    let aNode = [],
      aNode1 = [],
      y = [],
      testSingleD = [];

    y = getOutgoers(elements[0], elements);

    await nodeGet(y, aNode);
    await nodeAddIfNo(aNode);

    await subprogramRecursive(aNode);

    testSingleD = aNode;

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
    try {
      if (testSingleD[testSingleD.length - 1].data.specificElType === "end") {
        params.logic.end.state = "end";
      }

      Object.assign(params.logic, { program: programSend });

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

      getBytes({ code: params });
      let bytes = sessionStorage.getItem("convert_Bytes");
      var data = bytes.split(",");

      await writePort(data);
      setuploadOpen(true);
      setTimeout(() => {
        setuploadOpen(false);
      }, 3500);
      //socket.emit("/getSimulateBytes", { code: params });
    } catch (e) {}
  };

  const writePort = async (data) => {
    try {
      const filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }];
      const ports = await navigator.serial.getPorts({ filters });
      console.log("DATAAAS", data);
      const writer = ports[0].writable.getWriter();

      const sata = data;
      const data1 = new Uint8Array(sata); // hello// 82, 76, 0, 0, 0, 82, 0, 0, 0, 66, 0, 0, 1, 0, 1,

      await writer.write(data1);

      writer.releaseLock();
    } catch (e) {}
  };
  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      click(260, 200);
    }, 0);
  };
  let nodeX = 100;
  let nodeY = 100;
  const handleShow = () => setShow(true);

  const align = async () => {
    sessionStorage.setItem("planeOffset", null);
    let a = [];

    await nodeGet([elements[0]], a);
    await nodeAddIfNo(a);
    await subprogramRecursive(a);

    await posAlignOld(a, nodeX, nodeY);

    largX = a[0].position.x;
    await alignOffset(a);
    await alignOffsetMoving();

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
        else {
          try {
            n = await posAlignOld(
              a[i].subprogram,
              nodeX + 200,
              a[i - 1].subprogram[a[i - 1].subprogram.length - 1].position.y
            );
          } catch (e) {
            console.log(e);
            n = await posAlignOld(a[i].subprogram, nodeX + 200, nodeY + 50);
          }
        }

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

  const clear = async () => {
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

  const backBtnAction = () => {
    history.push("/flow/digital-analog");
  };

  const [p1, setP1] = useState({
    selected: false,
    port: {},
  });
  const [isUsb, setUsb] = useState(false);
  const HdleUsb = async (e) => {
    const filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }];
    const port = await navigator.serial.requestPort({ filters });
    if (port.onconnect == null) {
      setUsb(true);
    }
  };
  useEffect(() => {
    let no_port = props.webSerial;
    if (typeof no_port !== undefined) {
      console.log("WORKING>>>>>>>>");
      OpenReadComPort();
    }
    let data = JSON.parse(sessionStorage.getItem("user"));

    if (data === 1) {
      setUsb(true);
    }
    if (data === 0) {
      setUsb(false);
    }
  });
  useEffect(async () => {
    navigator.serial.addEventListener("connect", (e) => {
      setUsb(true);
      var user = 1;
      sessionStorage.setItem("user", JSON.stringify(user));
    });

    navigator.serial.addEventListener("disconnect", (e) => {
      setUsb(false);
      var user = 0;
      sessionStorage.setItem("user", JSON.stringify(user));
    });

    try {
      const portList = await navigator.serial.getPorts();

      if (portList.length === 1) {
        console.log(portList, "Hardware connected");

        await props.webSerialAction({ port: portList[0] }); // dispatching function of redux

        setP1({
          selected: true,
          port: portList[0],
        });
      } else {
        console.log("No hardware");

        setP1({ p1 });
      }
    } catch (err) {
      console.log(err.message);
    }
  });
  //End

  const OpenReadComPort = async () => {
    const p_Port = props.webSerial;

    console.log(props, "p_Port");

    try {
      console.log("OPENED");
      await p_Port.open({ baudRate: 120000 });
    } catch (e) {
      console.log(e);
      // p_Port.close();
      // await p_Port.open({ baudRate: 120000 });
    }

    writePort("notWrite");
    console.log(p_Port, "p_Port");
  };

  const onMove = async (event, viewport) => {
    sessionStorage.setItem("planeOffset", JSON.stringify(event));
  };

  const [{}, drop] = useDrop(
    () => ({
      accept: "yellow",
      drop(_item, monitor) {
        console.log("GSKDND", monitor.isDragging);
        onDrop(monitor.getItemType());
        return undefined;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggingColor: monitor.getItemType(),
      }),
    }),
    [onDrop]
  );
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
                src={alignImage}
                onClick={align}
              ></img>
              <img
                className="flowchart-iconBtnSize iconBtnSize"
                style={{ width: "61px", height: "61px", marginRight: "10px" }}
                src={clearImage}
                onClick={clear}
              ></img>
              <img
                className="flowchart-iconBtnSize iconBtnSize"
                style={{ width: "61px", height: "61px", marginRight: "10px" }}
                src={secondaryImg}
              ></img>
              {isUsb ? (
                <img src={renderPrgImage("usbON")} onClick={HdleUsb} />
              ) : (
                <img src={renderPrgImage("usbOFF")} onClick={HdleUsb} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="dndflow">
        <ReactFlowProvider>
          <Sidebar />
          <CustomDragLayer />
          <div className="reactflow-wrapper">
            <ReactFlow
              elements={elements}
              onConnect={onConnect}
              onElementsRemove={onElementsRemove}
              onLoad={onLoad}
              onDrop={onDrop}
              onDoubleClick={onDoubleClick}
              onElementClick={onElementClick}
              onDragOver={onDragOver}
              zoomOnDoubleClick={false}
              onNodeDrag={onNodeDrag}
              onNodeDragStop={onNodeDragStop}
              onNodeMouseLeave={onNodeMouseLeave}
              onNodeMouseEnter={onNodeMouseEnter}
              onMove={onMove}
              className="react-flow-screen"
              style={{ height: "88.3vh", width: "inherit" }}
              id="reactFlow"
              ref={drop}
            >
              <canvas
                id="myCanvas"
                width="1775"
                height="884"
                class="react-flow__edges"
              ></canvas>
            </ReactFlow>
            {showPopup ? <Popup /> : null}
          </div>
        </ReactFlowProvider>

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
        <Modal
          show={uploadOpen}
          style={{
            top: "30vh",
            left: "40vw",
            width: "62vw",
            height: "89vh",
          }}
        >
          <Modal.Body>
            <h3>Uploading</h3>

            <div class="spinner-grow text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <> </>
            <div class="spinner-grow text-warning" role="status">
              <span class="sr-only">Loading...</span> <> </>
            </div>
            <> </>
            <div class="spinner-grow text-danger" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <> </>
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div className="SelectScreenBottom">
        <div className="bottom-child">
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

// export default DnDFlow;

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);

  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    webSerialAction: (data) => {
      console.log("mapDispatchToProps", data);
      dispatch(webSerialAction(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DnDFlow);
