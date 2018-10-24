import React, { PureComponent } from 'react';
import { connect } from '../contextConfig';
import { setText } from '../app.context';

class TextButton extends PureComponent {
  render() {
    return (
      <button type="button" onClick={() => this.props.setText('---')} id="text">
        {this.props.num}
      </button>
    );
  }
}

export default connect(
  state => ({
    num: state.app.num
  }),
  { setText }
)(TextButton);
