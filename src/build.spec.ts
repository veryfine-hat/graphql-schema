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
  const schema = define`type TestSchema {}`;
  expect(build(schema)).toEqual('type TestSchema {}');
});

it('should return the concatenated schema definitions', () => {
  const schema1 = define`type TestSchema1 {}`;
  const schema2 = define`type TestSchema2 {}`;

  const result = build(schema1, schema2);
  expect(result).toEqual('type TestSchema1 {}\ntype TestSchema2 {}');
});

it('should follow the dependency chain', () => {
    const schema1 = define`type ${'TestSchema1'} {}`;
    const schema2 = define`type ${'TestSchema2'} { test: ${schema1} }`;
    const schema3 = define`type ${'TestSchema3'} { test: ${schema2} }`;

    const result = build(schema3);
    expect(result).toEqual('type TestSchema1 {}\ntype TestSchema2 { test: TestSchema1 }\ntype TestSchema3 { test: TestSchema2 }');
});