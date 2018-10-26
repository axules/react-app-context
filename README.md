# react-app-context
Application state manager based on PureComponent and React Context Api (React >= 16). Like Redux.

React context: https://reactjs.org/docs/context.html

## Installation

```
npm i --save react-app-context
```

## What is it?

It is one function 
```javascript
import initStorage from 'react-app-context';

//...
const {
  Provider,
  connect,
  Context
} = initStorage(
  defaultState,
  actions,
  property
);
// ...
```

### Arguments
`defaultState` - object, which contains initialize state
```javascript
{
  app: { ... },
  users: { ... },
  categories: { ... }
  // ...
}
```

`actions` - object, which contains actions functions. Each action will get state as first argument and should return new object, which will be put to context object. Action can be async function or return Promise.
```javascript
{
  app: {
    // all actions in this path will get Context.app state part
    setName: (state, newName) => ({ ...state, name: newName })
    // ...
  },
  users: {
    // all actions in this path will get Context.users state part
    addUser: (state, name, login, pass) => { ... }
    // ...
  }
  // all actions in root will get full context state object
  removeStatePart: (fullState, key) => ({ ...fullState, [key]: null })
  // ...
}
```
`property` - object with options
```javascript
{
  debug: false // if true, debug then messages will put to console
}
```
### Function result
This function returns object with
```javascript
{
  Provider, // react component
  connect, // function to connect your react component to state
  Context // React Context Api object
}
```

`Provider` - simple React pureComponent, which shoud be around components, which will be get state of this Provider.
```javascript
// ...
  <Provider>
    <MainComponentOfApp />
  </Provider>
// ...
```

`connect` - it is HOC function, which returns PureComponent above your component.

```javascript
function(getNewState: function(state, props), dispatchActions: object): function(Component)
```

* `getNewState` - (state, props) => ({ ... })
* `dispatchActions` - { myAction, ... }

```javascript
// ...
  export default connect(
    (state, props) => ({ 
      value: state.app.value, 
      isFetching: state.app.requests[props.id].isFetching
    }),
    { myAction }
  )(MyComponent);
// ...
```

## How can you use it as application state like Redux?
#### Storage initialize
```javascript
// storageConfig.js
import initStorage from 'react-app-context';
import appStorage, { actions } from './appStorage.js';

const Storage = initStorage(
  { app: appStorage }, 
  { app: actions }, 
  { debug: false }
);

export {
  connect: Storage.connect
}

export default Storage.Provider;
```


#### Application storage 
```javascript
// appStorage.js
export default const initState = {
  value: 10,
  list: [],
  state: 'init',
  isLoading: false
};

export function setValue(state, newValue) {
  return {
    ...state,
    value: newValue
  };
}

export async function getData(state, newValue) {
  // it is your api function, for example
  // `this` will contains
  // { 
  //   dispatch: function(function, statePropKey: string): function,
  //   actionsMap: Map[function, function],
  //   call: function(function, ...args)
  //   getState: function: object
  // }
  dispatch(state => ({ ...state, isLoading: true }), 'app')();
  const newList = await myApi.getList();
  return {
    ...state,
    list: newList,
    isLoading: false
  };
}

export const actions = {
  setValue,
  getData
};

```

#### App root component
```javascript
// App.jsx
import React from 'react';
import Provider from './storageConfig';
import Toolbar from './Toolbar/Toolbar';

function App() {
  return (
    // all Providers childs can use `connect` function from `./storageConfig`
    <Provider>
      <Toolbar />
    </Provider>
  );
}

export default App;
```

#### Example child component
```javascript
// MyButton.jsx
import React from 'react';
import { connect } from './storageConfig';
import { setValue } from './appStorage';

class MyButton extends React.PureComponent {
  // `setValue` was described like `(state, newValue) => ...`
  // but will be dispatched into component without state arg
  // like `(newValue) => ...`
  onClick = () => this.props.setValue(Math.round(Math.random() * 1000));

  render() {
    const { value } = this.props;

    return (
      <button type="button" onClick={this.onClick}>
        {value}
      </button>
    )
  }
}

export default connect(
  state => ({ value: state.app.value }),
  // setValue will be put into component without first argument (it was `state`)
  { setValue }
)(MyButton);
```

## Using as state of component

`react-app-context` can be used as external component state

