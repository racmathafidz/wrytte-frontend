export default function capitalizeFirstLetter(string) {
  const arr = string.split(' ').map((items) => items.charAt(0).toUpperCase() + items.slice(1));
  return arr.join(' ');
}
