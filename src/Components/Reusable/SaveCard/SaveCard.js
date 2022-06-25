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

  return (
    // <Link to={{ pathname: "/saveprogram", data: { props } }}>
    <div className="Savecard_main" onClick={SaveProps}>
      <img
        className="img_Save"
        src={renderPrgImage("SaveProg")}
        height="100%"
        width="100%"
      ></img>
      <h4 className="Save_Names">
        {props.name} <br />{" "}
      </h4>
    </div>
    // </Link>
  );
}
export default SaveCard;
