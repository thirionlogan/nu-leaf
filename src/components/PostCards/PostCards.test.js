import React from 'react';
import { mount } from 'enzyme';
import PostCards from './PostCards';
import { MemoryRouter } from 'react-router-dom';

describe('PostCards', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <PostCards />
      </MemoryRouter>
    );
  });
  it('should render', () => {
    expect(component.exists('div')).toBe(true);
  });
});
