import React from 'react';
import initConnect from './initConnect';
import initProvider, { actionsMap } from './initProvider';

const AppContext = React.createContext({});

export function InitProvider(initState, initActions, options = {}) {
  const Provider = initProvider(AppContext, options)(
    initState,
    initActions
  );

  const connect = initConnect(AppContext, actionsMap);

  return {
    Provider,
    connect
  };
}

export default AppContext;