import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import UserProfile from '../UserProfile';

const dummyData = {
  profileData: {
    _id: '987654321',
    email: 'user@gmail.com',
    fullName: 'Full Name',
    userName: 'user.name',
    imageProfile: 'https://res.cloudinary.com/racmathafidz/image/upload/v1636354656/iqtuia9ofzj7wgseltrk.jpg',
    password: 'skdfsjfksjfskf',
  },
  articleData: [
    {
      _id: '123456789',
      imageCover: 'https://res.cloudinary.com/racmathafidz/image/upload/v1636344459/Freelance_mkzq2b.png',
      articleTitle: 'Article Title',
      articleBody: 'Article Body',
      publishDate: '2021-10-01T17:00:00.000Z',
      authorId: '987654321',
      authorData: {
        _id: '987654321',
        email: 'user@gmail.com',
        fullName: 'Full Name',
        userName: 'user.name',
        imageProfile: 'https://res.cloudinary.com/racmathafidz/image/upload/v1636354656/iqtuia9ofzj7wgseltrk.jpg',
        password: 'skdfsjfksjfskf',
      },
    },
  ],
};

const MockUserProfile = ({ data }) => (
  <BrowserRouter>
    <Provider store={store}>
      <UserProfile profileData={data} />
    </Provider>
  </BrowserRouter>
);

test('User Profile should render author`s full name', async () => {
  render(<MockUserProfile data={dummyData} />);

  const fullnameElement = screen.getAllByText('Full Name');

  expect(fullnameElement).toHaveLength(2);
});
