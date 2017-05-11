# Dafit

Transform data to fit your structures.


[![npm](https://img.shields.io/npm/v/dafit.svg?style=flat-square)](https://www.npmjs.com/package/dafit)
[![npm](https://img.shields.io/npm/dm/dafit.svg?style=flat-square)](https://www.npmjs.com/package/dafit)
[![license](https://img.shields.io/github/license/alexandrebodin/dafit.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[![CircleCI](https://img.shields.io/circleci/project/Kilix/dafit.svg?style=flat-square)](https://circleci.com/gh/Kilix/dafit)
[![Codecov](https://img.shields.io/codecov/c/github/Kilix/dafit.svg?style=flat-square)](https://codecov.io/github/Kilix/dafit)

## Installation

```bash
$ npm install --save dafit
```

## Usage

Dafit enables you to create a dynamic schema you want your data to fit.

```javascript
import { Resolver } from 'dafit';
// import dafit from 'dafit';
// then user dafit.Resolver
// or
// const { Resolver } = require('dafit');

const defaultValue = null;

const resolveUser = new Resolver({
    id: defaultValue, // if field id is present will return it if not will set it to defaultValue
    firstname: user => user.first_name, // will set firstname as the return value of the function
    lastname: user => user.last_name,
    fullName: user => `${user.first_name} ${user.last_name.toUpperCase()}` 
    friends: user => getFriends(user.id), // will wait for any thenable (e.g Promise) to resolve
    permissions: (user, context) => { // receives a context to enable more dynamic resolving
        if (contact.withPermissions) return getPermissions(user)
        return []
    },
})

const user = {
    id: 1,
    first_name: 'John',
    last_name: 'Cena',
    age: 39
}

const result = resolveUser(user, { withPermissions: true });
// Promise<{
//    id: 1, 
//    firstname: 'John', 
//    lastname: 'Cena', 
//    fullName: 'John CENA', 
//    friends: [...], 
//    permissions: ['WRITE_DASHBOARD']
// }>
```

You can also use a synchronuous resolver for some use case to avoid using Promises

```javascript
import { SyncResolver } from 'dafit';
// const { SyncResolver } = require('dafit');

const defaultValue = null;

const resolveUser = new SyncResolver({
    id: defaultValue, // if field id is present will return it if not will set it to defaultValue
    firstname: user => user.first_name, // will set firstname as the return value of the function
    lastname: user => user.last_name,
    fullName: user => `${user.first_name} ${user.last_name.toUpperCase()}`,
    aPromise: () => new Promise((resolve) => resolve('Hello World!')), // the promise will not be resolved before return
})

const user = {
    id: 1,
    first_name: 'John',
    last_name: 'Cena',
    age: 39
}

const result = resolveUser(user, { withPermission: true });
// {
//    id: 1, 
//    firstname: 'John', 
//    lastname: 'Cena', 
//    fullName: 'John CENA',
//    aPromise: Promise<'Hello World!'>
// }
```



## Change Log 

- Changes are reported on the [Github release page](https://github.com/Kilix/dafit/releases)

## Contributing

Read [How to contribute](https://github.com/Kilix/dafit/blob/master/CONTRIBUTING.md) to help us improve this library.

## Ideas for contribution

- [] Adding before / after hooks
- [] Adding support for default context
- [] Handling nested structures
- [] Adding support for Rx and such
- [] Adding plugins feature to add more flexibility *(e.g immutable-plugin to pass a withMutation object to the resolvers for improved performance)*