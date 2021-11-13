export default function urlTitle(string) {
  return string.replace(/\s+/g, '-').toLowerCase();
}
