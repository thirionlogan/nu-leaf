import React from 'react';
import { mount } from 'enzyme';
import RegistrationPage from './RegistrationPage';
import { MemoryRouter } from 'react-router-dom';
import { mockRegisterUser } from '../../client/mockClient';
import { Button } from '@material-ui/core';

describe('RegistrationPage', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <RegistrationPage
          registerUser={async (params) => mockRegisterUser(params)}
        />
      </MemoryRouter>
    );
  });
  const newUser = {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bobsmith@email.com',
    password: 'password',
  };
  it('should register user', () => {
    component
      .find('#firstName')
      .find('input')
      .simulate('change', { target: { value: newUser.firstName } });

    component
      .find('#lastName')
      .find('input')
      .simulate('change', { target: { value: newUser.lastName } });

    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: newUser.email } });

    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component
      .find('#confirmPassword')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });

    component.find(Button).simulate('click');

    expect(mockRegisterUser).toBeCalledWith({
      ...newUser,
      confirmPassword: newUser.password,
    });
  });
  it('should require First Name', () => {
    component
      .find('#lastName')
      .find('input')
      .simulate('change', { target: { value: newUser.lastName } });

    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: newUser.email } });

    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component
      .find('#confirmPassword')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component.find(Button).simulate('click');
    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Last Name', () => {
    component
      .find('#firstName')
      .find('input')
      .simulate('change', { target: { value: newUser.firstName } });

    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: newUser.email } });

    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component
      .find('#confirmPassword')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component.find(Button).simulate('click');
    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Email', () => {
    component
      .find('#firstName')
      .find('input')
      .simulate('change', { target: { value: newUser.firstName } });

    component
      .find('#lastName')
      .find('input')
      .simulate('change', { target: { value: newUser.lastName } });

    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component
      .find('#confirmPassword')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component.find(Button).simulate('click');
    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Password', () => {
    component
      .find('#firstName')
      .find('input')
      .simulate('change', { target: { value: newUser.firstName } });

    component
      .find('#lastName')
      .find('input')
      .simulate('change', { target: { value: newUser.lastName } });

    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: newUser.email } });

    component
      .find('#confirmPassword')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component.find(Button).simulate('click');
    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Confirm Password', () => {
    component
      .find('#firstName')
      .find('input')
      .simulate('change', { target: { value: newUser.firstName } });

    component
      .find('#lastName')
      .find('input')
      .simulate('change', { target: { value: newUser.lastName } });

    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: newUser.email } });

    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component.find(Button).simulate('click');
    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Confirm Password to be the same as Password', () => {
    component
      .find('#firstName')
      .find('input')
      .simulate('change', { target: { value: newUser.firstName } });

    component
      .find('#lastName')
      .find('input')
      .simulate('change', { target: { value: newUser.lastName } });

    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: newUser.email } });

    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component
      .find('#confirmPassword')
      .find('input')
      .simulate('change', { target: { value: 'different password' } });
    component.find(Button).simulate('click');
    expect(mockRegisterUser).not.toBeCalled();
  });
});
