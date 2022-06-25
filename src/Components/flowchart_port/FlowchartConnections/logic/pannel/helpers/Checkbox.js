import React, { Component } from "react";


class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickChecked: this.props.checked,
    };
  }

  handleClickChecked = () => {
    console.log("click me");
    this.props.onChange(!this.state.isClickChecked);
    this.setState({ isClickChecked: !this.state.isClickChecked });
  };

  render() {
    const { checked, onChange, label, disabled, activePort } = this.props;

    console.log(checked, this.state.isClickChecked, "gkaay checkbox");

    var style = {
      width: "1.5em",
      height: "1.5em",
      display: "inline-block",
      borderRadius: "20px",
      marginRight: "1em",
      backgroundColor: "white",
    };
    if (checked) {
      style.boxShadow = "inset 0 0 0 0em #FFF";
      style.backgroundColor = "green";
    }

    if (this.props.hexComponentType === "start") {
      return (
        <div
          className={`start-checkBox-conatiner start-renderClick${this.state.isClickChecked}`}
          onClick={this.handleClickChecked}
        >
          {/* <p className={`tick-Active${this.state.isClickChecked}`}>✔</p> */}
          {activePort !== undefined ? (
            <>
              <p
                style={{
                  textAlign: "center",
                  position: "absolute",
                  top: "30%",
                  left: "10%",
                }}
              >
                Port {activePort} :
              </p>
              <p
                style={{
                  textAlign: "center",
                  position: "absolute",
                  top: "60%",
                  left: "10%",
                }}
              >
                {label}{" "}
              </p>
            </>
          ) : (
            <p
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%,-50%)`,
                whiteSpace: "nowrap",
              }}
            >
              {label}{" "}
            </p>
          )}
        </div>
      );
    } else {
      return (
        <div
          className={`checkBox-conatiner renderClick${checked}`}
          onClick={this.handleClickChecked}
        >
          {activePort !== undefined ? (
            <>
              <p
                style={{
                  textAlign: "center",
                  position: "absolute",
                  top: "30%",
                  left: "10%",
                }}
              >
                Port {activePort} :
              </p>
              <p
                style={{
                  textAlign: "center",
                  position: "absolute",
                  top: "60%",
                  left: "10%",
                }}
              >
                {label}{" "}
              </p>
            </>
          ) : (
            <p
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%,-50%)`,
                whiteSpace: "nowrap",
              }}
            >
              {label}{" "}
            </p>
          )}
        </div>
      );
    }
  }
}

export default Checkbox;
