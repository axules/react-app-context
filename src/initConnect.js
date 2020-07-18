import React, { PureComponent } from 'react';

export function checkActions(actions) {
  Object.entries(actions).forEach(([fName, func]) => {
    if (typeof(func) !== 'function') {
      throw new Error(`initConnect: "${fName}" should be function, it is "${typeof(func)}"`);
    }
  });
  return true;
}

function initConnect(Context, ContextActionsMap) {
  return function (getState, getActions = {}) {
    checkActions(getActions || {});

    return function(WrappedComponent) {
      class ContextConnect extends PureComponent {
        constructor(props) {
          super(props);

          this.__contextActions = Object.entries(getActions || {}).reduce((R, [key, act]) => {
            const action = ContextActionsMap.get(act);
            if (action) R[key] = action;
            else console.error(key + ' is not initialized and can not be used!');

            return R;
          }, {});
        }

        render () {
          return (
            <Context.Consumer>
              {state =>
                <WrappedComponent
                  {...this.props}
                  {...(typeof(getState) === 'function' ? getState(state, this.props) : null)}
                  {...this.__contextActions}
                />
              }
            </Context.Consumer>
          );
        }
      }

      return ContextConnect;
    };
  };

}

export default initConnect;
