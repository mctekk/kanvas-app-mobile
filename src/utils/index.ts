export const capitalize = (text: string = '') => {
  if (text) {
    const firstLetter = text[0].toLocaleUpperCase();
    return `${firstLetter}${text.slice(1)}`;
  }
  return '';
};
