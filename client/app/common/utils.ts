import { capitalize } from 'lodash-es';

export function toTitleCase(snakeCase: string): string {
  return capitalize(snakeCase.replace(/_/g, ' '));
}
