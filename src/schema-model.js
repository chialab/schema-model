/**
 * SchemaModel
 * (c) 2017 Chialab (http://www.chialab.it) <dev@chialab.io>
 *
 * Generate Model classes based on JSON Schema definition.
 */
import tv4 from 'tv4';
import clone from '@chialab/proteins/src/clone.js';
import merge from '@chialab/proteins/src/merge.js';
import Symbolic from '@chialab/proteins/src/symbolic.js';
import { isFunction } from '@chialab/proteins/src/types.js';
import properties from './helpers/properties.js';
import './formats/date-time.js';

/**
 * Get data from an object.
 * @private
 *
 * @param {Object} scope The object to use.
 * @param {String} key The data key.
 * @param {Boolean} internal Should get value has private property.
 * @return {any} The value of the object for the given key.
 */
function get(scope, key, internal) {
    if (internal) {
        key = getSymbol(key);
    }
    return scope[key];
}

/**
 * Merge data to another object.
 * @private
 *
 * @param {Object} scope The object to update.
 * @param {Object} data The object to merge.
 * @param {Boolean} internal Should set value has private property.
 */
function set(scope, data, internal) {
    Object.keys(data).forEach((key) => {
        let originalKey = key;
        if (internal) {
            key = getSymbol(key);
        }
        if (scope[key] !== data[originalKey]) {
            scope[key] = data[originalKey];
        }
    });
}

/**
 * Symbols cache.
 * @private
 * @type {Object}
 */
const SYMBOLS = {};

/**
 * Create a private symbol.
 * @private
 *
 * @param {String} name The name of the property to privatize.
 * @return {Symbolic}
 */
function getSymbol(name) {
    if (!SYMBOLS[name]) {
        SYMBOLS[name] = Symbolic(name);
    }
    return SYMBOLS[name];
}

/**
 * Default set options.
 * @private
 * @type {Object}
 */
const DEFAULT_OPTIONS = {
    validate: true,
    internal: false,
};

/**
 * Generate Model classes based on JSON Schema definition.
 * @class SchemaModel
 */
export default class SchemaModel {
    /**
     * Merge two objects in a new one.
     *
     * @param {Object} obj1 The initial object.
     * @param {Object} obj2 The object to merge.
     * @return {Object} The merged object.
     */
    static merge(...args) {
        return merge(...args);
    }

    /**
     * Clone javascript objects.
     *
     * @param {Object|Array} obj The object to clone.
     * @param {Function} callback An optional function which runs before inserting a property.
     * @return {Object|Array} The clone of the object.
     */
    static clone(...args) {
        return clone(...args);
    }

    /**
     * Create a new schema class extending SchemaModel.
     *
     * @param {Object} schema The schema to use for the new model class.
     * @return {class} An extended SchemaModel.
     */
    static create(schema) {
        return class extends SchemaModel {
            static get schema() {
                return schema;
            }
        };
    }

    /**
     * The schema of the model.
     * @type {Object}
     * @memberof SchemaModel
     */
    static get schema() {
        throw new Error('Missing schema');
    }

    /**
     * The schema merged properties.
     * @type {Object}
     * @memberof SchemaModel
     */
    static get schemaProperties() {
        return properties(this.schema);
    }

    /**
     * Generate Model classes based on JSON Schema definition.
     *
     * @param {Object} data The (optional) initial data to set.
     * @param {Object} options Optional options for data setting.
     */
    constructor(data, options) {
        if (data) {
            this.set(data, options);
        }
    }

    /**
     * Get a property value.
     *
     * @param {String} name The property name to retrieve.
     * @param {Object} options Optional options for data getting.
     * @return {any} The property value.
     */
    get(name, options) {
        options = merge(DEFAULT_OPTIONS, options || {});
        return get(this, name, options.internal);
    }

    /**
     * Set a bunch of properties.
     *
     * @param {Object} data The data to set.
     * @param {Object} options Optional options for data setting.
     */
    set(data, value, options) {
        if (typeof data === 'string') {
            return this.set({
                [data]: value,
            }, options);
        }
        data = data || {};
        options = merge(DEFAULT_OPTIONS, value || {});
        if (!options.internal && options.validate) {
            let dataToValidate = merge(this.toJSON(true), data);
            let res = this.validate(dataToValidate, options);
            /* istanbul ignore if */
            if (!res.valid) {
                if (res.error) {
                    throw res.error;
                } else if (res.missing.length) {
                    throw new Error(`Missing $ref schemas: ${res.missing.join(', ')}`);
                }
                throw new Error('Validation failed');
            }
        }
        set(this, data, options.internal);
    }

    /**
     * Validate a bunch of data or the model instance.
     *
     * @param {Object} data Optional data to validate (if empty, use model's data).
     * @return {Object} A validation result.
     */
    validate(data) {
        data = data || this.toJSON(true);
        let schema = this.constructor.schema;
        let res = tv4.validateResult(data, schema);
        /* istanbul ignore if  */
        if (res.valid && res.missing.length) {
            res.valid = false;
        }
        return res;
    }

    /**
     * Convert the model to a plain javascript object.
     *
     * @param {Boolean} stripUndefined Strip undefined values from model.
     * @return {Object} A representation of the model as plain object.
     */
    toJSON(stripUndefined) {
        let keys = Object.keys(this.constructor.schemaProperties);
        let res = {};
        keys.forEach((key) => {
            let val = this.get(key);
            if (!stripUndefined || val !== undefined) {
                res[key] = val;
            }
        });
        res = clone(res, (scope, key, prop) => {
            if (prop && isFunction(prop.toJSON)) {
                return prop.toJSON(stripUndefined);
            }
            return prop;
        });
        return res;
    }
}
