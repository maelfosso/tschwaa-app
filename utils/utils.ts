import objectTransformer from 'object-key-transformer';
import { snakeCase } from 'lodash';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function toJson(json: any) {
  if (Array.isArray(json)) {
    return JSON.stringify(json.map(j => objectTransformer(
      j,
      snakeCase,
      true
    )))
  }

  return JSON.stringify(objectTransformer(
    json,
    snakeCase,
    true
  ))
}