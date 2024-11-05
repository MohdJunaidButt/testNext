export const getImageURL = (dbImageURL: string): string => {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL + "/" + dbImageURL;
  } else return "";
};
