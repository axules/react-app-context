import initContext from '../../src';
import app, { actions } from './app.context';

describe('InitProvider', () => {
  test('should return object with Provider and connect values', () => {
    const iP = initContext({ app }, { app: actions }, { debug: true });

    expect(Object.keys(iP)).toEqual(['Provider', 'connect', 'Context', 'ActionsMap']);
    expect(iP.Provider).toBeInstanceOf(Function);
    expect(iP.connect).toBeInstanceOf(Function);
    expect(iP.Context).toBeInstanceOf(Object);
    expect(iP.ActionsMap).toBeInstanceOf(Object);
  });

  test('should throw error about actions in initProvider', () => {
    try {
      initContext({ app }, { app: { a: null } }, { debug: true });
    } catch (e) {
      expect(e.message).toEqual('initProvider: "app.a" should be function, it is "object"');
    }
  });

  test('should throw error about actions in connect', () => {
    const iP = initContext({ app }, { app: actions }, { debug: true });

    try {
      iP.connect(() => {}, { a: 999 })(() => null);
    } catch (e) {
      expect(e.message).toEqual('initConnect: "a" should be function, it is "number"');
    }
  });
});
