export type HttpParams = Record<string, string | number | boolean | readonly (string | number | boolean)[]>;

export function castParams(all: Record<string, unknown>): HttpParams {
  const params: HttpParams = {};

  for (const [key, value] of Object.entries(all)) {
    if (Array.isArray(value) && value.length > 0) {
      params[key] = value.filter((val) => {
        return typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean';
      });
    } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      params[key] = value;
    }
  }

  return params;
}
