import _ from 'lodash';
import useStringHelper from './useStringHelper';

type objectKeysCamelCaseFunctionType = {
  (obj: Record<string, unknown>): Record<string, unknown>;
}

type objectKeysSnakeCaseFunctionType = {
  (obj: Record<string, unknown>): Record<string, unknown>;
}

export interface useObjectHelperInterface {
  objectKeysCamelCase: objectKeysCamelCaseFunctionType,
  objectKeysSnakeCase: objectKeysSnakeCaseFunctionType,
}

export default function useObjectHelper(): useObjectHelperInterface {
  const { camelCase, snakeCase } = useStringHelper();

  const objectKeysCamelCase = (
    obj: Record<string, unknown>,
  ): Record<string, unknown> => _.mapKeys(
    obj, (value: unknown, key: string) => camelCase(key),
  );

  const objectKeysSnakeCase = (
    obj: Record<string, unknown>,
  ): Record<string, unknown> => _.mapKeys(
    obj, (value: unknown, key: string) => snakeCase(key),
  );

  return {
    objectKeysCamelCase,
    objectKeysSnakeCase,
  };
}
