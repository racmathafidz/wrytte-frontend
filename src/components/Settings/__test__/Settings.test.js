import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import Settings from '../Settings';

const dummyData = {
  _id: '987654321',
  email: 'user@gmail.com',
  fullName: 'Full Name',
  userName: 'user.name',
  imageProfile: 'https://res.cloudinary.com/racmathafidz/image/upload/v1636354656/iqtuia9ofzj7wgseltrk.jpg',
  password: 'skdfsjfksjfskf',
};

const MockSettings = ({ data }) => (
  <Provider store={store}>
    <Settings profileData={data} />
  </Provider>
);

test('Settings should render `Account Settings` text', async () => {
  render(<MockSettings data={dummyData} />);

  const textElement = screen.getByText(/Account Settings/i);

  expect(textElement).toBeInTheDocument();
});

test('Settings should have img element', async () => {
  render(<MockSettings data={dummyData} />);

  const imgElement = screen.getByRole('img');

  expect(imgElement).toBeInTheDocument();
});

test('Settings should have text input element', async () => {
  render(<MockSettings data={dummyData} />);

  const inputElement = screen.getAllByRole('textbox');

  expect(inputElement).toHaveLength(3);
});

test('Settings should have button input element', () => {
  render(<MockSettings data={dummyData} />);

  const buttonElement = screen.getByRole('button');

  expect(buttonElement).toBeInTheDocument();
});

test('Settings text input should have correct value when submitted', () => {
  render(<MockSettings data={dummyData} />);

  const fullnameElement = screen.getByTestId('fullName');
  const usernameElement = screen.getByTestId('userName');
  const emailElement = screen.getByTestId('email');
  const saveButtonElement = screen.getByTestId('save');

  fireEvent.change(fullnameElement, { target: { value: 'New Full Name' } });
  fireEvent.change(usernameElement, { target: { value: 'new.user.name' } });
  fireEvent.change(emailElement, { target: { value: 'new.email@gmail.com' } });
  fireEvent.click(saveButtonElement);

  expect(fullnameElement.value).toBe('New Full Name');
  expect(usernameElement.value).toBe('new.user.name');
  expect(emailElement.value).toBe('new.email@gmail.com');
});
