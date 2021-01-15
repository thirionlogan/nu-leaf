import React from 'react';
import { mount } from 'enzyme';
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';
import { mockLoginClient } from '../../client/mockClient';
import { Button } from '@material-ui/core';

describe('LoginPage', () => {
  let component;
  const mockHandleLogin = jest.fn();
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <LoginPage
          loginClient={async (params) => mockLoginClient(params)}
          handleLogin={mockHandleLogin}
        />
      </MemoryRouter>
    );
  });
  it('should log in', async () => {
    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: 'johndoe@email.com' } });

    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: 'password' } });

    component.find(Button).simulate('click');

    expect(mockLoginClient).toBeCalledWith({
      email: 'johndoe@email.com',
      password: 'password',
    });
  });
  it('should require email', () => {
    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: 'password' } });

    component.find(Button).simulate('click');
    expect(mockLoginClient).not.toBeCalled();
  });
  it('should require password', () => {
    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: 'johndoe@email.com' } });

    component.find(Button).simulate('click');
    expect(mockLoginClient).not.toBeCalled();
  });
});
