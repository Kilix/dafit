import buildResolvers from './buildResolvers';
import resolveObject from './resolveObject';

export default function Resolver(mapping) {
  const resolvers = buildResolvers(mapping);

  function Resolve(values, context) {
    return resolveObject(resolvers, values, context);
  }
  return Resolve;
}
