export default function parseStringAsArray(strings) {
  return strings.split(',').map(string => string.trim());
}
