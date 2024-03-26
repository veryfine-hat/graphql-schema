export interface SchemaDefinition {
  name: string
  dependsOn: SchemaDefinition[]
  schema: string
}
