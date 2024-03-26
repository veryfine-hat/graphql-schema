import {SchemaDefinition} from "./SchemaDefinition";
import {schemas} from "./storage"

/**
 * Recurse down a schema dependency chain to build out the full schema
 * @param schema The specific schema to include
 * @param dependencyChain The schemas that led to this schema being included (for circular dependency checking)
 */
export function include(schema: SchemaDefinition, dependencyChain: Record<string, boolean> = {}): string {
  if (dependencyChain[schema.name]) return ""
  dependencyChain[schema.name] = true

  const parts = schema.dependsOn.map(dependency => {
    return include(dependency, dependencyChain)
  })

  parts.push(schema.schema)
  return parts.filter(p => !!p).join("\n")
}
