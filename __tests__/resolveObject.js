import resolveObject from '../src/resolveObject';

describe('resolveObject', () => {
  it('Returns a promise', () => {
    const resolvers = [];
    const values = {};

    expect(resolveObject(resolvers, values)).toBeInstanceOf(Promise);
  });

  it('Calls every resolverObject with input', () => {
    const fn1 = jest.fn(() => 10);
    const resolvers = [{ key: 'id', fn: fn1 }];
    const values = {};
    const context = {};

    resolveObject(resolvers, values, context);

    expect(fn1).toHaveBeenCalled();
    expect(fn1).toHaveBeenCalledWith(values, context);
  });

  it('Does not mutate input value', () => {
    const fn1 = jest.fn(() => 10);
    const resolvers = [{ key: 'id', fn: fn1 }];
    const values = {};
    const context = {};

    return resolveObject(resolvers, values, context).then(result => {
      expect(result).not.toBe(values);
    });
  });

  it('Resolves syncrhonuously', () => {
    const fn1 = jest.fn(() => 10);
    const resolvers = [{ key: 'id', fn: fn1 }];
    const values = {};
    const context = {};

    const result = resolveObject(resolvers, values, context, { isSync: true });
    expect(result).toBeInstanceOf(Object);
    expect(result).toEqual({ id: 10 });
  });
});
