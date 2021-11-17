import { render, screen } from '@testing-library/react';
import GoogleButton from '../GoogleButton';

const MockGoogleButton = jest.fn();

test('google button should have button role', async () => {
  render(<GoogleButton googleButtonHandler={MockGoogleButton} />);

  const googleButtonElement = screen.getByRole('button');

  expect(googleButtonElement).toBeInTheDocument();
});

test('google button should have img role', async () => {
  render(<GoogleButton googleButtonHandler={MockGoogleButton} />);

  const googleButtonElement = screen.getByRole('img');

  expect(googleButtonElement).toBeInTheDocument();
});

test('google button should render `Continue with Google` text', async () => {
  render(<GoogleButton googleButtonHandler={MockGoogleButton} />);

  const googleButtonElement = screen.getByText(/Continue with Google/i);

  expect(googleButtonElement).toBeInTheDocument();
});
