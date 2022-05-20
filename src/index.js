import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducer from "./redux/reducers";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { browserName, browserVersion } from "react-device-detect";

import { BrowserRouter, HashRouter } from "react-router-dom";
import * as atatus from "atatus-spa";
import $ from "jquery";

atatus.config("bf5a70b588d943b2bcce5a4fc6558d42").install();
const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
);
var supportedBrowser = false;
console.log(browserName, browserVersion);
if (
  browserName == "Chrome" ||
  browserName == "Edge" ||
  browserName == "Opera"
) {
  if (parseInt(browserVersion) > 89) {
    console.log(parseInt(browserVersion), "versionbrowser");
    supportedBrowser = true;
  }
}
// const isOpera =
//   (!!window.opr && !!opr.addons) ||
//   !!window.opera ||
//   navigator.userAgent.indexOf(" OPR/") >= 0;
// const isSafari =
//   /constructor/i.test(window.HTMLElement) ||
//   (function (p) {
//     return p.toString() === "[object SafariRemoteNotification]";
//   })(
//     !window["safari"] ||
//       (typeof safari !== "undefined" && safari.pushNotification)
//   );

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      {/* <React.StrictMode> */}
      {supportedBrowser ? (
        <App />
      ) : (
        window.alert(
          "Kindly use the latest version of Google Chrome or Microsoft Edge to view this website"
        )
      )}

      {/* </React.StrictMode> */}
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
