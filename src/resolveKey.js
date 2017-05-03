/**
 * Returns a function for handling key resolver pairs
 * @param {Object} input object
 */
export default function resolveKey(
  input,
  context = {},
  { isSync = false } = {}
) {
  return isSync === true
    ? ({ key, fn }) => ({ key, value: fn(input, context) })
    : ({ key, fn }) =>
        Promise.resolve(fn(input, context)).then(value => ({ key, value }));
}
