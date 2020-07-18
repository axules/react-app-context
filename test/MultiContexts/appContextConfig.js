import initStorage from '../../src';
import app, { actions } from './app.context';

const { Provider, connect } = initStorage({ app }, { app: actions }, { debug: false });

export default Provider;

export {
  Provider,
  connect
};
