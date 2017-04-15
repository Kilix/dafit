import Resolver from '../src/Resolver';

describe('Resolver.js', () => {
  it('Throw if no mapping provided', () => {
    expect(() => new Resolver()).toThrowError('You must provide a mapping object');
  });

  it('Returns a function', () => {
    const resolver = new Resolver({ id: null });
    expect(typeof resolver).toBe('function');
  });

  it('Returns a function returning a promise', () => {
    const resolver = new Resolver({ id: null });
    expect(resolver()).toBeInstanceOf(Promise);
  });
});
