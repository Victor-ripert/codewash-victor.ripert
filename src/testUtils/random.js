export const mockRandomSequence = (values) => {
  let calls = 0;
  const original = Math.random;
  Math.random = () => {
    const value = values[calls % values.length];
    calls += 1;
    return value;
  };
  return () => {
    Math.random = original;
  };
};
