import resolveKey from './resolveKey';

const assign = Object.assign;

export default function resolverObject(resolvers, values) {
  return Promise.all(resolvers.map(resolveKey(values))).then(resolvedValues =>
    resolvedValues.reduce((o, { key, value }) => assign(o, { [key]: value }), {
    }));
}
