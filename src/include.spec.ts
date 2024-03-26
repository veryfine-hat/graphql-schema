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
    schema: 'TestSchemaDefinition'
  };
  const result = include(schema, {TestSchema: true});
  expect(result).toEqual('');
});

it('should return an empty string if the schema is already in the dependency chain', () => {
  const schema1 = define`type ${'TestSchema'} {}`
  const schema2 = define`type ${'TestSchema2'} { test: ${schema1} }`
  const schema3 = define`type ${'TestSchema3'} { 
    test: ${schema2} 
    test2: ${schema1} 
  }`
  const result = include(schema3, {TestSchema3: true});
  expect(result).toEqual('');
});

it('should return the schema definition if there are no dependencies', () => {
  const schema = define`type TestSchema {}`;
  console.log(schema)
  expect(include(schema)).toEqual(`type TestSchema {}`)
})

it('should return the schema with its dependencies included', () => {
  const Schema1 = define`type ${'TestSchema'} {}`;
  const Schema2 = define`type ${'TestSchema2'} {}`;
  const schema = define`type ${'TestSchema3'} { test: ${Schema1} test2: ${Schema2} }`;
  expect(include(schema)).toEqual(
    'type TestSchema {}\ntype TestSchema2 {}\ntype TestSchema3 { test: TestSchema test2: TestSchema2 }'
  );
});

it('should not get stuck in a loop if there are circular dependencies', () => {
  const schema1 = define`type ${'TestSchema'} { test: TestSchema2 }`;
  const schema2 = define`type ${'TestSchema2'} { test: ${schema1} }`;
  schema1.dependsOn.push(schema2)
  const schema = define`type ${'TestSchema3'} { test: ${schema1} test2: ${schema2} }`;

  expect(include(schema).split("\n")).toEqual(expect.arrayContaining([
    'type TestSchema { test: TestSchema2 }',
    'type TestSchema2 { test: TestSchema }',
    'type TestSchema3 { test: TestSchema test2: TestSchema2 }'
  ]));
})