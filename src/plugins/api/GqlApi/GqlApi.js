import { computed, ref } from 'vue';
import { WebApi } from '../WebApi/WebApi.js';
import { defer } from '../../../utils/index.js';

/**
 * GraphQL api
 */
export class GqlApi extends WebApi {
    #useQuery = null;
    #useMutation = null;

    constructor(onError) {
        super(onError);
    }

    /**
     * @param {function} useQuery Function from package @vue/apollo-composable
     * @param {function} useMutation Function from package @vue/apollo-composable
     * @param {function} onError
     */
    setup({ useQuery = null, useMutation = null, onError = null }) {
        this.#useQuery = useQuery;
        this.#useMutation = useMutation;

        if (onError !== null) {
            this.registerOnErrorFunction(onError);
        }
    }

    query({
        query,
        variables = null,
        defaultData = null,
        pickFn = null,
        silentErrors = false,
        fetchPolicy = 'network-only',
        clientId = 'default',
        disabled = false,
        options = {},
    }) {
        const enabled = ref(!disabled);
        const { result, loading, error, refetch, fetchMore, onResult, onError } = this.#useQuery(
            query,
            variables || null,
            {
                fetchPolicy,
                clientId,
                enabled,
                ...options,
            }
        );

        const data = computed(() => this._useResult(result, defaultData, pickFn));

        this._onError(onError, silentErrors);

        return {
            data,
            dataPromise: this._dataPromise(onResult, onError, defaultData, pickFn),
            result,
            loading,
            enabled,
            error,
            refetch,
            fetchMore,
            onResult,
            onError,
        };
    }

    mutation({
        mutation,
        variables = null,
        options = {},
        silentErrors = false,
        fetchPolicy = 'network-only',
        clientId = 'default',
    }) {
        const { mutate, loading, error, called, onDone, onError } = this.#useMutation(mutation, {
            fetchPolicy,
            clientId,
            variables,
            ...options,
        });

        this._onError(onError, silentErrors);

        return {
            mutate,
            loading,
            error,
            called,
            onDone,
            onError,
        };
    }

    queryMock({
        mockFunction = null,
        defaultData = null,
        silentErrors = false,
        pickFn = null,
        errors = [],
        disabled = false,
        fnName = '',
    }) {
        const enabled = ref(!disabled);
        const { result, loading, error, refetch, fetchMore, onResult, onError } = GqlApi.#useQueryMock({
            mockFunction: this._getFunctionMock(mockFunction, fnName),
            errors,
            enabled,
        });

        const data = computed(() => this._useResult(result, defaultData, pickFn));

        this._onError(onError, silentErrors);

        return {
            data,
            dataPromise: this._dataPromise(onResult, onError, defaultData, pickFn),
            result,
            loading,
            enabled,
            error,
            refetch,
            fetchMore,
            onResult,
            onError,
        };
    }

    static #useQueryMock({ mockFunction, delay = 0, errors = [], enabled = ref(true) }) {
        const result = ref(null);
        const loading = ref(true);
        const error = ref(null);
        let onResultFunction = null;
        let onErrorFunction = null;

        function onResult(fn) {
            onResultFunction = fn;
        }

        function onError(fn) {
            onErrorFunction = fn;
        }

        function refetch(...args) {
            loading.value = true;

            defer(() => {
                onDefer(...args);
            }, delay);
        }

        // ???
        function fetchMore(...args) {
            refetch(...args);
        }

        function onDefer(...args) {
            loading.value = false;

            if (errors.length > 0) {
                error.value = { errors };

                if (typeof onErrorFunction === 'function') {
                    onErrorFunction({ errors });
                }
            } else if (enabled.value) {
                result.value = mockFunction(...args);

                if (typeof onResultFunction === 'function') {
                    onResultFunction({
                        data: result.value,
                    });
                }
            }
        }

        defer(onDefer, delay);

        return {
            result,
            loading,
            enabled,
            error,
            refetch,
            fetchMore,
            onResult,
            onError,
        };
    }
}
