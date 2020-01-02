import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import App from './App';

// first test just test render
test('renders entire application', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('marcosbitetti@gmail.com');
  expect(linkElement).toBeInTheDocument();
});

test('renders redirect from  not logged user', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('Enter');
  expect(linkElement).toBeInTheDocument();
});



test('do login', () => {
  const { getByText } = render(<App />);
  const button = getByText('Enter');
  expect(button).toBeEnabled();
  fireEvent.click( button||document.body );
  wait( () => expect(document.querySelector('[data-testid="home"]')).toBeInTheDocument() );
});

test('test a filter', () => {
  const { getByText, getByRole } = render(<App />);
  const button = getByText('Enter');
  expect(button).toBeEnabled();
  fireEvent.click( button||document.body );
  wait( () => expect(document.querySelector('[data-testid="home"]')).toBeInTheDocument() );

  const selector = document.querySelector('#root > section > main > div > div.ant-row.search-bar > div:nth-child(1) > div > div');
  if (selector) selector.click();

  wait( () => expect( getByRole('option') ).toBeInTheDocument() );
  const male = selector?.querySelector('li');
  if (male) male.click();

  wait( () => expect( getByText(/Sex[\W]+Male/i)).toBeInTheDocument() );
});


