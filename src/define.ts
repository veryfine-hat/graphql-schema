import { schemas } from "./storage";
import {SchemaDefinition} from "./SchemaDefinition";

/**
 * Defines a new schema and adds it to the storage.
 *
 * @param  name - The name of the schema.
 * @param  schema - The actual schema definition.
 * @param  dependencies - The names of the schemas this schema depends on.
 * @throws If a schema with the same name already exists in the storage.
 */
export function define(name: string, schema: string, dependencies: string[] = []): SchemaDefinition {
  // Retrieve the schema with the given name from the storage.
  let definition = schemas.get(name)

  // If a schema with the same name already exists, throw an error.
  if (definition) throw new Error(`Schema ${name} already defined`);

  // Add the new schema to the storage.
  schemas.set(name, {
    name,
    dependsOn: dependencies ?? [],
    schema,
    included: false
  })
  return schemas.get(name) as SchemaDefinition
}
