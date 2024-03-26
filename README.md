# @byaga/graph-ql-schema

This package provides a set of utilities for defining and managing GraphQL schemas in TypeScript.

It is intended to allow you to define the schema in the same file as the class/interface that the schema is describing to keep updates centralized in the hopes of avoiding the oops I forgot to update the schema bugs

## Installation

You can install the package via npm:

```bash
npm install @byaga/graph-ql-schema
```

## Usage

Here is a basic example of how to use the package:

```typescript
// User.ts
import { define } from '@byaga/graph-ql-schema';

export const UserSchema = define`
type ${'User'} {
  id: ID!
  name: String!
  email: String!
  posts: [Post]
}`;
UserSchema.dependsOn.push('Post'); // Only needed for circular dependencies

// Post.ts
import { define } from '@byaga/graph-ql-schema';
import { UserSchema } from './User';

export const PostSchema = define`
type ${'Post'} {
  id: ID!
  title: String!
  content: String!
  author: ${UserSchema}!
}`;

// resolvers.ts
import { define } from '@byaga/graph-ql-schema';
import { UserSchema } from './User';
import { PostSchema } from './Post';

export const QuerySchema = define`
type ${'Query'} {
  users: [${UserSchema}]
  user(id: ID!): ${UserSchema}
  posts: [${PostSchema}]
  post(id: ID!): ${PostSchema}
}`;

// schema.ts
import {build} from "@byaga/graph-ql-schema"
import {resolvers, QuerySchema} from "./resolvers"

const schema = makeExecutableSchema({
  typeDefs: build(QuerySchema),
  resolvers
});

```

In this example we have defined various types for a message board each in their own file with a simple call to build to put it all together
The name of the type is passed in as a template literal variable so that the name can be recorded and used in other schemas.  If you hard code the name it will still build to a valid schema but it will not be able to be injected into other schemas
In order to not have your definitions tree-shaken you need to make sure to export the schema and import it in to other places where it is used.  The Template Literal syntax is designed to help with that by allowing you to plug one schema into another and it will wire up all the dependencies for you.
## Testing

This package includes a set of unit tests to ensure its functionality. You can run these tests using the following command:

```bash
npm test
```

## Contributing

Contributions are welcome. Please submit a pull request with any enhancements.

## License

This package is licensed under the MIT License.
