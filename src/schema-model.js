import tv4 from 'tv4';

/**
 * Clone javascript objects.
 * @private
 *
 * @param {Object|Array} obj The object to clone.
 * @param {Function} callback An optional function which runs before inserting a property.
 * @return {Object|Array} The clone of the object.
 */
function clone(obj, callback) {
    callback = callback || function(scope, key, prop) { return prop; };
    if (Array.isArray(obj)) {
        return obj.map((entry, index) => {
            entry = callback(obj, index, entry);
            if (typeof entry === 'object') {
                return clone(entry, callback);
            }
            return entry;
        });
    }
    let res = {};
    Object.keys(obj).forEach((k) => {
        let val = callback(obj, k, obj[k]);
        if (typeof val === 'object') {
            res[k] = clone(val, callback);
        } else {
            res[k] = val;
        }
    });
    return res;
}
/**
 * Merge two objects in a new one.
 * @private
 *
 * @param {Object} obj1 The initial object.
 * @param {Object} obj2 The object to merge.
 * @return {Object} The merged object.
 */
function merge(obj1, obj2) {
    let res = clone(obj1);
    Object.keys(obj2).forEach((key) => {
        if (typeof obj2[key] === 'object') {
            if (typeof res[key] === 'object') {
                res[key] = merge(res[key], obj2[key]);
            } else {
                res[key] = obj2[key];
            }
        } else {
            res[key] = obj2[key];
        }
    });
    return res;
}

/**
 * Get data from an object.
 * @private
 *
 * @param {Object} scope The object to use.
 * @param {String} k The data key.
 * @param {Boolean} internal Should get value has private property.
 * @return {any} The value of the object for the given key.
 */
function get(scope, k, internal) {
    if (internal) {
        k = getSymbol(k);
    }
    return scope[k];
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
    Object.keys(data).forEach((k) => {
        let ok = k;
        if (internal) {
            k = getSymbol(k);
        }
        scope[k] = data[ok];
    });
}
/**
 * Create a private symbol.
 * @private
 *
 * @param {String} name The name of the property to privatize.
 * @return {Symbol|String}
 */
function getSymbol(name) {
    if (!getSymbol.cache[name]) {
        if (self.Symbol) {
            getSymbol.cache[name] = self.Symbol(name);
        } else {
            getSymbol.cache[name] = `__${name}`;
        }
    }
    return getSymbol.cache[name];
}

getSymbol.cache = {};

export class SchemaModel {
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
     * Default model options.
     * @type Object
     * @memberof SchemaModel
     *
     * @property {Boolean} validate Should or not validate the model on update.
     */
    static get defaultOptions() {
        return {
            validate: true,
            internal: false,
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
     * The resolved schema of the model.
     * @type {Object}
     * @memberof SchemaModel
     */
    static get resolvedSchema() {
        let schema = this.schema;
        if (schema['$ref'] !== undefined) {
            tv4.addSchema('', schema);
            schema = tv4.getSchema(schema['$ref']);
        }
        return schema;
    }
    /**
     * Generate Model classes based on JSON Schema definition.
     * @class
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
        options = merge(this.constructor.defaultOptions, options || {});
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
        options = merge(this.constructor.defaultOptions, value || {});
        if (!options.internal && options.validate) {
            let dataToValidate = merge(this.toJSON(), data);
            let res = this.validate(dataToValidate, options);
            /* istanbul ignore if */
            if (!res.valid) {
                if (res.error && res.error.message) {
                    throw new Error(res.error.message);
                } else if (res.missing.length) {
                    throw new Error(`Missing $ref schemas: ${res.missing.join(', ')}`);
                }
                throw new Error('Validation failed');
            } else {
                data = dataToValidate;
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
        data = data || this;
        let schema = this.constructor.schema;
        if (!schema.additionalProperties) {
            schema.additionalProperties = false;
        }
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
     * @return {Object} A representation of the model as plain object.
     */
    toJSON() {
        let schema = this.constructor.resolvedSchema;
        let keys = (schema.properties && Object.keys(schema.properties)) || [];
        let res = {};
        keys.forEach((key) => {
            let val = this.get(key);
            if (val !== undefined) {
                res[key] = this.get(key);
            }
        });
        res = clone(res, (scope, key, prop) => {
            if (prop instanceof SchemaModel) {
                return prop.toJSON();
            }
            return prop;
        });
        return res;
    }
}

SchemaModel.symbols = {};
