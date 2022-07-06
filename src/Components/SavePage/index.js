import html2canvas from "html2canvas";
import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";
import renderPrgImage from "../../source/programImg";
import SavePrgm from "../ReusableComponents/PrgmSlider/SavePrgm/SavePrgm";
import "./save.css";
import { loadGoogleScript } from "../Login/GoogleApiLoadScript";
import { func } from "prop-types";

const googleClientId =
  "798914613502-eeirsjatcut3f8pljkbknd1hdkampga8.apps.googleusercontent.com";
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
const axios = require("axios");
const history = createBrowserHistory();
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
function gapiLoad() {
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

    _gapi.load("client", () => {
      intializeGapiClient(_gapi);
    });
  };

  //ensure everything is set before loading the script
  loadGoogleScript();
}
class SaveProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      discription: "",
      link: "",
      imgURL: "",
      isHelp: false,
      keys: false,
      l: false,
    };
  }
  componentDidMount = () => {
    console.log(sessionStorage.length);
    var self = this;
    gapiLoad(); ///function to load gapi and initiliz the client
    if (JSON.parse(sessionStorage.getItem("saveProps")) != null) {
      var div = (document.getElementById("assemblyShot").style.visibility =
        "hidden");
    } else {
      var div = document.getElementById("assemblyShot");

      for (let i = 0; i < sessionStorage.length; i++) {
        const keyss = sessionStorage.key(i);
        const ll = sessionStorage.getItem(keyss);
        this.setState({ keys: keyss });
        // localStorage.setItem(keyss, ll);
        this.setState({ l: ll });
        // this.state.keys = keyss;
        // this.state.l = ll;
        // const l = sessionStorage.getItem(keys);

        // const values = sessionStorage.value(i);
        // console.log(`${keyss}: ${sessionStorage.getItem(keyss)}`);
        // sessionStorage.setItem(`${keys}`, l);
      }
    }
    console.log("dataas", this.state.keys, this.state.l);
    // console.log("dataas", `${keyss}`, `${ll}`);
    if (
      sessionStorage.getItem("assempblyImageHTML") &&
      sessionStorage.getItem("assempblyImageHTML") != "" &&
      JSON.parse(sessionStorage.getItem("saveProps")) == null
    ) {
      div.innerHTML = sessionStorage.getItem("assempblyImageHTML");
      html2canvas(div).then(function (canvas) {
        div.innerHTML = "";
        var img = canvas.toDataURL("image/png");
        sessionStorage.setItem("assempblyImageURI", img);
        var imgTag = document.getElementById("screenshot");
        self.setState({ imgURL: img });
        imgTag.src = img;
      });
    }
    var div = document.getElementById("assemblyShot");
    div.innerHTML = sessionStorage.getItem("assempblyImageHTML");
  };

  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };
  helpBtn = (e) => {
    this.setState({ isHelp: !this.state.isHelp });
  };
  save = async () => {
    console.log("SAVE BTN CLICK");
    var x = document.getElementById("SaveAlert");
    x.className = "show";

    /////////////////
    //   CREATING A NEW FOLDER NAME PLODE ON GDRIVE
    var accessToken = window.gapi.auth.getToken().access_token;

    let folderFlag = true;
    let folderid;
    let list;
    try {
      list = await window.gapi.client.drive.files.list({
        pageSize: 10,
        fields: "files(id, name)",
        q: `mimeType='application/vnd.google-apps.folder' and name='PlodeAppData'`,
      });
    } catch (e) {
      console.error(e);
      return;
    }
    console.log("listed files", list);
    const files = list.result.files;

    if (!files || files.length == 0) {
      folderFlag = false;
    } else {
      folderFlag = true;
      folderid = files[0].id;
    }
    if (folderFlag == false) {
      const FolderMeta = {
        name: "PlodeAppData",
        mimeType: "application/vnd.google-apps.folder",
      };
      var folderform = new FormData();
      folderform.append(
        "metadata",
        new Blob([JSON.stringify(FolderMeta)], {
          type: "application/json",
        })
      );
      await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true",
        {
          method: "POST",
          headers: new Headers({ Authorization: "Bearer " + accessToken }),
          body: folderform,
        }
      )
        .then((res) => {
          return res.json();
        })
        .then(function (val) {
          folderid = val.id;
        });
    }

    /////////////////////////

    /////updating PROJECTDATA IN GDRIVE
    let allData = {
      ...this.state,
      bytes: JSON.parse(sessionStorage.getItem("Bytes")),
    };
    // console.log("DATA BATA:", allData);
    let listProjectData,
      idProjectData = false;
    try {
      listProjectData = await window.gapi.client.drive.files.list({
        pageSize: 10,
        fields: "files(id, name)",
        q: ` name='ProjectData.pld'`,
      });
    } catch (e) {
      console.error(e);
      return;
    }
    console.log("listed files", listProjectData);
    const projectData = listProjectData.result.files;

    if (!projectData || projectData.length == 0) {
      console.log("Project Data not found", projectData);
      idProjectData = false;
    } else {
      idProjectData = projectData[0].id;
      console.log("Project Data found", projectData);
    }
    let getProjectData;
    let formData;
    if (idProjectData != false) {
      try {
        getProjectData = await window.gapi.client.drive.files.get({
          fileId: idProjectData,
          alt: "media",
        });
        console.log(getProjectData);
        formData = getProjectData.result;
      } catch (error) {}
    } else {
      formData = [];
    }

    // let formData = JSON.parse(localStorage.getItem("projectData")) || [];
    formData.push(allData);
    const projectDataBlob = new Blob([JSON.stringify(formData)], {
      type: "application/json",
    });
    const projectDataMetadata = {
      name: `ProjectData.pld`,
      parents: [folderid],
    };
    var projectform = new FormData();
    projectform.append(
      "metadata",
      new Blob([JSON.stringify(projectDataMetadata)], {
        type: "application/json",
      })
    );
    projectform.append("file", projectDataBlob);
    await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true",
      {
        method: "POST",
        headers: new Headers({ Authorization: "Bearer " + accessToken }),
        body: projectform,
      }
    )
      .then((res) => {
        return res.json();
      })
      .then(function (val) {
        console.log(val);
      });

    //////////////////////////////

    // localStorage.setItem("projectData", JSON.stringify(formData));
    // sessionStorage.setItem("projectData", JSON.stringify(allData));

    let history = {
      name: this.state.name,
      Reload: JSON.parse(sessionStorage.getItem("Reload")),
      assemblyCheckbox: JSON.parse(sessionStorage.getItem("assemblyCheckbox")),
      flatPrograms: JSON.parse(sessionStorage.getItem("flatPrograms")),
      AppDetails: JSON.parse(sessionStorage.getItem("AppDetails")),

      planeOffset: JSON.parse(sessionStorage.getItem("planeOffset")),
      shield: JSON.parse(sessionStorage.getItem("shield")),
      connectedDevice: sessionStorage.getItem("connectedDevice"),
      programEnd: sessionStorage.getItem("programEnd"),

      convert_Bytes: sessionStorage.getItem("convert_Bytes"),
      Hardware: sessionStorage.getItem("Hardware"),
      pageReloadConcept: sessionStorage.getItem("pageReloadConcept"),
      coverflowActive: sessionStorage.getItem("coverflowActive"),
      simulate: JSON.parse(sessionStorage.getItem("simulate")),

      play_btn: sessionStorage.getItem("play_btn"),

      flowlogic: JSON.parse(sessionStorage.getItem("flow-logic")),

      assempblyImageURI: sessionStorage.getItem("assempblyImageURI"),
      concept: JSON.parse(sessionStorage.getItem("concept")),
      assembly: JSON.parse(sessionStorage.getItem("assembly")),
      logic: JSON.parse(sessionStorage.getItem("logic")),
    };
    console.log(history.concept, "kghjfgyjhresg");

    /////////UPDATING SAVED DATA TO GDRIVE
    let listSaveData;
    let idSaveData = false;
    try {
      listSaveData = await window.gapi.client.drive.files.list({
        pageSize: 10,
        fields: "files(id, name)",
        q: ` name='SaveData.pld'`,
      });
    } catch (e) {
      console.error(e);
      return;
    }
    console.log("listed files", listProjectData);
    const SaveData = listSaveData.result.files;
    if (!SaveData || SaveData.length == 0) {
      console.log("Save Data not found", SaveData);
      idSaveData = false;
    } else {
      idProjectData = SaveData[0].id;
      console.log("Save Data found", SaveData);
    }
    let getSaveData;
    let saveData;
    if (idSaveData != false) {
      try {
        getSaveData = await window.gapi.client.drive.files.get({
          fileId: idProjectData,
          alt: "media",
        });
        console.log(getSaveData);
        saveData = getSaveData.result;
      } catch (error) {}
    } else {
      saveData = [];
    }
    // let saveData = JSON.parse(localStorage.getItem("SavedData")) || [];
    saveData.push(history);
    // localStorage.setItem("SavedData", JSON.stringify(saveData));
    const saveDataBlob = new Blob([JSON.stringify(saveData)], {
      type: "application/json",
    });
    // localStorage.setItem("SavedData", JSON.stringify(history));

    // const saveFile = async (blob) => {
    //   // const a = document.createElement("a");
    //   // console.log("OBJECT", this.state);
    //   // let aaa = this.state.name;
    //   // a.download = `${aaa}.json`;
    //   // a.href = URL.createObjectURL(blob);
    //   // a.addEventListener("click", (e) => {
    //   //   setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    //   // });
    //   // a.click();
    // };

    const fileMetadata = {
      name: `SaveData.pld`,
      parents: [folderid],
    };
    var form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(fileMetadata)], { type: "application/json" })
    );
    form.append("file", saveDataBlob);
    await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true",
      {
        method: "POST",
        headers: new Headers({ Authorization: "Bearer " + accessToken }),
        body: form,
      }
    )
      .then((res) => {
        return res.json();
      })
      .then(function (val) {
        console.log("file saved", val);
        x.innerHTML = "Your project has been saved";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
          this.history.push("/simulate");
        }, 1500);
      });
    // saveFile(blob);
    // if (sessionStorage.getItem("saveProps") == null) {
    //   Object.keys(history).map((key, value) => {
    //     console.log("KEYS", key, value);
    //     switch (key) {
    //       case "concept": {
    //         sessionStorage.setItem("concept", history.concept);
    //       }
    //       case "assembly": {
    //         sessionStorage.setItem("assembly", history.assembly);
    //       }
    //       case "logic": {
    //         sessionStorage.setItem("logic", history.logic);
    //       }
    //       // case "concept": {
    //       //   sessionStorage.setItem("concept", history.concept);
    //       // }
    //       // case "concept": {
    //       //   sessionStorage.setItem("concept", history.concept);
    //       // }
    //     }
    //   });
    // }
  };

  ///function to retrive data from local storage
  saveData = () => {
    console.log("dataas NEXT BTN", this.state.keys, this.state.l);
    let hhh = JSON.parse(localStorage.getItem("SavedData"));
    console.log("Names", hhh[0].name);

    let names = JSON.parse(sessionStorage.getItem("saveProps")) || null;
    console.log("KK", names);

    for (let i = 0; i < hhh.length; i++) {
      if (names.name == hhh[i].name) {
        console.log("KK", hhh[i].concept);
        Object.keys(hhh[i]).map((key, value) => {
          console.log("KEYS", key, value);
          switch (key) {
            case "concept": {
              sessionStorage.setItem("concept", JSON.stringify(hhh[i].concept));
            }
            case "assembly": {
              sessionStorage.setItem(
                "assembly",
                JSON.stringify(hhh[i].assembly)
              );
            }
            case "logic": {
              sessionStorage.setItem("logic", JSON.stringify(hhh[i].logic));
            }
            // case "concept": {
            //   sessionStorage.setItem("concept", history.concept);
            // }
            // case "concept": {
            //   sessionStorage.setItem("concept", history.concept);
            // }
          }
        });
      }
    }

    this.props.history.push("/selectScreen/InternalAccessories");

    // console.log(history, "kghjfgyjhresg");
    // for (let i = 0; i < sessionStorage.length; i++) {
    //   const keys = sessionStorage.key(i);
    //   const l = sessionStorage.getItem(keys);
    //   // console.log("dataas", l);
    //   // const values = sessionStorage.value(i);
    //   // console.log(`${key}: ${sessionStorage.getItem(key)}`);
    //   sessionStorage.setItem(`${keys}`, l);
    // }
  };

  render() {
    // console.log("dtat", this.props.location.data.props);

    let v = JSON.parse(sessionStorage.getItem("saveProps")) || null;
    return (
      <div
        style={{ height: "100vh", width: "100vw", position: "relative" }}
        className="savePageConatiner"
      >
        <div
          style={{
            position: "absolute",
            top: "3%",
            width: "95%",
            height: "10vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifyContent: "flex-start",
            // border: "1px solid red",
            marginLeft: "3%",
            position: "relative",
          }}
        >
          {v != null ? (
            <Link to="/savedprogram">
              <img
                className="iconBtnSize imgBackBtn"
                src={renderPrgImage("backBtn")}
                style={{
                  marginTop: "1%",
                  marginRight: "3%",
                  cursor: "pointer",
                }}
                // onClick={() => (window.location.href = "/savedprogram")}
              />
            </Link>
          ) : (
            <Link to="/simulate">
              <img
                className="iconBtnSize imgBackBtn"
                src={renderPrgImage("backBtn")}
                style={{
                  marginTop: "1%",
                  marginRight: "3%",
                  cursor: "pointer",
                }}
                // onClick={() => (window.location.href = "/simulate")}
              />
            </Link>
          )}
          {/* <img
            className="iconBtnSize imgBackBtn"
            src={renderPrgImage("backBtn")}
            style={{ marginTop: "1%", marginRight: "3%", cursor: "pointer" }}
            onClick={() => (window.location.href = "/simulate")}
          /> */}
          <p className="saveHeadingTxt">Save Your Project</p>

          {this.state.isHelp ? (
            <div className="Slide">
              <SavePrgm />
            </div>
          ) : (
            <img
              className="iconBtnSize imgBackBtn"
              src={renderPrgImage("helpBtnInActive")}
              style={{
                marginTop: "1%",
                marginRight: "1.5%",
                position: "absolute",
                right: "0",
                cursor: "pointer",
              }}
              onClick={this.helpBtn}
            />
          )}

          {this.state.isHelp ? (
            <img
              className="hpClose"
              src={renderPrgImage("closBtn")}
              onClick={this.helpBtn}
            ></img>
          ) : null}
        </div>
        <div className="item-2">
          <div className="SavePageinputdetails">
            {v != null ? (
              <input
                className="nameInputDetails saveHeadingTxt2"
                type="text"
                name="name"
                value={"Name" + " ".repeat(23) + v.name}
                onChange={this.handleChange}
              />
            ) : (
              <input
                className="nameInputDetails saveHeadingTxt2"
                type="text"
                name="name"
                placeholder="Name"
                onChange={this.handleChange}
              />
            )}
            {/* <input
              className="nameInputDetails saveHeadingTxt2"
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
            /> */}

            {v != null ? (
              <textarea
                className="descriptionInputDetails saveHeadingTxt2"
                name="discription"
                placeholder="Description"
                value={"Description" + "\n \n" + v.des}
                onChange={this.handleChange}
              />
            ) : (
              <textarea
                className="descriptionInputDetails saveHeadingTxt2"
                name="discription"
                placeholder="Description"
                onChange={this.handleChange}
              />
            )}
            {/* <textarea
              className="descriptionInputDetails saveHeadingTxt2"
              name="discription"
              placeholder="Description"
              onChange={this.handleChange}
            /> */}

            {v != null ? (
              <input
                className="nameInputDetails saveHeadingTxt2"
                type="text"
                name="link"
                value={"Video Link" + " ".repeat(23) + v.link}
                onChange={this.handleChange}
              />
            ) : (
              <input
                className="nameInputDetails saveHeadingTxt2"
                type="text"
                name="link"
                placeholder="Video Link"
                onChange={this.handleChange}
              />
            )}

            {/* <input
              className="nameInputDetails saveHeadingTxt2"
              type="text"
              name="link"
              placeholder="Video Link.."
              onChange={this.handleChange}
            /> */}
          </div>
          <div className="SavePageImgdetails saveHeadingTxt2">
            <p>Add Images</p>
            {/* <div
              style={{
                height: "70%",
                width: "90%",
                backgroundColor: "#F5F5F5",
                marginTop: "15px",
                border: "1px solid red",
              }}
            > */}{" "}
            {v != null ? (
              <div
                style={{
                  height: "70%",
                  width: "90%",
                  backgroundColor: "#F5F5F5",
                  marginTop: "15px",
                  // border: "1px solid red",
                }}
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "30px",
                  }}
                  src={v.ig}
                />
              </div>
            ) : (
              <div
                style={{
                  height: "70%",
                  width: "90%",
                  backgroundColor: "#F5F5F5",
                  marginTop: "15px",
                  // border: "1px solid red",
                }}
              >
                <img
                  id="screenshot"
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "30px",
                  }}
                  src={this.state.imgURL}
                />
              </div>
            )}
            {/* <img
                id="screenshot"
                style={{ height: "100%", width: "100%", borderRadius: "30px" }}
                src={this.state.imgURL}
              /> */}
            {/* </div> */}
            {v != null ? (
              <Link
                to={{
                  pathname: "/selectScreen/InternalAccessories",
                  data: v.name,
                }}
              >
                <img
                  style={{
                    height: "60px",
                    width: "60px",
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    zIndex: "100",
                    cursor: "pointer",
                  }}
                  src={renderPrgImage("nextBtn")}
                  // onClick={() =>
                  //   (window.location.href = "/selectScreen/InternalAccessories")
                  // }
                  onClick={this.saveData}
                />
              </Link>
            ) : (
              <img
                src={renderPrgImage("saveBtn")}
                style={{
                  height: "75px",
                  width: "75px",
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  cursor: "pointer",
                }}
                onClick={this.save}
              />
            )}
            <div id="assemblyShot"></div>
            <div id="SaveAlert">Saving Project...</div>
          </div>
        </div>
      </div>
    );
    // return (
    //   <div style={{ height: "100vh", width: "100vw" }}>
    //     {/* back button */}
    //     <img
    //       alt="adfaf"
    //       onClick={() => (window.location.href = "/#/simulate")}
    //       src="imagesplay/button_back.png"
    //       style={{
    //         position: "absolute",
    //         top: "10px",
    //         width: "50px",
    //         cursor: "pointer",
    //         left: "10px",
    //       }}
    //     />
    //     <div style={{ display: "inline-block", width: "60%", height: "100%" }}>
    //       <div className="main">
    //         <div>
    //           <label for="input1">Project Name:&nbsp;</label>
    //           <input
    //             id="input1"
    //             type="text"
    //             name="name"
    //             onChange={this.handleChange}
    //           ></input>
    //         </div>
    //         <div>
    //           <label for="input2">Discription:&nbsp;&nbsp;&nbsp;</label>
    //           <input
    //             id="input2"
    //             type="text"
    //             name="discription"
    //             style={{ height: "80px" }}
    //             onChange={this.handleChange}
    //           ></input>
    //         </div>
    //         <div>
    //           <label for="input3">Video Link:&nbsp;&nbsp;&nbsp;</label>
    //           <input
    //             id="input3"
    //             type="text"
    //             name="link"
    //             onChange={this.handleChange}
    //           ></input>
    //         </div>
    //       </div>
    //     </div>
    //     <div style={{ width: "40%", height: "100%", float: "right" }}>
    //       <div className="right_div">
    //         {/* <div id='screenshot' style={{backgroundImage:`url(${this.state.imgURL})`,height:"100%",width:"100%",backgroundSize:"contain"}}></div> */}
    //         <img
    //           id="screenshot"
    //           style={{ height: "100%", width: "100%", borderRadius: "30px" }}
    //           src={this.state.imgURL}
    //         />
    //       </div>
    //       <div style={{ position: "absolute", top: "88vh", left: "92vw" }}>
    //         <img
    //           onClick={this.save}
    //           src="images/Learn/learn_button_save.png"
    //           style={{ height: "50px", width: "50px" }}
    //         />
    //       </div>
    //     </div>
    //     <div id="assemblyShot"></div>
    //   </div>
    // );
  }
}

export default SaveProgram;
