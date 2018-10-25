import initStorage from '../../src';
import app, { actions, changeFullState } from './app.context';

const { Provider, connect } = initStorage({ app }, { app: actions, changeFullState }, { debug: false });

export default Provider;

export {
  Provider,
  connect
};
