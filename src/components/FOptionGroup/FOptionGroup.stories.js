// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import FOptionGroup from './FOptionGroup.vue';
import FButton from '../FButton/FButton.vue';
import FAriaAlert from '../FAriaAlert/FAriaAlert.vue';

export default {
    title: 'FOptionGroup',
    component: FOptionGroup,
};

export const Default = () => ({
    components: { FOptionGroup },
    template: `
        <div>
            <h3>Checkboxes</h3>
            <FOptionGroup :data="{'10': 'Checkbox 1', '20': 'Checkbox 2'}" name="checkboxes1" label="Label " />
            <h3>Radio buttons</h3>
            <FOptionGroup type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2'}" name="radios1" label="Label " />
        </div>
    `,
});

export const Size = () => ({
    components: { FOptionGroup },
    template: `
        <div>
            <h3>Large</h3>
            <FOptionGroup option-size="large" type="checkbox" :data="{'10': 'Checkbox 1', '20': 'Checkbox 2'}" name="checkboxes2_lg" /><br />
            <FOptionGroup option-size="large" type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2'}" name="radios2_lg" /><br />

            <h3>Default</h3>
            <FOptionGroup type="checkbox" :data="{'10': 'Checkbox 1', '20': 'Checkbox 2'}" name="checkboxes2" /><br />
            <FOptionGroup type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2'}" name="radios2" /><br />

            <h3>Small</h3>
            <FOptionGroup option-size="small" type="checkbox" :data="{'10': 'Checkbox 1', '20': 'Checkbox 2'}" name="checkboxes2_sm" /><br />
            <FOptionGroup option-size="small" type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2'}" name="radios2_sm" /><br />

            <h3>Mini</h3>
            <FOptionGroup option-size="mini" type="checkbox" :data="{'10': 'Checkbox 1', '20': 'Checkbox 2'}" name="checkboxes2_xs" /><br />
            <FOptionGroup option-size="mini" type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2'}" name="radios2_xs" /><br />
        </div>
    `,
});

export const Checked = () => ({
    components: { FOptionGroup },
    template: `
        <div>
            <h3>Checkboxes</h3>
            <FOptionGroup :checked="['10', '20']" :data="{'10': 'Checkbox 1', '20': 'Checkbox 2'}" name="checkboxes3" />
            <h3>Radio buttons</h3>
            <FOptionGroup checked="20" type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2'}" name="radios3" />
        </div>
    `,
});

export const Disabled = () => ({
    components: { FOptionGroup },
    template: `
        <div>
            <h3>Checkboxes</h3>
            <FOptionGroup disabled :checked="['20']" :data="{'10': 'Checkbox 1', '20': 'Checkbox 2'}" name="checkboxes4" />
            <h3>Radio buttons</h3>
            <FOptionGroup disabled checked="20" type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2'}" name="radios4" />
        </div>
    `,
});

export const HideLabels = () => ({
    components: { FOptionGroup },
    template: `
        <div>
            <h3>Checkboxes</h3>
            <FOptionGroup hide-labels no-label :checked="['20']" :data="{'10': 'Checkbox 1', '20': 'Checkbox 2'}" name="checkboxes4" />
            <h3>Radio buttons</h3>
            <FOptionGroup hide-labels no-label checked="20" type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2'}" name="radios4" />
        </div>
    `,
});

export const Model = () => ({
    components: { FOptionGroup, FButton },
    template: `
        <div>
            <h3>Checkboxes</h3>
            <FOptionGroup v-model:checked="checkboxes" :data="{'10': 'Checkbox 1', '20': 'Checkbox 2', '30': 'Checkbox 3'}" name="checkboxes5" />
            <FButton secondary size="small" @click.native="checkboxes = ['10', '20', '30']">Set value to ['10', '20', '30']</FButton>
            <br />
            Value: {{ checkboxes }}

            <h3>Radio buttons</h3>
            <FOptionGroup v-model:checked="radios" type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3'}" name="radios5" />
            <FButton secondary size="small" @click.native="radios = '30'">Set value to '30'</FButton>
            <br />
            Value: {{ radios }}
        </div>
    `,
    data() {
        return {
            checkboxes: ['20'],
            radios: '20',
        };
    },
});

export const Required = () => ({
    components: { FOptionGroup, FButton, FAriaAlert },
    template: `
        <div>
            <form action="" @submit="onChecbkoxesSubmit">
                <FOptionGroup
                    required
                    validate-on-change
                    @validation-state="_state => submit1Disabled = _state.invalid "
                    ref="checkboxes"
                    :data="{'10': 'Checkbox 1', '20': 'Checkbox 2', '30': 'Checkbox 3'}"
                    label="Checkboxes"
                    info-text="Info text"
                    column
                    name="checkboxes"
                />
                <br /><br />
                <FButton type="submit" size="small" :disabled="submit1Disabled">Submit</FButton>
            </form>

            <br /><br />

            <form action="" @submit="onRadiosSubmit">
                <FOptionGroup
                    required
                    @validation-state="_state => submit2Disabled = _state.invalid "
                    validate-on-change
                    error-message="Select a value"
                    type="radio"
                    ref="radios"
                    :data="{'10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3'}"
                    label="Radios"
                    name="radios"
                />
                <br /><br />
                <FButton type="submit" size="small" :disabled="submit2Disabled">Submit</FButton>
            </form>

            <FAriaAlert />
        </div>
    `,
    data() {
        return {
            submit1Disabled: false,
            submit2Disabled: false,
        };
    },
    methods: {
        onChecbkoxesSubmit(_event) {
            this.$refs.checkboxes.validate();

            _event.preventDefault();
        },
        onRadiosSubmit(_event) {
            this.$refs.radios.validate();

            _event.preventDefault();
        },
    },
});

