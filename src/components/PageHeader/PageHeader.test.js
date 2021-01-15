import React from 'react';
import { mount } from 'enzyme';
import PageHeader from './PageHeader';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { mockLogoutClient } from '../../client/mockClient';

describe('PageHeader', () => {
  let component;
  const handleSetUser = jest.fn();

  describe('when the user is logged in', () => {
    beforeEach(() => {
      component = mount(
        <MemoryRouter>
          <PageHeader
            user={true}
            logoutClient={async (params) => mockLogoutClient(params)}
            handleSetUser={handleSetUser}
          />
        </MemoryRouter>
      );
    });
    it('should render Log out button', () => {
      expect(component.find(Button).text()).toBe('Log Out');
    });
  });
  describe('when the user is logged out', () => {
    beforeEach(() => {
      component = mount(
        <MemoryRouter>
          <PageHeader
            user={undefined}
            logoutClient={async (params) => mockLogoutClient(params)}
            handleSetUser={handleSetUser}
          />
        </MemoryRouter>
      );
    });
    it('should render Login button', () => {
      expect(component.find(Button).text()).toBe('Login');
    });
  });
});
