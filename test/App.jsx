import React from 'react';
import Provider from './contextConfig';
import app, { actions } from './app.context';
import Toolbar from './Toolbar/Toolbar';

function App() {
  return (
    <Provider>
      <Toolbar />
    </Provider>
  );
}

export default App;
