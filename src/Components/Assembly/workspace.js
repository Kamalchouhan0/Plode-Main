/**
 * @typedef WorkspaceComponentsData
 * @type object
 * @property {number} top   The top offset
 * @property {number} left   The left offset
 * @property {string} connectedTo   The port to which it is connected. It does not exist if not connected to any port
 */

/**
 * It has keys as component types for eg led
 * @example
 * {
 * 	 "led": [{top: 20, left: 80, connectedTo: 'A1'}, ...], ...
 * }
 * @typedef WorkspaceComponents
 * @type object
 * @property {WorkspaceComponentsData[]} ComponentType An array describing components of "ComponentType"
 */

/**
 * Describes a component in workspace. The last 3 properties may or may not be present.
 * (Different from {@link WorkspaceComponents})
 * @typedef AssemblyComponent
 * @type object
 * @property {string} type Type of the component
 * @property {?number} index Index of component in {@link WorkspaceComponents} if old component
 * @property {?number} left The left offset
 * @property {?number} top  The top offset
 * @property {?string} connectedTo Port connected to
 */

/**
 * This module is the workspace component of assembly tab and contains many functions for manipulation of the workspace object
 * This is a drop target.
 * @module components/assembly/Workspace
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";

import ItemTypes from "./ItemTypes";
import Modal from "react-modal";

import { DropTarget } from "react-dnd-old";
import DraggingInfo from "./DraggingInfo";

// var cumulativeOffset  from './src/helpers/cumulativeOffset');

import Bibox from "./Bibox";
import Component1 from "./Component";
import renderPrgImage from "../../source/programImg";

var tutorialDesc = "";
//Custom Styles

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    height: "28%",
    width: " 30%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#9ecee8",
    zIndex: 1,
  },
};
var count = 0;

const workspaceTarget = {
  drop(props, monitor, component) {
    const { offset, scale } = props.workspace;
    const { width, height } = props;

    DraggingInfo.isDragging = false;
    const type = monitor.getItemType();
    const item = monitor.getItem();
    var currentOffset;
    if (
      monitor.getItemType() === ItemTypes.COMPONENT &&
      !DraggingInfo.draggingComponentOld
    ) {
      currentOffset = monitor.getClientOffset();
    } else currentOffset = monitor.getClientOffset();
    currentOffset.x -= document.body.clientWidth - width;
    currentOffset.y -= document.body.clientHeight - height;
    currentOffset.x = currentOffset.x / scale - offset.left;
    currentOffset.y = currentOffset.y / scale - offset.top;
    if (type === ItemTypes.COMPONENT && !DraggingInfo.draggingComponentOld) {
      if (document.getElementById("play_shield")) {
        //console.log("playsheild exists");
        return null;
      }
      component.newComponent(item.type, currentOffset.x, currentOffset.y);
    } else {
      if (type === ItemTypes.BIBOX)
        component.moveBibox(currentOffset.x, currentOffset.y);
      else component.updateOldComponent(currentOffset.x, currentOffset.y);
    }
    if (item.type == "play_shield") {
      window.location.reload(false); ///cheat to force react to re render
    }
  },
};

let componentsDataSensor = JSON.parse(
  sessionStorage.getItem("concept")
).counter;

// var Workspace = React.createClass({
class Workspace extends Component {
  constructor(props) {
    super(props);

    var tutorialPortArray = [];
    var selectionType = localStorage.getItem("programMode");

    if (selectionType == "learn") {
      tutorialDesc = JSON.parse(sessionStorage.getItem("tutorialPort"));
      // tutorialPortArray.push(JSON.parse(tutorialDesc).assembly1)
      // tutorialPortArray.push(JSON.parse(tutorialDesc).assembly2)
    }

    this.state = {
      tutorialDesc: tutorialDesc,
      usbOpen: false,
      detected: false,
      internalAccessoriesData: JSON.parse(sessionStorage.getItem("concept"))
        .internalaccessories,
    };
  }

  componentDidMount = () => {
    const { height, width } = this.props;
    this.removeConnection = this.removeConnection.bind(this);
    let componentsDataSensor = JSON.parse(
      sessionStorage.getItem("concept")
    ).counter;
    // Move Bibox to center
    // this.moveBibox(340, 90);

    // Update the PortConnections module
    var { PortConnections } = this.props.appState.assembly;

    console.log("workspaceprops", this.props.appState.assembly);

    console.log(
      "workspace selectedcomponent from sidebar",
      JSON.parse(sessionStorage.getItem("SelectedComp"))
    );
    var { components, scale, offset } = this.props.workspace;

    //removing conncetions from removed components in sidebar --Gautam

    var selectedComponents = JSON.parse(sessionStorage.getItem("SelectedComp"));
    console.log("WorkspaceComponents from history", components);
    var arr1 = [],
      arr2 = [];

    for (var k in components) {
      arr1.push(k);
    }
    try {
      for (var k = 0; k < selectedComponents.length; k++) {
        arr2.push(selectedComponents[k].type);
      }
    } catch (e) {}
    console.log("WorkspaceComponents in deleteion", components[arr1[i]]);
    console.log("workspace arrs", arr1, arr2);
    for (var i = 0; i < arr1.length; i++) {
      if (arr2.includes(arr1[i])) {
        console.log("WorkspaceComponents present:", arr1[i]);
      } else {
        delete components[arr1[i]];
      }
    }

    // for (var i = 0; i < arr1.length; i++) {
    //   //console.log("workspacediffffff", difference[i]);
    //   if (arr1[i] != null || undefined) {
    //     console.log("workspace", components[arr1[i]]);
    //     delete components[arr1[i]];
    //   }
    // }
    if (components != null || undefined) {
      var { workspace } = this.props;
      workspace.components = components;
      this.props.update(workspace);
    }

    var { PortConnections } = this.props.appState.assembly;
    Object.keys(PortConnections).map((port) => (PortConnections[port] = null));

    Object.keys(components).map((type) => {
      let SensorObj = componentsDataSensor.find((o) => o.type === type);

      components[type].map((component, index) => {
        if (component.connectedTo) {
          console.log("component.connectedTo 1", component.connectedTo, type);
          if (type == "led") {
            switch (component.connectedTo) {
              case "A": {
                PortConnections["A"] = { type, index };
                PortConnections["A1"] = { type, index };
                PortConnections["A2"] = { type, index };
                break;
              }
              case "B": {
                PortConnections["B"] = { type, index };
                PortConnections["B1"] = { type, index };
                PortConnections["B2"] = { type, index };
                break;
              }
              case "C": {
                PortConnections["C"] = { type, index };
                PortConnections["C1"] = { type, index };
                PortConnections["C2"] = { type, index };
                break;
              }
              case "D": {
                PortConnections["D"] = { type, index };
                PortConnections["D1"] = { type, index };
                PortConnections["D2"] = { type, index };
                break;
              }
            }
          } else {
            PortConnections[component.connectedTo] = { type, index };
          }
        }
      });
    });
    this.props.updatePort(PortConnections);
  };

  /**
   * Move the bibox to a new position
   * @param  {number} left The new left
   * @param  {number} top  The new top
   */
  moveBibox(left, top) {
    var { workspace } = this.props;
    workspace.bibox.left = left;
    workspace.bibox.top = top;
    this.props.update(workspace);
  }
  /**
   * Update the position of an old component
   * @param  {number} left The new left
   * @param  {number} top  The new top
   */
  updateOldComponent(left, top) {
    let componentsDataSensor = JSON.parse(
      sessionStorage.getItem("concept")
    ).counter;
    var { workspace } = this.props;
    var item = DraggingInfo.draggingComponentOld;
    workspace.components[item.type][item.index].top = top;
    workspace.components[item.type][item.index].left = left;
    if (DraggingInfo.newComponentPort != undefined) {
      workspace.components[item.type][item.index].connectedTo =
        DraggingInfo.newComponentPort;
    }
    this.props.update(workspace);

    var { components, scale, offset } = this.props.workspace;
    var { PortConnections } = this.props.appState.assembly;
    Object.keys(PortConnections).map((port) => (PortConnections[port] = null));
    Object.keys(components).map((type) => {
      components[type].map((component, index) => {
        let SensorObj = componentsDataSensor.find((o) => o.type === type);
        console.log(SensorObj);
        if (type == "led") {
          if (component.connectedTo) {
            if (
              component.connectedTo == "A" ||
              component.connectedTo == "B" ||
              component.connectedTo == "C" ||
              component.connectedTo == "D"
            ) {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}1`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}2`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "tact_switch_2c") {
          if (component.connectedTo) {
            if (
              component.connectedTo == "A" ||
              component.connectedTo == "B" ||
              component.connectedTo == "C"
            ) {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}1`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}2`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "dual_switch") {
          if (component.connectedTo) {
            if (
              component.connectedTo == "A" ||
              component.connectedTo == "B" ||
              component.connectedTo == "C"
            ) {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}1`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}2`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "joystick") {
          if (component.connectedTo) {
            if (
              component.connectedTo == "A" ||
              component.connectedTo == "B" ||
              component.connectedTo == "C"
            ) {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}1`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}2`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "ultrasonic_sensor") {
          if (component.connectedTo) {
            if (component.connectedTo == "A" || component.connectedTo == "C") {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}1`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "rotatory") {
          if (component.connectedTo) {
            PortConnections[component.connectedTo] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
            PortConnections[`${component.connectedTo}1`] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
          }
        } else if (type == "RGB") {
          if (component.connectedTo) {
            PortConnections[component.connectedTo] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
            PortConnections[`${component.connectedTo}1`] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
          }
        } else if (type == "mp3") {
          if (component.connectedTo) {
            PortConnections[component.connectedTo] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
            PortConnections[`${component.connectedTo}1`] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
          }
        } else if (type == "OLED") {
          if (component.connectedTo) {
            PortConnections["OLEDOne"] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
            PortConnections["OLEDTwo"] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
            PortConnections["OLEDThree"] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
          }
        } else if (component.connectedTo) {
          if (
            type != "servo_motor" ||
            type != "servo_motor_360" ||
            type != "dc_motor" ||
            type != "mini_geared_motor"
          ) {
            console.log("component.connectedTo 1", component.connectedTo);
            PortConnections[component.connectedTo] = { type, index };
          }
        }
      });
    });
    this.props.updatePort(PortConnections);
  }
  /**
   * Add a new component to workspace. Also if DraggingInfo.newComponentPort is
   * defined connect the new component to that port.
   * @param  {string} type The type of the component
   * @param  {number} left The left offset
   * @param  {number} top  The top offset
   */
  newComponent(type, left, top) {
    console.log("new dataa", type);
    let componentsDataSensor = JSON.parse(
      sessionStorage.getItem("concept")
    ).counter;
    var { workspace } = this.props;
    if (!workspace.components[type]) workspace.components[type] = [];
    var component = { left: left, top: top }; //IMP

    if (DraggingInfo.newComponentPort) {
      component.connectedTo = DraggingInfo.newComponentPort;
      DraggingInfo.newComponentPort = null;
    }
    workspace.components[type].push(component); //IMP
    // REDUX
    this.props.update(workspace);

    var { components, scale, offset } = this.props.workspace;
    console.log("new dataa", components);
    var { PortConnections } = this.props.appState.assembly;
    Object.keys(PortConnections).map((port) => (PortConnections[port] = null));
    Object.keys(components).map((type) => {
      components[type].map((component, index) => {
        let SensorObj = componentsDataSensor.find((o) => o.type === type);
        console.log(SensorObj, componentsDataSensor);
        if (type == "led") {
          if (component.connectedTo) {
            if (
              component.connectedTo == "A" ||
              component.connectedTo == "B" ||
              component.connectedTo == "C" ||
              component.connectedTo == "D"
            ) {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}1`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}2`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "tact_switch_2c") {
          if (component.connectedTo) {
            if (
              component.connectedTo == "A" ||
              component.connectedTo == "B" ||
              component.connectedTo == "C"
            ) {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}1`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}2`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "tact_switch") {
          if (component.connectedTo) {
            if (
              component.connectedTo == "A" ||
              component.connectedTo == "B" ||
              component.connectedTo == "C"
            ) {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}1`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "touch_sensor") {
          if (component.connectedTo) {
            if (
              component.connectedTo == "A" ||
              component.connectedTo == "B" ||
              component.connectedTo == "C"
            ) {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}1`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "light_sensor") {
          if (component.connectedTo) {
            if (
              component.connectedTo == "A" ||
              component.connectedTo == "B" ||
              component.connectedTo == "C"
            ) {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}1`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "distance_sensor") {
          if (component.connectedTo) {
            if (
              component.connectedTo == "A" ||
              component.connectedTo == "B" ||
              component.connectedTo == "C"
            ) {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}1`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "dual_switch") {
          if (component.connectedTo) {
            if (
              component.connectedTo == "A" ||
              component.connectedTo == "B" ||
              component.connectedTo == "C"
            ) {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}1`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}2`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "joystick") {
          if (component.connectedTo) {
            if (
              component.connectedTo == "A" ||
              component.connectedTo == "B" ||
              component.connectedTo == "C"
            ) {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}1`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}2`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "ultrasonic_sensor") {
          if (component.connectedTo) {
            if (component.connectedTo == "A" || component.connectedTo == "C") {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections[`${component.connectedTo}1`] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "rotatory") {
          if (component.connectedTo) {
            PortConnections[component.connectedTo] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
            PortConnections[`${component.connectedTo}1`] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
          }
        } else if (type == "RGB") {
          if (component.connectedTo) {
            PortConnections[component.connectedTo] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
            PortConnections[`${component.connectedTo}1`] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
          }
        } else if (type == "mp3") {
          if (component.connectedTo) {
            PortConnections[component.connectedTo] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
            PortConnections[`${component.connectedTo}1`] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
          }
        } else if (type == "OLED") {
          if (component.connectedTo) {
            PortConnections["OLEDOne"] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
            PortConnections["OLEDTwo"] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
            PortConnections["OLEDThree"] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
          }
        } else if (component.connectedTo) {
          if (
            type != "servo_motor" ||
            type != "servo_motor_360" ||
            type != "dc_motor" ||
            type != "mini_geared_motor"
          ) {
            console.log("component.connectedTo 1", component.connectedTo);
            PortConnections[component.connectedTo] = { type, index };
          }
        }
      });
    });

    this.props.updatePort(PortConnections);
    console.log("========>props", this.props);
  }
  /**
   * Connect a old component to a port in workspace (on drop)
   * @param  {AssemblyComponent} item
   * @param  {string} port The port
   */
  workspaceConnect(item, port) {
    var { workspace } = this.props;
    workspace.components[item.type][item.index].connectedTo = port;
    this.props.update(workspace);
  }
  /**
   * Remove connection of old component
   * @param  {AssemblyComponent} item
   */
  removeConnection(item) {
    var { workspace } = this.props;
    if (workspace.components[item.type][item.index].connectedTo) {
      var obj = workspace.components[item.type][item.index];
      delete obj.connectedTo;
    }
    this.props.update(workspace);
    let componentsDataSensor = JSON.parse(
      sessionStorage.getItem("concept")
    ).counter;
    var { components, scale, offset } = this.props.workspace;
    var { PortConnections } = this.props.appState.assembly;
    Object.keys(PortConnections).map((port) => (PortConnections[port] = null));
    Object.keys(components).map((type) => {
      let SensorObj = componentsDataSensor.find((o) => o.type === type);

      components[type].map((component, index) => {
        if (type == "pc_motor_driver") {
          if (component.connectedTo) {
            if (component.connectedTo == "A" || component.connectedTo == "C") {
              PortConnections["A"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections["C"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
            if (component.connectedTo == "B" || component.connectedTo == "D") {
              PortConnections["B"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections["D"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "stepper_motor") {
          if (component.connectedTo) {
            if (
              JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                .B !== null
            ) {
              if (
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B
                  .type == "pc_motor_driver"
              ) {
                if (
                  components["pc_motor_driver"][0].connectedTo == "B" ||
                  components["pc_motor_driver"][0].connectedTo == "D"
                ) {
                  PortConnections["B1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["B2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["D1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["D2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                }
              }
            }

            if (
              JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                .A !== null
            ) {
              if (
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A
                  .type == "pc_motor_driver"
              ) {
                if (
                  components["pc_motor_driver"][0].connectedTo == "A" ||
                  components["pc_motor_driver"][0].connectedTo == "C"
                ) {
                  PortConnections["A1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["A2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["C1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["C2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                }
              }
            }
          }
        } else if (component.connectedTo) {
          if (
            type != "ultrasonic_sensor" &&
            type != "servo_motor" &&
            type != "servo_motor_360"
          ) {
            if (component.connectedTo) {
              if (
                component.connectedTo == "A" ||
                component.connectedTo == "B" ||
                component.connectedTo == "C" ||
                component.connectedTo == "D"
              ) {
                PortConnections[component.connectedTo] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
                PortConnections[`${component.connectedTo}1`] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
                PortConnections[`${component.connectedTo}2`] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
              } else {
                PortConnections[component.connectedTo] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
              }
            }
          } else {
            PortConnections[component.connectedTo] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
          }
        }
      });
    });
    this.props.updatePort(PortConnections);
  }

  closeUsb = () => {
    var c = document.getElementById("assemblyConnections");
    var d = document.getElementById("biboxClass");
    var e = document.getElementById("connectPort");

    c.style.zIndex = 2;
    d.style.zIndex = 2;
    e.style.zIndex = 2;
    this.setState({ usbOpen: false });
  };
  render() {
    var count = 0;
    if (this.state.detected == true) {
      var imageURL = "images/Learn/ble_connection.png";
    } else {
      imageURL = "images/Learn/ble_disconnection.png";
    }
    var usbDetectionModel = (
      <Modal isOpen={this.state.usbOpen} style={customStyles}>
        <img
          onClick={this.closeUsb}
          className="closeconceptModal"
          src={renderPrgImage("close")}
        ></img>
        <div className="connectconceptMsg">
          <p>Device not connected..</p>
          <button>
            {" "}
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/biboxSelection"
            >
              Reconnect
            </Link>
          </button>
        </div>
      </Modal>
    );
    const { connectDropTarget, removeFromWorkspace } = this.props;
    const { bibox, components, offset, scale } = this.props.workspace;
    var { PortConnections } = this.props.appState.assembly;

    return connectDropTarget(
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* SHOWS DEVICE IMG ACE, HUMANOID, TEARN */}
        <Bibox
          left={(bibox.left + offset.left) * scale}
          top={(bibox.top + offset.top) * scale}
          scale={scale}
          workspaceConnect={this.workspaceConnect}
          responceTp0={this.props.responceTp0}
          responceTp1={this.props.responceTp1}
          responceTp2={this.props.responceTp2}
          mic={this.props.mic}
          props={this.props}
          removeFromWorkspace={removeFromWorkspace}
          // Ports
          rangeA1={this.props.rangeA1}
          rangeA2={this.props.rangeA2}
          tactswitch={this.props.tactswitch}
          temp={this.props.temp}
          gas={this.props.gas}
          one={this.props.one}
          two={this.props.two}
        />

        {/* USB detection is remove and the Zindex is also change from componentDidmount */}
        {/* {usbDetectionModel} */}

        {Object.keys(components).map((key) => {
          return (
            <div key={key}>
              {components[key].map((component, index) => {
                const { left, top, connectedTo } = component;
                return (
                  <Component1
                    key={index}
                    type={key}
                    index={index}
                    prop={this.props.prop}
                    left={(offset.left + left) * scale}
                    top={(offset.top + top) * scale}
                    scale={scale}
                    connectedTo={connectedTo}
                    appState={this.props.appState}
                    removeFromWorkspace={removeFromWorkspace}
                    removeConnection={this.removeConnection}
                    touch_pad={this.props.touch_pad}
                    touch_pad2={this.props.touch_pad2}
                    rangeA1={this.props.rangeA1}
                    rangeA2={this.props.rangeA2}
                    tactswitch={this.props.tactswitch}
                    temp={this.props.temp}
                    gas={this.props.gas}
                    one={this.props.one}
                    two={this.props.two}
                  />
                );
              })}
            </div>
          );
        })}

        {localStorage.getItem("programMode") == "learn" ? (
          <div
            style={{
              height: "10%",
              width: "65%",
              border: "2px solid #bed5fa",
              backgroundColor: "white",
              borderRadius: "20px",
              bottom: "3%",
              left: "10%",
              position: "inherit",
            }}
          >
            <h3 style={{ marginLeft: "20px", marginTop: "2px" }}>
              {Object.entries(this.state.tutorialDesc).map(([key, value]) => {
                if (PortConnections[key]) {
                  if (PortConnections[key].type == value) {
                  }
                } else {
                  if (count == 0) {
                    count++;
                    this.props.nextVisbility("hidden");
                    return (
                      <div>
                        {" "}
                        Drag &amp; connect {value} to {key} port
                      </div>
                    );
                  }
                }
              })}
              {count == 0 ? (
                <p>
                  {this.props.nextVisbility("visible")}
                  <div>Click on next</div>
                </p>
              ) : (
                ""
              )}
            </h3>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    );
  }
}

export default DropTarget(
  [ItemTypes.BIBOX, ItemTypes.COMPONENT],
  workspaceTarget,
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(Workspace);
