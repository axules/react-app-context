import initContext from '../../src';
import app, { actions, changeFullState } from './app.context';

const { Provider, connect } = initContext({ app }, { app: actions, changeFullState }, { debug: false });

export default Provider;

export {
  Provider,
  connect
};
