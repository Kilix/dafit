import buildResolvers from './buildResolvers';
import resolveObject from './resolveObject';

export default function Resolver(mapping) {
  if (typeof mapping !== 'object' || mapping === null) {
    throw new Error('You must provide a mapping object');
  }

  const resolvers = buildResolvers(mapping);

  function Resolve(values, context) {
    return resolveObject(resolvers, values, context);
  }
  return Resolve;
}
