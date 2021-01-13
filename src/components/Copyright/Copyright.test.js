import React from 'react';
import { mount } from 'enzyme';
import Copyright from './Copyright';
import { MemoryRouter } from 'react-router-dom';

describe('Copyright View', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <Copyright />
      </MemoryRouter>
    );
  });
  it('should render', () => {
    expect(component.text()).toEqual('Copyright © NuLeaf 2021.');
  });
});
