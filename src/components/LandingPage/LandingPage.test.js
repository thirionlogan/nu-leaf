import React from 'react';
import { mount } from 'enzyme';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
  let component;
  beforeEach(() => {
    component = mount(<LandingPage />);
  });
  it('should render', () => {
    expect(component.exists('div')).toBe(true);
  });
});
