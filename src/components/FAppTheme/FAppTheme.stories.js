import FAppTheme from './FAppTheme.vue';
import FButton from '../FButton/FButton.vue';

export default {
    title: 'FAppTheme',
    component: FAppTheme,
};

export const Default = () => ({
    components: { FAppTheme },
    template: `
        <div>
            <FAppTheme />
        </div>
    `,
});

export const Container = () => ({
    components: { FAppTheme },
    template: `
        <div>
            <p id="test" class="pa-5"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error explicabo fugit libero quaerat sapiente sed sunt ut velit! Architecto officia quam similique suscipit! Dolorem dolorum exercitationem fugiat pariatur tempore!</span><span>Ad commodi consequatur consequuntur delectus deserunt dolor doloribus, fugit ipsam laboriosam magni maiores maxime nemo numquam odit quam ratione sint suscipit velit vero voluptatibus? Accusamus autem delectus nobis numquam voluptas.</span></p>

            <FAppTheme container="#test" />
        </div>
    `,
});

export const Theme = () => ({
    components: { FAppTheme },
    template: `
        <div >
            <p id="test" class="pa-5"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error explicabo fugit libero quaerat sapiente sed sunt ut velit! Architecto officia quam similique suscipit! Dolorem dolorum exercitationem fugiat pariatur tempore!</span><span>Ad commodi consequatur consequuntur delectus deserunt dolor doloribus, fugit ipsam laboriosam magni maiores maxime nemo numquam odit quam ratione sint suscipit velit vero voluptatibus? Accusamus autem delectus nobis numquam voluptas.</span></p>

            <FAppTheme theme="theme-dark" container="#test" />
        </div>
    `,
});

export const Animate = () => ({
    components: { FAppTheme, FButton },
    template: `
        <div>
            <p id="test" class="pa-5"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error explicabo fugit libero quaerat sapiente sed sunt ut velit! Architecto officia quam similique suscipit! Dolorem dolorum exercitationem fugiat pariatur tempore!</span><span>Ad commodi consequatur consequuntur delectus deserunt dolor doloribus, fugit ipsam laboriosam magni maiores maxime nemo numquam odit quam ratione sint suscipit velit vero voluptatibus? Accusamus autem delectus nobis numquam voluptas.</span></p>

            <FButton label="theme-default" @click.native="setTheme('theme-default')" />
            <FButton label="theme-dark" @click.native="setTheme('theme-dark')" />

            <FAppTheme animate container="#test" />
        </div>
    `,
    methods: {
        setTheme(theme) {
            FAppTheme.setTheme(theme);
        },
    },
});

export const Themes = () => ({
    components: { FAppTheme, FButton },
    template: `
        <div>
            <p id="test" class="pa-5"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error explicabo fugit libero quaerat sapiente sed sunt ut velit! Architecto officia quam similique suscipit! Dolorem dolorum exercitationem fugiat pariatur tempore!</span><span>Ad commodi consequatur consequuntur delectus deserunt dolor doloribus, fugit ipsam laboriosam magni maiores maxime nemo numquam odit quam ratione sint suscipit velit vero voluptatibus? Accusamus autem delectus nobis numquam voluptas.</span></p>

            <p>theme: {{ theme }}</p>

            <FButton label="theme-default" @click.native="setTheme('theme-default')" />
            <FButton label="theme-dark" @click.native="setTheme('theme-dark')" />
            <FButton label="theme-foo" @click.native="setTheme('theme-foo')" />

            <FAppTheme :themes="['theme-default', 'theme-dark', 'theme-foo']" @theme-set="onThemeSet" animate container="#test" />
        </div>
    `,
    data() {
        return {
            theme: 'theme-default',
        };
    },
    methods: {
        setTheme(theme) {
            FAppTheme.setTheme(theme);
        },
        onThemeSet(theme) {
            this.theme = theme;
        },
    },
});
