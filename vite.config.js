import { fileURLToPath, URL } from 'url';
import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    test: {
        // include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
        include: ['src/**/*.spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        setupFiles: [fileURLToPath(new URL('./src/plugins/vue-test-plugins/install.js', import.meta.url))],
        // globals: true,
    },
    build: {
        lib: {
            // eslint-disable-next-line no-undef
            entry: path.resolve(__dirname, 'lib/main.js'),
            name: 'FantomVue3Components',
            fileName: (format) => `fantom-vue3-components.${format}.js`,
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});
