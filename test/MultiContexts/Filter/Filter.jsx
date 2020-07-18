import React, { PureComponent } from 'react';
import { connectFilters, selectStatus, changeEmail } from './Filter.context';
import { connect } from '../appContextConfig';

class Filter extends PureComponent {
  onClickRadio = ({ target }) => {
    const { selectStatus } = this.props;
    selectStatus(target.value);
  }

  onChangeEmail = ({ target }) => {
    const { changeEmail } = this.props;
    changeEmail(target.value);
  }

  render() {
    const { styles, status, email, changeEmail } = this.props;

    return (
      <div style={styles}>
        <div>
          {status.items.map(el =>
            <label key={el}>
              <input
                type='radio'
                value={el}
                name='status'
                onClick={this.onClickRadio}
                onChange={() => undefined}
                checked={status.selected == el}
              />
              {el}
            </label>
          )}
        </div>
        <input type='text' value={email} onChange={this.onChangeEmail} />
      </div>
    );
  }
}

// It is used to get flobal context state
export default connect(
  state => ({ styles: state.app.theme }),
)(
  // It is used to get special context state
  connectFilters(
    state => state,
    { selectStatus, changeEmail }
  )(Filter)
);
