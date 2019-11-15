<p align="center">
   <strong>SchemaModel</strong>
</p>

<p align="center">
    Generate Model classes based on <a href="http://json-schema.org/">JSON Schema</a> definition.
</p>

<p align="center">
    <a href="https://travis-ci.org/chialab/schema-model">
        <img alt="Travis status" src="https://img.shields.io/travis/chialab/schema-model.svg?style=flat-square">
    </a>
    <a href="https://codecov.io/gh/chialab/schema-model">
        <img alt="Code coverage" src="https://img.shields.io/codecov/c/github/chialab/schema-model.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@chialab/schema-model">
        <img alt="NPM" src="https://img.shields.io/npm/v/@chialab/schema-model.svg?style=flat-square">
    </a>
    <a href="https://github.com/chialab/schema-model/blob/master/LICENSE">
        <img alt="License" src="https://img.shields.io/npm/l/@chialab/schema-model.svg?style=flat-square">
    </a>
    <a href="https://saucelabs.com/u/chialab-sl-013">
        <img alt="Saucelabs" src="https://badges.herokuapp.com/sauce/chialab-sl-013?labels=none&style=flat-square">
    </a>
</p>

---

## Install

```sh
npm install @chialab/schema-model --save
```

## Usage

The `SchemaModel` object can be extended or use as factory to create Model classes dynamically.

### Extend the base model

```js
import SchemaModel from '@chialab/schema-model';

class PersonModel extends SchemaModel {
    static get schema() {
        return {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                },
                firstName: {
                    type: 'string',
                },
                lastName: {
                    type: 'string',
                },
                married: {
                    type: 'boolean',
                },
            },
            required: ['id'],
        };
    }
}

let person = new PersonModel({
    id: 1,
});
```

### As factory

```js
const PersonModel = SchemaModel.create({
    type: 'object',
    properties: {
        id: {
            type: 'number',
        },
        firstName: {
            type: 'string',
        },
        lastName: {
            type: 'string',
        },
        married: {
            type: 'boolean',
        },
    },
    required: ['id'],
});

let person = new PersonModel({
    id: 1,
});
```

## Validation

SchemaModel uses [tv4](https://github.com/geraintluff/tv4) to validate model data on creation and update.

### Get the validation state

Use the `.validate` method to retrieve the validation state of the model.

```js
let person = new PersonModel();
let validation = person.validate();
console.log(validation.valid); // --> false
console.log(validation.error.message); // --> 'Missing required property: id'
```

### Creation and update

When a set of data is pass to the constructor or to the `.set` method, the model will try to validate them. If the validation fails, an exception is thrown and the new data **will not** be set.

```js
try {
    let person = new PersonModel({ firstName: 'Alan' });
} catch (err) {
    console.log(err.message); // --> 'Missing required property: id'
}
```

```js
try {
    let person = new PersonModel({ id: 1, firstName: 'Alan' });
    person.set({
        lastName: 10,
    });
} catch (err) {
    console.log(err.message); // --> 'Invalid type: number (expected string)'
}
```

### Skip validation

By the way, you can disabled the auto validation passing `validate: false` as option for constructor/set.

```js
let person = new PersonModel({ firstName: 'Alan' }, { validate: false });
let validation = person.validate();
console.log(validation.valid); // --> false
console.log(validation.error.message); // --> 'Missing required property: id'
```

## Getting and setting data

In order to get an object representing model data, you can use the `.toJSON` helper, which converts all model instances in javascript plain objects:

```js
let person = new PersonModel({ id: 1, firstName: 'Alan' });
console.log(person); // --> PersonModel{ id: 1, firstName: 'Alan' }
console.log(person.toJSON()); // --> { id: 1, firstName: 'Alan' }
```

You can access a property of the model using the `.get` method, or accessing directly to its reference:

```js
let person = new PersonModel({ id: 1, firstName: 'Alan' });
console.log(person.get('id')); // --> 1
console.log(person.firstName); // --> 'Alan'
```

By the way, you should always use the `.set` method to update the model:
```js
let person = new PersonModel({ id: 1, firstName: 'Alan' });

// ok!
person.set({
    lastName: 'Turing',
});

// no no no
person.lastName = 'Turing';
```

### Define getters and setters

Using ES2015 classes (or `Object.defineProperty` programmatically), you can define a custom getter and setter for a property:

```js
import SchemaModel from '@chialab/schema-model';

class PersonModel extends SchemaModel {
    static get schema() {
        return {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                },
                firstName: {
                    type: 'string',
                },
                lastName: {
                    type: 'string',
                },
                married: {
                    type: 'boolean',
                },
            },
            required: ['id'],
        };
    }

    set married(married) {
        // passing the `internal: true` options you can set a private property.
        this.set('married', !!married, { internal: true });
    }

    get married() {
        // setup a default value for a property
        return this.get('married', { internal: true }) || false;
    }
}

let person = new PersonModel({
    id: 1,
});
console.log(person.married); // --> false
person.set({ married: true });
console.log(person.married); // --> true
```
