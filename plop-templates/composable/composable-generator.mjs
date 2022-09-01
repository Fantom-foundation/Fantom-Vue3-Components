export const composableGenerator = {
    name: 'Vue composable',
    config: {
        description: 'Vue composable',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'composable name',
            },
            {
                type: 'input',
                name: 'path',
                message: 'composable path',
                default: 'composables',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/{{path}}/{{name}}/{{name}}.js',
                templateFile: 'plop-templates/composable/composable.hbs',
            },
            {
                type: 'add',
                path: 'src/{{path}}/{{name}}/{{name}}.spec.js',
                templateFile: 'plop-templates/composable/composable.spec.hbs',
            },
        ],
    },
};
