export default function dateFormatter(rawDate) {
  // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateArray = rawDate.split('T')[0].split('-').reverse();
  const date = dateArray[0];
  const month = months[dateArray[1] - 1];
  const year = dateArray[2];
  return `${month} ${date} ${year}`;
}
