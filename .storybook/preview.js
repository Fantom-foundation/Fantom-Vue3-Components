import '../src/assets/scss/demo.scss';
import { addDecorator, app } from '@storybook/vue3';
import FErrorMessagesPopover from '../src/components/FErrorMessagesPopover/FErrorMessagesPopover.vue';
import FSearchField from '../src/components/FSearchField/FSearchField.vue';
import { withDirection } from 'storybook-rtl-addon';
// import { installDirectives } from '../src/fantom-vue-components/src/directives';

// installDirectives(app);

app.component('FErrorMessagesPopover', FErrorMessagesPopover);
app.component('FSearchField', FSearchField);

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    themes: {
        default: '',
        list: [{ name: 'dark', class: 'theme-dark', color: '#222431' }],
        target: 'root',
    },
};

addDecorator(withDirection);
