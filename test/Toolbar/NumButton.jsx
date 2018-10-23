import React, { PureComponent } from 'react';
import { connect } from '../contextConfig';
import { setNum } from '../app.context';

class NumButton extends PureComponent {
  onClick = () => {
    this.props.setNum(555);
  }

  render() {
    return (
      <button type="button" onClick={this.onClick} id="num">
        {this.props.text}
      </button>
    );
  }
}

NumButton.propTypes = {
};

NumButton.defaultProps = {
};

export default connect(
  state => ({
    text: state.app.text
  }),
  { setNum }
)(NumButton);
