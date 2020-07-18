import React from 'react';
import Provider from './appContextConfig';
import Toolbar from './Toolbar/Toolbar';

function App() {
  return (
    <Provider>
      <Toolbar />
    </Provider>
  );
}

export default App;
