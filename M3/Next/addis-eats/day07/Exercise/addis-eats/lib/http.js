// The ONE error shape for every endpoint: { error, fieldErrors? }
export function errorBody(error, fieldErrors) {
  return fieldErrors ? { error, fieldErrors } : { error };
}

export function jsonError(error, status, fieldErrors) {
  return Response.json(errorBody(error, fieldErrors), { status });
}
