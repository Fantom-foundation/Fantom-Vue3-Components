// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import FInput from './FInput.vue';
import FButton from '../FButton/FButton.vue';
import FAriaAlert from '../FAriaAlert/FAriaAlert.vue';

export default {
    title: 'FInput',
    component: FInput,
};

export const Default = () => ({
    components: { FInput },
    template: `
        <div>
            <h3>Input</h3>
            <FInput field-size="large" label="Large" />
            <FInput label="Default" placeholder="placeholder" />
            <FInput field-size="small" label="Small" value="value" />
            <FInput field-size="mini" label="Mini" value="value" />
            <h3>Textarea</h3>
            <FInput is-textarea cols="20" rows="5" field-size="large" label="Large" />
            <FInput is-textarea cols="20" rows="5" label="Default" placeholder="placeholder" />
            <FInput is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <FInput is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
            <h3>Textarea - auto resizable</h3>
            <FInput auto-resizable-textarea is-textarea cols="20" rows="5" field-size="large" label="Large" />
            <FInput auto-resizable-textarea is-textarea cols="20" rows="5" label="Default" placeholder="placeholder" />
            <FInput auto-resizable-textarea is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <FInput auto-resizable-textarea is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
        </div>
    `,
});

export const Readonly = () => ({
    components: { FInput },
    template: `
        <div>
            <h3>Input</h3>
            <FInput readonly field-size="large" label="Large" />
            <FInput readonly label="Default" placeholder="placeholder" />
            <FInput readonly field-size="small" label="Small" value="value" />
            <FInput readonly field-size="mini" label="Mini" value="value" />
            <h3>Textarea</h3>
            <FInput readonly is-textarea cols="20" rows="5" field-size="large" label="Large" />
            <FInput readonly is-textarea cols="20" rows="5" label="Default" placeholder="placeholder" />
            <FInput readonly is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <FInput readonly is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
            <h3>Textarea - auto resizable</h3>
            <FInput readonly is-textarea auto-resizable-textarea cols="20" rows="5" field-size="large" label="Large" />
            <FInput readonly is-textarea auto-resizable-textarea cols="20" rows="5" label="Default" placeholder="placeholder" />
            <FInput readonly is-textarea auto-resizable-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <FInput readonly is-textarea auto-resizable-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
        </div>
    `,
});

export const Disabled = () => ({
    components: { FInput },
    template: `
        <div>
            <h3>Input</h3>
            <FInput disabled field-size="large" label="Large" />
            <FInput disabled label="Default" placeholder="placeholder" />
            <FInput disabled field-size="small" label="Small" value="value" />
            <FInput disabled field-size="mini" label="Mini" value="value" />
            <h3>Textarea</h3>
            <FInput disabled is-textarea cols="20" rows="5" field-size="large" label="Large" />
            <FInput disabled is-textarea cols="20" rows="5" label="Default" placeholder="placeholder" />
            <FInput disabled is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <FInput disabled is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
            <h3>Textarea - auto resizable</h3>
            <FInput disabled is-textarea auto-resizable-textarea cols="20" rows="5" field-size="large" label="Large" />
            <FInput disabled is-textarea auto-resizable-textarea cols="20" rows="5" label="Default" placeholder="placeholder" />
            <FInput disabled is-textarea auto-resizable-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <FInput disabled is-textarea auto-resizable-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
        </div>
    `,
});

export const Invalid = () => ({
    components: { FInput },
    template: `
        <div>
            <h3>Input</h3>
            <FInput invalid field-size="large" label="Large" />
            <FInput invalid label="Default" placeholder="placeholder" />
            <FInput invalid field-size="small" label="Small" value="value" />
            <FInput invalid field-size="mini" label="Mini" value="value" />
            <h3>Textarea</h3>
            <FInput invalid is-textarea cols="20" rows="5" field-size="large" label="Large" />
            <FInput invalid is-textarea cols="20" rows="5" label="Default" placeholder="placeholder" />
            <FInput invalid is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <FInput invalid is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
            <h3>Textarea</h3>
            <FInput invalid is-textarea auto-resizable-textarea cols="20" rows="5" field-size="large" label="Large" />
            <FInput invalid is-textarea auto-resizable-textarea cols="20" rows="5" label="Default" placeholder="placeholder" />
            <FInput invalid is-textarea auto-resizable-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <FInput invalid is-textarea auto-resizable-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
        </div>
    `,
});

export const Required = () => ({
    components: { FInput },
    template: `
        <div>
            <h3>Input</h3>
            <FInput required field-size="large" label="Large" />
            <FInput required label="Default" placeholder="placeholder" />
            <FInput required field-size="small" label="Small" value="value" />
            <FInput required field-size="mini" label="Mini" value="value" />
            <h3>Textarea</h3>
            <FInput required is-textarea cols="20" rows="5" field-size="large" label="Large" />
            <FInput required is-textarea cols="20" rows="5" label="Default" placeholder="placeholder" />
            <FInput required is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <FInput required is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
            <h3>Textarea</h3>
            <FInput required is-textarea auto-resizable-textarea cols="20" rows="5" field-size="large" label="Large" />
            <FInput required is-textarea auto-resizable-textarea cols="20" rows="5" label="Default" placeholder="placeholder" />
            <FInput required is-textarea auto-resizable-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <FInput required is-textarea auto-resizable-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
        </div>
    `,
});

