import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};