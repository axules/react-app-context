import React, { PureComponent } from 'react';
import FilterContainer from '../Filter/Filter.container';
import { connect } from '../appContextConfig';
import { setDarkTheme, setDefaultTheme } from '../app.context';


class Toolbar extends PureComponent {
  render() {
    const { setDarkTheme, setDefaultTheme } = this.props;
    return (
      <div>
        <FilterContainer />
        <button type='button' onClick={setDefaultTheme}>Select Default Theme</button>
        <button type='button' onClick={setDarkTheme}>Select Dark Theme</button>
      </div>
    );
  }
}

Toolbar.propTypes = {
};

Toolbar.defaultProps = {
};

export default connect(
  null,
  { setDarkTheme, setDefaultTheme }
)(Toolbar);
