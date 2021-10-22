/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserProfile from '../UserProfile';

const dummyData = {
  profileData: {
    local: {
      password: '',
    },
    google: {
      googleId: 'skdfsjfksjfskf',
    },
    _id: '987654321',
    email: 'user@gmail.com',
    fullName: 'Full Name',
    userName: 'user.name',
    imageProfile: 'assets/images/user2.jpg',
  },
  articleData: [
    {
      _id: '123456789',
      imageCover: 'assets/images/Freelance.png',
      articleTitle: 'Article Title',
      articleBody: 'Article Body',
      publishDate: '2021-10-01T17:00:00.000Z',
      authorId: '987654321',
      authorData: {
        local: {
          password: '',
        },
        google: {
          googleId: 'skdfsjfksjfskf',
        },
        _id: '987654321',
        email: 'user@gmail.com',
        fullName: 'Full Name',
        userName: 'user.name',
        imageProfile: 'assets/images/user2.jpg',
      },
    },
  ],
};

const MockUserProfile = ({ data }) => (
  <BrowserRouter>
    <UserProfile profileData={data} />
  </BrowserRouter>
);

test('User Profile should render img', async () => {
  render(<MockUserProfile data={dummyData} />);

  const imgElement = screen.getAllByRole('img');

  expect(imgElement).toHaveLength(3);
});

test('User Profile should render author`s full name', async () => {
  render(<MockUserProfile data={dummyData} />);

  const fullnameElement = screen.getAllByText('Full Name');

  expect(fullnameElement).toHaveLength(2);
});
