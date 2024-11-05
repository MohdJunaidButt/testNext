export default function ObjectToPrams(obj: any) {
  let queryString = '';
  let keys = Object.keys(obj);
  keys.forEach((key, idx) => {
    if (obj[key] === undefined || obj[key] === null) return;
    queryString += `${idx !== 0 ? '&' : ''}${key}=${obj[key]}`;
  });

  return queryString;
}
