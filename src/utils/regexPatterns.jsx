export const patterns = {
  emails: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  urls: /https?:\/\/[^\s<>]+(?:\.[^\s<>]+)+(?:\/[^\s<>]*)?/g,
  phoneNumbers: /\b\d{10,15}\b/g,
  dates: /\b\d{2}\/\d{2}\/\d{4}\b/g,
  htmlTags: /<([a-z][a-z0-9]*)\b[^>]*>/gi,
};
