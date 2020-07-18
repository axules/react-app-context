import React from 'react';
import { mount } from 'enzyme';
import '../setupTests';
import App from './App';
import Values from './Toolbar/Values';
import NumButton from './Toolbar/NumButton';
import TextButton from './Toolbar/TextButton';
import StateButton from './Toolbar/StateButton';

describe('Component with single global context', () => {
  let component = null;
  const waitRender = (time = 1) => {
    return new Promise(resolve => setTimeout(() => resolve(component.update()), time));
  };

  beforeEach(() => {
    component = mount(<App />);
  });

  test('should display init state', () => {
    expect(component.find(Values).text()).toBe('init text999');
    expect(component.find(NumButton).text()).toBe('init text');
    expect(component.find(TextButton).text()).toBe('999');
    expect(component.find(StateButton).text()).toBe('default');
  });

  test('should change num prop by async action', async () => {
    component.find(NumButton).find('button').simulate('click');
    await waitRender();
    expect(component.find(Values).text()).toBe('init text555');
    expect(component.find(NumButton).text()).toBe('init text');
    expect(component.find(TextButton).text()).toBe('555');
    expect(component.find(StateButton).text()).toBe('default');
  });

  test('should change text prop by sync action', () => {
    component.find(TextButton).find('button').simulate('click');
    expect(component.find(Values).text()).toBe('---999');
    expect(component.find(NumButton).text()).toBe('---');
    expect(component.find(TextButton).text()).toBe('999');
    expect(component.find(StateButton).text()).toBe('default');
  });

  test('should change global state', () => {
    component.find(StateButton).find('button').simulate('click');
    expect(component.find(Values).text()).toBe('init text999');
    expect(component.find(NumButton).text()).toBe('init text');
    expect(component.find(TextButton).text()).toBe('999');
    expect(component.find(StateButton).text()).toBe('WOW');
  });
});
