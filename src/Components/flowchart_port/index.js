import React from "react";
import {
  Switch,
  Route,
  // Redirect
} from "react-router-dom";
import Port from "./Port";
import InputOutput from "./Input";
import Digital from "./Digital";
import FlowchartPage from "./FlowchartPage";
import InternalAccessories from "./InternalAccessories";
import ProgramSelection from "./programSelection";
import SaveFlow from "../SavePageFlow";
import SavedFlow from "../SavePageFlow/savedFlow";
import Header from "./Header";

function Flow(props) {
  return (
    <>
      <Switch>
        <Route exact path="/flow" component={ProgramSelection} />
        <Route
          exact
          path="/flow/InternalAccessories"
          component={InternalAccessories}
        />
        <Route exact path="/flow/selectports" component={Port} />
        <Route exact path="/flow/input-output" component={InputOutput} />
        <Route exact path="/flow/digital-analog" component={Digital} />
        <Route exact path="/flow/flowchart" component={FlowchartPage} />
        <Route exact path="/flow/save" component={SaveFlow} />
        <Route exact path="/flow/savedFlow" component={SavedFlow} />
      </Switch>
    </>
  );
}

export default Flow;
