import resolveKey from './resolveKey';

const assign = Object.assign;

export default function resolverObject(
  resolvers,
  values,
  context = {},
  { isSync = false } = {}
) {
  return isSync
    ? resolvers
        .map(resolveKey(values, context, { isSync }))
        .reduce((o, { key, value }) => assign(o, { [key]: value }), {})
    : Promise.all(
        resolvers.map(resolveKey(values, context))
      ).then(resolvedValues =>
        resolvedValues.reduce(
          (o, { key, value }) => assign(o, { [key]: value }),
          {}
        ));
}
