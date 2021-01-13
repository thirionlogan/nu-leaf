import React from 'react';
import { mount } from 'enzyme';
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';

describe('PageHeader', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  });
  it('should render', () => {
    expect(component.exists('div')).toBe(true);
  });
});
