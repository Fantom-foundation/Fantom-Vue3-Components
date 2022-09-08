import { GqlApi } from '../GqlApi.js';

const gqlApi = new GqlApi();

export function useGqlApi() {
    return { gqlApi };
}
