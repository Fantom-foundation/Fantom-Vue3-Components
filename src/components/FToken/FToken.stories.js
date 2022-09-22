import FToken from './FToken.vue';

export default {
    title: 'FToken',
    component: FToken,
};

export const Default = () => ({
    components: { FToken },
    //language=HTML
    template: `
        <div>
            <FToken />
        </div>
    `,
});

export const Logo = () => ({
    components: { FToken },
    //language=HTML
    template: `
        <div>
            <FToken logo="avatar.png" />
        </div>
    `,
});

export const LogoSize = () => ({
    components: { FToken },
    //language=HTML
    template: `
        <div>
            <FToken :logo-size="40" logo="avatar.png" />
        </div>
    `,
});

export const Symbol = () => ({
    components: { FToken },
    //language=HTML
    template: `
        <div>
            <FToken symbol="FTM" logo="avatar.png" class="ftoken-novalue" />
        </div>
    `,
});

export const Value = () => ({
    components: { FToken },
    //language=HTML
    template: `
        <div>
            <FToken :value="123456.789" symbol="FTM" logo="avatar.png" />
        </div>
    `,
});

export const MaximumFractionDigits = () => ({
    components: { FToken },
    //language=HTML
    template: `
        <div>
            <FToken :maximum-fraction-digits="1" :value="123456.789" symbol="FTM" logo="avatar.png" />
        </div>
    `,
});

export const Token = () => ({
    components: { FToken },
    //language=HTML
    template: `
        <div>
            <FToken :token="{ symbol: 'FTM', logo: 'avatar.png' }" :value="123456.789" />
        </div>
    `,
});

export const UsePlaceholder = () => ({
    components: { FToken },
    //language=HTML
    template: `
        <div>
            <FToken use-placeholder :value="value" :token="{ symbol: 'FTM', logo: 'avatar.png' }" />
        </div>
    `,
    data() {
        return {
            value: '',
        };
    },
    created() {
        setTimeout(() => {
            this.value = 123;
        }, 2000);
    },
});

export const Placeholder = () => ({
    components: { FToken },
    //language=HTML
    template: `
        <div>
            <FToken use-placeholder :placeholder="{ replacementText: '123456789 FTM' }" />
        </div>
    `,
});

export const NoLogo = () => ({
    components: { FToken },
    //language=HTML
    template: `
        <div>
            <FToken no-logo :value="123456.789" symbol="FTM" />
        </div>
    `,
});

export const NoSymbol = () => ({
    components: { FToken },
    //language=HTML
    template: `
        <div>
            <FToken no-symbol :token="{ symbol: 'FTM', logo: 'avatar.png' }" :value="123456.789" />
        </div>
    `,
});

export const Slots = () => ({
    components: { FToken },
    //language=HTML
    template: `
        <div>
            <FToken :token="{ symbol: 'FTM', logo: 'avatar.png' }" :value="123456.789">
                <template #value="{ value }"><b>{{ value }}</b></template>
                <template #symbol="{ symbol }">{{ symbol.toLowerCase() }}</template>
            </FToken>
        </div>
    `,
});
