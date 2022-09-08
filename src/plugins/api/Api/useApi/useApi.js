import { Api } from '../Api.js';

const api = new Api();

/**
 * @return {{api: Api}}
 */
export function useApi() {
    return { api };
}
