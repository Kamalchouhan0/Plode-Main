import * as atatus from "atatus-spa";
import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import renderImage from "../../source/importImg";
import PortConnections from "../Assembly/PortConnections";
import components from "../concept/data"; //component details
import "./googleloginbtn.scss";
import "./login.css";
import animationStyle from "./loginAnimation.module.css";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    sessionStorage.clear();
  }
  componentDidMount = () => {
    sessionStorage.clear();

    var concept = { counter: [], componentProps: {} };
    var assembly = {
      components: components,
      PortConnections: PortConnections,
      workspace: {
        // bibox: { top: 100, left: 250 },
        bibox: { top: 208, left: 328 },
        components: {
          // Other components come here
          // eg. "led": [{top: 20, left: 80, connectedTo: 'A1'}, ...], ...
        },
        offset: { top: 0, left: 0 },
        scale: 1,
      },

      height: document.body.clientHeight,
      width: document.body.clientWidth,
    };
    var logic = {
      program: [
        {
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
        },
      ],
      end: { type: "end", state: "repeat" },
      insertState: false,

      offset: { left: 0, top: 0 },
      scale: 1,
      currentProgramGuide: 0,
      active: [-1, -1],
      bottomPanel: "border",
    };

    console.log("LOGIC", concept, assembly, logic, this);
    this.props.selecteComponent(concept);
    this.props.assemblyComponent(assembly);
    this.props.logicComponent(logic);

    // setTimeout(() => {
    //   this.props.history.push("/biboxSelection");
    // }, 3500);
  };

  render() {
    sessionStorage.clear();
    const loginFail = (response) => {
      window.alert(
        "Sign in with Google failed try again with a different Google account"
      );
      console.log(response);
    };
    const loginSuccess = (response) => {
      sessionStorage.setItem("userData", JSON.stringify(response.profileObj));
      atatus.setUser(
        response.profileObj.googleId,
        response.profileObj.email,
        response.profileObj.givenName + " " + response.profileObj.familyName
      );
      this.props.history.push("/biboxSelection");
    };
    return (
      <div className={animationStyle.MainSec}>
        <div
          className={animationStyle.MainSeclogo}
          style={{
            backgroundColor: "#FFBC45",
            borderEndEndRadius: "40% 100%",
            borderStartEndRadius: "40% 100%",
          }}
        >
          {" "}
          <img
            className={animationStyle.Main_Sec_Title}
            src={renderImage("bisoft_logo1")}
          ></img>
          {/* <Link to="/select-device"> */}
          <img
            className={animationStyle.Main_Sec_Rock}
            src={renderImage("leading_page")}
          ></img>
          {/* </Link> */}
        </div>
        <div className={animationStyle.Google_Login}>
          <GoogleLogin
            clientId="798914613502-eeirsjatcut3f8pljkbknd1hdkampga8.apps.googleusercontent.com"
            buttonText="Login"
            render={(renderProps) => (
              <div
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <div class="google-btn">
                  <div class="google-icon-wrapper">
                    <img
                      class="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    />
                  </div>
                  <p class="btn-text">
                    <b> Sign in with google</b>
                  </p>
                </div>
              </div>
            )}
            onSuccess={loginSuccess}
            onFailure={loginFail}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div style={{ position: "absolute", bottom: "2px", right: "5px" }}>
          <span
            style={{
              fontSize: "15px",
              color: "grey",
              fontFamily: "Halcyon_Regular",
            }}
          >
            Version: 1.0.0.1
          </span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selecteComponent: (data) => {
      dispatch({ type: "COMPONENT", payload: data });
    },

    assemblyComponent: (data) => {
      dispatch({ type: "ASSEMBLY", payload: data });
    },
    logicComponent: (data) => {
      dispatch({ type: "LOGIC_RESET", payload: data });
    },
  };
};

export default withRouter(connect(null, mapDispatchToProps)(login));

// export default login
