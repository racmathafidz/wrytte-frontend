import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../Hero';

const MockHero = () => (
  <BrowserRouter>
    <Hero />
  </BrowserRouter>
);

test('hero should render the correct text', async () => {
  render(<MockHero />);

  const heroElement = screen.getByText(/Everyone can write and read in Wrytte./i);

  expect(heroElement).toBeInTheDocument();
});

test('hero should render `Start Writing` text with link role', async () => {
  render(<MockHero />);

  const heroElement = screen.getByRole('link', { name: 'Start Writing' });

  expect(heroElement).toBeInTheDocument();
});

test('hero should render img role', async () => {
  render(<MockHero />);

  const heroElement = screen.getByRole('img');

  expect(heroElement).toBeInTheDocument();
});
