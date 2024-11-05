interface Params {
  [key: string]: string;
}

export const parseQueryString = (queryString: string): Params => {
  const params: Params = {};
  const queryStrings = queryString.split('&');

  for (const queryString of queryStrings) {
    const [key, value] = queryString.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  }

  return params;
};
