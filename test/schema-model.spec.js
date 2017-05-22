/* eslint-env mocha */
import { SchemaModel } from '../src/schema-model.js';
import SCHEMA from './schema.json';

describe('Unit: SchemaModel', () => {
    describe('custom model creation', () => {
        const Model = SchemaModel.create(SCHEMA);
        let model = new Model({
            id: 'entry1',
            name: 'Alan',
            children: [],
            tags: ['father', 'man', 'mathematician'],
        });

        it('should instantiate the model', () => {
            assert.equal(model.get('id'), 'entry1');
            assert.equal(model.id, 'entry1');
        });

        it('should handle complex data', () => {
            model.set('children', [
                new Model({
                    id: 'child1',
                    name: 'Julian',
                }),
            ]);
            assert.equal(model.get('children').length, 1);
            assert(model.get('children')[0] instanceof Model);
            assert(model.validate().valid);
            assert.equal(JSON.stringify(model.toJSON()), '{"id":"entry1","name":"Alan","children":[{"id":"child1","name":"Julian"}],"tags":["father","man","mathematician"]}');
        });
    });

    describe('empty schema model', () => {
        it('throws on instantiation', () => {
            let willThrow = () => { new SchemaModel({ id: 'throw' }); };
            assert.throws(willThrow, Error, 'Missing schema');
        });
    });

    describe('validation', () => {
        const Model = SchemaModel.create(SCHEMA);
        it('should validate correct models', () => {
            let model = new Model({ id: 'entry1' });
            assert(model.validate().valid);
        });

        it('should set correct values', () => {
            let model = new Model({ id: 'entry1' });
            model.set('name', 'Alan');
            assert.equal(model.get('name'), 'Alan');
            assert.equal(model.name, 'Alan');
            assert(model.validate().valid);
        });

        it('should not set wrong values', () => {
            let model = new Model({ id: 'entry1', name: 'Alan' });
            let willThrow = () => { model.set('name', 2); };
            assert.throws(willThrow, Error, 'Invalid type: number (expected string)');
            assert.equal(model.get('name'), 'Alan');
            assert.equal(model.name, 'Alan');
        });

        it('should not set wrong complex values', () => {
            let model = new Model({ id: 'entry1', name: 'Alan', children: [] });
            let willThrow = () => { model.set('children', [
                { id: 'child1', name: 2 },
            ]); };
            assert.throws(willThrow, Error, 'Invalid type: number (expected string)');
            assert.equal(model.get('name'), 'Alan');
            assert.equal(model.get('children').length, 0);
        });

        it('should skip validation', () => {
            let model = new Model({ id: 'entry1' });
            model.set('name', 2, { validate: false });
            assert(model.get('name'), 2);
            assert(model.name, 2);
            let validation = model.validate();
            assert.equal(validation.valid, false);
            assert.equal(validation.error.message, 'Invalid type: number (expected string)');
        });

        it('should invalidate models with missing data', () => {
            let model = new Model();
            let validation = model.validate();
            assert.equal(validation.valid, false);
            assert.equal(validation.error.message, 'Missing required property: id');
        });
    });

    describe('use custom getters', () => {
        const Model = class extends SchemaModel {
            static get schema() {
                return SCHEMA;
            }

            get id() {
                return this.get('id', { internal: true }) || 'entry1';
            }

            set id(id) {
                this.set('id', id, { internal: true });
            }

            get name() {
                return this.get('privateName', { internal: true });
            }

            set name(name) {
                this.set('privateName', name, { internal: true });
            }
        };

        it('should set internal properties', () => {
            let model = new Model({ name: 'Alan' });
            assert(model.validate().valid);
            assert.equal(model.get('id'), 'entry1');
            assert.equal(model.id, 'entry1');
            assert.equal(model.get('name'), 'Alan');
            assert.equal(model.name, 'Alan');
            assert.equal(model.get('privateName', { internal: true }), 'Alan');
            assert.equal(model.privateName, undefined);
        });
    });
});
