import React, { PureComponent } from 'react';
import { connect } from '../contextConfig';
import { changeFullState } from '../app.context';

class StateButton extends PureComponent {
  render() {
    return (
      <button type="button" onClick={() => this.props.changeFullState({ newValue: { value: 'WOW' } })}>{this.props.newValue || 'default'}</button>
    );
  }
}

export default connect(
  state => ({
    newValue: state.newValue ? state.newValue.value : ''
  }),
  { changeFullState }
)(StateButton);
