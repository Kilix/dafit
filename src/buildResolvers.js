export default function buildResolvers(mapping) {
  return Object.keys(mapping).reduce(
    (resolvers, key) => {
      const val = mapping[key];

      if (val !== null) {
        if (typeof val === 'object' && typeof val.resolve === 'function') {
          resolvers.push({ key, fn: val.resolve });
          return resolvers;
        } else if (typeof val === 'function') {
          resolvers.push({ key, fn: val });
          return resolvers;
        }
      }

      resolvers.push({ key, fn: value => value[key] || val });
      return resolvers;
    },
    []
  );
}
