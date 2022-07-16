import React, { Component } from "react";
import { Link } from "react-router-dom";

import renderPrgImage from "../../source/programImg";
class ProgramSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHelp: false,
    };
  }
  // const history = useHistory();
  componentDidMount = () => {};

  change = (info) => {
    if (info == "new") {
      this.props.history.push("/flow/InternalAccessories");
    } else if (info == "saved") {
      this.props.history.push("/flow/savedFlow");
    }
  };

  helpBtn = (e) => {
    this.setState({ isHelp: !this.state.isHelp });
  };
  render() {
    const item1Styl = {
      backgroundImage: `url("${renderPrgImage("yourprojectsgroupbutton")}")`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
    };
    const item2Styl = {
      backgroundImage: `url("${renderPrgImage("newfilegroupbutton")}")`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
    };
    return (
      <>
        <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
          <Link to={"/visualProgram"}>
            <img
              src={renderPrgImage("backBtn")}
              className="iconBtnSize PS-backbtn"
            />
          </Link>

          <img
            src={renderPrgImage("programmenucard")}
            className="PS-programmenucard"
          />
          <p className="PS-txt-Menu">Program</p>
          {this.state.isHelp ? (
            <div className="PS-S_slide">{/* <PrgmSelection /> */}</div>
          ) : (
            <img
              className="iconBtnSize PS-helpiconBtnSize"
              src={renderPrgImage("helpBtnInActive")}
              onClick={this.helpBtn}
            ></img>
          )}

          {this.state.isHelp ? (
            <img
              className="PS-helpClose"
              src={renderPrgImage("closBtn")}
              onClick={this.helpBtn}
            ></img>
          ) : null}

          <>
            <div
              className="PS-flowchartbased PS-item1"
              style={item2Styl}
              onClick={() => this.change("new")}
            >
              <div className="PS-sub1">
                <p className="PS-sub-txt">New Project</p>
              </div>
            </div>

            <div
              className="PS-flowchartbased PS-item2"
              style={item1Styl}
              onClick={() => this.change("saved")}
            >
              <div className="PS-sub1">
                <p className="PS-sub-txt">Your Project</p>
              </div>
            </div>
          </>
        </div>
      </>
    );
  }
}

export default ProgramSelection;

// const ProgramSelection = () => {

//     change = () => {

//         // socket.emit("/tutorialFile", "Final");
//         // this.props.history.push("/concept")
//         var selectionType = localStorage.getItem("programMode")
//         if (selectionType == "learn") {

//             socket.emit("/tutorialLevel", "Final.txt");
//             socket.on("_tutorialLevel", (dataToSend, portToSend, logicToSend, Description, end, conceptHelp, assemblyHelp, logicHelp) => {
//                 sessionStorage.setItem("tutorialConcept", dataToSend)
//                 sessionStorage.setItem("tutorialPort", JSON.stringify(portToSend))
//                 sessionStorage.setItem("tutorialLogic", JSON.stringify(logicToSend))
//                 sessionStorage.setItem("tutorialEnd", JSON.stringify(end))

//                 sessionStorage.setItem("logicHelp", logicHelp)
//                 sessionStorage.setItem("conceptHelp", conceptHelp)
//                 sessionStorage.setItem("assemblyHelp", assemblyHelp)

//                 // sessionStorage.setItem("tutorialDesc", JSON.stringify(Description))

//                 this.props.history.push("/concept")
//             })
//         }
//         else {
//             this.props.history.push("/concept")

//         }

//     }

//     return (
//         <div style={{height:"100vh",width:"100vw",margin:"0"}}>
//            <div className="main12">
//            <Link to="/midProgramming">   <img className="learn_hm_back_button" src="images/Learn/login_button_back.png" /></Link>
//                <div className="pg_selection_div">
//                 <div onClick={this.change}>
//                     <Link><img className="pg_selection_button" src="images/program/button_newproject.png"/></Link>
//                 </div>
//                 <div>
//                     <Link to="/Level"><img className="pg_selection_button" src="images/program/button_saveproject.png"/></Link>
//                 </div>
//                </div>
//            </div>
//         </div>
//      );
// }

// export default ProgramSelection;
