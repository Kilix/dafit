/**
 * Returns a function for handling key resolver pairs
 * @param {Object} input object
 */
export default function resolveKey(input, context = {}) {
  return ({ key, fn }) =>
    Promise.resolve(fn(input, context)).then(value => ({ key, value }));
}
