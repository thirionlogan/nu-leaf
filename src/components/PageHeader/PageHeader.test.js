import React from 'react';
import { mount } from 'enzyme';
import PageHeader from './PageHeader';

describe('PageHeader', () => {
  let component;
  beforeEach(() => {
    component = mount(<PageHeader />);
  });
  it('should render', () => {
    expect(component.exists('div')).toBe(true);
  });
});
