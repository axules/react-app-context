import React, { PureComponent } from 'react';

let actionsMap = new Map();

function checkActions(actions) {
  Object.entries(actions).forEach(([key, act]) => {
    Object.entries(act).forEach(([fName, func]) => {
      if (typeof(func) !== 'function') {
        throw new Error(`initProvider:"${key}.${fName}" should be function, it is "${typeof(func)}"`);
      }
    });
  });
}

function initProvider(Context, { debug = false }) {
  const debugLog = debug ? console.debug : () => null;

  return function(defaultState, actions) {
    checkActions(actions);

    class Provider extends PureComponent {
      state = {
        ...defaultState
      }

      constructor(props) {
        super(props);
        
        actionsMap.clear();
        Object.entries(actions).forEach(([key, act]) => {
          Object.values(act).forEach(el => {
            const realF = (...args) => this.setState(state => {
              const result = el(state[key], ...args);
              
              if (result instanceof Promise) {
                result.then(r => this.setState({ [key]: r }));
                return null;
              }

              return { [key]: result };
            });

            actionsMap.set(el, realF);
          });
        });
      }

      componentDidUpdate() {
        debugLog('ContextProvider:componentDidUpdate', this.state);
      }

      render() {
        return (
          <Context.Provider value={this.state}>
            {this.props.children}
          </Context.Provider>
        );
      }
    }

    return Provider;
  };
}

export default initProvider;
export {
  actionsMap
};
