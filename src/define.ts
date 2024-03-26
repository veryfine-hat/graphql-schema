import { schemas } from "./storage";
import {SchemaDefinition} from "./SchemaDefinition";

let counter = 0;

/**
 * Defines a new schema and adds it to the storage.
 * @param strings - parts of this schema
 * @param values - list of schemas that this schema may be built from
 */
export function define(strings: TemplateStringsArray, ...values: (SchemaDefinition | string)[]): SchemaDefinition {
  let schema = '';
  let name = values.find(v => typeof v === 'string') as string || (counter++).toString(36);
  const dependsOn: SchemaDefinition[] = []
  strings.forEach((string, i) => {
    schema += string;
    if (values[i]) {
      let dependencyName = values[i] as string;
      if (typeof values[i] !== 'string') {
        const dependency = values[i] as SchemaDefinition;
        dependsOn.push(dependency);
        dependencyName = dependency.name;
      }
      schema += dependencyName;
    }
  });

  const definition: SchemaDefinition = {
    name,
    dependsOn: Array.from(new Set(dependsOn)),
    schema: schema
  }
  schemas.set(name, definition);
  return definition;
}