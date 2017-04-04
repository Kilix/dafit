'use strict';

function buildResolvers(mapping) {
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

/**
 * Returns a function for handling key resolver pairs
 * @param {Object} input object
 */
function resolveKey(input) {
  return ({ key, fn }) =>
    Promise.resolve(fn(input)).then(value => ({ key, value }));
}

const assign = Object.assign;

function resolverObject(resolvers, values) {
  return Promise.all(resolvers.map(resolveKey(values))).then(resolvedValues =>
    resolvedValues.reduce((o, { key, value }) => assign(o, { [key]: value }), {
    }));
}

function Resolver$1(mapping) {
  const resolvers = buildResolvers(mapping);

  function Resolve(values) {
    return resolverObject(resolvers, values);
  }
  return Resolve;
}

module.exports = Resolver$1;
