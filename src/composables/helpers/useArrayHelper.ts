import useObjectHelper from './useObjectHelper';

type objectsArrayKeysCamelCaseFunctionType = {
  (arr: Array<Record<string, unknown>>): Array<Record<string, unknown>>;
}

type objectsArrayKeysSnakeCaseFunctionType = {
  (arr: Array<Record<string, unknown>>): Array<Record<string, unknown>>;
}

export interface useArrayHelperInterface {
  objectsArrayKeysCamelCase: objectsArrayKeysCamelCaseFunctionType,
  objectsArrayKeysSnakeCase: objectsArrayKeysSnakeCaseFunctionType,
}

export default function useArrayHelper(): useArrayHelperInterface {
  const {
    objectKeysCamelCase,
    objectKeysSnakeCase,
  } = useObjectHelper();

  const objectsArrayKeysCamelCase = (
    arr: Array<Record<string, unknown>>,
  ): Array<Record<string, unknown>> => arr.map(
    (obj: Record<string, unknown>) => objectKeysCamelCase(obj),
  );

  const objectsArrayKeysSnakeCase = (
    arr: Array<Record<string, unknown>>,
  ): Array<Record<string, unknown>> => arr.map(
    (obj: Record<string, unknown>) => objectKeysSnakeCase(obj),
  );

  return {
    objectsArrayKeysCamelCase,
    objectsArrayKeysSnakeCase,
  };
}
