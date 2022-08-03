module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-storysource',
        '@storybook/addon-a11y',
        'storybook-rtl-addon',
        '@storybook/addon-essentials',
        'storybook-addon-themes',
    ],
    framework: '@storybook/vue3',
    core: {
        builder: 'storybook-builder-vite',
    },
    staticDirs: ['./public'],
};
