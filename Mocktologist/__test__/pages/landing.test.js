import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Landing from '../../pages/landing';
import { NavigationContainer } from '@react-navigation/native';

describe('Landing component', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Landing />
      </NavigationContainer>
    );

    expect(getByText('A mocktail bar in your pocket.')).toBeTruthy(); //Checking for text within the rendered component to make sure the component has rendered
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
  });

  test('navigates to Login screen when Login button is pressed', () => { 
    const { getByText, queryByText } = render( //getByText lets you find elements in the rendered component by their display text, queryByText lets you find elements but returns null if nothing is found
      <NavigationContainer>
        <Landing />
      </NavigationContainer> //Rendering the landing component in a navigation container so we can simulate navigation actions
    );

    fireEvent.press(getByText('Login')); //Simulating a press on the login button, finds said button using the getByText function

    
    expect(queryByText('Login')).toBeTruthy(); //Checking if the page has been navigated to the login page by checking if the text 'Login' is present
  });

  test('navigates to Register screen when Register button is pressed', () => {
    const { getByText, queryByText } = render(
      <NavigationContainer>
        <Landing />
      </NavigationContainer> 
    );

    fireEvent.press(getByText('Register'));

    expect(queryByText('Register')).toBeTruthy();
  });
});
