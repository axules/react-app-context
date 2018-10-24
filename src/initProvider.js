import React, { PureComponent } from 'react';

function checkActions(actions) {
  Object.entries(actions).forEach(([key, act]) => {
    if (typeof(act) !== 'function' && typeof(act) !== 'object') {
      throw new Error(`initProvider:"${key}" should be function or object, it is "${typeof(act)}"`);
    }

    Object.entries(act).forEach(([fName, func]) => {
      if (typeof(func) !== 'function') {
        throw new Error(`initProvider:"${key}.${fName}" should be function, it is "${typeof(func)}"`);
      }
    });
  });
}

function hasActionRegistered(actions, fn, path) {
  if (actions.has(fn)) {
    throw new Error(`initProvider exception: action "${path}" was registered`);
  }
}

function initProvider(Context, { debug = false }) {
  const debugLog = debug ? console.debug : () => null;
  const actionsMap = new Map();

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
          const actType = typeof(act);
          if ( actType === 'object') {
            Object.entries(act).forEach(([fName, fn]) => {
              hasActionRegistered(actionsMap, fn, `${key}.${fName}`);
              actionsMap.set(fn, this.__generateFunction(fn, key));
            });
          } else if (actType === 'function'){
            hasActionRegistered(actionsMap, act, key);
            actionsMap.set(act, this.__generateFunction(act, null));
          }
        });
      }

      __generateFunction = (fn, key) => 
        (...args) => this.setState(state => {
          const result = fn(key == null ? state : state[key], ...args);
          
          if (result instanceof Promise) {
            result.then(r => this.setState(key == null ? r : { [key]: r }));
            return null;
          }

          return key == null ? result : { [key]: result };
        })
      

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

    return {
      Provider,
      actionsMap
    };
  };
}

export default initProvider;
