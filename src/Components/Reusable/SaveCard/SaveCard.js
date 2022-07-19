import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./SaveCard.css";
import renderPrgImage from "../../../source/programImg";

function SaveCard(props) {
  console.log("DA", props);
  let history = useHistory();
  const SaveProps = () => {
    history.push("/saveprogram");
    sessionStorage.setItem("saveProps", JSON.stringify(props));
  };

  const deletePrgIndex = () => {
    console.log("ID YE HAI", props.id);
    let deletedSession = JSON.parse(localStorage.getItem("projectData"));
    console.log(deletedSession);
    deletedSession.splice(props.id, 1);
    console.log(deletedSession, "NEW deletedSession ARRAY");
    localStorage.setItem("projectData", JSON.stringify(deletedSession));
    ///
    ///
    ///
    ///
    let deleted = JSON.parse(localStorage.getItem("SavedData"));
    console.log(typeof deleted);
    deleted.splice(props.id, 1);
    console.log(deleted, "NEW deleted ARRAY");
    localStorage.setItem("SavedData", JSON.stringify(deleted));
    setTimeout(() => {
      window.location.reload(false);
    }, 100);
  };

  return (
    // <Link to={{ pathname: "/saveprogram", data: { props } }}>
    <div className="Savecard_main">
      {/* <img
        className="Save_deleted"
        src={renderPrgImage("closed")}
        onClick={deletePrgIndex}
      ></img> */}
      <img
        className="img_Save"
        src={renderPrgImage("SaveProg")}
        height="100%"
        width="100%"
        onClick={SaveProps}
      ></img>
      <h4 className="Save_Names">
        {props.name} <br />{" "}
      </h4>
    </div>
    // </Link>
  );
}
export default SaveCard;
