import { Resolver, SyncResolver } from '../src/Resolver';

describe('Resolver.js', () => {
  describe('Resolver', () => {
    it('Throw if no mapping provided', () => {
      expect(() => new Resolver()).toThrowError(
        'You must provide a mapping object'
      );
    });

    it('Returns a function', () => {
      const resolver = new Resolver({ id: null });
      expect(typeof resolver).toBe('function');
    });

    it('Returns a function returning a promise', () => {
      const resolver = new Resolver({ id: null });
      expect(resolver()).toBeInstanceOf(Promise);
    });

    it('Pass into the hooks before', () => {
      const resolver = new Resolver(
        { id: 1 },
        { hooks: { before: () => ({ id: 3 }) } }
      );
      resolver({ id: 2 }).then(res => expect(res).toEqual({ id: 3 }));
    });

    it('Pass into the hooks after', () => {
      const resolver = new Resolver(
        { id: 3 },
        { hooks: { after: () => ({ id: 1 }) } }
      );
      resolver({}).then(res => expect(res).toEqual({ id: 1 }));
    });
  });

  describe('SyncResolver', () => {
    it('Throw if no mapping provided', () => {
      expect(() => new SyncResolver()).toThrowError(
        'You must provide a mapping object'
      );
    });

    it('Returns a function', () => {
      const resolver = new SyncResolver({ id: null });
      expect(typeof resolver).toBe('function');
    });

    it('Returns a function returning a promise', () => {
      const resolver = new SyncResolver({ id: null });
      expect(resolver()).toBeInstanceOf(Object);
    });

    it('Pass into the hooks before', () => {
      const resolver = new SyncResolver(
        { id: 1 },
        { hooks: { before: () => ({ id: 3 }) } }
      );

      expect(resolver({ id: 2 })).toEqual({ id: 3 });
    });

    it('Pass into the hooks after', () => {
      const resolver = new SyncResolver(
        { id: 3 },
        { hooks: { after: () => ({ id: 1 }) } }
      );

      expect(resolver({})).toEqual({ id: 1 });
    });
  });
});
