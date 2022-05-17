export class TestRouterUtils {
    /**
     * @param {VueRouter} router
     */
    constructor(router) {
        this.router = router;
    }

    /**
     * Change route
     *
     * @param {string} path
     * @return {Promise<void>}
     */
    async push(path) {
        this.router.push(path);
        await this.router.isReady();
    }

    /**
     * @param {Object} options
     * @return {Object}
     */
    addRouterPlugin(options) {
        if (!options.global) {
            options.global = {};
        }

        if (!Array.isArray(options.global.plugins)) {
            options.global.plugins = [];
        }

        options.global.plugins.push(this.router);

        return options;
    }
}
