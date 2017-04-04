import buildResolvers from './buildResolvers';
import resolveObject from './resolveObject';

export default function Resolver(mapping) {
  const resolvers = buildResolvers(mapping);

  function Resolve(values) {
    return resolveObject(resolvers, values);
  }
  return Resolve;
}
