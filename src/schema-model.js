import tv4 from 'tv4';

/**
 * Clone javascript objects.
 * @private
 *
 * @param {Object|Array} obj The object to clone.
 * @param {Function} filter An optional function to filter object's children.
 * @return {Object|Array} The clone of the object.
 */
function clone(obj, filter) {
    if (Array.isArray(obj)) {
        return obj.map((entry) => {
            if (typeof entry === 'object') {
                return clone(entry);
            }
            return entry;
        });
    }
    let res = {};
    filter = filter || function() { return true; };
    Object.keys(obj).forEach((k) => {
        if (filter(k, obj[k])) {
            if (typeof obj[k] === 'object') {
                res[k] = clone(obj[k]);
            } else {
                res[k] = obj[k];
            }
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
 * Merge data to another object.
 * @private
 *
 * @param {Object} scope The object to update.
 * @param {Object} data The object to merge.
 */
function set(scope, data) {
    Object.keys(data).forEach((k) => {
        scope[k] = data[k];
    });
}

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
     * @return {any} The property value.
     */
    get(name) {
        return this[name];
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
        if (options.validate) {
            let dataToValidate = merge(this.toJSON(), data);
            let res = this.validate(dataToValidate, options);
            if (!res.valid) {
                if (res.error && res.error.message) {
                    throw new Error(res.error.message, res);
                } else if (res.missing.length) {
                    throw new Error('Missing $ref schemas', res.missing.join(', '));
                }
            } else {
                set(this, dataToValidate);
            }
        } else {
            set(this, data);
        }
    }
    /**
     * Validate a bunch of data or the model instance.
     *
     * @param {Object} data Optional data to validate (if empty, use model's data).
     * @return {Object} A validation result.
     */
    validate(data) {
        data = data || this.toJSON();
        let schema = this.constructor.schema;
        if (!schema.additionalProperties) {
            schema.additionalProperties = false;
        }
        let res = tv4.validateResult(data, schema);
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
        return clone(this, (key) =>
            (key.indexOf('__') !== 0)
        );
    }
}
