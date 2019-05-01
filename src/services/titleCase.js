export default function titleCase(str) {
  return str
    .toLowerCase()
    .split("_")
    .map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
