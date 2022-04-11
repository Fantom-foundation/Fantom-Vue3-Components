// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import FLabel from './FLabel.vue';

export default {
    title: 'FLabel',
    component: FLabel,
};

export const Default = () => ({
    components: { FLabel },
    template: `
        <div>
            <h3>Input label</h3>
            <p>
                <FLabel id="id1" label="Label" native />
                <input type="text" class="inp" id="id1">
            </p>
            <h3>labelledby</h3>
            <p>
                <FLabel id="id2" label="Label 2" />
                <i aria-labelledby="id2">Labeled by 'Label 2'</i>
            </p>
            <h3>Not visible label</h3>
            <p>
                <FLabel id="id3" label="Hidden label" not-visible />
                <i aria-labelledby="id3">Labeled by 'Hidden label'</i>
            </p>
        </div>
    `,
});

export const Required = () => ({
    components: { FLabel },
    template: `
        <div>
            <h3>Input label</h3>
            <p>
                <FLabel required id="id1" label="Label" native />
                <input type="text" class="inp" id="id1">
            </p>
            <h3>labelledby</h3>
            <p>
                <FLabel required id="id2" label="Label 2" />
                <i aria-labelledby="id2">Labeled by 'Label 2'</i>
            </p>
            <h3>Not visible label</h3>
            <p>
                <FLabel required id="id3" label="Hidden label" not-visible />
                <i aria-labelledby="id3">Labeled by 'Hidden label'</i>
            </p>
        </div>
    `,
});

export const Slots = () => ({
    components: { FLabel },
    template: `
        <div>
            <h3>Input label</h3>
            <p>
                <FLabel id="id1" native><i>Label &#9742;</i></FLabel>
                <input type="text" class="inp" id="id1">
            </p>
            <h3>labelledby</h3>
            <p>
                <FLabel id="id2"><i>Label 2 &#9742;</i></FLabel>
                <span aria-labelledby="id2">Labeled by 'Label 2'</span>
            </p>
            <h3><code>asterisk</code> slot</h3>
            <p>
                <FLabel required id="id3" native label="Label">
                    <template #asterisk>&#x273C;</template>
                </FLabel>
                <input type="text" class="inp" id="id3">
            </p>
            <p>
                <FLabel required id="id4" native>
                    <i>Label &#9742;</i>
                    <template #asterisk>&#x273C;</template>
                </FLabel>
                <input type="text" class="inp" id="id4">
            </p>
        </div>
    `,
});
