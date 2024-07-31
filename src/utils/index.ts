export const capitalize = (text: string = '') => {
  if (text) {
    const firstLetter = text[0].toLocaleUpperCase();
    return `${firstLetter}${text.slice(1)}`;
  }
  return '';
};

/**
 * Handle the custom fields from the user data
 * @param userData - The user data to handle
 * @returns A new user object with the custom fields as properties
 */
export const handleCustomFields = (userData: IUser) => {
  let new_user = { ...userData };
  const customFields = userData?.custom_fields.data;
  customFields.forEach((item) => {
    new_user[item.name] = item.value;
  });
  return new_user;
};
