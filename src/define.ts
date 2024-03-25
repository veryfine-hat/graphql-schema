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
  let name = (counter++).toString(36);
  const dependsOn: string[] = []
  strings.forEach((string, i) => {
    schema += string;
    if (values[i]) {
      let dependency = values[i] as string;
      if (typeof values[i] !== 'string') {
        dependency = (values[i] as SchemaDefinition).name;
        dependsOn.push(dependency)
      } else name = dependency;
      schema += dependency;
    }
  });

  const definition: SchemaDefinition = {
    name,
    dependsOn: Array.from(new Set(dependsOn)),
    schema: schema,
    included: false
  }
  schemas.set(name, definition);
  return definition;
}