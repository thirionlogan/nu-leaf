import React from 'react';
import { mount } from 'enzyme';
import SearchPage from './SearchPage';
import { MemoryRouter } from 'react-router-dom';

describe('SearchPage', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
  });
  it('should render', () => {
    expect(component.exists('div')).toBe(true);
  });
});
