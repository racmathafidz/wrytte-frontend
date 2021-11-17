import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';

const MockFooter = () => (
  <BrowserRouter>
    <Footer />
  </BrowserRouter>
);

test('footer should render `Wrytte` text from Brand Icon component', async () => {
  render(<MockFooter />);

  const brandIconElement = screen.getByText(/Wrytte/i);

  expect(brandIconElement).toBeInTheDocument();
});

test('footer should render `About` text', async () => {
  render(<MockFooter />);

  const aboutElement = screen.getByText(/About/i);

  expect(aboutElement).toBeInTheDocument();
});

test('footer should render `Write` text', async () => {
  render(<MockFooter />);

  const writeElement = screen.getByText(/Write/i);

  expect(writeElement).toBeInTheDocument();
});

test('footer should render `Wrytte` text from Brand Icon component with link roles', async () => {
  render(<MockFooter />);

  const wrytteElement = screen.getByRole('link', { name: 'Wrytte' });

  expect(wrytteElement).toBeInTheDocument();
});

test('footer should render `About` text with link roles', async () => {
  render(<MockFooter />);

  const aboutElement = screen.getByRole('link', { name: 'About' });

  expect(aboutElement).toBeInTheDocument();
});

test('footer should render `Write` text with link roles', async () => {
  render(<MockFooter />);

  const writeElement = screen.getByRole('link', { name: 'Write' });

  expect(writeElement).toBeInTheDocument();
});
