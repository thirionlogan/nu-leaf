import React from 'react';
import App from './App';
import { mount } from 'enzyme';

describe('App', () => {
  let component;
  beforeEach(() => {
    component = mount(<App />);
  });
  it('should render', () => {
    expect(component.exists('div')).toBe(true);
  });
});
