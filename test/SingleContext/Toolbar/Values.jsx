import React, { PureComponent } from 'react';
import { connect } from '../contextConfig';

class Values extends PureComponent {
  render() {
    return (
      <div id="values">
        {this.props.text}
        {this.props.num}
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.app
  })
)(Values);
