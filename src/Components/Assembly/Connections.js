import React, { Component } from "react";

import Ports from "./PortData";
import ItemTypes from "./ItemTypes";
import ImageSizes from "./ImageSizes";
import PortTypes from "./PortTypes";

import AllowedPortTypes from "./AllowedPortTypes";

import DraggingInfo from "./DraggingInfo";

// var Device=JSON.stringify(sessionStorage.getItem("connectedDevice"));
var Device = sessionStorage.getItem("connectedDevice");

let internalAccessoriesData = JSON.parse(
  sessionStorage.getItem("concept")
).internalaccessories;

class Curve extends Component {
  render() {
    const { bibox, component, components, PortConnections } = this.props;
    const { connectedTo, left, top } = component;
    var Left, Top;
    var LeftF, TopF;
    var LeftO, TopO;
    var LeftB, TopB;
    var LeftC, TopC;
    var LeftCL, TopCL;
    var LeftBL, TopBL;
    var LeftG, TopG;
    var cx2, cy2;
    var LeftS, TopS;
    var LeftSS, TopSS;
    if (Device == "Ace") {
      // GearedMotor A1 C1  && B1 D1
      let A1connectedGeared_motor =
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A1 !==
        null
          ? JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A1
              .type == "geared_motor" ||
            JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A1
              .type == "mini_geared_motor" ||
            JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A1
              .type == "dc_motor"
            ? true
            : false
          : false;

      let C1connectedGeared_motor =
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C1 !==
        null
          ? JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C1
              .type == "geared_motor" ||
            JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C1
              .type == "mini_geared_motor" ||
            JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C1
              .type == "dc_motor"
            ? true
            : false
          : false;

      let B1connectedGeared_motor =
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B1 !==
        null
          ? JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B1
              .type == "geared_motor" ||
            JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B1
              .type == "mini_geared_motor" ||
            JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B1
              .type == "dc_motor"
            ? true
            : false
          : false;

      let D1connectedGeared_motor =
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D1 !==
        null
          ? JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D1
              .type == "geared_motor" ||
            JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D1
              .type == "mini_geared_motor" ||
            JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D1
              .type == "dc_motor"
            ? true
            : false
          : false;

      // SERVO MOTORS [A1,A2,C1,C2] [B1,B2,C1,C2]

      let A1connectedServoMotor =
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A1 !==
        null
          ? JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A1
              .type == "servo_motor"
            ? true
            : false
          : false;

      let A2connectedServoMotor =
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A2 !==
        null
          ? JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A2
              .type == "servo_motor"
            ? true
            : false
          : false;

      let C1connectedServoMotor =
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C1 !==
        null
          ? JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C1
              .type == "servo_motor"
            ? true
            : false
          : false;

      let C2connectedServoMotor =
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C2 !==
        null
          ? JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C2
              .type == "servo_motor"
            ? true
            : false
          : false;

      let D1connectedServoMotor =
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D1 !==
        null
          ? JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D1
              .type == "servo_motor"
            ? true
            : false
          : false;

      let D2connectedServoMotor =
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D2 !==
        null
          ? JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D2
              .type == "servo_motor"
            ? true
            : false
          : false;

      let B1connectedServoMotor =
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B1 !==
        null
          ? JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B1
              .type == "servo_motor"
            ? true
            : false
          : false;

      let B2connectedServoMotor =
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B2 !==
        null
          ? JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B2
              .type == "servo_motor"
            ? true
            : false
          : false;
      //*************************************************** */

      // S1  .
      console.log("connectedtoshield", connectedTo);
      if (connectedTo == "A1" || connectedTo == "A2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (
                this.props.componentName != "geared_motor" &&
                this.props.componentName != "mini_geared_motor" &&
                this.props.componentName != "dc_motor"
              ) {
                if (component.connectedTo == "A") {
                  LeftF = component.left;
                  TopF = component.top;
                }
                if (component.connectedTo == "A" && this.props.shield == true) {
                  if (connectedTo == "A1") {
                    LeftF = component.left - 87;
                    TopF = component.top - 252;
                  }
                  if (connectedTo == "A2") {
                    LeftF = component.left - 32;
                    TopF = component.top - 285;
                  }
                }
              } else {
                if (component.connectedTo == "A") {
                  LeftF = component.left + 28;
                  TopF = component.top + 6;
                }
              }
            });
          }
          if (dual_splitter == "play_shield") {
            components[dual_splitter].map((component, index) => {
              if (
                this.props.componentName != "geared_motor" &&
                this.props.componentName != "mini_geared_motor" &&
                this.props.componentName != "dc_motor" &&
                this.props.componentName != "servo_motor" &&
                this.props.componentName != "servo_motor_360"
              ) {
                if (PortConnections.A == null) {
                  if (connectedTo == "A1") {
                    LeftF = bibox.left;
                    TopF = bibox.top;
                  }
                  if (connectedTo == "A2") {
                    LeftF = bibox.left;
                    TopF = bibox.top;
                  }
                }
              }
            });
          }
          /** */
          if (dual_splitter == "pc_motor_driver") {
            let sdasa = sessionStorage.getItem("dragingItem");

            components[dual_splitter].map((component, index) => {
              if (
                component.connectedTo == "A" ||
                component.connectedTo == "C"
              ) {
                // not run initial  it will run after the
                if (
                  A1connectedServoMotor == true ||
                  A2connectedServoMotor == true
                ) {
                  if (connectedTo == "A2") {
                    LeftF = component.left - 70;
                    TopF = component.top;
                  } else {
                    LeftF = component.left - 30;
                    TopF = component.top;
                  }
                } else if (
                  sessionStorage.getItem("dragingItem") == "geared_motor" ||
                  sessionStorage.getItem("dragingItem") ==
                    "mini_geared_motor" ||
                  sessionStorage.getItem("dragingItem") == "dc_motor"
                ) {
                  LeftF = component.left - 70;
                  TopF = component.top + 30;
                } else if (
                  sessionStorage.getItem("dragingItem") == "servo_motor" &&
                  !A1connectedGeared_motor &&
                  !C1connectedGeared_motor
                ) {
                  // this is for when we drag servo_motor  changing the postion at drag time

                  if (connectedTo == "A2") {
                    LeftF = component.left - 70;
                    TopF = component.top;
                  } else {
                    LeftF = component.left - 30;
                    TopF = component.top;
                  }
                } else {
                  LeftF = component.left - 70;
                  TopF = component.top + 30;
                }
              }
            });
          }
          /** */
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left - 10 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 85) +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "D1" || connectedTo == "D2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (
                this.props.componentName != "geared_motor" &&
                this.props.componentName != "mini_geared_motor" &&
                this.props.componentName != "dc_motor"
              ) {
                if (component.connectedTo == "D") {
                  LeftF = component.left;
                  TopF = component.top;
                }
                if (component.connectedTo == "D" && this.props.shield == true) {
                  if (connectedTo == "D1") {
                    LeftF = component.left - 195;
                    TopF = component.top - 319;
                  }
                  if (connectedTo == "D2") {
                    LeftF = component.left - 175;
                    TopF = component.top - 315;
                  }
                }
              } else {
                if (component.connectedTo == "D") {
                  LeftF = component.left + 28;
                  TopF = component.top + 6;
                }
              }
            });
          }

          if (dual_splitter == "play_shield") {
            components[dual_splitter].map((component, index) => {
              if (
                this.props.componentName == "servo_motor" ||
                this.props.componentName == "servo_motor_360"
              ) {
                if (connectedTo == "D1" || connectedTo == "D2") {
                  LeftF = bibox.left;
                  TopF = bibox.top;
                }
              }
            });
          }

          if (dual_splitter == "pc_motor_driver") {
            components[dual_splitter].map((component, index) => {
              if (
                component.connectedTo == "B" ||
                component.connectedTo == "D"
              ) {
                if (
                  D1connectedServoMotor == true ||
                  D2connectedServoMotor == true
                ) {
                  if (connectedTo == "D2") {
                    LeftF = component.left + 20;
                    TopF = component.top;
                  } else {
                    LeftF = component.left + 60;
                    TopF = component.top;
                  }
                } else if (
                  sessionStorage.getItem("dragingItem") == "servo_motor" &&
                  !B1connectedGeared_motor &&
                  !D1connectedGeared_motor
                ) {
                  // this is for when we drag servo_motor  changing the postion at drag time
                  if (connectedTo == "D2") {
                    LeftF = component.left + 20;
                    TopF = component.top;
                  } else {
                    LeftF = component.left + 60;
                    TopF = component.top;
                  }
                } else {
                  LeftF = component.left + 125;
                  TopF = component.top + 30;
                }
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left - 10 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 85) +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "STPM") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "pc_motor_driver") {
            components[dual_splitter].map((component, index) => {
              if (
                component.connectedTo == "B" ||
                component.connectedTo == "D" ||
                component.connectedTo == "A" ||
                component.connectedTo == "C"
              ) {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left - 10 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 85) +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "C1" || connectedTo == "C2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (
                this.props.componentName != "geared_motor" &&
                this.props.componentName != "mini_geared_motor" &&
                this.props.componentName != "dc_motor"
              ) {
                if (component.connectedTo == "C") {
                  if (connectedTo == "C1") {
                    LeftF = component.left;
                    TopF = component.top;
                  }
                  if (connectedTo == "C2") {
                    LeftF = component.left;
                    TopF = component.top;
                  }
                }
                if (component.connectedTo == "C" && this.props.shield == true) {
                  if (connectedTo == "C1") {
                    LeftF = component.left - 125;
                    TopF = component.top - 320;
                  }
                  if (connectedTo == "C2") {
                    LeftF = component.left - 105;
                    TopF = component.top - 315;
                  }
                }
              } else {
                if (component.connectedTo == "C") {
                  LeftF = component.left + 28;
                  TopF = component.top + 6;
                }
              }
            });
          }
          if (dual_splitter == "play_shield") {
            components[dual_splitter].map((component, index) => {
              if (
                this.props.componentName == "servo_motor" ||
                this.props.componentName == "servo_motor_360"
              ) {
                if (connectedTo == "C1" || connectedTo == "C2") {
                  LeftF = bibox.left;
                  TopF = bibox.top;
                }
              }
            });
          }

          if (dual_splitter == "pc_motor_driver") {
            components[dual_splitter].map((component, index) => {
              if (
                component.connectedTo == "A" ||
                component.connectedTo == "C"
              ) {
                if (
                  C1connectedServoMotor == true ||
                  C2connectedServoMotor == true
                ) {
                  if (connectedTo == "C2") {
                    LeftF = component.left + 20;
                    TopF = component.top;
                  } else {
                    LeftF = component.left + 60;
                    TopF = component.top;
                  }
                } else if (
                  sessionStorage.getItem("dragingItem") == "servo_motor" &&
                  !A1connectedGeared_motor &&
                  !C1connectedGeared_motor
                ) {
                  // this is for when we drag servo_motor  changing the postion at drag time
                  if (connectedTo == "C2") {
                    LeftF = component.left + 20;
                    TopF = component.top;
                  } else {
                    LeftF = component.left + 60;
                    TopF = component.top;
                  }
                } else {
                  LeftF = component.left + 125;
                  TopF = component.top + 30;
                }
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left - 10 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 85) +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "B1" || connectedTo == "B2") {
        Object.keys(components).map((key) => {
          if (key == "dual_splitter") {
            // if(this.props.componentName = "")
            components[key].map((component, index) => {
              if (
                this.props.componentName != "geared_motor" &&
                this.props.componentName != "mini_geared_motor" &&
                this.props.componentName != "dc_motor"
              ) {
                if (component.connectedTo == "B") {
                  LeftF = component.left;
                  TopF = component.top;
                }
                if (component.connectedTo == "B" && this.props.shield == true) {
                  if (connectedTo == "B1") {
                    LeftF = component.left - 268;
                    TopF = component.top - 256;
                  }
                  if (connectedTo == "B2") {
                    LeftF = component.left - 212;
                    TopF = component.top - 287;
                  }
                }
              } else {
                if (component.connectedTo == "B") {
                  LeftF = component.left + 28;
                  TopF = component.top + 6;
                }
              }
            });
          }
          if (key == "play_shield") {
            components[key].map((component, index) => {
              if (
                this.props.componentName != "geared_motor" &&
                this.props.componentName != "mini_geared_motor" &&
                this.props.componentName != "dc_motor" &&
                this.props.componentName != "servo_motor" &&
                this.props.componentName != "servo_motor_360"
              ) {
                if (
                  JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                    .B == null
                ) {
                  if (connectedTo == "B1") {
                    LeftF = bibox.left;
                    TopF = bibox.top;
                  }

                  if (connectedTo == "B2") {
                    LeftF = bibox.left;
                    TopF = bibox.top;
                  }
                }
              }
            });
          }
          if (key == "servo_extender") {
            components[key].map((component, index) => {
              if (component.connectedTo == "B") {
                LeftF = component.left + 30;
                TopF = component.top + 5;
              }
            });
          }

          let adads = sessionStorage.getItem("dragingItem");

          if (key == "pc_motor_driver") {
            components[key].map((component, index) => {
              if (
                component.connectedTo == "B" ||
                component.connectedTo == "D"
              ) {
                // not run initial  it will run after the
                if (
                  B1connectedServoMotor == true ||
                  B2connectedServoMotor == true
                ) {
                  if (connectedTo == "B2") {
                    LeftF = component.left - 70;
                    TopF = component.top;
                  } else {
                    LeftF = component.left - 30;
                    TopF = component.top;
                  }
                } else if (
                  sessionStorage.getItem("dragingItem") == "geared_motor" ||
                  sessionStorage.getItem("dragingItem") ==
                    "mini_geared_motor" ||
                  sessionStorage.getItem("dragingItem") == "dc_motor"
                ) {
                  LeftF = component.left - 70;
                  TopF = component.top + 30;
                } else if (
                  sessionStorage.getItem("dragingItem") == "servo_motor" &&
                  !B1connectedGeared_motor &&
                  !D1connectedGeared_motor
                ) {
                  // this is for when we drag servo_motor  changing the postion at drag time

                  if (connectedTo == "B2") {
                    LeftF = component.left - 70;
                    TopF = component.top;
                  } else {
                    LeftF = component.left - 30;
                    TopF = component.top;
                  }
                } else {
                  LeftF = component.left - 70;
                  TopF = component.top + 30;
                }
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left - 10 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 85) +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "F1" || connectedTo == "F2") {
        Object.keys(components).map((key) => {
          if (key == "dual_splitter") {
            // if(this.props.componentName = "")
            components[key].map((component, index) => {
              if (
                this.props.componentName != "geared_motor" &&
                this.props.componentName != "mini_geared_motor" &&
                this.props.componentName != "dc_motor"
              ) {
                if (component.connectedTo == "F") {
                  LeftF = component.left;
                  TopF = component.top;
                }
                if (component.connectedTo == "F" && this.props.shield == true) {
                  if (connectedTo == "F1") {
                    LeftF = component.left + 5;
                    TopF = component.top - 74;
                  }
                  if (connectedTo == "F2") {
                    LeftF = component.left - 5;
                    TopF = component.top - 68;
                  }
                }
              } else {
                if (component.connectedTo == "F") {
                  LeftF = component.left + 28;
                  TopF = component.top + 6;
                }
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left - 10 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 85) +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "M1" || connectedTo == "M3") {
        Object.keys(components).map((key) => {
          if (key == "play_shield") {
            components[key].map((component, index) => {
              if (
                this.props.componentName == "geared_motor" ||
                this.props.componentName == "mini_geared_motor" ||
                this.props.componentName == "dc_motor"
              ) {
                if (connectedTo == "M1") {
                  LeftF = bibox.left;
                  TopF = bibox.top;
                }
                if (connectedTo == "M3") {
                  LeftF = bibox.left;
                  TopF = bibox.top;
                }
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left - 10 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 85) +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "I1" || connectedTo == "I2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (component.connectedTo == "I") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left - 10 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 85) +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "A") {
        Top = bibox.top;
        Left = bibox.left;

        cx2 = Left + Ports(connectedTo)[0];
        cy2 = Top + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.BIBOX][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.BIBOX][1] / 2;
        if (this.props.componentName == "pc_motor_driver") {
          if (connectedTo == "A" || connectedTo == "C") {
            return (
              <>
                <path
                  d={
                    "M " +
                    (left - 100 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top + 5) +
                    " C " +
                    (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                    " " +
                    cx2 +
                    "," +
                    cy2 +
                    " " +
                    (Left + Ports("A")[0]) +
                    "," +
                    (Top + Ports("A")[1])
                  }
                />
                <path
                  d={
                    "M " +
                    (left + 100 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top + 5) +
                    " C " +
                    (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                    " " +
                    cx2 +
                    "," +
                    cy2 +
                    " " +
                    (Left + Ports("C")[0]) +
                    "," +
                    (Top + Ports("C")[1])
                  }
                />
              </>
            );
          }

          if (connectedTo == "B" || connectedTo == "D") {
            return (
              <>
                <path
                  d={
                    "M " +
                    (left - 100 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top + 5) +
                    " C " +
                    (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                    " " +
                    cx2 +
                    "," +
                    cy2 +
                    " " +
                    (Left + Ports("B")[0]) +
                    "," +
                    (Top + Ports("B")[1])
                  }
                />
                <path
                  d={
                    "M " +
                    (left + 100 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top + 5) +
                    " C " +
                    (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                    " " +
                    cx2 +
                    "," +
                    cy2 +
                    " " +
                    (Left + Ports("D")[0]) +
                    "," +
                    (Top + Ports("D")[1])
                  }
                />
              </>
            );
          }
        } else if (this.props.componentName == "RGB") {
          return (
            <path
              d={
                "M " +
                (left - 15 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                "," +
                (top + 80) +
                " C " +
                (left - 120 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                "," +
                (top + 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                " " +
                cx2 +
                "," +
                cy2 +
                " " +
                (Left + Ports(connectedTo)[0]) +
                "," +
                (Top + Ports(connectedTo)[1])
              }
            />
          );
        } else {
          return (
            <path
              d={
                "M " +
                (left - 15 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                "," +
                (top + 80) +
                " C " +
                (left + 60 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                "," +
                (top + 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                " " +
                cx2 +
                "," +
                cy2 +
                " " +
                (Left + Ports(connectedTo)[0]) +
                "," +
                (Top + Ports(connectedTo)[1])
              }
            />
          );
        }
      } else if (connectedTo == "B") {
        Top = bibox.top;
        Left = bibox.left;
        cx2 = Left + Ports(connectedTo)[0];
        cy2 = Top + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.BIBOX][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.BIBOX][1] / 2;
        if (this.props.componentName == "pc_motor_driver") {
          if (connectedTo == "A" || connectedTo == "C") {
            return (
              <>
                <path
                  d={
                    "M " +
                    (left - 100 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top + 5) +
                    " C " +
                    (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                    " " +
                    cx2 +
                    "," +
                    cy2 +
                    " " +
                    (Left + Ports("A")[0]) +
                    "," +
                    (Top + Ports("A")[1])
                  }
                />
                <path
                  d={
                    "M " +
                    (left + 100 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top + 5) +
                    " C " +
                    (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                    " " +
                    cx2 +
                    "," +
                    cy2 +
                    " " +
                    (Left + Ports("C")[0]) +
                    "," +
                    (Top + Ports("C")[1])
                  }
                />
              </>
            );
          }

          if (connectedTo == "B" || connectedTo == "D") {
            return (
              <>
                <path
                  d={
                    "M " +
                    (left - 100 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top + 5) +
                    " C " +
                    (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                    " " +
                    cx2 +
                    "," +
                    cy2 +
                    " " +
                    (Left + Ports("B")[0]) +
                    "," +
                    (Top + Ports("B")[1])
                  }
                />
                <path
                  d={
                    "M " +
                    (left + 100 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top + 5) +
                    " C " +
                    (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                    " " +
                    cx2 +
                    "," +
                    cy2 +
                    " " +
                    (Left + Ports("D")[0]) +
                    "," +
                    (Top + Ports("D")[1])
                  }
                />
              </>
            );
          }
        } else if (this.props.componentName == "RGB") {
          return (
            <path
              d={
                "M " +
                (left - 15 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                "," +
                (top + 80) +
                " C " +
                (left - 120 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                "," +
                (top + 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                " " +
                cx2 +
                "," +
                cy2 +
                " " +
                (Left + Ports(connectedTo)[0]) +
                "," +
                (Top + Ports(connectedTo)[1])
              }
            />
          );
        } else {
          return (
            <path
              d={
                "M " +
                (left - 15 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                "," +
                (top + 80) +
                " C " +
                (left + 60 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                "," +
                (top + 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                " " +
                cx2 +
                "," +
                cy2 +
                " " +
                (Left + Ports(connectedTo)[0]) +
                "," +
                (Top + Ports(connectedTo)[1])
              }
            />
          );
        }
      } else if (
        connectedTo == "C" ||
        connectedTo == "D" ||
        connectedTo == "E" ||
        connectedTo == "F"
      ) {
        Top = bibox.top;
        Left = bibox.left;
        cx2 = Left + Ports(connectedTo)[0];
        cy2 = Top + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.BIBOX][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.BIBOX][1] / 2;
        if (this.props.componentName == "pc_motor_driver") {
          if (connectedTo == "A" || connectedTo == "C") {
            return (
              <>
                <path
                  d={
                    "M " +
                    (left - 100 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top + 5) +
                    " C " +
                    (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                    " " +
                    cx2 +
                    "," +
                    cy2 +
                    " " +
                    (Left + Ports("A")[0]) +
                    "," +
                    (Top + Ports("A")[1])
                  }
                />
                <path
                  d={
                    "M " +
                    (left + 100 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top + 5) +
                    " C " +
                    (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                    " " +
                    cx2 +
                    "," +
                    cy2 +
                    " " +
                    (Left + Ports("C")[0]) +
                    "," +
                    (Top + Ports("C")[1])
                  }
                />
              </>
            );
          }

          if (connectedTo == "B" || connectedTo == "D") {
            return (
              <>
                <path
                  d={
                    "M " +
                    (left - 100 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top + 5) +
                    " C " +
                    (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                    " " +
                    cx2 +
                    "," +
                    cy2 +
                    " " +
                    (Left + Ports("B")[0]) +
                    "," +
                    (Top + Ports("B")[1])
                  }
                />
                <path
                  d={
                    "M " +
                    (left + 100 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top + 5) +
                    " C " +
                    (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                    "," +
                    (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                    " " +
                    cx2 +
                    "," +
                    cy2 +
                    " " +
                    (Left + Ports("D")[0]) +
                    "," +
                    (Top + Ports("D")[1])
                  }
                />
              </>
            );
          }
        } else if (this.props.componentName == "RGB") {
          return (
            <path
              d={
                "M " +
                (left - 15 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                "," +
                (top + 80) +
                " C " +
                (left - 120 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                "," +
                (top + 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                " " +
                cx2 +
                "," +
                cy2 +
                " " +
                (Left + Ports(connectedTo)[0]) +
                "," +
                (Top + Ports(connectedTo)[1])
              }
            />
          );
        } else {
          return (
            <path
              d={
                "M " +
                (left - 15 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                "," +
                (top + 80) +
                " C " +
                (left + 60 + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
                "," +
                (top + 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
                " " +
                cx2 +
                "," +
                cy2 +
                " " +
                (Left + Ports(connectedTo)[0]) +
                "," +
                (Top + Ports(connectedTo)[1])
              }
            />
          );
        }
      }

      // else if (this.props.components["pc_motor_driver"] !== undefined) {
      //   if (this.props.components["pc_motor_driver"].length > 0) {
      //     let asd = sessionStorage.getItem("dragingItem");
      //     Top = bibox.top;
      //     Left = bibox.left;
      //     cx2 = Left + Ports(connectedTo)[0];
      //     cy2 = Top + Ports(connectedTo)[1];
      //     cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.BIBOX][0] / 2;
      //     cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.BIBOX][1] / 2;

      //
      //     return dualWireDriveMotor(connectedTo);
      //   }
      // }

      // JUST COMMENTED TESTING
      // else {
      //

      //   Top = bibox.top;
      //   Left = bibox.left;
      //   cx2 = Left + Ports(connectedTo)[0];
      //   cy2 = Top + Ports(connectedTo)[1];
      //   cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.BIBOX][0] / 2;
      //   cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.BIBOX][1] / 2;
      //   return (
      //     <path
      //       d={
      //         "M " +
      //         (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
      //         "," +
      //         (top + 5) +
      //         " C " +
      //         (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
      //         "," +
      //         (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
      //         " " +
      //         cx2 +
      //         "," +
      //         cy2 +
      //         " " +
      //         (Left + Ports(connectedTo)[0]) +
      //         "," +
      //         (Top + Ports(connectedTo)[1])
      //       }
      //     />
      //   );
      // }
    } else if (Device == "Humanoid") {
      if (connectedTo == "A1" || connectedTo == "A2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (component.connectedTo == "A") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              top +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "D1" || connectedTo == "D2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (component.connectedTo == "D") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              top +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "C1" || connectedTo == "C2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (component.connectedTo == "C") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              top +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "B1" || connectedTo == "B2") {
        Object.keys(components).map((key) => {
          if (key == "dual_splitter") {
            components[key].map((component, index) => {
              if (component.connectedTo == "B") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          } else if (key == "servo_extender") {
            components[key].map((component, index) => {
              if (component.connectedTo == "B") {
                LeftF = component.left + 30;
                TopF = component.top + 5;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              top +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "I1" || connectedTo == "I2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (component.connectedTo == "I") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              top +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else {
        Top = bibox.top;
        Left = bibox.left;
        cx2 = Left + Ports(connectedTo)[0];
        cy2 = Top + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.BIBOX][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.BIBOX][1] / 2;

        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 5) +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (Left + Ports(connectedTo)[0]) +
              "," +
              (Top + Ports(connectedTo)[1])
            }
          />
        );
      }
    } else {
      if (connectedTo == "F1" || connectedTo == "F2") {
        Object.keys(components).map((key) => {
          if (key == "dual_splitter") {
            components[key].map((component, index) => {
              if (component.connectedTo == "F") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          } else if (key == "servo_extender") {
            components[key].map((component, index) => {
              if (component.connectedTo == "F") {
                LeftF = component.left + 30;
                TopF = component.top + 5;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              top +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "A1" || connectedTo == "A2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (component.connectedTo == "A") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              top +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "H1" || connectedTo == "H2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (component.connectedTo == "H") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              top +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "G1" || connectedTo == "G2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (component.connectedTo == "G") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              top +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "E1" || connectedTo == "E2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (component.connectedTo == "E") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              top +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "D1" || connectedTo == "D2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (component.connectedTo == "D") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              top +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "C1" || connectedTo == "C2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (component.connectedTo == "C") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              top +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "B1" || connectedTo == "B2") {
        Object.keys(components).map((key) => {
          if (key == "dual_splitter") {
            components[key].map((component, index) => {
              if (component.connectedTo == "B") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          } else if (key == "servo_extender") {
            components[key].map((component, index) => {
              if (component.connectedTo == "B") {
                LeftF = component.left + 30;
                TopF = component.top + 5;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              top +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      } else if (connectedTo == "I1" || connectedTo == "I2") {
        Object.keys(components).map((dual_splitter) => {
          if (dual_splitter == "dual_splitter") {
            components[dual_splitter].map((component, index) => {
              if (component.connectedTo == "I") {
                LeftF = component.left;
                TopF = component.top;
              }
            });
          }
        });

        cx2 = LeftF + Ports(connectedTo)[0];
        cy2 = TopF + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              top +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (LeftF + Ports(connectedTo)[0]) +
              "," +
              (TopF + Ports(connectedTo)[1])
            }
          />
        );
      }
      // else if (connectedTo == "F1") {
      //     Object.keys(components).map(servo_extender => {
      //         if (servo_extender == "servo_extender") {
      //             components[servo_extender].map((component, index) => {
      //                 if (component.connectedTo == "F") {
      //                     LeftF = component.left;
      //                     TopF = component.top;
      //                 }
      //             });
      //         }
      //     });

      //     cx2 = LeftF + Ports(connectedTo)[0];
      //     cy2 = TopF + Ports(connectedTo)[1];
      //     cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
      //     cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
      //     return (
      //         <path
      //             d={
      //                 "M " +
      //                 (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
      //                 "," +
      //                 top +
      //                 " C " +
      //                 (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
      //                 "," +
      //                 (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
      //                 " " +
      //                 cx2 +
      //                 "," +
      //                 cy2 +
      //                 " " +
      //                 (LeftF + Ports(connectedTo)[0]) +
      //                 "," +
      //                 (TopF + Ports(connectedTo)[1])
      //             }
      //         />
      //     );
      // }
      // else if (connectedTo == "B1") {
      //     Object.keys(components).map(servo_extender => {
      //         if (servo_extender == "servo_extender") {
      //             components[servo_extender].map((component, index) => {
      //                 if (component.connectedTo == "B") {
      //                     LeftF = component.left;
      //                     TopF = component.top;
      //                 }
      //             });
      //         }
      //     });

      //     cx2 = LeftF + Ports(connectedTo)[0];
      //     cy2 = TopF + Ports(connectedTo)[1];
      //     cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.COMPONENT][0] / 2;
      //     cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.COMPONENT][1] / 2;
      //     return (
      //         <path
      //             d={
      //                 "M " +
      //                 (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
      //                 "," +
      //                 top +
      //                 " C " +
      //                 (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
      //                 "," +
      //                 (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
      //                 " " +
      //                 cx2 +
      //                 "," +
      //                 cy2 +
      //                 " " +
      //                 (LeftF + Ports(connectedTo)[0]) +
      //                 "," +
      //                 (TopF + Ports(connectedTo)[1])
      //             }
      //         />
      //     );
      // }
      else {
        Top = bibox.top;
        Left = bibox.left;
        cx2 = Left + Ports(connectedTo)[0];
        cy2 = Top + Ports(connectedTo)[1];
        cx2 += Ports(connectedTo)[0] - ImageSizes[ItemTypes.BIBOX][0] / 2;
        cy2 += Ports(connectedTo)[1] - ImageSizes[ItemTypes.BIBOX][1] / 2;
        return (
          <path
            d={
              "M " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top + 5) +
              " C " +
              (left + ImageSizes[ItemTypes.COMPONENT][0] / 2) +
              "," +
              (top - 2 * ImageSizes[ItemTypes.COMPONENT][1]) +
              " " +
              cx2 +
              "," +
              cy2 +
              " " +
              (Left + Ports(connectedTo)[0]) +
              "," +
              (Top + Ports(connectedTo)[1])
            }
          />
        );
      }
    }
  }
}

//                 // PPP

class PortCircle extends Component {
  renderhighlighted = () => {
    const { PortConnections } = this.props;
    let internalAccessoriesData = JSON.parse(
      sessionStorage.getItem("concept")
    ).internalaccessories;
    console.log(this.props.portName, "renderhighlighted");
    if (
      this.props.portName == "A" &&
      (internalAccessoriesData.isTouchZero == true ||
        internalAccessoriesData.isTouchZeroOutput == true ||
        PortConnections["A1"] != null ||
        PortConnections["A2"] != null)
    ) {
      return 0;
    } else if (
      this.props.portName == "B" &&
      (internalAccessoriesData.isTouchOne == true ||
        internalAccessoriesData.isTouchOneOutput == true ||
        PortConnections["B1"] != null ||
        PortConnections["B2"] != null)
    ) {
      return 0;
    } else if (
      this.props.portName == "C" &&
      (internalAccessoriesData.isTouchTwo == true ||
        internalAccessoriesData.isTouchTwoOutput == true)
    ) {
      return 0;
    } else if (
      this.props.portName == "D" &&
      internalAccessoriesData.isFour_in_one_sensor == true
    ) {
      return 0;
    } else {
      return 1.4;
    }
  };

  render() {
    //console.log("konektion", this.props);

    if (
      ImageSizes[ItemTypes.PORT_CIRCLE][0] /
        (this.props.highlighted ? 1.4 : 0) ==
      "Infinity"
    ) {
      console.log("infintiy");
      return <circle cx={this.props.left} cy={this.props.top} r={0} />;
    } else {
      return (
        <circle
          cx={this.props.left}
          cy={this.props.top}
          r={
            ImageSizes[ItemTypes.PORT_CIRCLE][0] /
            (this.props.highlighted ? this.renderhighlighted() : 0)
          }
        />
      );
    }
  }
}

class ComponentPort extends Component {
  render() {
    console.log("konektion", this.props);
    const PortConnections = this.props.PortConnections;
    var { left, top } = this.props.component;
    left += ImageSizes[ItemTypes.COMPONENT][0] / 2;
    return (
      <PortCircle PortConnections={PortConnections} left={left} top={top} />
    );
  }
}

class Connections extends Component {
  render() {
    const { bibox, components, extraComponent, Camera, PortConnections } =
      this.props;
    //console.log("konektion", this.props);
    console.log("port", Ports("A1"));
    let connectedDevice = sessionStorage.getItem("connectedDevice");

    let internalAccessoriesData = JSON.parse(
      sessionStorage.getItem("concept")
    ).internalaccessories;

    let CameraOffsetLeft = this.props.Camera.offset.left;
    let CameraOffsetTop = this.props.Camera.offset.top;

    if (localStorage.getItem("programMode") == "learn") {
      var PortConnectionsTutor = JSON.parse(
        sessionStorage.getItem("tutorialPort")
      );
      //  var AllowedPortTypesTutor = AllowedPortTypes
      var AllowedPortTypesTutor = {};
      Object.entries(PortConnectionsTutor).map(([key, value]) => {
        if (AllowedPortTypesTutor[value]) {
          AllowedPortTypesTutor[value].push(key);
        } else {
          AllowedPortTypesTutor[value] = [key];
        }
      });
    } else {
      // var PortConnectionsTutor = JSON.parse(sessionStorage.getItem("tutorialPort"))
      var AllowedPortTypesTutor = AllowedPortTypes;
      // var AllowedPortTypesTutor = {}
      console.log("dishoom123", AllowedPortTypesTutor);
      console.log("dishoom1234", components);

      Object.entries(PortConnections).map(
        ([key, value]) => (AllowedPortTypesTutor[value] = [key])
      );
    }
    console.log("dishoom", PortConnections);
    var positionCircleRight;
    var positionCircleLeft;
    var biboxType;
    var componentConnected;
    var Left;
    var Top;
    // components;
    var connectedTo;
    var connections = [];
    var portCircles = [];

    // ** cHECHING THE CONNECTED PORT  return the type of motor connected on the port **
    let isMotorConnected_BD = () => {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.STPM !==
        null
      ) {
        let value = JSON.parse(sessionStorage.getItem("assembly"))
          .PortConnections.STPM.type;
        return value;
      }

      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B1 !==
        null
      ) {
        let value = JSON.parse(sessionStorage.getItem("assembly"))
          .PortConnections.B1.type;
        return value;
      }

      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B2 !==
        null
      ) {
        let value = JSON.parse(sessionStorage.getItem("assembly"))
          .PortConnections.B2.type;
        return value;
      }

      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D1 !==
        null
      ) {
        let value = JSON.parse(sessionStorage.getItem("assembly"))
          .PortConnections.D1.type;
        return value;
      }
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D2 !==
        null
      ) {
        let value = JSON.parse(sessionStorage.getItem("assembly"))
          .PortConnections.D2.type;
        return value;
      }
    };

    let isMotorConnected_AC = () => {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.STPM !==
        null
      ) {
        let value = JSON.parse(sessionStorage.getItem("assembly"))
          .PortConnections.STPM.type;
        return value;
      }

      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A1 !==
        null
      ) {
        let value = JSON.parse(sessionStorage.getItem("assembly"))
          .PortConnections.A1.type;
        return value;
      }

      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A2 !==
        null
      ) {
        let value = JSON.parse(sessionStorage.getItem("assembly"))
          .PortConnections.A2.type;
        return value;
      }

      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C1 !==
        null
      ) {
        let value = JSON.parse(sessionStorage.getItem("assembly"))
          .PortConnections.C1.type;
        return value;
      }
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C2 !==
        null
      ) {
        let value = JSON.parse(sessionStorage.getItem("assembly"))
          .PortConnections.C2.type;
        return value;
      }
    };

    /*
        RETURN THE PORT WHERE PC_MOTOR_DIRVER is CONNECTED
     */
    let isPc_motor_driverConnected_BD_AC = () => {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B != null
      ) {
        if (
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B
            .type == "pc_motor_driver"
        ) {
          return "B";
        }
      }
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D != null
      ) {
        if (
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D
            .type == "pc_motor_driver"
        ) {
          return "D";
        }
      }
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A != null
      ) {
        if (
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A
            .type == "pc_motor_driver"
        ) {
          return "A";
        }
      }
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C != null
      ) {
        if (
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C
            .type == "pc_motor_driver"
        ) {
          return "C";
        }
      }
    };

    // only for ge

    Object.keys(components).map((key) => {
      components[key].map((component, index) => {
        const { connectedTo } = component;
        var sdarafs = component;
        // WHEN we connect the components to port commectedTO will be the port
        if (connectedTo) {
          console.log("dishoom12345", connectedTo);

          // if (
          //   connectedTo == "A" &&
          //   internalAccessoriesData.isTouchZero == false
          // ) {
          connections.push(
            <Curve
              bibox={bibox}
              component={component}
              componentName={key}
              components={components}
              key={connections.length}
              style={{ zIndex: -1 }}
              PortConnections={PortConnections}
              shield={this.props.shield}
            />
          );
          // }
        }

        if (
          !(
            DraggingInfo.isDragging &&
            DraggingInfo.draggingComponentOld &&
            key == DraggingInfo.draggingComponentOld.type &&
            index === DraggingInfo.draggingComponentOld.index
          )
        ) {
          let keyData = key;
          // PPP

          portCircles.push(
            <ComponentPort
              PortConnections={PortConnections}
              component={component}
              key={portCircles.length}
            />
          );
        }
      });
    });

    if (extraComponent) {
      // console.log("dishoom12345", extraComponent);

      if (extraComponent.connectedTo) {
        connections.push(
          <Curve
            bibox={bibox}
            component={extraComponent}
            components={components}
            key={connections.length}
            componentName={extraComponent.type}
            PortConnections={PortConnections}
            shield={this.props.shield}
          />
        );
      }
      console.log("konekkk", extraComponent);
      portCircles.push(
        <ComponentPort
          PortConnections={PortConnections}
          component={extraComponent}
          key={portCircles.length}
        />
      );
    }
    return (
      <div
        id="connectPort"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <svg height="100%" width="100%">
          <g
            transform={
              "matrix(" +
              Camera.scale +
              " " +
              "0 0 " +
              Camera.scale +
              " " +
              Camera.offset.left * Camera.scale +
              " " +
              Camera.offset.top * Camera.scale +
              ")"
            }
          >
            <g stroke="#4d4d4d" strokeWidth="4px" fill="none">
              {connections}
            </g>
            <g stroke="black" strokeWidth="4px" fill="white">
              {portCircles}
            </g>

            {Object.keys(PortTypes).map((key) => {
              var highlighted = false;

              // this will let us know which port will active will draging components

              if (extraComponent) {
                if (AllowedPortTypesTutor[extraComponent.type]) {
                  if (
                    !(
                      DraggingInfo.draggingComponentOld &&
                      DraggingInfo.newComponentPort
                    ) &&
                    extraComponent &&
                    AllowedPortTypesTutor[extraComponent.type].indexOf(key) > -1
                  )
                    highlighted = true;
                }
              }

              // if (key == "BC" || key == "B") {
              //   if (PortConnections["B"] || PortConnections["BC"]) {
              //     highlighted = false;
              //   }
              // }
              //geared Motor is connected to A1
              let B1connectedMotor =
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                  .B1 !== null
                  ? JSON.parse(sessionStorage.getItem("assembly"))
                      .PortConnections.B1.type != "servo_motor"
                    ? true
                    : false
                  : null;

              //geared Motor is connected to C1
              let D1connectedMotor =
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                  .D1 !== null
                  ? JSON.parse(sessionStorage.getItem("assembly"))
                      .PortConnections.D1.type != "servo_motor"
                    ? true
                    : false
                  : null;

              // S1
              if (Device == "Ace") {
                if ((key == "D1" || key == "D2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "dual_splitter") {
                        components[dual_splitter].map((component, index) => {
                          if (
                            extraComponent.type != "geared_motor" &&
                            extraComponent.type != "mini_geared_motor" &&
                            extraComponent.type != "dc_motor"
                          ) {
                            if (component.connectedTo == "D") {
                              Left = component.left;
                              Top = component.top;
                              highlighted = true;
                            }
                            if (
                              component.connectedTo == "D" &&
                              this.props.shield == true
                            ) {
                              if (key == "D1") {
                                Left = component.left - 195;
                                Top = component.top - 319;
                                highlighted = true;
                              }
                              if (key == "D2") {
                                Left = component.left - 175;
                                Top = component.top - 315;
                                highlighted = true;
                              }
                            }
                          } else {
                            if (component.connectedTo == "D") {
                              Left = component.left + 28;
                              Top = component.top + 5;
                              highlighted = true;
                            }
                          }
                        });
                      }
                      if (dual_splitter == "play_shield") {
                        components[dual_splitter].map((component, index) => {
                          if (
                            extraComponent.type == "servo_motor" ||
                            extraComponent.type == "servo_motor_360"
                          ) {
                            if (key == "D1" || key == "D2") {
                              Left = bibox.left;
                              Top = bibox.top;
                              highlighted = true;
                            }
                          }
                        });
                      }
                      // MOTOR DRIVER
                      if (
                        dual_splitter == "pc_motor_driver" &&
                        JSON.parse(sessionStorage.getItem("assembly"))
                          .PortConnections.D !== null
                      ) {
                        if (
                          JSON.parse(sessionStorage.getItem("assembly"))
                            .PortConnections.D.type == "pc_motor_driver"
                        ) {
                          //checking extraCoponent type = geared_motor
                          if (
                            extraComponent.type == "geared_motor" ||
                            extraComponent.type == "mini_geared_motor" ||
                            extraComponent.type == "dc_motor"
                          ) {
                            // 1 all ports == null  i.e B1,B2,D1,D2,SMTP == null

                            if (
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.STPM === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.B1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.B2 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.D1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.D2 === null
                            ) {
                              components[dual_splitter].map(
                                (component, index) => {
                                  if (
                                    component.connectedTo == "B" ||
                                    component.connectedTo == "D"
                                  ) {
                                    Left = component.left + 125;
                                    Top = component.top + 30;
                                    highlighted = true;
                                  }
                                }
                              );
                            }

                            // checking connect divice is not == to servo_motot n stepper_motor
                            let connectName = isMotorConnected_BD();
                            if (
                              connectName !== "servo_motor" &&
                              connectName !== "stepper_motor"
                            ) {
                              components[dual_splitter].map(
                                (component, index) => {
                                  if (
                                    component.connectedTo == "B" ||
                                    component.connectedTo == "D"
                                  ) {
                                    Left = component.left + 125;
                                    Top = component.top + 30;
                                    highlighted = true;
                                  }
                                }
                              );
                            }
                          }

                          //checking extraCoponent type = servo_motor
                          if (extraComponent.type == "servo_motor") {
                            if (
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.B1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.D1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.STPM === null
                            ) {
                              components[dual_splitter].map(
                                (component, index) => {
                                  if (
                                    component.connectedTo == "B" ||
                                    component.connectedTo == "D"
                                  ) {
                                    if (key == "D2") {
                                      Left = component.left + 20;
                                    } else {
                                      Left = component.left + 60;
                                    }
                                    Top = component.top;
                                    highlighted = true;
                                  }
                                }
                              );
                            }

                            // checking connect divice is not == to geared_motor n stepper_motor
                            let connectName = isMotorConnected_BD();
                            if (
                              connectName !== "geared_motor" &&
                              connectName !== "mini_geared_motor" &&
                              connectName !== "dc_motor" &&
                              connectName !== "stepper_motor"
                            ) {
                              components[dual_splitter].map(
                                (component, index) => {
                                  if (
                                    component.connectedTo == "B" ||
                                    component.connectedTo == "D"
                                  ) {
                                    if (key == "D2") {
                                      Left = component.left + 20;
                                    } else {
                                      Left = component.left + 60;
                                    }
                                    Top = component.top;
                                    highlighted = true;
                                  }
                                }
                              );
                            }
                          }

                          //checking extraCoponent type = stepper_motor
                        }
                      }
                    });
                  }
                } else if ((key == "C1" || key == "C2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "dual_splitter") {
                        components[dual_splitter].map((component, index) => {
                          if (
                            extraComponent.type != "geared_motor" &&
                            extraComponent.type != "mini_geared_motor" &&
                            extraComponent.type != "dc_motor"
                          ) {
                            if (component.connectedTo == "C") {
                              if (key == "C1") {
                                Left = component.left;
                                Top = component.top;
                                highlighted = true;
                              }
                              if (key == "C2") {
                                Left = component.left;
                                Top = component.top;
                                highlighted = true;
                              }
                            }
                            if (
                              component.connectedTo == "C" &&
                              this.props.shield == true
                            ) {
                              if (key == "C1") {
                                Left = component.left - 125;
                                Top = component.top - 320;
                                highlighted = true;
                              }
                              if (key == "C2") {
                                Left = component.left - 105;
                                Top = component.top - 315;
                                highlighted = true;
                              }
                            }
                          } else {
                            if (component.connectedTo == "C") {
                              Left = component.left + 28;
                              Top = component.top + 5;
                              highlighted = true;
                            }
                          }
                        });
                      }
                      if (dual_splitter == "play_shield") {
                        components[dual_splitter].map((component, index) => {
                          if (
                            extraComponent.type == "servo_motor" ||
                            extraComponent.type == "servo_motor_360"
                          ) {
                            if (key == "C1" || key == "C2") {
                              Left = bibox.left;
                              Top = bibox.top;
                              highlighted = true;
                            }
                          }
                        });
                      }
                      /** */

                      // MOTOR DRIVER
                      if (
                        dual_splitter == "pc_motor_driver" &&
                        JSON.parse(sessionStorage.getItem("assembly"))
                          .PortConnections.C !== null
                      ) {
                        if (
                          JSON.parse(sessionStorage.getItem("assembly"))
                            .PortConnections.C.type == "pc_motor_driver"
                        ) {
                          //checking extraCoponent type = geared_motor
                          if (
                            extraComponent.type == "geared_motor" ||
                            extraComponent.type == "mini_geared_motor" ||
                            extraComponent.type == "dc_motor"
                          ) {
                            // 1 all ports == null  i.e B1,B2,D1,D2,SMTP == null

                            if (
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.STPM === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.A1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.A2 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.C1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.C2 === null
                            ) {
                              components[dual_splitter].map(
                                (component, index) => {
                                  if (
                                    component.connectedTo == "A" ||
                                    component.connectedTo == "C"
                                  ) {
                                    Left = component.left + 125;
                                    Top = component.top + 30;
                                    highlighted = true;
                                  }
                                }
                              );
                            }

                            // checking connect divice is not == to servo_motot n stepper_motor
                            let connectName = isMotorConnected_AC();
                            if (
                              connectName !== "servo_motor" &&
                              connectName !== "stepper_motor"
                            ) {
                              components[dual_splitter].map(
                                (component, index) => {
                                  if (
                                    component.connectedTo == "A" ||
                                    component.connectedTo == "C"
                                  ) {
                                    Left = component.left + 125;
                                    Top = component.top + 30;
                                    highlighted = true;
                                  }
                                }
                              );
                            }
                          }

                          //checking extraCoponent type = servo_motor
                          if (extraComponent.type == "servo_motor") {
                            if (
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.A1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.C1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.STPM === null
                            ) {
                              components[dual_splitter].map(
                                (component, index) => {
                                  if (
                                    component.connectedTo == "A" ||
                                    component.connectedTo == "C"
                                  ) {
                                    if (key == "C2") {
                                      Left = component.left + 20;
                                    } else {
                                      Left = component.left + 60;
                                    }
                                    Top = component.top;
                                    highlighted = true;
                                  }
                                }
                              );
                            }

                            // checking connect divice is not == to geared_motor n stepper_motor
                            let connectName = isMotorConnected_AC();
                            if (
                              connectName !== "geared_motor" &&
                              connectName !== "mini_geared_motor" &&
                              connectName !== "dc_motor" &&
                              connectName !== "stepper_motor"
                            ) {
                              components[dual_splitter].map(
                                (component, index) => {
                                  if (
                                    component.connectedTo == "A" ||
                                    component.connectedTo == "C"
                                  ) {
                                    if (key == "C2") {
                                      Left = component.left + 20;
                                    } else {
                                      Left = component.left + 60;
                                    }
                                    Top = component.top;
                                    highlighted = true;
                                  }
                                }
                              );
                            }
                          }

                          //checking extraCoponent type = stepper_motor
                        }
                      }

                      /** */
                    });
                  }
                } else if ((key == "B1" || key == "B2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((value) => {
                      console.log("assemblComponents", value);
                      if (value == "dual_splitter") {
                        components[value].map((component, index) => {
                          if (
                            extraComponent.type != "geared_motor" &&
                            extraComponent.type != "mini_geared_motor" &&
                            extraComponent.type != "dc_motor"
                          ) {
                            if (component.connectedTo == "B") {
                              Left = component.left;
                              Top = component.top;
                              highlighted = true;
                            }
                            if (
                              component.connectedTo == "B" &&
                              this.props.shield == true
                            ) {
                              if (key == "B1") {
                                Left = component.left - 268;
                                Top = component.top - 256;
                                highlighted = true;
                              }
                              if (key == "B2") {
                                Left = component.left - 212;
                                Top = component.top - 287;
                                highlighted = true;
                              }
                            }
                          } else {
                            if (component.connectedTo == "B") {
                              Left = component.left + 28;
                              Top = component.top + 5;
                              highlighted = true;
                            }
                          }
                        });
                      }
                      if (value == "play_shield") {
                        components[value].map((component, index) => {
                          if (
                            extraComponent.type != "geared_motor" &&
                            extraComponent.type != "mini_geared_motor" &&
                            extraComponent.type != "dc_motor" &&
                            extraComponent.type != "servo_motor" &&
                            extraComponent.type != "servo_motor_360"
                          ) {
                            if (PortConnections.B == null) {
                              if (key == "B1") {
                                Left = bibox.left;
                                Top = bibox.top;
                                highlighted = true;
                              }

                              if (key == "B2") {
                                Left = bibox.left;
                                Top = bibox.top;
                                highlighted = true;
                              }
                            }
                          }
                        });
                      }
                      if (value == "servo_extender") {
                        components[value].map((component, index) => {
                          if (component.connectedTo == "B") {
                            Left = component.left + 30;
                            Top = component.top + 5;
                            highlighted = true;
                          }
                        });
                      }

                      // MOTOR DRIVER
                      if (
                        value == "pc_motor_driver" &&
                        JSON.parse(sessionStorage.getItem("assembly"))
                          .PortConnections.B !== null
                      ) {
                        if (
                          JSON.parse(sessionStorage.getItem("assembly"))
                            .PortConnections.B.type == "pc_motor_driver"
                        ) {
                          //***checking extraCoponent type = geared_motor
                          if (
                            extraComponent.type == "geared_motor" ||
                            extraComponent.type == "mini_geared_motor" ||
                            extraComponent.type == "dc_motor"
                          ) {
                            // 1 all ports == null  i.e B1,B2,D1,D2,SMTP == null

                            if (
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.STPM === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.B1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.B2 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.D1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.D2 === null
                            ) {
                              components[value].map((component, index) => {
                                if (
                                  component.connectedTo == "B" ||
                                  component.connectedTo == "D"
                                ) {
                                  Left = component.left - 70;
                                  Top = component.top + 30;
                                  highlighted = true;
                                }
                              });
                            }

                            // checking connect divice is not == to servo_motot n stepper_motor
                            let connectName = isMotorConnected_BD();
                            if (
                              connectName !== "servo_motor" &&
                              connectName !== "stepper_motor"
                            ) {
                              components[value].map((component, index) => {
                                if (
                                  component.connectedTo == "B" ||
                                  component.connectedTo == "D"
                                ) {
                                  Left = component.left - 70;
                                  Top = component.top + 30;
                                  highlighted = true;
                                }
                              });
                            }
                          }

                          //****checking extraCoponent type = servo_motor

                          if (extraComponent.type == "servo_motor") {
                            if (
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.B1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.D1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.STPM === null
                            ) {
                              components[value].map((component, index) => {
                                if (
                                  component.connectedTo == "B" ||
                                  component.connectedTo == "D"
                                ) {
                                  if (key == "B2") {
                                    Left = component.left - 70;
                                  } else {
                                    Left = component.left - 25;
                                  }
                                  Top = component.top;
                                  highlighted = true;
                                }
                              });
                            }

                            // checking connect divice is not == to servo_motot n stepper_motor
                            let connectName = isMotorConnected_BD();
                            if (
                              connectName !== "geared_motor" &&
                              connectName !== "mini_geared_motor" &&
                              connectName !== "dc_motor" &&
                              connectName !== "stepper_motor"
                            ) {
                              components[value].map((component, index) => {
                                if (
                                  component.connectedTo == "B" ||
                                  component.connectedTo == "D"
                                ) {
                                  if (key == "B2") {
                                    Left = component.left - 70;
                                  } else {
                                    Left = component.left - 25;
                                  }
                                  Top = component.top;
                                  highlighted = true;
                                }
                              });
                            }
                          }

                          //checking extraCoponent type = stepper_motor
                        }
                      }
                    });
                  }
                } else if ((key == "A1" || key == "A2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "dual_splitter") {
                        components[dual_splitter].map((component, index) => {
                          if (
                            extraComponent.type != "geared_motor" &&
                            extraComponent.type != "mini_geared_motor" &&
                            extraComponent.type != "dc_motor"
                          ) {
                            if (component.connectedTo == "A") {
                              Left = component.left;
                              Top = component.top;
                              highlighted = true;
                            }
                            if (
                              component.connectedTo == "A" &&
                              this.props.shield == true
                            ) {
                              if (key == "A1") {
                                Left = component.left - 87;
                                Top = component.top - 252;
                                highlighted = true;
                              }
                              if (key == "A2") {
                                Left = component.left - 32;
                                Top = component.top - 285;
                                highlighted = true;
                              }
                            }
                          } else {
                            if (component.connectedTo == "A") {
                              Left = component.left + 28;
                              Top = component.top + 5;
                              highlighted = true;
                            }
                          }
                        });
                      }
                      if (dual_splitter == "play_shield") {
                        components[dual_splitter].map((component, index) => {
                          if (
                            extraComponent.type != "geared_motor" &&
                            extraComponent.type != "mini_geared_motor" &&
                            extraComponent.type != "dc_motor" &&
                            extraComponent.type != "servo_motor" &&
                            extraComponent.type != "servo_motor_360"
                          ) {
                            if (PortConnections.A == null) {
                              if (key == "A1") {
                                Left = bibox.left;
                                Top = bibox.top;
                                highlighted = true;
                              }
                              if (key == "A2") {
                                Left = bibox.left;
                                Top = bibox.top;
                                highlighted = true;
                              }
                            }
                          }
                        });
                      }

                      /** */
                      // MOTOR DRIVER
                      if (
                        dual_splitter == "pc_motor_driver" &&
                        JSON.parse(sessionStorage.getItem("assembly"))
                          .PortConnections.A !== null
                      ) {
                        if (
                          JSON.parse(sessionStorage.getItem("assembly"))
                            .PortConnections.A.type == "pc_motor_driver"
                        ) {
                          //***checking extraCoponent type = geared_motor
                          if (
                            extraComponent.type == "geared_motor" ||
                            extraComponent.type == "mini_geared_motor" ||
                            extraComponent.type == "dc_motor"
                          ) {
                            // 1 all ports == null  i.e B1,B2,D1,D2,SMTP == null

                            if (
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.STPM === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.A1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.A2 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.C1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.C2 === null
                            ) {
                              components[dual_splitter].map(
                                (component, index) => {
                                  if (
                                    component.connectedTo == "A" ||
                                    component.connectedTo == "C"
                                  ) {
                                    Left = component.left - 70;
                                    Top = component.top + 30;
                                    highlighted = true;
                                  }
                                }
                              );
                            }

                            // checking connect divice is not == to servo_motot n stepper_motor
                            let connectName = isMotorConnected_AC();
                            if (
                              connectName !== "servo_motor" &&
                              connectName !== "stepper_motor"
                            ) {
                              components[dual_splitter].map(
                                (component, index) => {
                                  if (
                                    component.connectedTo == "A" ||
                                    component.connectedTo == "C"
                                  ) {
                                    Left = component.left - 70;
                                    Top = component.top + 30;
                                    highlighted = true;
                                  }
                                }
                              );
                            }
                          }

                          //****checking extraCoponent type = servo_motor

                          if (extraComponent.type == "servo_motor") {
                            if (
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.A1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.C1 === null &&
                              JSON.parse(sessionStorage.getItem("assembly"))
                                .PortConnections.STPM === null
                            ) {
                              components[dual_splitter].map(
                                (component, index) => {
                                  if (
                                    component.connectedTo == "A" ||
                                    component.connectedTo == "C"
                                  ) {
                                    if (key == "A2") {
                                      Left = component.left - 70;
                                    } else {
                                      Left = component.left - 25;
                                    }
                                    Top = component.top;
                                    highlighted = true;
                                  }
                                }
                              );
                            }

                            // checking connect divice is not == to servo_motot n stepper_motor
                            let connectName = isMotorConnected_AC();
                            if (
                              connectName !== "geared_motor" &&
                              connectName !== "mini_geared_motor" &&
                              connectName !== "dc_motor" &&
                              connectName !== "stepper_motor"
                            ) {
                              components[dual_splitter].map(
                                (component, index) => {
                                  if (
                                    component.connectedTo == "A" ||
                                    component.connectedTo == "C"
                                  ) {
                                    if (key == "A2") {
                                      Left = component.left - 70;
                                    } else {
                                      Left = component.left - 25;
                                    }
                                    Top = component.top;
                                    highlighted = true;
                                  }
                                }
                              );
                            }
                          }

                          //checking extraCoponent type = stepper_motor
                        }
                      }

                      /** */
                    });
                  }
                } else if ((key == "F1" || key == "F2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "dual_splitter") {
                        components[dual_splitter].map((component, index) => {
                          if (
                            extraComponent.type != "geared_motor" &&
                            extraComponent.type != "mini_geared_motor" &&
                            extraComponent.type != "dc_motor"
                          ) {
                            if (component.connectedTo == "F") {
                              if (key == "F1") {
                                Left = component.left + 5;
                                Top = component.top - 74;
                                highlighted = true;
                              }
                              if (key == "F2") {
                                Left = component.left - 5;
                                Top = component.top - 68;
                                highlighted = true;
                              }
                            }
                          } else {
                            if (component.connectedTo == "F") {
                              console.log("highlited true");
                              Left = component.left + 28;
                              Top = component.top + 5;
                              highlighted = true;
                            }
                          }
                        });
                      }
                    });
                  }
                } else if (key == "M1" && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "play_shield") {
                        components[dual_splitter].map((component, index) => {
                          if (
                            extraComponent.type == "geared_motor" ||
                            extraComponent.type == "mini_geared_motor" ||
                            extraComponent.type == "dc_motor"
                          ) {
                            Left = bibox.left;
                            Top = bibox.top;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else if (key == "M3" && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "play_shield") {
                        components[dual_splitter].map((component, index) => {
                          if (
                            extraComponent.type == "geared_motor" ||
                            extraComponent.type == "mini_geared_motor" ||
                            extraComponent.type == "dc_motor"
                          ) {
                            Left = bibox.left;
                            Top = bibox.top;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else if (key == "STPM" && highlighted) {
                  if (components) {
                    highlighted = false;

                    Object.keys(components).map((dataVal) => {
                      if (dataVal == "pc_motor_driver") {
                        // isPcMotorDriver = true;

                        let pc_motor_driverConnectedTo =
                          isPc_motor_driverConnected_BD_AC();

                        if (
                          pc_motor_driverConnectedTo == "B" ||
                          pc_motor_driverConnectedTo == "D"
                        ) {
                          if (
                            JSON.parse(sessionStorage.getItem("assembly"))
                              .PortConnections.B1 === null &&
                            JSON.parse(sessionStorage.getItem("assembly"))
                              .PortConnections.B2 === null &&
                            JSON.parse(sessionStorage.getItem("assembly"))
                              .PortConnections.D1 === null &&
                            JSON.parse(sessionStorage.getItem("assembly"))
                              .PortConnections.D2 === null
                          ) {
                            components[dataVal].map((component, index) => {
                              if (
                                component.connectedTo == "B" ||
                                component.connectedTo == "D"
                              ) {
                                Left = component.left;
                                Top = component.top;
                                highlighted = true;
                              }
                            });
                          }
                        }

                        // if (
                        //   JSON.parse(sessionStorage.getItem("assembly"))
                        //     .PortConnections.B1 === null &&
                        //   JSON.parse(sessionStorage.getItem("assembly"))
                        //     .PortConnections.B2 === null &&
                        //   JSON.parse(sessionStorage.getItem("assembly"))
                        //     .PortConnections.D1 === null &&
                        //   JSON.parse(sessionStorage.getItem("assembly"))
                        //     .PortConnections.D2 === null
                        // ) {
                        //   components[dataVal].map((component, index) => {
                        //     if (
                        //       component.connectedTo == "B" ||
                        //       component.connectedTo == "D" ||
                        //       component.connectedTo == "A" ||
                        //       component.connectedTo == "C"
                        //     ) {
                        //       Left = component.left;
                        //       Top = component.top;
                        //       highlighted = true;
                        //     }
                        //   });
                        // }

                        if (
                          pc_motor_driverConnectedTo == "C" ||
                          pc_motor_driverConnectedTo == "A"
                        ) {
                          if (
                            JSON.parse(sessionStorage.getItem("assembly"))
                              .PortConnections.A1 === null &&
                            JSON.parse(sessionStorage.getItem("assembly"))
                              .PortConnections.A2 === null &&
                            JSON.parse(sessionStorage.getItem("assembly"))
                              .PortConnections.C1 === null &&
                            JSON.parse(sessionStorage.getItem("assembly"))
                              .PortConnections.C2 === null
                          ) {
                            components[dataVal].map((component, index) => {
                              if (
                                component.connectedTo == "A" ||
                                component.connectedTo == "C"
                              ) {
                                Left = component.left;
                                Top = component.top;
                                highlighted = true;
                              }
                            });
                          }
                        }
                      }
                    });
                  }
                } else {
                  // ABCD
                  Top = bibox.top;
                  Left = bibox.left;
                }
              } else if (Device == "Humanoid") {
                if ((key == "D1" || key == "D2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "dual_splitter") {
                        components[dual_splitter].map((component, index) => {
                          if (component.connectedTo == "D") {
                            Left = component.left;
                            Top = component.top;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else if ((key == "C1" || key == "C2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "dual_splitter") {
                        components[dual_splitter].map((component, index) => {
                          if (component.connectedTo == "C") {
                            Left = component.left;
                            Top = component.top;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else if ((key == "B1" || key == "B2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((value) => {
                      if (value == "dual_splitter") {
                        components[value].map((component, index) => {
                          if (component.connectedTo == "B") {
                            Left = component.left;
                            Top = component.top;
                            highlighted = true;
                          }
                        });
                      }
                      if (value == "servo_extender") {
                        components[value].map((component, index) => {
                          if (component.connectedTo == "B") {
                            Left = component.left + 30;
                            Top = component.top + 5;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else if ((key == "A1" || key == "A2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "dual_splitter") {
                        components[dual_splitter].map((component, index) => {
                          if (component.connectedTo == "A") {
                            Left = component.left;
                            Top = component.top;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else {
                  Top = bibox.top;
                  Left = bibox.left;
                }
              } else {
                if ((key == "F1" || key == "F2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((key) => {
                      if (key == "dual_splitter") {
                        components[key].map((component, index) => {
                          if (component.connectedTo == "F") {
                            Left = component.left;
                            Top = component.top;
                            highlighted = true;
                          }
                        });
                      } else if (key == "servo_extender") {
                        components[key].map((component, index) => {
                          if (component.connectedTo == "F") {
                            Left = component.left + 30;
                            Top = component.top + 5;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else if ((key == "G1" || key == "G2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "dual_splitter") {
                        components[dual_splitter].map((component, index) => {
                          if (component.connectedTo == "G") {
                            Left = component.left;
                            Top = component.top;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else if ((key == "I1" || key == "I2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "dual_splitter") {
                        components[dual_splitter].map((component, index) => {
                          if (component.connectedTo == "I") {
                            Left = component.left;
                            Top = component.top;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else if ((key == "H1" || key == "H2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "dual_splitter") {
                        components[dual_splitter].map((component, index) => {
                          if (component.connectedTo == "H") {
                            Left = component.left;
                            Top = component.top;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else if ((key == "E1" || key == "E2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "dual_splitter") {
                        components[dual_splitter].map((component, index) => {
                          if (component.connectedTo == "E") {
                            Left = component.left;
                            Top = component.top;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else if ((key == "D1" || key == "D2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "dual_splitter") {
                        components[dual_splitter].map((component, index) => {
                          if (component.connectedTo == "D") {
                            Left = component.left;
                            Top = component.top;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else if ((key == "C1" || key == "C2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "dual_splitter") {
                        components[dual_splitter].map((component, index) => {
                          if (component.connectedTo == "C") {
                            Left = component.left;
                            Top = component.top;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else if ((key == "B1" || key == "B2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((value) => {
                      if (value == "dual_splitter") {
                        components[value].map((component, index) => {
                          if (component.connectedTo == "B") {
                            Left = component.left;
                            Top = component.top;
                            highlighted = true;
                          }
                        });
                      }
                      if (value == "servo_extender") {
                        components[value].map((component, index) => {
                          if (component.connectedTo == "B") {
                            Left = component.left + 30;
                            Top = component.top + 5;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else if ((key == "A1" || key == "A2") && highlighted) {
                  if (components) {
                    highlighted = false;
                    Object.keys(components).map((dual_splitter) => {
                      if (dual_splitter == "dual_splitter") {
                        components[dual_splitter].map((component, index) => {
                          if (component.connectedTo == "A") {
                            Left = component.left;
                            Top = component.top;
                            highlighted = true;
                          }
                        });
                      }
                    });
                  }
                } else {
                  Top = bibox.top;
                  Left = bibox.left;
                }
              }

              /* here we are checking that if led,dual splitter is connected to "A" then DRIVER_MOTOR will not connect to A, C ports*/
              if (sessionStorage.getItem("dragingItem") == "dual_spliier") {
                let daata = JSON.parse(
                  sessionStorage.getItem("assembly")
                ).PortConnections;

                if (key == "A") {
                  if (
                    JSON.parse(sessionStorage.getItem("assembly"))
                      .PortConnections.A === null &&
                    JSON.parse(sessionStorage.getItem("assembly"))
                      .PortConnections.C === null
                  ) {
                    return (
                      <g
                        key={key}
                        stroke="white"
                        strokeWidth="2"
                        fill={PortTypes[key].color}
                      >
                        {PortTypes[key].ports.map(
                          (port) => (
                            // console.log(
                            //   "Ports(port)[0] AAAAA",
                            //   key,
                            //   Ports(port),
                            //   port,
                            //   Left + Ports(port)[0]
                            // ),
                            // Ports.js helping the dual_spliter to assign dots on dual_spliter ex - D1,D2
                            // PPP

                            <PortCircle
                              style={{ visibility: "hidden" }}
                              left={Left + Ports(port)[0]}
                              top={Top + Ports(port)[1]}
                              key={port}
                              highlighted={
                                !PortConnections[port] && highlighted
                              }
                              PortConnections={PortConnections}
                            />
                          )

                          //It highlight only those whih are
                        )}
                      </g>
                    );
                  }
                }
                if (key == "B") {
                  if (
                    JSON.parse(sessionStorage.getItem("assembly"))
                      .PortConnections.B === null &&
                    JSON.parse(sessionStorage.getItem("assembly"))
                      .PortConnections.D === null
                  ) {
                    return (
                      <g
                        key={key}
                        stroke="white"
                        strokeWidth="2"
                        fill={PortTypes[key].color}
                      >
                        {PortTypes[key].ports.map(
                          (port) => (
                            // Ports.js helping the dual_spliter to assign dots on dual_spliter ex - D1,D2
                            // PPP

                            <PortCircle
                              style={{ visibility: "hidden" }}
                              left={Left + Ports(port)[0]}
                              top={Top + Ports(port)[1]}
                              key={port}
                              highlighted={
                                !PortConnections[port] && highlighted
                              }
                              PortConnections={PortConnections}
                            />
                          )

                          //It highlight only those whih are
                        )}
                      </g>
                    );
                  }
                }
                if (key == "C") {
                  if (
                    JSON.parse(sessionStorage.getItem("assembly"))
                      .PortConnections.A === null &&
                    JSON.parse(sessionStorage.getItem("assembly"))
                      .PortConnections.C === null
                  ) {
                    return (
                      <g
                        key={key}
                        stroke="white"
                        strokeWidth="2"
                        fill={PortTypes[key].color}
                      >
                        {PortTypes[key].ports.map(
                          (port) => (
                            // Ports.js helping the dual_spliter to assign dots on dual_spliter ex - D1,D2
                            // PPP

                            <PortCircle
                              style={{ visibility: "hidden" }}
                              left={Left + Ports(port)[0]}
                              top={Top + Ports(port)[1]}
                              key={port}
                              highlighted={
                                !PortConnections[port] && highlighted
                              }
                              PortConnections={PortConnections}
                            />
                          )

                          //It highlight only those whih are
                        )}
                      </g>
                    );
                  }
                }
                if (key == "D") {
                  if (
                    JSON.parse(sessionStorage.getItem("assembly"))
                      .PortConnections.B === null &&
                    JSON.parse(sessionStorage.getItem("assembly"))
                      .PortConnections.D === null
                  ) {
                    return (
                      <g
                        key={key}
                        stroke="white"
                        strokeWidth="2"
                        fill={PortTypes[key].color}
                      >
                        {PortTypes[key].ports.map(
                          (port) => (
                            // Ports.js helping the dual_spliter to assign dots on dual_spliter ex - D1,D2
                            // PPP

                            <PortCircle
                              style={{ visibility: "hidden" }}
                              left={Left + Ports(port)[0]}
                              top={Top + Ports(port)[1]}
                              key={port}
                              highlighted={
                                !PortConnections[port] && highlighted
                              }
                              PortConnections={PortConnections}
                            />
                          )

                          //It highlight only those whih are
                        )}
                      </g>
                    );
                  }
                }
              } else {
                console.log("key", key);
                return (
                  <g
                    key={key}
                    stroke="white"
                    strokeWidth="2"
                    fill={PortTypes[key].color}
                  >
                    {/* {connectedDevice == "Humanoid"
                      ? PortTypes[key].ports.map((port) => (
                          <PortCircle
                            style={{ visibility: "hidden" }}
                            left={
                              CameraOffsetLeft == 0
                                ? Left + Ports(port)[0]
                                : CameraOffsetLeft > 1
                                ? Left + Ports(port)[0] + 25
                                : Left + Ports(port)[0] - 30
                            }
                            // left={Left + Ports(port)[0]}
                            top={
                              CameraOffsetLeft == 0
                                ? Top + Ports(port)[1]
                                : CameraOffsetLeft > 1
                                ? Top + Ports(port)[1]
                                : Top + Ports(port)[1] - 10
                            }
                            key={port}
                            highlighted={!PortConnections[port] && highlighted}
                          />
                        ))
                      : PortTypes[key].ports.map((port) => (
                          <PortCircle
                            style={{ visibility: "hidden" }}
                            left={Left + Ports(port)[0]}
                            top={Top + Ports(port)[1]}
                            key={port}
                            highlighted={!PortConnections[port] && highlighted}
                          />
                        ))} */}

                    {PortTypes[key].ports.map(
                      (port) => (
                        // console.log(
                        //   "Ports(port)[0] 3",
                        //   key,
                        //   Ports(port),
                        //   port,
                        //   Left + Ports(port)[0],
                        //   PortConnections,
                        //   PortConnections[port],
                        //   highlighted,
                        //   "SOMTHING GOOD",
                        //   !PortConnections[port] && highlighted
                        // ),
                        // Ports.js helping the dual_spliter to assign dots on dual_spliter ex - D1,D2
                        // PPP

                        // PLAY_COMPUTER RENDER

                        <PortCircle
                          style={{ visibility: "hidden" }}
                          left={Left + Ports(port)[0]}
                          top={Top + Ports(port)[1]}
                          key={port}
                          // highlighted={!PortConnections[port] && highlighted}
                          /**/

                          // highlighted={
                          //   PortConnections[port] == null
                          //     ? !PortConnections[port] && highlighted
                          //     : PortConnections[port].type != "pc_motor_driver"
                          //     ? PortConnections[port].notDriverMotot ==
                          //       "notConnectedDriverMotor"
                          //       ? true && highlighted
                          //       : !PortConnections[port] && highlighted
                          //     : !PortConnections[port] && highlighted
                          // }

                          highlighted={
                            PortConnections[port] == null
                              ? !PortConnections[port] && highlighted
                              : sessionStorage.getItem("dragingItem") !=
                                "pc_motor_driver"
                              ? PortConnections[port].notDriverMotot ==
                                "notConnectedDriverMotor"
                                ? true && highlighted
                                : !PortConnections[port] && highlighted
                              : !PortConnections[port] && highlighted
                          }
                          PortConnections={PortConnections}
                          // highlighted={
                          //   sessionStorage.getItem("dragingItem") !=
                          //   "pc_motor_driver"
                          //     ? PortConnections[port] ==
                          //       "notConnectedDriverMotor"
                          //       ? true
                          //       : !PortConnections[port] && highlighted
                          //     : !PortConnections[port] && highlighted
                          // }
                          portName={key}
                        />
                      )

                      //It highlight only those whih are
                    )}
                  </g>
                );
              }
            })}
          </g>
        </svg>
      </div>
    );
  }
}

export default Connections;
