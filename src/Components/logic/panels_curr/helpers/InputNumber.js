import React, { Component } from 'react'

import Colors from '../../Colors'

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onChange = (e) => {
    var value = e.target.value;
    const { onChange, min, max } = this.props;
    if (value < min) value = min;
    else if (value > max) value = max;
    onChange(value);
    if (value == 0) {
      console.log("VALUE--->", value);
    }
  }
  render() {
    const { disabled, value, min, max } = this.props;
    var style = {
      width: '5em',
      display: 'inline-block',
      textAlign: 'center',
      // background: '#1A1A1A',
      // borderBottom: '0.125em solid #FFF',
      marginRight: '0.25em',
      color: 'orange',
      fontWeight: "900",
      borderTop: '0px!important',
      borderLeft: '0px!important',
      borderRight: '0px!important',
      paddingBottom: '1%',
      ...this.props.style
    };
    if (disabled) style.borderBottom = '0.140em solid #B8B8B8';
    return (
      <input style={style} type='number' inputMode='numeric'
        value={value} min={min} max={max}
        disabled={disabled} onChange={this.onChange} />
    );
  }

}

export default Input;
