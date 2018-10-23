import React, { PureComponent } from 'react';

class Panel extends PureComponent {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Panel;
