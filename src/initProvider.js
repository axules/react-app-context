import React, { PureComponent } from 'react';

function checkActions(actions) {
  Object.entries(actions).forEach(([key, act]) => {
    if (typeof(act) !== 'function' && typeof(act) !== 'object') {
      throw new Error(`initProvider: "${key}" should be function or object, it is "${typeof(act)}"`);
    }

    Object.entries(act).forEach(([fName, func]) => {
      if (typeof(func) !== 'function') {
        throw new Error(`initProvider: "${key}.${fName}" should be function, it is "${typeof(func)}"`);
      }
    });
  });
}

function hasActionRegistered(actions, fn, path) {
  if (actions.has(fn)) {
    throw new Error(`initProvider exception: action "${path}" was registered`);
  }
}

function isPromise(value) {
  return value instanceof Promise;
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
          call: this.__callAction,
          getState: () => this.state,
          setState: this.__setState,
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

      __setState = async (state, callBack) => (
        new Promise((resolve) => this.setState(
          state,
          () => {
            callBack();
            resolve(this.state);
          }
        ))
      )

      __callAction = (func, ...args) => {
        const willCall = actionsMap.get(func);
        if (willCall) {
          return willCall(...args);
        }
        throw new Error(`Provider:call - action [${func}] wasn't registered`);
      }

      __dispatch = (funcOrObject, key) => {
        let func = funcOrObject;
        if (typeof(func) === 'object') {
          func = () => funcOrObject;
        }
        return this.__dispatchAction(func, key);
      }

      __dispatchAction = (func, key) =>
        (...args) => {
          debugLog('ContextProvider:Call action:', args);
          return this.setState(state => {
            const result = isPromise(func)
              ? func
              : func.call(
                this.__dispatchEnv,
                key == null ? state : state[key],
                ...args
              );

            if (isPromise(result)) {
              result.then(r => this.setState(key == null ? r : { [key]: r }));
              return null;
            }
            debugLog('ContextProvider: action result:', result);
            return key == null ? result : { [key]: result };
          });
        }

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
