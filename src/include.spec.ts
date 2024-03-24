import {include} from './include';
import {schemas} from './storage';
import {SchemaDefinition} from './SchemaDefinition';
import {define} from "./define";

beforeEach(() => {
  // Clear the schemas before each test
  schemas.clear();
});

it('should return an empty string if the schema is already included', () => {
  const schema: SchemaDefinition = {
    name: 'TestSchema',
    dependsOn: [],
    schema: 'TestSchemaDefinition',
    included: true
  };
  const result = include(schema, []);
  expect(result).toEqual('');
});

it('should return an empty string if the schema is already in the dependency chain', () => {
  const schema = define('TestSchema', 'TestSchemaDefinition', ['TestSchema']);
  const result = include(schema, ['TestSchema']);
  expect(result).toEqual('');
});

it('should return the schema definition if there are no dependencies', () => {
  const schema = define('TestSchema', 'TestSchemaDefinition');
  expect(include(schema, [])).toEqual(`TestSchemaDefinition`)
})

it('should return the schema with its dependencies included', () => {
  define('Dependency1', 'Dependency1Definition');
  define('Dependency2', 'Dependency2Definition');
  const schema = define('TestSchema', 'TestSchemaDefinition', ['Dependency1', 'Dependency2']);
  expect(include(schema).split("\n")).toEqual(expect.arrayContaining([
    'Dependency1Definition',
    'Dependency2Definition',
    'TestSchemaDefinition'
  ]));
});

it('should not get stuck in a loop if there are circular dependencies', () => {
  define('Dependency1', 'Dependency1Definition', ['Dependency2']);
  define('Dependency2', 'Dependency2Definition', ['Dependency1']);
  const schema = define('TestSchema', 'TestSchemaDefinition', ['Dependency1']);

  expect(include(schema).split("\n")).toEqual(expect.arrayContaining([
    'Dependency1Definition',
    'Dependency2Definition',
    'TestSchemaDefinition'
  ]));
})

it('should throw an error if a dependency is missing', () => {
  const schema = define('TestSchema', 'TestSchemaDefinition', ['MissingDependency']);
  expect(() => include(schema, [])).toThrowError('Missing Schema MissingDependency: Required By TestSchema');
});
