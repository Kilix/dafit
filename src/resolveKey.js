/**
 * Returns a function for handling key resolver pairs
 * @param {Object} input object
 */
export default function resolveKey(input) {
  return ({ key, fn }) =>
    Promise.resolve(fn(input)).then(value => ({ key, value }));
}
