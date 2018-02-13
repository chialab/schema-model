import tv4 from 'tv4';
import clone from '@chialab/proteins/src/clone.js';
import merge from '@chialab/proteins/src/merge.js';

/**
 * Get all root properties merging definition.
 *
 * @param {Object} schema The schema to analyze.
 * @param {Object} validator The validator instance.
 * @return {Object} A list of properties.
 */
export default function properties(schema, validator) {
    let root = !validator;
    if (root) {
        validator = tv4.freshApi();
        validator.addSchema('', schema);
    }
    if (schema.definitions) {
        for (let k in schema.definitions) {
            validator.addSchema(`#/definitions/${k}`, schema.definitions[k]);
        }
    }
    if (schema.$ref) {
        schema = validator.getSchema(schema.$ref);
    }
    if (schema.properties) {
        return clone(schema.properties);
    }
    let res = {};
    let defs = schema['anyOf'] || schema['allOf'] || (root && schema['oneOf']);
    if (defs) {
        defs.forEach((def) => {
            res = merge(res, properties(def, validator));
        });
    }
    return res;
}
