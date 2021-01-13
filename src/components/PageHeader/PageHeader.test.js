import React from 'react';
import { mount } from 'enzyme';
import PageHeader from './PageHeader';
import { MemoryRouter } from 'react-router-dom';

describe('PageHeader', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <PageHeader />
      </MemoryRouter>
    );
  });
  it('should render', () => {
    expect(component.exists('div')).toBe(true);
  });
});
