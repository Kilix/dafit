# Dafit

Transform data to fit your structures.


[![npm](https://img.shields.io/npm/v/dafit.svg?style=flat-square)](https://www.npmjs.com/package/dafit)
[![npm](https://img.shields.io/npm/dm/dafit.svg?style=flat-square)](https://www.npmjs.com/package/dafit)
[![license](https://img.shields.io/github/license/alexandrebodin/dafit.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[![CircleCI](https://img.shields.io/circleci/project/Kilix/dafit.svg?style=flat-square)](https://circleci.com/gh/Kilix/dafit)

## Installation

```bash
$ npm install --save dafit
```

## Usage

Dafit enables you to create a dynamic schema you want your data to fit.

```javascript
const Resolver = require('dafit')

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

const result = resolveUser(user, { withPermission: true });
// Promise<{
//    id: 1, 
//    firstname: 'John', 
//    lastname: 'Cena', 
//    fullName: 'John CENA', 
//    friends: [...], 
//    permissions: ['WRITE_DASHBOARD']
// }>
```