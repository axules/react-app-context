import React from 'react';
import { connect } from '../contextConfig';

function Values({ text, num }) {
  return (
    <div id="values">
      {text}
      {num}
    </div>
  );
}

export default connect(
  state => ({
    ...state.app
  })
)(Values);
