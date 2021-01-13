import React from 'react';
import { mount } from 'enzyme';
import RegistrationPage from './RegistrationPage';
import { MemoryRouter } from 'react-router-dom';

describe('RegistrationPage', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );
  });
  it('should render', () => {
    expect(component.exists('div')).toBe(true);
  });
});
