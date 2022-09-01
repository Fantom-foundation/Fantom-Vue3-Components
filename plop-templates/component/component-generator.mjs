export const componentGenerator = {
    name: 'Vue component',
    config: {
        description: 'vue component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'component name',
            },
            {
                type: 'input',
                name: 'path',
                message: 'component path',
                default: 'components',
            },
            {
                type: 'confirm',
                name: 'addStory',
                message: 'Add component story?',
                default: true,
            },
        ],
        actions: function (data) {
            const actions = [
                {
                    type: 'add',
                    path: 'src/{{path}}/{{name}}/{{name}}.vue',
                    templateFile: 'plop-templates/component/component.hbs',
                },
                {
                    type: 'add',
                    path: 'src/{{path}}/{{name}}/{{name}}.spec.js',
                    templateFile: 'plop-templates/component/component.spec.hbs',
                },
            ];

            if (data.addStory) {
                actions.push({
                    type: 'add',
                    path: 'src/{{path}}/{{name}}/{{name}}.stories.js',
                    templateFile: 'plop-templates/component/component.stories.hbs',
                });
            }

            return actions;
        },
    },
};
