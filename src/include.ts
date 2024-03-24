import {SchemaDefinition} from "./SchemaDefinition";
import {schemas} from "./storage"

/**
 * Recurse down a schema dependency chain to build out the full schema
 * @param schema The specific schema to include
 * @param dependencyChain The schemas that led to this schema being included (for circular dependency checking)
 */
export function include(schema: SchemaDefinition, dependencyChain: string[] = []): string {
  if (dependencyChain.includes(schema.name) || schema.included) return ""

  schema.included = true
  const parts = schema.dependsOn.map(name => {
    const dependency = schemas.get(name);
    if (!dependency) throw new Error(`Missing Schema ${name}: Required By ${schema.name}`)
    return include(dependency, [...dependencyChain, schema.name])
  })

  parts.push(schema.schema)
  return parts.filter(p => !!p).join("\n")
}
