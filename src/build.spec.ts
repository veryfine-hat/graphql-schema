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
  define`type TestSchema {}`;
  expect(build()).toEqual('type TestSchema {}');
});

it('should return the concatenated schema definitions', () => {
  define`type TestSchema1 {}`;
  define`type TestSchema2 {}`;

  const result = build();
  expect(result).toEqual('type TestSchema1 {}\ntype TestSchema2 {}');
});