export const Validation = () => ({
    components: { FInput, FButton, FAriaAlert },
    template: `
        <div class="vertical-align-top">
            <form action="" @submit="onSubmit">
                <FInput
                    :validator="validator"
                    error-message="Input 1 error. Type 'yes'."
                    info-text="hint: type 'yes'"
                    ref="inp1"
                    label="Validate on submit"
                />
                <FInput
                    :validator="validator"
                    validate-on-change
                    error-message="Input 2 error. Type 'yes'."
                    info-text="hint: type 'yes'"
                    ref="inp2"
                    label="Validate on change"
                />
                <FInput
                    :validator="validator"
                    validate-on-change
                    validate-on-input
                    error-message="Input 3 error. Type 'yes'."
                    info-text="hint: type 'yes'"
                    ref="inp3"
                    label="Validate on change and input"
                />
                <FInput
                    :validator="asyncValidator"
                    validate-on-change
                    validate-on-input
                    error-message="Input 4 error. Type 'yes'."
                    info-text="hint: type 'yes'"
                    ref="inp4"
                    label="Asynchronous validation"
                />
                <br /><br />
                <FButton type="submit" size="small">Submit</FButton>
            </form>

            <FAriaAlert />
        </div>
    `,
    methods: {
        validator(_value) {
            return _value !== 'yes';
        },
        asyncValidator(_value) {
            return new Promise((_resolve) =>
                setTimeout(() => {
                    _resolve(_value !== 'yes');
                }, 1500)
            );
        },
        onSubmit(_event) {
            this.$refs.inp1.validate();
            this.$refs.inp2.validate();
            this.$refs.inp3.validate();
            this.$refs.inp4.validate();

            _event.preventDefault();
        },
    },
});

/*
export const Pattern = () => ({
    components: { FInput },
    template: `
        <div>
            <FInput error-message="je to blbe" pattern="" label="input 1" />
        </div>
    `,
    methods: { validator },
});
*/

export const Model = () => ({
    components: { FInput, FButton },
    template: `
        <div>
            <FInput v-model:value="value" no-label aria-label="input" />
            <FButton secondary @click.native="onButtonClick">set value to '222'</FButton>
            <span>value: {{ value }}</span>
        </div>
    `,
    data() {
        return { value: '111' };
    },
    methods: {
        onButtonClick() {
            this.value = '222';
        },
    },
});

export const InputThrottling = () => ({
    components: { FInput, FButton },
    template: `
        <div>
            <FInput v-model:value="value" :throttle-input-interval="400" label="Type fast" />
            <span>value: {{ value }}</span>
        </div>
    `,
    data() {
        return { value: '' };
    },
});

export const Slots = () => ({
    components: { FInput },
    template: `
        <div>
            <h3>Input</h3>
            <FInput aria-label="Large" field-size="large">
                <template #top><span>top</span></template>
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </FInput>
            <FInput aria-label="Default">
                <template #top><span>top</span></template>
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </FInput>
            <FInput aria-label="Small" field-size="small">
                <template #top><span>top</span></template>
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </FInput>
            <FInput aria-label="Mini" field-size="mini">
                <template #top><span>top</span></template>
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </FInput>
            <h3>Textarea</h3>
            <FInput is-textarea aria-label="Large" field-size="large">
                <template #top><span>top</span></template>
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </FInput>
            <FInput is-textarea aria-label="Default">
                <template #top><span>top</span></template>
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </FInput>
            <FInput is-textarea aria-label="Small" field-size="small">
                <template #top><span>top</span></template>
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </FInput>
            <FInput is-textarea aria-label="Mini" field-size="mini">
                <template #top><span>top</span></template>
                <template #bottom><span>bottom</span></template>
                <template #prefix><span>prefix</span></template>
                <template #suffix><span>suffix</span></template>
            </FInput>
            <h3>Variations</h3>
            <FInput aria-label="Large" field-size="large">
                <template #prefix><span style="text-align: center">&#9742;</span></template>
                <template #suffix><span>&#9742;</span></template>
            </FInput>
            <FInput aria-label="Large" field-size="large">
                <template #prefix><span>&#9742;</span></template>
            </FInput>
            <FInput aria-label="Large" field-size="large">
                <template #suffix><span>&#9742;</span></template>
            </FInput>
            <br />
            <FInput aria-label="Large" field-size="large" />
            <br /><br />
            <FInput aria-label="Default">
                <template #prefix><span style="text-align: center">&#9742;</span></template>
                <template #suffix><span>&#9742;</span></template>
            </FInput>
            <FInput aria-label="Default">
                <template #prefix><span>&#9742;</span></template>
            </FInput>
            <FInput aria-label="Default">
                <template #suffix><span>&#9742;</span></template>
            </FInput>
            <br /><br />
            <FInput aria-label="Small" field-size="small">
                <template #prefix><span style="text-align: center">&#9742;</span></template>
                <template #suffix><span>&#9742;</span></template>
            </FInput>
            <FInput aria-label="Small" field-size="small">
                <template #prefix><span>&#9742;</span></template>
            </FInput>
            <FInput aria-label="Small" field-size="small">
                <template #suffix><span>&#9742;</span></template>
            </FInput>
        </div>
    `,
});

export const InfoText = () => ({
    components: { FInput },
    template: `
        <div>
            <h3>Input</h3>
            <FInput info-text="Info text" label="Large" />

            <h3>Textarea</h3>
            <FInput info-text="Info text" is-textarea label="Large" />
        </div>
    `,
});

export const CharsCounter = () => ({
    components: { FInput },
    template: `
        <div>
            <h3>Input</h3>
            <FInput show-chars-counter maxlength="10" label="Large" />

            <h3>Textarea</h3>
            <FInput show-chars-counter maxlength="20" is-textarea label="Large" />
        </div>
    `,
});
