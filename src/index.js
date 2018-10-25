import React from 'react';
import initConnect from './initConnect';
import initProvider from './initProvider';

export default function init(
  initState, 
  initActions = {},
  options = { debug: false }
) {
  const Context = React.createContext({});

  const { Provider, actionsMap } = initProvider(Context, options)(
    initState,
    initActions
  );

  const connect = initConnect(Context, actionsMap);

  return {
    Provider,
    connect,
    Context
  };
}
