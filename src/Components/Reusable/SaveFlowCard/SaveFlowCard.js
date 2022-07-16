import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import savedFlowcss from "./SaveFlowCard.module.css";
import renderPrgImage from "../../../source/programImg";

function SaveFlowCard(props) {
  console.log("DA", props);
  let history = useHistory();

  const SaveProps = () => {
    history.push("/flow/save");
    sessionStorage.setItem("saveFlowProps", JSON.stringify(props));
  };

  const deleteIndex = () => {
    console.log("ID YE HAI", props.id);
    let deletedSession = JSON.parse(localStorage.getItem("FlowData"));
    console.log(deletedSession);
    deletedSession.splice(props.id, 1);
    console.log(deletedSession, "NEW deletedSession ARRAY");
    localStorage.setItem("FlowData", JSON.stringify(deletedSession));
    ///
    ///
    ///
    ///
    let deleted = JSON.parse(localStorage.getItem("SavedFlowData"));
    console.log(typeof deleted);
    deleted.splice(props.id, 1);
    console.log(deleted, "NEW deleted ARRAY");
    localStorage.setItem("SavedFlowData", JSON.stringify(deleted));
    setTimeout(() => {
      window.location.reload(false);
    }, 100);
  };

  return (
    // <Link to={{ pathname: "/saveprogram", data: { props } }}>
    <div className={savedFlowcss.Savecard_main}>
      <img
        className={savedFlowcss.Save_delete}
        src={renderPrgImage("closed")}
        onClick={deleteIndex}
      ></img>
      <img
        className={savedFlowcss.img_Save}
        src={renderPrgImage("SaveProg")}
        height="100%"
        width="100%"
        onClick={SaveProps}
      ></img>
      <h4 className={savedFlowcss.Save_Names}>
        {props.name} <br />{" "}
      </h4>
    </div>
    // </Link>
  );
}
export default SaveFlowCard;
