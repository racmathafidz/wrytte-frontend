import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Article from '../Article';

const dummyData = {
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
};

const MockArticle = ({ data }) => (
  <BrowserRouter>
    <Article article={data} recomendation={[data]} />
  </BrowserRouter>
);

test('Article should render the correct article`s title', async () => {
  render(<MockArticle data={dummyData} />);

  // use 'find' query for asynchronous testing (because the data is from API)
  const titleElement = await screen.findAllByText(/Article Title/i);

  // have length 2 because from the article and the recomendation (recomendation json data just 1)
  expect(titleElement).toHaveLength(2);
});

test('Article should render the correct article`s body', async () => {
  render(<MockArticle data={dummyData} />);

  const bodyElement = await screen.findByText(/Article Body/i);

  expect(bodyElement).toBeInTheDocument();
});

test('Article should render the correct author`s full name', async () => {
  render(<MockArticle data={dummyData} />);

  const fullnameElement = await screen.findAllByText(/Full Name/i);

  expect(fullnameElement).toHaveLength(3);
});
