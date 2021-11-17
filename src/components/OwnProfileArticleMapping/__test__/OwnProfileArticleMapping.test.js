import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OwnProfileArticleMapping from '../OwnProfileArticleMapping';

const dummyFunction = jest.fn();

const dummyItems = {
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

const MockOwnProfileArticleMapping = ({ data }) => (
  <BrowserRouter>
    <OwnProfileArticleMapping items={data} index={0} setForceFetch={dummyFunction} />
  </BrowserRouter>
);

test('OwnProfileArticleMapping should render correct article`s title', () => {
  render(<MockOwnProfileArticleMapping data={dummyItems} />);

  const titleElement = screen.getByText(/Article Title/i);

  expect(titleElement).toBeInTheDocument();
});

test('OwnProfileArticleMapping should render correct author`s name', () => {
  render(<MockOwnProfileArticleMapping data={dummyItems} />);

  const authorsNameElement = screen.getByText(/Full Name/i);

  expect(authorsNameElement).toBeInTheDocument();
});

test('OwnProfileArticleMapping should render correct publish date', () => {
  render(<MockOwnProfileArticleMapping data={dummyItems} />);

  const publishDateElement = screen.getByText(/01 Oct 2021/i);

  expect(publishDateElement).toBeInTheDocument();
});

test('OwnProfileArticleMapping should render option button', () => {
  render(<MockOwnProfileArticleMapping data={dummyItems} />);

  const buttonElement = screen.getAllByRole('button');

  expect(buttonElement).toHaveLength(2);
});

test('OwnProfileArticleMapping should render Delete and Edit popper when option button clicked', () => {
  render(<MockOwnProfileArticleMapping data={dummyItems} />);

  const optionButton = screen.getByTestId('option-button');
  const deleteElement = screen.getByText(/Delete/i);
  const editElement = screen.getByText(/Edit/i);

  fireEvent.click(optionButton);

  expect(deleteElement).toBeInTheDocument();
  expect(editElement).toBeInTheDocument();
});
