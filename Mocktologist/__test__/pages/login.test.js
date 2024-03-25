import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../../pages/login';
import { useAuth } from '../../hooks/useAuth';

jest.mock('../../hooks/useAuth');

describe('Login component', () => {
  test('renders email and password input fields', () => {
    const { getByPlaceholderText } = render(<Login />); //Render the page, the login one, assiging it to getByPlaceholderText so it will only search for text matches rendered on that page
    const emailInput = getByPlaceholderText('Email'); //Getting components by using their place holder text names :3
    const passwordInput = getByPlaceholderText('Password');
    expect(emailInput).toBeTruthy(); //Makes sure the components with the above names were rendered :o
    expect(passwordInput).toBeTruthy();
  }); 

  test('calls login function when Login button is pressed', () => { //Not passing
    const loginMock = jest.fn(); //Mocks the loging in function
    useAuth.mockReturnValue({ login: loginMock }); //mocking the custom hook function

    const { getByText } = render(<Login />); 
    const loginButton = getByText('Login'); //Getting the button using its text as it has no placeholder name
    fireEvent.press(loginButton);

    expect(loginMock).toHaveBeenCalledTimes(1);
  });

  test('enters text into email input field', () => { //Not passing, returns null
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'test@example.com');
    expect(emailInput.props.value).toBe('test@example.com');
  });

  test('enters text into password input field', () => { //not passing, returns null
    const { getByPlaceholderText } = render(<Login />);
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, 'password123');
    expect(passwordInput.props.value).toBe('password123');
  });
});
