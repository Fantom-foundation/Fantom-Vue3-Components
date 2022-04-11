import FAutoResizeInput from './FAutoResizeInput.vue';
import FInput from '../FInput/FInput.vue';

export default {
    title: 'FAutoResizeInput',
    component: FAutoResizeInput,
};

export const Default = () => ({
    components: { FAutoResizeInput, FInput },
    template: `
        <div>
            <FAutoResizeInput><input type="text" aria-label="auto resizable input"></FAutoResizeInput> <br /><br />
            <FAutoResizeInput><FInput label="FInput" /></FAutoResizeInput>
        </div>
    `,
});

export const MinWidth = () => ({
    components: { FAutoResizeInput, FInput },
    template: `
        <div>
            <FAutoResizeInput min-width="48px"><input type="text" aria-label="auto resizable input"></FAutoResizeInput> <br /><br />
            <FAutoResizeInput min-width="48px"><FInput label="FInput" /></FAutoResizeInput>
        </div>
    `,
});

export const Value = () => ({
    components: { FAutoResizeInput, FInput },
    template: `
        <div>
            <FAutoResizeInput><input type="text" value="Lorem ipsum" aria-label="auto resizable input"></FAutoResizeInput> <br /><br />
            <FAutoResizeInput><FInput label="FInput" value="Lorem ipsum" /></FAutoResizeInput>
        </div>
    `,
});

export const ExtraWidth = () => ({
    components: { FAutoResizeInput, FInput },
    template: `
        <div>
            <FAutoResizeInput :extra-width="21"><input type="number" value="0" aria-label="auto resizable input"></FAutoResizeInput> <br /><br />
        </div>
    `,
});

export const Placeholder = () => ({
    components: { FAutoResizeInput, FInput },
    template: `
        <div>
            <FAutoResizeInput><input type="text" placeholder="Placeholder"></FAutoResizeInput> <br /><br />
            <FAutoResizeInput><FInput label="FInput" placeholder="Placeholder" /></FAutoResizeInput>
        </div>
    `,
});
