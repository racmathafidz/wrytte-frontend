/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

// Using 'mock' because there's a NavLink inside the header component
const MockHeader = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

test('header should render `Wrytte` text from Brand Icon component', async () => {
  render(<MockHeader />);

  const brandIconElement = screen.getByText(/Wrytte/i);

  expect(brandIconElement).toBeInTheDocument();
});

test('header should render the `Wrytte` text from Brand Icon component with link roles', async () => {
  render(<MockHeader />);

  const wrytteElement = screen.getByRole('link', { name: 'Wrytte' });

  expect(wrytteElement).toBeInTheDocument();
});

test('header should render `Sign In` with link roles', async () => {
  render(<MockHeader />);

  const signInElement = screen.getByRole('link', { name: 'Sign In' });

  expect(signInElement).toBeInTheDocument();
});

test('header should render `Start Writing` text with link roles', async () => {
  render(<MockHeader />);

  const starWritingElement = screen.getByRole('link', { name: 'Start Writing' });

  expect(starWritingElement).toBeInTheDocument();
});
