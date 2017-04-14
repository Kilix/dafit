import resolveKey from './resolveKey';

const assign = Object.assign;

export default function resolverObject(resolvers, values, context = {}) {
  return Promise.all(resolvers.map(resolveKey(values, context))).then(resolvedValues =>
    resolvedValues.reduce((o, { key, value }) => assign(o, { [key]: value }), {
    }));
}
