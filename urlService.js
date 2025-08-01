export function generateShortcode(custom) {
  if (custom) return custom;
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return [...Array(6)].map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export function saveShortURL(urlObj) {
  const urls = JSON.parse(localStorage.getItem("shortUrls") || "[]");
  urls.push(urlObj);
  localStorage.setItem("shortUrls", JSON.stringify(urls));
}

export function getShortURL(code) {
  const urls = JSON.parse(localStorage.getItem("shortUrls") || "[]");
  return urls.find((u) => u.shortcode === code);
}
