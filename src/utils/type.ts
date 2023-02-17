export const getArray = (something: any): any[] => {
  if (Array.isArray(something)) return something;
  if (typeof something === 'string') {
    const parsedSomething = JSON.parse(something);
    if (Array.isArray(parsedSomething)) return parsedSomething;
  }
  return [];
};
