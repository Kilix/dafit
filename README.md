# Dafit

Transform data to fit your structures


[![npm](https://img.shields.io/npm/v/dafit.svg?style=flat-square)](https://www.npmjs.com/package/dafit)
[![npm](https://img.shields.io/npm/dm/dafit.svg?style=flat-square)](https://www.npmjs.com/package/dafit)
[![license](https://img.shields.io/github/license/alexandrebodin/dafit.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[![CircleCI](https://img.shields.io/circleci/project/Kilix/dafit.svg?style=flat-square)](https://circleci.com/gh/Kilix/dafit)

## Installation

```bash
$ npm install --save dafit
```

## Usage

```javascript
const Resolver = require('dafit')

const resolveStructure = new Resolver({
    id: null,
    firstname: input => input.first_name,
    lastname: input => input.last_name,
    fullName: input => `${input.first_name} ${input.last_name.toUpperCase()}`
})


const result = resolveStructure({
    id: 1,
    first_name: 'John',
    last_name: 'Cena',
    age: 39
}) 
// Promise<{id: 1, firstname: 'John', lastname: 'Cena', fullName: 'John CENA'}>
```