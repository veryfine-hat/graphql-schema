import {define} from './define';
import {schemas} from './storage';

beforeEach(() => {
  // Clear the schemas before each test
  schemas.clear();
});

it('should add a new schema to the storage', () => {
  define('TestSchema', 'TestSchemaDefinition', ['Dependency1', 'Dependency2']);
  const schema = schemas.get('TestSchema');
  expect(schema).toBeDefined();
  expect(schema?.dependsOn).toEqual(['Dependency1', 'Dependency2']);
  expect(schema?.schema).toEqual('TestSchemaDefinition');
});

it('should throw an error if a schema with the same name already exists', () => {
  define('TestSchema', 'TestSchemaDefinition');
  expect(() => define('TestSchema', 'AnotherTestSchemaDefinition')).toThrowError('Schema TestSchema already defined');
});

it('should handle no dependencies gracefully', () => {
  define('TestSchema', 'TestSchemaDefinition');
  const schema = schemas.get('TestSchema');
  expect(schema?.dependsOn).toEqual([]);
});
