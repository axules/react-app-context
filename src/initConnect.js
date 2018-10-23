import React, { PureComponent } from 'react';

function checkActions(actions) {
  Object.entries(actions).forEach(([fName, func]) => {
    if (typeof(func) !== 'function') {
      throw new Error(`initConnect:"${fName}" should be function, it is "${typeof(func)}"`);
    }
  });
}

function initConnect(Context, ContextActionsMap) {
  return function (getState, getActions = {}) {
    checkActions(getActions || {});

    return function(WrappedComponent) {
      class ContextConnect extends PureComponent {
        constructor(props) {
          super(props);

          this.__contextActions = Object.entries(getActions || {}).reduce((R, [key, act]) => {
            if (typeof(act) !== 'function') {
              const error = new Error('Action should be Function (' + key + ' is ' + typeof(act) + ')');
              console.error(error);
              throw error;
            }
            const action = ContextActionsMap.get(act);
            if (action) R[key] = action;
            else console.error(key + ' is not initialized!');
            
            return R;
          }, {});
        }

        render () {
          return (
            <Context.Consumer>
              {state => 
                <WrappedComponent
                  {...this.props}
                  {...(typeof(getState) === 'function' ? getState(state) : null)}
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
