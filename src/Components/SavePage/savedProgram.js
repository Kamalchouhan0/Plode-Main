import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import renderPrgImage from "../../source/programImg";
import SaveCard from "../Reusable/SaveCard/SaveCard";
import { loadGoogleScript } from "../Login/GoogleApiLoadScript";
import ReactLoading from "react-loading";
const history = createBrowserHistory();

// class SavedProgram extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { allSavedProgrm: [] };
//   }

//   componentDidMount = () => {
//     let self = this;
//     self.getProject();
//   };

//   getProject = () => {
//     //   self.props.assemblyComponent(response.data.assembly.workspace);
//     //   self.props.PortConnections(response.data.assembly.PortConnections);
//     //   self.props.update(response.data.logic);

//     // self.props.assemblyComponent(response.data.assembly.workspace);
//     // self.props.PortConnections(response.data.assembly.PortConnections);
//     // self.props.update(response.data.logic);

//     let self = this;
//     axios
//       .get(`http://localhost:3008/getProject`)
//       .then(function (response) {
//         self.setState({ allSavedProgrm: response.data });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   deleteProject = (id) => {
//     console.log("id received ..", id);
//     let self = this;
//     axios
//       .post(`http://localhost:3008/deleteProject/${id}`)
//       .then(function (response) {
//         self.getProject();
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   render() {
//     console.log("...", this.state.allSavedProgrm);

//     return (
//       <div className="container-fluid">
//         {/* <div className="row"> */}
//         {this.state.allSavedProgrm.length > 0 ? (
//           <div className="row">
//             {this.state.allSavedProgrm.map((el) => (
//               <div className="col-3 savedProgramMainCon">
//                 {/*bg-light text-dark project_card */}
//                 <div className="card mt-3 bg-light text-dark project_card  ">
//                   <img
//                     src="images/Learn/hex_save_bg.png"
//                     class="card-img-top"
//                     alt="..."
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{el.name}</h5>
//                     <p className="card-text">{el.discription}</p>
//                     <div className="row">
//                       <Link
//                         to={`/project/${el.name}`}
//                         className="btn btn-primary ml-2"
//                       >
//                         VIEW PROJECT
//                       </Link>
//                       <button
//                         onClick={() => this.deleteProject(el.name)}
//                         className="btn btn-danger ml-2"
//                       >
//                         DELETE PROJECT
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="row">
//             <div
//               style={{
//                 backgroundColor: "white",
//                 height: "100vh",
//                 width: "100vw",
//               }}
//             >
//               <div className="loading">
//                 <h1>Loading Projects </h1>
//                 <ReactLoading
//                   type="bubbles"
//                   color="blue"
//                   className="loading_gif"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
const googleClientId =
  "798914613502-eeirsjatcut3f8pljkbknd1hdkampga8.apps.googleusercontent.com";
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
async function intializeGapiClient(_gapi) {
  await window.gapi.client.init({
    apiKey: "AIzaSyBNXW73e0C_wzGc2B7g_BMiUwe7hX2f4_s",
    discoveryDocs: [DISCOVERY_DOC],
    scope: "drive profile",
  });
  await window.gapi.client.load("drive", "v3");
  // gapiInited = true;
  // maybeEnableButtons();
}
async function listFiles() {
  console.log("listFiles");
  let response;
  try {
    response = await window.gapi.client.drive.files.list({
      pageSize: 10,
      fields: "files(id, name)",
      q: "name = 'ProjectData.pld'",
    });
    // download = await window.gapi.client.drive.files.get({
    //   fileId: response.result.files[0].id,
    //   alt: "media",
    // });
  } catch (err) {
    console.log(err);
    return;
  }
  // console.log("dwn", download);
  const files = response.result.files;
  if (!files || files.length == 0) {
    console.log("No files found.");
    return null;
  }
  // Flatten to string to display
  const fileId = files[0].id;
  return fileId;
}
class SavedProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSavedProgrm: [],
      noSavedProgrm: false,
    };
  }

  componentDidMount = () => {
    //window.gapi is available at this point
    window.onGoogleScriptLoad = () => {
      const _gapi = window.gapi;
      // setGapi(_gapi);
      _gapi.load("auth2", () => {
        (async () => {
          const _googleAuth = await _gapi.auth2.init({
            client_id: googleClientId,
          });
          console.log("auth", _googleAuth);
          // setGoogleAuth(_googleAuth);
          // renderSigninButton(_gapi);
        })();
      });

      _gapi.load("client", async () => {
        await intializeGapiClient(_gapi);
      });
    };

    //ensure everything is set before loading the script
    loadGoogleScript();
    setTimeout(() => {
      this.listProjectFiles();
    }, 2000);
  };

  deleteProject = (id) => {
    console.log("id received ..", id);
    let self = this;
    axios
      .post(`http://localhost:3008/deleteProject/${id}`)
      .then(function (response) {
        self.getProject();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  listProjectFiles = async () => {
    // console.log(e);
    let id = await listFiles();
    console.log(id);
    if (id != null) {
      let getProjectData;
      let formData;
      try {
        getProjectData = await window.gapi.client.drive.files.get({
          fileId: id,
          alt: "media",
        });
        console.log(getProjectData);
        formData = JSON.parse(getProjectData.body);
        console.log(JSON.stringify(formData));
      } catch (e) {}

      if (JSON.stringify(formData) != "[]") {
        this.setState({ allSavedProgrm: [formData] });
      } else {
        this.setState({ noSavedProgrm: true });
      }
    } else {
      this.setState({ noSavedProgrm: true });
    }
  };
  backbtn = (e) => {
    this.props.history.push("/programSelection");
    sessionStorage.setItem("saveProps", null);
  };

  // uupload = async (doc) => {
  uupload = async () => {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.addEventListener("change", () => {
        resolve(input.files[0]);
        console.log("data", input.files[0]);

        // window.location.href = "/selectScreen/InternalAccessories";
        var fileread = new FileReader();
        fileread.readAsText(input.files[0]);
        fileread.onload = function (e) {
          var content = e.target.result;
          var intern = JSON.parse(content); // parse json
          console.log(intern); // You can index every object

          for (let i = 0; i < sessionStorage.length; i++) {
            const keyss = sessionStorage.key(i);
            const ll = sessionStorage.getItem(keyss);
            sessionStorage.setItem("projects", JSON.stringify(intern));
          }
        };
      });
      input.click();
    });
  };
  // };
  render() {
    console.log("...", this.state.allSavedProgrm);
    // localStorage.removeItem("SavedData");
    // let el = JSON.parse(sessionStorage.getItem("projectData"));

    const renderSaveitem = (el, index) => {
      console.log("INDEX", index);
      if (index < 20) {
        return (
          <div style={{ height: "120%", width: "100%" }}>
            <SaveCard
              id={index}
              name={el.name}
              des={el.discription}
              link={el.link}
              ig={el.imgURL}
              bytes={el.bytes}
            />
          </div>
        );
      }
    };
    return (
      <div className="savedProgramContainer" style={{ overflow: "hidden" }}>
        {/* <div className="row"> */}
        {/* <Link to={"/programSelection"}> */}
        <img
          src={renderPrgImage("backBtn")}
          className="iconBtnSize PS-backbtn"
          onClick={this.backbtn}
        />
        <h1
          style={{
            position: "absolute",
            top: "4%",
            left: "9%",
            fontSize: "1.6em",
          }}
        >
          Your Projects
        </h1>
        {/* </Link> */}
        {this.state.allSavedProgrm.length > 0 &&
        this.state.allSavedProgrm[0] != null ? (
          <div className="SavedProgramRow">
            {/* <img
              style={{
                height: "70px",
                width: "70px",
                position: "absolute",
                top: "45%",
                left: "45%",
              }}
              src={renderPrgImage("uploadBtn")}
              onClick={this.uupload}
            ></img> */}

            {this.state.allSavedProgrm[0].map((el, index) => {
              return renderSaveitem(el, index);
              // <div className="card mt-3 bg-light text-dark project_card  ">
              // <div className="SavedProgramCard project_card">
              //   {/* <img
              //     src={renderPrgImage("SaveProg")}
              //     class="cardImg"
              //     alt="..."
              //   /> */}
              //   <div className="SaveProgCard_body">
              //     <div
              //       style={{
              //         width: "92%",
              //         marginLeft: "5%",
              //       }}
              //     >
              //       <p className="SaveProgcard-title">{el.name}</p>
              //       {/* <p className="SaveProgcard-text">{el.discription}</p> */}
              //     </div>
              //     <div className="SavedProgramRow">
              //       <Link
              //         to={`/project/${el.name}`}
              //         className="btn btn-primary ml-2"
              //       >
              //         VIEW PROJECT
              //       </Link>
              //       {/* <div
              //         onClick={() => this.deleteProject(el.name)}
              //         className="btn btn-danger ml-2"
              //       >
              //         DELETE PROJECT
              //       </div> */}
              //     </div>
              //   </div>
              // </div>
            })}
          </div>
        ) : (
          <div className="row">
            <div
              style={{
                backgroundColor: "white",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
              }}
            >
              <div className="loading">
                {this.state.noSavedProgrm ? (
                  <h1
                    style={{
                      textAlign: "center",
                      color: "gray",
                      fontSize: "25px",
                    }}
                  >
                    No Saved Projects!!!! <br />
                    Once you save a project,it will be shown here.{" "}
                  </h1>
                ) : (
                  <ReactLoading
                    type="spin"
                    color="orange"
                    className="loading_gif"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SavedProgram;
