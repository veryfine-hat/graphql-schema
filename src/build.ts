import { include } from "./include"
import {SchemaDefinition} from "./SchemaDefinition";

/**
 * Build the schema from the already included parts
 */
export function build(...schemas: SchemaDefinition[]) {
  const parts = []
  for (const schema of schemas) {
    parts.push(include(schema))
  }
  return parts.filter(p => !!p).join("\n")
}
