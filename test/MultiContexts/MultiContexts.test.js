import React from 'react';
import { mount } from 'enzyme';
import '../setupTests';
import App from './App';
import Toolbar from './Toolbar/Toolbar';
import Filter from './Filter/Filter';


describe('Component with global and special contexts', () => {
  let component = null;
  const waitRender = (time = 1) => {
    return new Promise(resolve => setTimeout(() => resolve(component.update()), time));
  };

  beforeEach(() => {
    component = mount(<App />);
  });

  test('should display Toolbar controls', () => {
    const toolbar = component.find(Toolbar);
    expect(toolbar.length).toBe(1);
    expect(toolbar.find('button').length).toBe(2);
    expect(toolbar.find('button').at(0).text()).toBe('Select Default Theme');
    expect(toolbar.find('button').at(1).text()).toBe('Select Dark Theme');
  });

  test('should display Filter controls', () => {
    const filter = component.find(Filter);
    const radio = filter.find('input[type="radio"]');
    const textInput = filter.find('input[type="text"]');
    expect(filter.length).toBe(1);
    expect(radio.length).toBe(4);
    expect(radio.filter('[checked=true]').length).toBe(1);
    expect(radio.filter('[checked=true][value="All"]').length).toBe(1);
    expect(textInput.length).toBe(1);
    expect(textInput.getDOMNode().getAttribute('value')).toBe('');
    expect(filter.getDOMNode().getAttribute('style')).toBe('background: white; color: black; font-size: 12pt;');
  });

  test('should change status filter radio', async () => {
    let radio = component.find(Filter).find('input[type="radio"]');

    radio.at(1).simulate('click');
    await waitRender();
    radio = component.find(Filter).find('input[type="radio"]');
    expect(radio.filter('[checked=true]').length).toBe(1);
    expect(radio.filter('[checked=true][value="New"]').length).toBe(1);

    radio.at(3).simulate('click');
    await waitRender();
    radio = component.find(Filter).find('input[type="radio"]');
    expect(radio.filter('[checked=true]').length).toBe(1);
    expect(radio.filter('[checked=true][value="Removed"]').length).toBe(1);
  });

  test('should change global styles', async () => {
    const buttons = component.find(Toolbar).find('button');
    expect(component.find(Filter).getDOMNode().getAttribute('style'))
      .toBe('background: white; color: black; font-size: 12pt;');

    buttons.at(1).simulate('click');
    await waitRender();
    expect(component.find(Filter).getDOMNode().getAttribute('style'))
      .toBe('color: white; font-size: 14pt; background: black;');

    buttons.at(0).simulate('click');
    await waitRender();
    expect(component.find(Filter).getDOMNode().getAttribute('style'))
      .toBe('color: black; font-size: 12pt; background: white;');
  });

  test('should change global styles and local email value', async () => {
    const buttons = component.find(Toolbar).find('button');
    const textInput = component.find(Filter).find('input[type="text"]');

    expect(component.find(Filter).getDOMNode().getAttribute('style'))
      .toBe('background: white; color: black; font-size: 12pt;');
    expect(textInput.getDOMNode().getAttribute('value')).toBe('');

    buttons.at(1).simulate('click');
    textInput.simulate('change', { target: { value: 'mytestemail@test.ru' } });

    await waitRender();
    expect(component.find(Filter).getDOMNode().getAttribute('style'))
      .toBe('color: white; font-size: 14pt; background: black;');
    expect(component.find(Filter).find('input[type="text"]').getDOMNode().getAttribute('value'))
      .toBe('mytestemail@test.ru');
  });
});
