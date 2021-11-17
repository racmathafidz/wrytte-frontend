import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BrandIcon from '../BrandIcon';

const MockBrandIcon = ({ Footer }) => (
  <BrowserRouter>
    <BrandIcon Footer={Footer} />
  </BrowserRouter>
);

test('brand icon should render `Wrytte` text', async () => {
  render(<MockBrandIcon />);

  const wrytteElement = screen.getByText(/Wrytte/i);

  expect(wrytteElement).toBeInTheDocument();
});

test('brand icon should render `Wrytte` text with link roles', async () => {
  render(<MockBrandIcon />);

  const wrytteElement = screen.getByRole('link', { name: 'Wrytte' });

  expect(wrytteElement).toBeInTheDocument();
});

test('brand icon should rendered with gray-900 color as default', async () => {
  const { container } = render(<MockBrandIcon />);

  expect(container.firstChild).toHaveClass('text-gray-900');
});

test('brand icon should rendered with gray-100 color when its rendered in footer', async () => {
  const { container } = render(<MockBrandIcon Footer />);

  expect(container.firstChild).toHaveClass('text-gray-100');
});
