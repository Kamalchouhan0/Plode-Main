import React, { Component } from "react";
import ComponentsSelected from "./ComponentsSelected";
import SidebarCard from "./SidebarCard";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    var leng = Object.keys(this.props.sidebarContents).length;
    for (var i = 0; i < leng; i++) {
      ComponentsSelected[
        this.props.components[this.props.sidebarContents[i]].name
      ] = "true";
    }

    return (
      <div
        className="sidebarGrid"
        style={{ height: "100%", width: "100%", overflowY: "auto" }}
      >
        {this.props.sidebarContents.map(function (element, index) {
          return (
            <SidebarCard
              height={150}
              name={this.props.components[element].name}
              url={this.props.components[element].url}
              remove={this.props.remove}
              index={index}
              key={index}
              projId={this.props.projId}
              appState={this.props.appState}
            />
          );
        }, this)}
      </div>
    );
  }
}

export default Sidebar;
