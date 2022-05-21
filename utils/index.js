// get flat object
export function flatObject(object) {
  const result = {};

  Object.keys(object).forEach((key) => {
    if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
      const res = flatObject(object[key]);

      Object.keys(res).forEach((nestedKey) => {
        result[`${key}.${nestedKey}`] = res[nestedKey];
      });
    } else {
      result[key] = object[key];
    }
  });

  return result;
}
