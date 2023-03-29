import objectTransformer from 'object-key-transformer';
import { camelCase, snakeCase } from 'lodash';

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

export function fromJson<T>(json: any) {
  if (Array.isArray(json)) {
    return json.map(j => objectTransformer(
      j,
      camelCase,
      true
    ) as T)
  }

  return objectTransformer(
    json,
    camelCase,
    true
  ) as T
}
