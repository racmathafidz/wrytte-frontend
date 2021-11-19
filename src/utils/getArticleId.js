export default function getArticleId(articleTitle) {
  const articleArr = articleTitle.split('-');
  return articleArr[articleArr.length - 1];
}
