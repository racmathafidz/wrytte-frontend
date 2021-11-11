/* eslint-disable react/no-danger */
export default function stringToHtml(htmlString) {
  const body = htmlString.replace(/<p><\/\p>/gi, '<br />');
  console.log(body);
  return (
    <div dangerouslySetInnerHTML={{ __html: body }} />
  );
}
