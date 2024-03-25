import {define} from './define';
import {schemas} from './storage';

beforeEach(() => {
  // Clear the schemas before each test
  schemas.clear();
});

  it('should return the created schema', () => {
    const schema = define`type ${'TestSchema'} { field: String }`
    expect(schema).toEqual(expect.objectContaining({
      name: expect.any(String),
      dependsOn: [],
      schema: `type TestSchema { field: String }`
    }))
  });

  it('should build the schema using the names of input schemas', () => {
    const schema1 = define`type ${'Schema1'} { field: String }`
    const schema2 = define`type ${'Schema2'} { \nfield: String\n schema1: ${schema1}\n}`
    expect(schema2).toEqual(expect.objectContaining({
      name: expect.any(String),
      dependsOn: [schema1.name],
      schema: `type Schema2 { \nfield: String\n schema1: ${schema1.name}\n}`
    }))
  })

  it('should clean up redundant dependencies', () => {
    const schema1 = define`type ${'Schema1'} { field: String }`
    const schema2 = define`type ${'Schema2'} {\n field: String\n schema1: ${schema1}\n schema2: ${schema1}\n}`
    expect(schema2).toEqual(expect.objectContaining({
      name: expect.any(String),
      dependsOn: [schema1.name],
      schema: `type Schema2 {\n field: String\n schema1: Schema1\n schema2: Schema1\n}`
    }))
  })