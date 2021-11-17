import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArticleMapping from '../ArticleMapping';

const dummyFunction = jest.fn();

const dummyData = [{
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
}];

const MockArticleMapping = ({ data, home, recomendation, status }) => (
  <BrowserRouter>
    <ArticleMapping ArticleData={data} Home={home} Recomendation={recomendation} Status={status} setForceFetch={dummyFunction} />
  </BrowserRouter>
);

test('Home`s Article Mapping should render the correct title', async () => {
  render(<MockArticleMapping data={dummyData} home recomendation={false} profile={false} />);

  const titleElement = screen.getByText(/Article Title/i);

  expect(titleElement).toBeInTheDocument();
});

test('Home`s Article Mapping should render the correct author`s full name', async () => {
  render(<MockArticleMapping data={dummyData} home recomendation={false} profile={false} />);

  const fullnameElement = screen.getByText(/Full Name/i);

  expect(fullnameElement).toBeInTheDocument();
});

test('Home`s Article Mapping should render the correct publish date', async () => {
  render(<MockArticleMapping data={dummyData} home recomendation={false} profile={false} />);

  const dateElement = screen.getByText(/01 Oct 2021/i);

  expect(dateElement).toBeInTheDocument();
});

test('Recomendation`s Article Mapping should render the correct title', async () => {
  render(<MockArticleMapping data={dummyData} recomendation home={false} profile={false} />);

  const titleElement = screen.getByText(/Article Title/i);

  expect(titleElement).toBeInTheDocument();
});

test('Recomendation`s Article Mapping should render the correct author`s full name', async () => {
  render(<MockArticleMapping data={dummyData} recomendation home={false} profile={false} />);

  const fullnameElement = screen.getByText(/Full Name/i);

  expect(fullnameElement).toBeInTheDocument();
});

test('Recomendation`s Article Mapping should render the correct publish date', async () => {
  render(<MockArticleMapping data={dummyData} recomendation home={false} profile={false} />);

  const dateElement = screen.getByText(/01 Oct 2021/i);

  expect(dateElement).toBeInTheDocument();
});

test('Profile`s Article Mapping should render the correct title', async () => {
  render(<MockArticleMapping data={dummyData} status="OthersProfile" recomendation={false} home={false} />);

  const titleElement = screen.getByText(/Article Title/i);

  expect(titleElement).toBeInTheDocument();
});

test('Profile`s Article Mapping should render the correct author`s full name', async () => {
  render(<MockArticleMapping data={dummyData} status="OthersProfile" recomendation={false} home={false} />);

  const fullnameElement = screen.getByText(/Full Name/i);

  expect(fullnameElement).toBeInTheDocument();
});

test('Profile`s Article Mapping should render the correct publish date', async () => {
  render(<MockArticleMapping data={dummyData} status="OthersProfile" recomendation={false} home={false} />);

  const dateElement = screen.getByText(/01 Oct 2021/i);

  expect(dateElement).toBeInTheDocument();
});
