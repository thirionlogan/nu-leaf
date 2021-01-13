import React from 'react';
import { mount } from 'enzyme';
import RegistrationPage from './RegistrationPage';

describe('RegistrationPage', () => {
  let component;
  beforeEach(() => {
    component = mount(<RegistrationPage />);
  });
  it('should render', () => {
    expect(component.exists('div')).toBe(true);
  });
});
