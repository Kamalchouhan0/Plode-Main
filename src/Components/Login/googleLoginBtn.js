import { useEffect, useState } from "react";
import { loadGoogleScript } from "./GoogleApiLoadScript";
import * as atatus from "atatus-spa";
import { exp } from "@tensorflow/tfjs-core";
const googleClientId =
  "798914613502-eeirsjatcut3f8pljkbknd1hdkampga8.apps.googleusercontent.com";
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";

function GoogleLoginBtn(props) {
  const [gapi, setGapi] = useState();
  const [googleAuth, setGoogleAuth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState();

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

  return <>{!isLoggedIn && <div id="google-signin"></div>}</>;
}

export default GoogleLoginBtn;
