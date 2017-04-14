import resolveKey from '../src/resolveKey';

describe('resolveKey', () => {
  it('returns a function', () => {
    const input = {};
    expect(typeof resolveKey(input)).toBe('function');
    expect(typeof resolveKey()).toBe('function');
  });

  it('resolves to a Promise', () => {
    const input = {};
    const resolverObject = {
      key: 'key',
      fn: () => {}
    };
    const resolveFn = resolveKey(input);
    const result = resolveFn(resolverObject);

    expect(typeof result.then).toBe('function');
  });

  it('calls the fn function with the input', () => {
    const input = {};
    const fn = jest.fn();
    const resolverObject = {
      key: 'key',
      fn
    };
    const resolveFn = resolveKey(input);
    resolveFn(resolverObject);

    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledWith(input, {});
  });

  it('Return fn result and key as a pair', () => {
    const input = {};
    const testKey = 'testKey';
    const result = 'testResult';
    const resolverObject = {
      key: testKey,
      fn: () => result
    };
    const resolveFn = resolveKey(input);

    return resolveFn(resolverObject).then((res) => {
      expect(res).toEqual({ key: testKey, value: result });
    });
  });
});