export const Validation = () => ({
    components: { FOptionGroup, FButton, FAriaAlert },
    template: `
        <div>
            <form action="" @submit="onChecbkoxesSubmit">
                <FOptionGroup
                    :validator="checkboxesValidator"
                    validate-on-change
                    @validation-state="_state => submit1Disabled = _state.invalid "
                    ref="checkboxes"
                    :data="{'10': 'Checkbox 1', '20': 'Checkbox 2', '30': 'Checkbox 3'}"
                    label="Checkboxes"
                    info-text="Info text"
                    column
                    name="checkboxes"
                />
                <br /><br />
                <FButton type="submit" size="small" :disabled="submit1Disabled">Submit</FButton>
            </form>

            <br /><br />

            <form action="" @submit="onRadiosSubmit">
                <FOptionGroup
                    :validator="radiosValidator"
                    @validation-state="_state => submit2Disabled = _state.invalid "
                    validate-on-change
                    error-message="Select a value"
                    type="radio"
                    ref="radios"
                    :data="{'10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3'}"
                    label="Radios"
                    name="radios"
                />
                <br /><br />
                <FButton type="submit" size="small" :disabled="submit2Disabled">Submit</FButton>
            </form>

            <FAriaAlert />
        </div>
    `,
    data() {
        return {
            submit1Disabled: false,
            submit2Disabled: false,
        };
    },
    methods: {
        checkboxesValidator(_value) {
            if (!_value || _value.length <= 1) {
                return 'At least 2 checkboxes must be checked';
            }

            return '';
        },
        radiosValidator(_value) {
            return !_value;
        },
        onChecbkoxesSubmit(_event) {
            this.$refs.checkboxes.validate();

            _event.preventDefault();
        },
        onRadiosSubmit(_event) {
            this.$refs.radios.validate();

            _event.preventDefault();
        },
    },
});

export const Column = () => ({
    components: { FOptionGroup },
    template: `
        <div>
            <h3>Checkboxes</h3>
            <FOptionGroup column :data="{'10': 'Checkbox 1', '20': 'Checkbox 2', '30': 'Checkbox 3'}" name="checkboxes6" />
            <h3>Radio buttons</h3>
            <FOptionGroup column checked="20" type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3'}" name="radios6" />
        </div>
    `,
});

export const Slots = () => ({
    components: { FOptionGroup },
    template: `
        <div>
            <h3>Checkboxes</h3>
            <FOptionGroup :data="{'10': 'Checkbox 1', '20': 'Checkbox 2', '30': 'Checkbox 3'}" name="checkboxes7">
                <template #top>Top slot</template>
                <template #bottom>Bottom slot</template>
            </FOptionGroup>
            <br /><br />
            <FOptionGroup column :data="{'10': 'Checkbox 1', '20': 'Checkbox 2', '30': 'Checkbox 3'}" name="checkboxes8">
                <template #top>Top slot</template>
                <template #bottom>Bottom slot</template>
            </FOptionGroup>
            <h3>Radio buttons</h3>
            <FOptionGroup checked="20" type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3'}" name="radios7">
                <template #top>Top slot</template>
                <template #bottom>Bottom slot</template>
            </FOptionGroup>
            <br /><br />
            <FOptionGroup column checked="20" type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3'}" name="radios8">
                <template #top>Top slot</template>
                <template #bottom>Bottom slot</template>
            </FOptionGroup>
            <h3><code>check-element</code></h3>
            <h4>Checkboxes</h4>
            <FOptionGroup hide-labels no-label v-model:checked="checkboxes" :data="{'10': 'Checkbox 1', '20': 'Checkbox 2'}" name="checkboxes4">
                <template #check-element><span class="cr_check">&#9733;</span></template>
            </FOptionGroup>
            Value: {{ checkboxes }}
            <h4>Radio buttons</h4>
            <FOptionGroup hide-labels no-label v-model:checked="radios" type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2'}" name="radios4">
                <template #check-element><span class="cr_check">&#9733;</span></template>
            </FOptionGroup>
            Value: {{ radios }}
        </div>
    `,
    data() {
        return {
            checkboxes: ['20'],
            radios: '20',
        };
    },
});

export const Model__ = () => ({
    components: { FOptionGroup, FButton },
    template: `
        <div>
            <h3>Checkboxes</h3>
            <FOptionGroup v-model:checked="checkboxes" :data="{'10': 'Checkbox 1', '20': 'Checkbox 2', '30': 'Checkbox 3'}" name="checkboxes5" />
            <FButton secondary size="small" @click.native="checkboxes = ['10', '20', '30']">Set value to ['10', '20', '30']</FButton>
            <br />
            Value: {{ checkboxes }}

            <h3>Radio buttons</h3>
            <FOptionGroup v-model:checked="radios" type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3'}" name="radios5" />
            <FButton secondary size="small" @click.native="radios = '30'">Set value to '30'</FButton>
            <br />
            Value: {{ radios }}
        </div>
    `,
    data() {
        return {
            checkboxes: ['20'],
            radios: '20',
        };
    },
});

export const InfoText = () => ({
    components: { FOptionGroup },
    template: `
        <div>
            <h3>Checkboxes</h3>
            <FOptionGroup info-text="Info text" label="Label" :data="{'10': 'Checkbox 1', '20': 'Checkbox 2', '30': 'Checkbox 3'}" name="checkboxes" />
            <h3>Radio buttons</h3>
            <FOptionGroup info-text="Info text" label="Label" checked="20" type="radio" :data="{'10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3'}" name="radios" />
        </div>
    `,
});
