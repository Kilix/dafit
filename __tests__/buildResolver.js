import buildResolvers from '../src/buildResolvers';

const resolverObjectMatcher = expect.arrayContaining([
  expect.objectContaining({
    key: expect.any(String),
    fn: expect.any(Function)
  })
]);

describe('buildResolvers', () => {
  it('Returns an array', () => {
    const resolvers = buildResolvers();
    expect(Array.isArray(resolvers)).toBe(true);
  });

  it('Returns an array of single resolver', () => {
    const resolvers = buildResolvers({ id: null, a: null });
    expect(resolvers).toEqual(resolverObjectMatcher);
  });

  it('Returns a resolverObject containing the passed functions', () => {
    const fn = () => {};
    const resolvers = buildResolvers({
      id: fn
    });
    expect(resolvers).toEqual(resolverObjectMatcher);
    expect(resolvers).toEqual([{ key: 'id', fn }]);
  });

  it('Returns a resolverObject returning a default value if input does not have key', () => {
    const resolvers = buildResolvers({
      id: 10
    });
    expect(resolvers).toEqual(resolverObjectMatcher);
    expect(resolvers[0].fn()).toEqual(10);
  });

  it('Returns a resolverObject returning key value', () => {
    const input = { id: 1 };
    const fn = jest.fn(object => object.id);
    const resolvers = buildResolvers({
      id: fn
    });
    expect(resolvers).toEqual(resolverObjectMatcher);
    expect(resolvers[0].fn(input)).toEqual(1);
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledWith(input);
  });
});
