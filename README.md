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

define('User', `
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post]
}`, ['Post']);

// Post.ts
import { define } from '@byaga/graph-ql-schema';

define('Post', `
type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}`, ['User']);

// Query.ts
import { define } from '@byaga/graph-ql-schema';

define('Query' `
type Query {
  users: [User]
  user(id: ID!): User
  posts: [Post]
  post(id: ID!): Post
}`, ['User', 'Post']);

// schema.ts
import {build} from "@byaga/graph-ql-schema"
import {resolvers} from "./resolvers"

const schema = makeExecutableSchema({
  typeDefs: build(),
  resolvers
});

```

In this example we have defined various types for a message board each in their own file with a simple call to build to put it all together

## Testing

This package includes a set of unit tests to ensure its functionality. You can run these tests using the following command:

```bash
npm test
```

## Contributing

Contributions are welcome. Please submit a pull request with any enhancements.

## License

This package is licensed under the MIT License.
