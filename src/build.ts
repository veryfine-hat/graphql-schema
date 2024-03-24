import { include } from "./include"
import { schemas } from "./storage";

/**
 * Build the schema from the already included parts
 */
export function build() {
  const parts = []
  for (const schema of schemas.values()) {
    parts.push(include(schema))
  }
  return parts.filter(p => !!p).join("\n")
}
