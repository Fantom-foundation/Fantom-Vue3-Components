import FTooltip from './FTooltip.vue';
import FButton from '../FButton/FButton.vue';

export default {
    title: 'FTooltip',
    component: FTooltip,
};

export const Default = () => ({
    components: { FTooltip, FButton },
    template: `
        <div class="pat-1">
            <div class="gridauto">
                <div><span data-tooltip="Tooltip text">Tooltip 1</span></div>
                <div class="pat-7"><span data-tooltip="Tooltip text 2">Tooltip 2</span></div>
                <div><span data-tooltip="Tooltip text 3">Tooltip 3</span><span data-tooltip="Tooltip text 3.5">Tooltip 3.5</span></div>
                <div><span data-tooltip="">No tooltip text</span></div>
            </div>
            <FTooltip />
        </div>
    `,
});

export const FocusBlur = () => ({
    components: { FTooltip, FButton },
    template: `
        <div class="pat-5">
            <button data-tooltip="Button tooltip text 1">Tooltip 1</button>
            <FButton data-tooltip="Button tooltip text 1" label="Tooltip 2" />
            <FButton data-tooltip="" label="No text" />
            <FTooltip />
        </div>
    `,
});

export const WithArrow = () => ({
    components: { FTooltip, FButton },
    template: `
        <div class="pat-9">
            <button data-tooltip="Button tooltip text 1">Tooltip 1</button>
            <FButton data-tooltip="Button tooltip text 1" label="Tooltip 2" />
            <FButton data-tooltip="" label="No tooltip text" />
            <FTooltip with-arrow />
        </div>
    `,
});

export const ThrottleInterval = () => ({
    components: { FTooltip, FButton },
    template: `
        <div class="pat-1">
            <p><code>data-tooltip</code> is a JSON string</p>

            <h3>Default (<code>200ms</code>)</h3>
            <FButton data-tooltip="Button tooltip text 1" label="Button" />
            <FButton data-tooltip="Button tooltip text 2" label="Button" />

            <FTooltip />

            <h3><code>500ms</code></h3>
            <FButton data-tooltip2="Button tooltip text 1" label="Button" />
            <FButton data-tooltip2="Button tooltip text 2" label="Button" />

            <FTooltip target-attr="data-tooltip2" :throttle-interval="500" />
        </div>
    `,
});

export const OnlyIfNeeded = () => ({
    components: { FTooltip, FButton },
    template: `
        <div class="pat-9">
            <FButton data-tooltip="only-if-needed" label="only-if-needed" />
            <FButton
                data-tooltip="only-if-needed"
                label="only-if-needed" style="width: 80px; white-space: nowrap; overflow: hidden; justify-content: start"
            />
            <FTooltip only-if-needed />
        </div>
    `,
});

export const Options = () => ({
    components: { FTooltip, FButton },
    template: `
        <div class="pat-1">
            <p><code>data-tooltip</code> is a JSON string</p>

            <FButton
                data-tooltip='{ "text": "Button tooltip text 1" }'
                label='{ "text": "Button tooltip text 1" }'
            /> <br><br>
            <FButton
                data-tooltip='{ "text": "Button tooltip text 2", "preferredAttachPosition": "right" }'
                label='{ "text": "Button tooltip text 2", "preferredAttachPosition": "right" }'
            /> <br><br>
            <FButton
                data-tooltip='{ "text": "Button tooltip text 3", "withArrow": true, "preferredAttachPosition": "right" }'
                label='{ "text": "Button tooltip text 3", "withArrow": true, "preferredAttachPosition": "right" }'
            /> <br><br>
            <FButton
                data-tooltip='{ "text": "Lorem ipsum", "onlyIfNeeded": true }'
                label='{ "text": "Lorem ipsum", "onlyIfNeeded": true }'
            /> <br><br>
            <FButton
                data-tooltip='{ "text": "Lorem ipsum", "onlyIfNeeded": true }'
                label='{ "text": "Lorem ipsum", "onlyIfNeeded": true }'
                style="width: 250px; white-space: nowrap; overflow: hidden; justify-content: start"
            /> <br><br>

            <FTooltip />
        </div>
    `,
});
