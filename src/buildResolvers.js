/**
 * Returns an array of resolving functions to apply
 * @param {Object} mapping A transformation map
 */
export default function buildResolvers(mapping = {}) {
  return Object.keys(mapping).reduce(
    (resolvers, key) => {
      const val = mapping[key];

      if (val !== null && typeof val === 'function') {
        resolvers.push({ key, fn: val });
        return resolvers;
      }

      resolvers.push({ key, fn: (value = {}) => value[key] || val });
      return resolvers;
    },
    []
  );
}
