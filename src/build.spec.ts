import {build} from './build';
import {define} from "./define"
import {schemas} from './storage';

beforeEach(() => {
  // Clear the schemas before each test
  schemas.clear();
});

it('should return an empty string if no schemas are included', () => {
  const result = build();
  expect(result).toEqual('');
});

it('should return the schema definition if a single schema is included', () => {
  define('TestSchema', 'TestSchemaDefinition');
  expect(build()).toEqual('TestSchemaDefinition');
});

it('should return the concatenated schema definitions', () => {
  define('TestSchema1', 'TestSchemaDefinition1');
  define('TestSchema2', 'TestSchemaDefinition2');

  const result = build();
  expect(result).toEqual('TestSchemaDefinition1\nTestSchemaDefinition2');
});
