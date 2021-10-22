/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArticleList from '../ArticlesList';

const dummyData = [{
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
}];

const MockArticleList = ({ data }) => (
  <BrowserRouter>
    <ArticleList article={data} />
  </BrowserRouter>
);

test('Article list should render `Recomended Article` text', async () => {
  render(<MockArticleList data={dummyData} />);

  const textElement = screen.getByText(/Recomended Article/i);

  expect(textElement).toBeInTheDocument();
});
