import React from 'react';
import initConnect from './initConnect';
import initProvider from './initProvider';

const defaultOptions = { debug: false };

export default function init(
  initState,
  initActions = {},
  options = {}
) {
  const Context = React.createContext({});

  const { Provider, actionsMap } = initProvider(
    Context,
    { ...defaultOptions, ...options }
  )(
    initState,
    initActions
  );

  const connect = initConnect(Context, actionsMap);

  return {
    Provider,
    connect,
    Context,
    ActionsMap: actionsMap
  };
}
