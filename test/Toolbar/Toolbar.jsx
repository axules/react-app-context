import React, { PureComponent } from 'react';
import Panel from './Panel';
import NumButton from './NumButton';
import TextButton from './TextButton';
import Values from './Values';

class Toolbar extends PureComponent {
  render() {
    return (
      <div>
        <Panel>
          <NumButton />
        </Panel>
        <Panel>
          <TextButton />
        </Panel>

        <Values />
      </div>
    );
  }
}

Toolbar.propTypes = {
};

Toolbar.defaultProps = {
};

export default Toolbar;
