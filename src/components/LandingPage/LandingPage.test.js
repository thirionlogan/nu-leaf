import React from 'react';
import { mount } from 'enzyme';
import LandingPage from './LandingPage';
import { MemoryRouter } from 'react-router-dom';

describe('LandingPage', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
  });
  it('should render', () => {
    expect(component.exists('div')).toBe(true);
  });
});
