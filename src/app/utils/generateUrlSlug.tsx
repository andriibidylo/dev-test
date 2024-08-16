const generateUrlSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\.\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

export default generateUrlSlug;
