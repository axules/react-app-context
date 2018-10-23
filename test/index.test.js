import React from 'react';
import { mount } from 'enzyme';
import './setupTests';
import App from './App';
import Values from './Toolbar/Values';
import NumButton from './Toolbar/NumButton';
import TextButton from './Toolbar/TextButton';

describe('withOnBlur', () => {
  let component = null;

  beforeEach(() => {
    component = mount(<App />);
  });

  test('should display init state', () => {
    expect(component.find(Values).text()).toBe('init text999');
    expect(component.find(NumButton).text()).toBe('init text');
    expect(component.find(TextButton).text()).toBe('999');
  });

  test('should change num prop by async action', async () => {
    component.find(NumButton).find('button').simulate('click');
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(component.find(Values).text()).toBe('init text555');
    expect(component.find(NumButton).text()).toBe('init text');
    expect(component.find(TextButton).text()).toBe('555');
  });

  test('should change text prop by sync action', () => {
    component.find(TextButton).find('button').simulate('click');
    expect(component.find(Values).text()).toBe('---999');
    expect(component.find(NumButton).text()).toBe('---');
    expect(component.find(TextButton).text()).toBe('999');
  });
});
