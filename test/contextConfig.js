import { InitProvider } from '../src';
import app, { actions } from './app.context';

const { Provider, connect } = InitProvider({ app }, { app: actions }, { debug: false });

export default Provider;

export {
  Provider,
  connect
};
