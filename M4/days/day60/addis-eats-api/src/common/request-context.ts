import { AsyncLocalStorage } from 'node:async_hooks';

interface RequestStore {
  requestId: string;
}

// Node keeps this store alive across every await of ONE request, so any code that runs
// during the request (service, filter, interceptor) can ask "which request am I in?"
// without the id being passed as an argument. A service never has to know about HTTP.
const storage = new AsyncLocalStorage<RequestStore>();

export const requestContext = {
  run: <T>(requestId: string, fn: () => T): T => storage.run({ requestId }, fn),
  requestId: (): string | undefined => storage.getStore()?.requestId,
};
