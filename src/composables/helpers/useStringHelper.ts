import _ from 'lodash';

type capitalizeStringFunctionType = {
  (string: string, numberOfLettersToCapitalize: number): string;
}

type camelCaseFunctionType = {
  (string: string): string;
}

type snakeCaseFunctionType = {
  (string: string): string;
}

export interface useStringHelperInterface {
  capitalizeString: capitalizeStringFunctionType,
  camelCase: camelCaseFunctionType,
  snakeCase: snakeCaseFunctionType,
}

export default function useStringHelper(): useStringHelperInterface {
  const capitalizeString = (string: string, numberOfLettersToCapitalize = 0): string => {
    if (
      numberOfLettersToCapitalize === 0
            || numberOfLettersToCapitalize >= string.length
    ) {
      return string.toUpperCase();
    }

    const stringToCapitalize = string.slice(0, numberOfLettersToCapitalize);
    return stringToCapitalize.toUpperCase() + string.slice(numberOfLettersToCapitalize);
  };

  const camelCase = (string: string): string => _.camelCase(string);

  const snakeCase = (string: string): string => _.snakeCase(string);

  return {
    capitalizeString,
    camelCase,
    snakeCase,
  };
}
