import buildResolvers from './buildResolvers';
import resolveObject from './resolveObject';
import invariant from './utils/invariant';

const mappingInvariant = mapping =>
  invariant(
    typeof mapping === 'object' && mapping !== null,
    'You must provide a mapping object'
  );

const defaultOpts = {
  hooks: {
    before: null,
    after: null,
  },
};

const SyncResolver = function SyncResolver(mapping, options) {
  mappingInvariant(mapping);

  const resolvers = buildResolvers(mapping);
  const opts = Object.assign({}, defaultOpts, options);

  function Resolve(values, context) {
    const computedValues = opts.hooks.before
      ? opts.hooks.before(values, context)
      : values;

    const result = resolveObject(resolvers, computedValues, context, {
      isSync: true,
    });

    return opts.hooks.after
      ? opts.hooks.after(computedValues, context, result)
      : result;
  }
  return Resolve;
};

const Resolver = function Resolver(mapping, options) {
  mappingInvariant(mapping);

  const resolvers = buildResolvers(mapping);
  const opts = Object.assign({}, defaultOpts, options);

  function Resolve(values, context) {
    const computedValues = opts.hooks.before
      ? opts.hooks.before(values, context)
      : values;

    const result = resolveObject(resolvers, computedValues, context);
    return result.then(res => {
      return opts.hooks.after
        ? opts.hooks.after(computedValues, context, res)
        : res;
    });
  }
  return Resolve;
};

export default {
  Resolver,
  SyncResolver,
};

export { Resolver, SyncResolver };
