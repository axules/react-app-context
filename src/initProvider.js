import React, { PureComponent } from 'react';
import { runInThisContext } from 'vm';

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

        this.__dispatchEnv = {
          dispatch: this.__dispatch,
          actionsMap,
          call: (func, ...args) => {
            let willCall = actionsMap.get(func);
            if (!willCall) throw new Error(`Provider:call - action [${func}] wasn't registered`);
            return willCall(...args);
          },
          getState: () => this.state,
          setState: (...args) => this.setState(...args)
        };
        
        actionsMap.clear();
        Object.entries(actions).forEach(([key, act]) => {
          const actType = typeof(act);
          if ( actType === 'object') {
            Object.entries(act).forEach(([fName, fn]) => {
              hasActionRegistered(actionsMap, fn, `${key}.${fName}`);
              actionsMap.set(fn, this.__dispatchAction(fn, key));
            });
          } else if (actType === 'function') {
            hasActionRegistered(actionsMap, act, key);
            actionsMap.set(act, this.__dispatchAction(act, null));
          }
        });

        debugLog('ContextProvider:constructor');
      }

      __dispatch = (any, key) => {
        let func = any;
        if (typeof(any) === 'object') {
          func = () => any;
        }
        this.__dispatchAction(func, key);
      }

      __dispatchAction = (func, key) => 
        (...args) => this.setState(state => {
          const result = func.call(
            this.__dispatchEnv, 
            key == null ? state : state[key], ...args
          );
          
          if (result instanceof Promise) {
            result.then(r => this.setState(key == null ? r : { [key]: r }));
            return null;
          }

          return key == null ? result : { [key]: result };
        })
      
      componentDidUpdate(...args) {
        debugLog('ContextProvider:componentDidUpdate', this.state);
        const { componentDidUpdate } = this.props;
        componentDidUpdate && componentDidUpdate(...args);
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
