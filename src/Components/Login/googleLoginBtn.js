import { useEffect, useState } from "react";
import { loadGoogleScript } from "./GoogleApiLoadScript";
import * as atatus from "atatus-spa";
import { exp } from "@tensorflow/tfjs-core";
import ReactLoading from "react-loading";
const googleClientId =
  "798914613502-eeirsjatcut3f8pljkbknd1hdkampga8.apps.googleusercontent.com";
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
async function readProjectData() {
  console.log("SAVE BTN CLICK");

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
      formData = JSON.parse(getProjectData.body);
      console.log("formData", formData);
      // formData.push(allData);
    } catch (error) {}
  } else {
    formData = [];
    // formData.push(allData);
  }
  console.log(formData);
  let gdrivenames = "";
  for (let i in formData) {
    console.log(i);
    gdrivenames += formData[i].name + " ";
  }
  sessionStorage.setItem("gdrivenames", gdrivenames);
}
function GoogleLoginBtn(props) {
  const [gapi, setGapi] = useState();
  const [googleAuth, setGoogleAuth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async (googleUser) => {
    console.log(googleUser);
    setIsLoggedIn(true);
    const profile = googleUser.getBasicProfile();
    console.log("profile", profile);
    setName(profile.getName());
    setEmail(profile.getEmail());
    setImageUrl(profile.getImageUrl());
    sessionStorage.setItem("userData", JSON.stringify(profile));
    atatus.setUser(profile.getId(), email, name);
    setIsLoading(true);
    await readProjectData();
    setIsLoading(false);
    props.history.push("/biboxSelection");
  };
  const onFailure = () => {
    window.alert(
      "Sign in with Google failed try again with a different Google account"
    );
    setIsLoggedIn(false);
  };

  const renderSigninButton = (_gapi) => {
    _gapi.signin2.render("google-signin", {
      scope: "profile email  https://www.googleapis.com/auth/drive",
      width: 240,
      height: 50,
      longtitle: false,
      theme: "dark",
      onsuccess: onSuccess,
      onfailure: onFailure,
    });
  };
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
  useEffect(() => {
    //window.gapi is available at this point
    window.onGoogleScriptLoad = () => {
      const _gapi = window.gapi;
      setGapi(_gapi);
      _gapi.load("auth2", () => {
        (async () => {
          const _googleAuth = await _gapi.auth2.init({
            client_id: googleClientId,
          });
          console.log("auth", _googleAuth);
          setGoogleAuth(_googleAuth);
          renderSigninButton(_gapi);
        })();
      });

      _gapi.load("client", () => {
        intializeGapiClient(_gapi);
      });
    };

    //ensure everything is set before loading the script
    loadGoogleScript();
  }, []);

  return (
    <>
      {isLoading ? (
        <div style={{ marginRight: "30px" }}>
          <ReactLoading type="spin" color="orange" height={40} width={40} />
        </div>
      ) : (
        !isLoggedIn && <div id="google-signin"></div>
      )}
    </>
  );
}

export default GoogleLoginBtn;
