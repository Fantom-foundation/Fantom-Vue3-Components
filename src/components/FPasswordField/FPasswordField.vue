<template>
    <span class="fpasswordfield">
        <FInput
            ref="input"
            v-bind="$attrs"
            :type="dType"
            :field-size="fieldSize"
            :disabled="disabled"
            @update:value="onInput"
            @validation-state="onValidationState"
            class="inp-withbutton"
        >
            <template v-for="(index, name) in $slots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>

            <template #suffix="sProps">
                <span @click="onEyeButtonClick">
                    <slot name="button" v-bind="{ ...sProps, ...slotProps }">
                        <FButton :size="buttonSize" :disabled="disabled" tertiary round :title="btnTitle">
                            <slot name="icon" v-bind="{ ...sProps, ...slotProps }">
                                <FSvgIcon v-if="dType === 'password'" size="1.2em"><IconEye /></FSvgIcon>
                                <FSvgIcon v-else-if="dType === 'text'" size="1.2em"><IconEyeSlash /></FSvgIcon>
                            </slot>
                        </FButton>
                    </slot>
                </span>
            </template>
        </FInput>
    </span>
</template>

<script>
import FInput from '../FInput/FInput.vue';
import FButton from '../FButton/FButton.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconEye from '../icons/IconEye.vue';
import IconEyeSlash from '../icons/IconEyeSlash.vue';
import { translationsMixin } from '../../mixins/translations.js';
import { fieldWithButtonMixin } from '../../mixins/field-with-button.js';

/**
 * Has the same props as FInput.
 */
export default {
    components: { IconEyeSlash, IconEye, FSvgIcon, FButton, FInput },

    mixins: [translationsMixin, fieldWithButtonMixin],

    data() {
        return {
            dType: 'password',
        };
    },

    computed: {
        btnTitle() {
            return this.dType === 'password'
                ? this.translate('fpasswordfield.showPassword')
                : this.translate('fpasswordfield.hidePassword');
        },

        /**
         * Object passed to slots
         *
         * @returns {object}
         */
        slotProps() {
            return {
                type: this.dType,
                ...fieldWithButtonMixin.computed.slotProps.call(this),
            };
        },
    },

    methods: {
        onEyeButtonClick() {
            if (!this.disabled) {
                if (this.dType === 'password') {
                    this.dType = 'text';
                } else {
                    this.dType = 'password';
                }
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
