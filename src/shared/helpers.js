export const buildRoute = (path, queryParams) => {
  const queryParamString = queryParams
    ? Object.keys(queryParams)
        .filter((key) => Boolean(queryParams[key]))
        .reduce((str, key) => `${str}&${key}=${queryParams[key]}`, '?')
    : '';

  return `${path}${queryParamString}`;
};
