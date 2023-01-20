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
        copyData = false,
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

        const data = computed(() => this._useResult(result, defaultData, pickFn, copyData));

        this._onError(onError, silentErrors);

        return {
            data,
            dataPromise: this._dataPromise({ onResult, onError, defaultData, pickFn, copyData }),
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
        defaultData = null,
        pickFn = null,
        copyData = false,
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
            getPromise: () => this._dataPromise({ onResult: onDone, onError, defaultData, pickFn, copyData }),
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
        copyData = false,
        errors = [],
        disabled = false,
        fnName = '',
    }) {
        const enabled = ref(!disabled);
        const { result, loading, error, refetch, fetchMore, onResult, onError } = this.#useQueryMock({
            mockFunction: this._getFunctionMock(mockFunction, fnName),
            errors,
            enabled,
        });

        const data = computed(() => this._useResult(result, defaultData, pickFn, copyData));

        this._onError(onError, silentErrors);

        return {
            data,
            dataPromise: this._dataPromise({ onResult, onError, defaultData, pickFn, copyData }),
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

    mutationMock({
        mockFunction = null,
        defaultData = null,
        silentErrors = false,
        pickFn = null,
        copyData = false,
        errors = [],
        fnName = '',
    }) {
        const _called = ref(false);
        const { mutate, loading, error, called, onDone, onError } = this.#useMutaionMock({
            mockFunction: this._getFunctionMock(mockFunction, fnName),
            errors,
            pickFn,
            copyData,
            defaultData,
            _called,
        });

        this._onError(onError, silentErrors);

        return {
            mutate,
            getPromise: () =>
                this._dataPromise({ onResult: onDone, onError, defaultData, pickFn, copyData, useResult: false }),
            loading,
            error,
            called,
            onDone,
            onError,
        };
    }

    #useQueryMock({ mockFunction, delay = 0, errors = [], enabled = ref(true) }) {
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

    #useMutaionMock({ mockFunction, delay = 0, errors = [], pickFn, copyData, defaultData, _called = ref(false) }) {
        let result;
        const called = ref(_called.value);
        const loading = ref(true);
        const error = ref(null);
        let onDoneFunction = null;
        let onErrorFunction = null;

        const onDefer = (...args) => {
            loading.value = false;

            if (errors.length > 0) {
                error.value = { errors };

                if (typeof onErrorFunction === 'function') {
                    onErrorFunction({ errors });
                }
            } else {
                result = mockFunction(...args);

                if (typeof onDoneFunction === 'function') {
                    onDoneFunction(this._useResult({ value: result?.data || result }, defaultData, pickFn, copyData));
                }
            }
        };

        function onDone(fn) {
            onDoneFunction = fn;
        }

        function onError(fn) {
            onErrorFunction = fn;
        }

        function mutate(...args) {
            loading.value = true;
            called.value = true;

            defer(() => {
                onDefer(...args);
            }, delay);
        }

        // defer(onDefer, delay);

        return {
            mutate,
            loading,
            called,
            error,
            onDone,
            onError,
        };
    }
}
