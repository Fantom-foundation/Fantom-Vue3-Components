import FFitTextToRow from './FFitTextToRow.vue';
import { FInput } from '../../components/index.js';

export default {
    title: 'FFitTextToRow',
    component: FFitTextToRow,
};

const resizableBox = `
    max-width: 900px;
    resize: horizontal;
    overflow: hidden;
    padding: 24px;
    border: 1px solid #eee;
    font-size: 28px;
    text-align: center;
`;

export const Default = () => ({
    components: { FFitTextToRow },
    template: `
        <div :style="resizableBox">
            <FFitTextToRow />
        </div>
    `,
    data() {
        return {
            resizableBox,
        };
    },
});

export const Text = () => ({
    components: { FFitTextToRow, FInput },
    template: `
      <div>
          <h3>short text</h3>
          <div :style="resizableBox">
              <FFitTextToRow text="Lorem ipsum dolor sit amet" />
          </div>
          <h3>long text</h3>
          <div :style="resizableBox">
              <FFitTextToRow text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. A at atque delectus, distinctio dolorem dolores, libero maiores nobis." />
          </div>
          <h3>custom text</h3>
          <FInput v-model:value="text" /><br /><br />
          <div :style="resizableBox">
              <FFitTextToRow :text="text" />
          </div>
      </div>
    `,
    data() {
        return {
            resizableBox,
            text: 'Lorem ipsum dolor sit',
        };
    },
});

export const Slot = () => ({
    components: { FFitTextToRow },
    template: `
        <div>
        <h3>short text</h3>
        <div :style="resizableBox">
            <FFitTextToRow>
                Lorem ipsum dolor <b style="font-size: 75%;">sit amet</b>
            </FFitTextToRow>
        </div>
        <h3>long text</h3>
        <div :style="resizableBox">
            <FFitTextToRow>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. <i>A at atque delectus, distinctio dolorem dolores, libero maiores nobis.</i>
            </FFitTextToRow>
        </div>
        </div>
    `,
    data() {
        return {
            resizableBox,
        };
    },
});
