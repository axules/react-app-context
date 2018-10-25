import React from 'react';
import Provider from './contextConfig';
import Toolbar from './Toolbar/Toolbar';

function App() {
  return (
    <Provider>
      <Toolbar />
    </Provider>
  );
}

export default App;
