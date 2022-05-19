import React from "react";
import { Route, Switch } from "react-router-dom";
import Digital from "./Digital";
import FlowchartPage from "./FlowchartPage";
import InputOutput from "./Input";
import InternalAccessories from "./InternalAccessories";
import Port from "./Port";
import ProgramSelection from "./programSelection";

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
      </Switch>
    </>
  );
}

export default Flow;
