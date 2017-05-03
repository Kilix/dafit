import buildResolvers from './buildResolvers';
import resolveObject from './resolveObject';
import invariant from './utils/invariant';

const mappingInvariant = mapping =>
  invariant(
    typeof mapping === 'object' && mapping !== null,
    'You must provide a mapping object'
  );

const SyncResolver = function SyncResolver(mapping) {
  mappingInvariant(mapping);

  const resolvers = buildResolvers(mapping);

  function Resolve(values, context) {
    return resolveObject(resolvers, values, context, { isSync: true });
  }
  return Resolve;
};

const Resolver = function Resolver(mapping) {
  mappingInvariant(mapping);

  const resolvers = buildResolvers(mapping);

  function Resolve(values, context) {
    return resolveObject(resolvers, values, context);
  }
  return Resolve;
};

export { SyncResolver };
export default Resolver;
