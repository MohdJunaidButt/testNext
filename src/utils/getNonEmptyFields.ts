export default function getNonEmptyFields<T extends Record<string, any>>(
  obj: T
): Partial<T> {
  const nonEmptyFields: Partial<T> = {};
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '')
      nonEmptyFields[key] = obj[key];
  }
  return nonEmptyFields;
}
