// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import FButton from './FButton.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconTimes from '../icons/IconTimes.vue';

export default {
    title: 'FButton',
    component: FButton,
};

export const Default = () => ({
    components: { FButton, FSvgIcon, IconTimes },
    template: `
        <div>
            <h3>Primary (default)</h3>
            <FButton size="large" label="Large" />
            <FButton label="Default" />
            <FButton size="small" label="Small" />
            <FButton size="mini" label="Mini" />
            <h3>Secondary</h3>
            <FButton secondary size="large" label="Large" />
            <FButton secondary label="Default" />
            <FButton secondary size="small" label="Small" />
            <FButton secondary size="mini" label="Mini" />
            <h3>Tertiary</h3>
            <FButton tertiary size="large" label="Large" />
            <FButton tertiary label="Default" />
            <FButton tertiary size="small" label="Small" />
            <FButton tertiary size="mini" label="Mini" />
            <h3>With an icon</h3>
            <FButton class="fbutton-withicon" aria-label="with-icon" size="large"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <FButton class="fbutton-withicon" aria-label="with-icon"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <FButton class="fbutton-withicon" aria-label="with-icon" size="small"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <FButton class="fbutton-withicon" aria-label="with-icon" size="mini"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <br />
            <FButton class="fbutton-withicon" secondary aria-label="with-icon" size="large"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <FButton class="fbutton-withicon" secondary aria-label="with-icon"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <FButton class="fbutton-withicon" secondary aria-label="with-icon" size="small"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <FButton class="fbutton-withicon" secondary aria-label="with-icon" size="mini"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <br />
            <FButton class="fbutton-withicon" tertiary aria-label="with-icon" size="large"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <FButton class="fbutton-withicon" tertiary aria-label="with-icon"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <FButton class="fbutton-withicon" tertiary aria-label="with-icon" size="small"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <FButton class="fbutton-withicon" tertiary aria-label="with-icon" size="mini"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <br />
            <h3>Round</h3>
            <FButton round aria-label="round"><FSvgIcon><IconTimes /></FSvgIcon></FButton>
            <FButton round secondary aria-label="round"><FSvgIcon><IconTimes /></FSvgIcon></FButton>
            <FButton round tertiary aria-label="round"><FSvgIcon><IconTimes /></FSvgIcon></FButton>
        </div>
    `,
});

export const Disabled = () => ({
    components: { FButton, FSvgIcon, IconTimes },
    template: `
        <div>
            <h3>Primary (default)</h3>
            <FButton disabled size="large" label="Large" />
            <FButton disabled label="Default" />
            <FButton disabled size="small" label="Small" />
            <FButton disabled size="mini" label="Mini" />
            <h3>Secondary</h3>
            <FButton disabled secondary size="large" label="Large" />
            <FButton disabled secondary label="Default" />
            <FButton disabled secondary size="small" label="Small" />
            <FButton disabled secondary size="mini" label="Mini" />
            <h3>Tertiary</h3>
            <FButton disabled tertiary size="large" label="Large" />
            <FButton disabled tertiary label="Default" />
            <FButton disabled tertiary size="small" label="Small" />
            <FButton disabled tertiary size="mini" label="Mini" />
            <h3>Round</h3>
            <FButton disabled round aria-label="round"><FSvgIcon><IconTimes /></FSvgIcon></FButton>
            <FButton disabled round secondary aria-label="round"><FSvgIcon><IconTimes /></FSvgIcon></FButton>
            <FButton disabled round tertiary aria-label="round"><FSvgIcon><IconTimes /></FSvgIcon></FButton>
        </div>
    `,
});

export const Loading = () => ({
    components: { FButton, FSvgIcon, IconTimes },
    template: `
        <div>
            <h3>Primary (default)</h3>
            <FButton loading size="large" label="Large" />
            <FButton loading label="Default" />
            <FButton loading size="small" label="Small" />
            <FButton loading size="mini" label="Mini" />
            <h3>Secondary</h3>
            <FButton loading secondary size="large" label="Large" />
            <FButton loading secondary label="Default" />
            <FButton loading secondary size="small" label="Small" />
            <FButton loading secondary size="mini" label="Mini" />
            <h3>Tertiary</h3>
            <FButton loading tertiary size="large" label="Large" />
            <FButton loading tertiary label="Default" />
            <FButton loading tertiary size="small" label="Small" />
            <FButton loading tertiary size="mini" label="Mini" />
            <h3>With icon</h3>
            <FButton loading class="fbutton-withicon" tertiary aria-label="with-icon" size="large"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <FButton loading class="fbutton-withicon" tertiary aria-label="with-icon"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <FButton loading class="fbutton-withicon" tertiary aria-label="with-icon" size="small"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
            <FButton loading class="fbutton-withicon" tertiary aria-label="with-icon" size="mini"><FSvgIcon><IconTimes /></FSvgIcon> With icon</FButton>
        </div>
    `,
});

export const customSpinner = () => ({
    components: { FButton, FSvgIcon, IconTimes },
    template: `
        <div>
            <h3>Primary (default)</h3>
            <FButton use-custom-spinner :style="style" loading size="large" label="Large" />
            <FButton use-custom-spinner :style="style" loading label="Default" />
            <FButton use-custom-spinner :style="style" loading size="small" label="Small" />
            <FButton use-custom-spinner :style="style" loading size="mini" label="Mini" />
            <h3>Secondary</h3>
            <FButton use-custom-spinner :style="style" loading secondary size="large" label="Large" />
            <FButton use-custom-spinner :style="style" loading secondary label="Default" />
            <FButton use-custom-spinner :style="style" loading secondary size="small" label="Small" />
            <FButton use-custom-spinner :style="style" loading secondary size="mini" label="Mini" />
            <h3>Tertiary</h3>
            <FButton use-custom-spinner :style="style" loading tertiary size="large" label="Large" />
            <FButton use-custom-spinner :style="style" loading tertiary label="Default" />
            <FButton use-custom-spinner :style="style" loading tertiary size="small" label="Small" />
            <FButton use-custom-spinner :style="style" loading tertiary size="mini" label="Mini" />
        </div>
    `,
    data() {
        return {
            style: '--fbutton-spinner: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM74.98 437C56.23 418.3 56.23 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9zM369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1V369.1z"/></svg>\');',
        };
    },
});

export const notDisableWhileLoading = () => ({
    components: { FButton, FSvgIcon, IconTimes },
    template: `
        <div>
            <h3>Primary (default)</h3>
            <FButton not-disable-while-loading loading size="large" label="Large" />
            <FButton not-disable-while-loading loading label="Default" />
            <FButton not-disable-while-loading loading size="small" label="Small" />
            <FButton not-disable-while-loading loading size="mini" label="Mini" />
            <br /><br />
            <FButton not-disable-while-loading use-custom-spinner :style="style" loading size="large" label="Large" />
            <FButton not-disable-while-loading use-custom-spinner :style="style" loading label="Default" />
            <FButton not-disable-while-loading use-custom-spinner :style="style" loading size="small" label="Small" />
            <FButton not-disable-while-loading use-custom-spinner :style="style" loading size="mini" label="Mini" />
            <h3>Secondary</h3>
            <FButton not-disable-while-loading loading secondary size="large" label="Large" />
            <FButton not-disable-while-loading loading secondary label="Default" />
            <FButton not-disable-while-loading loading secondary size="small" label="Small" />
            <FButton not-disable-while-loading loading secondary size="mini" label="Mini" />
            <br /><br />
            <FButton not-disable-while-loading use-custom-spinner :style="style" loading secondary size="large" label="Large" />
            <FButton not-disable-while-loading use-custom-spinner :style="style" loading secondary label="Default" />
            <FButton not-disable-while-loading use-custom-spinner :style="style" loading secondary size="small" label="Small" />
            <FButton not-disable-while-loading use-custom-spinner :style="style" loading secondary size="mini" label="Mini" />
            <h3>Tertiary</h3>
            <FButton not-disable-while-loading loading tertiary size="large" label="Large" />
            <FButton not-disable-while-loading loading tertiary label="Default" />
            <FButton not-disable-while-loading loading tertiary size="small" label="Small" />
            <FButton not-disable-while-loading loading tertiary size="mini" label="Mini" />
            <br /><br />
            <FButton not-disable-while-loading use-custom-spinner :style="style" loading tertiary size="large" label="Large" />
            <FButton not-disable-while-loading use-custom-spinner :style="style" loading tertiary label="Default" />
            <FButton not-disable-while-loading use-custom-spinner :style="style" loading tertiary size="small" label="Small" />
            <FButton not-disable-while-loading use-custom-spinner :style="style" loading tertiary size="mini" label="Mini" />
        </div>
    `,
    data() {
        return {
            style: '--fbutton-spinner: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM74.98 437C56.23 418.3 56.23 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9zM369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1V369.1z"/></svg>\');',
        };
    },
});

export const noLabelWhileLoading = () => ({
    components: { FButton, FSvgIcon, IconTimes },
    template: `
        <div>
            <h3>Primary (default)</h3>
            <FButton no-label-while-loading loading size="large" label="Large" />
            <FButton no-label-while-loading loading label="Default" />
            <FButton no-label-while-loading loading size="small" label="Small" />
            <FButton no-label-while-loading loading size="mini" label="Mini" />
            <br /><br />
            <FButton no-label-while-loading use-custom-spinner :style="style" loading size="large" label="Large" />
            <FButton no-label-while-loading use-custom-spinner :style="style" loading label="Default" />
            <FButton no-label-while-loading use-custom-spinner :style="style" loading size="small" label="Small" />
            <FButton no-label-while-loading use-custom-spinner :style="style" loading size="mini" label="Mini" />
            <h3>Secondary</h3>
            <FButton no-label-while-loading loading secondary size="large" label="Large" />
            <FButton no-label-while-loading loading secondary label="Default" />
            <FButton no-label-while-loading loading secondary size="small" label="Small" />
            <FButton no-label-while-loading loading secondary size="mini" label="Mini" />
            <br /><br />
            <FButton no-label-while-loading use-custom-spinner :style="style" loading secondary size="large" label="Large" />
            <FButton no-label-while-loading use-custom-spinner :style="style" loading secondary label="Default" />
            <FButton no-label-while-loading use-custom-spinner :style="style" loading secondary size="small" label="Small" />
            <FButton no-label-while-loading use-custom-spinner :style="style" loading secondary size="mini" label="Mini" />
            <h3>Tertiary</h3>
            <FButton no-label-while-loading loading tertiary size="large" label="Large" />
            <FButton no-label-while-loading loading tertiary label="Default" />
            <FButton no-label-while-loading loading tertiary size="small" label="Small" />
            <FButton no-label-while-loading loading tertiary size="mini" label="Mini" />
            <br /><br />
            <FButton no-label-while-loading use-custom-spinner :style="style" loading tertiary size="large" label="Large" />
            <FButton no-label-while-loading use-custom-spinner :style="style" loading tertiary label="Default" />
            <FButton no-label-while-loading use-custom-spinner :style="style" loading tertiary size="small" label="Small" />
            <FButton no-label-while-loading use-custom-spinner :style="style" loading tertiary size="mini" label="Mini" />
        </div>
    `,
    data() {
        return {
            style: '--fbutton-spinner: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM74.98 437C56.23 418.3 56.23 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9zM369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1V369.1z"/></svg>\');',
        };
    },
});

export const Variants = () => ({
    components: { FButton, FSvgIcon, IconTimes },
    template: `
        <div>
            <h3><code>.btn-red</code></h3>
            <FButton label="Default" class="btn-red" />
            <FButton secondary label="Default" class="btn-red" />
            <FButton tertiary label="Default" class="btn-red" />
            <br />
            <FButton disabled label="Default" class="btn-red" />
            <FButton disabled secondary label="Default" class="btn-red" />
            <FButton disabled tertiary label="Default" class="btn-red" />
            <br />
            <FButton loading label="Default" class="btn-red" />
            <FButton loading secondary label="Default" class="btn-red" />
            <FButton loading tertiary label="Default" class="btn-red" />
            <h3><code>.btn-green</code></h3>
            <FButton label="Default" class="btn-green" />
            <FButton secondary label="Default" class="btn-green" />
            <FButton tertiary label="Default" class="btn-green" />
            <br />
            <FButton disabled label="Default" class="btn-green" />
            <FButton disabled secondary label="Default" class="btn-green" />
            <FButton disabled tertiary label="Default" class="btn-green" />
            <br />
            <FButton loading label="Default" class="btn-green" />
            <FButton loading secondary label="Default" class="btn-green" />
            <FButton loading tertiary label="Default" class="btn-green" />
            <h3><code>.btn-orange</code></h3>
            <FButton label="Default" class="btn-orange" />
            <FButton secondary label="Default" class="btn-orange" />
            <FButton tertiary label="Default" class="btn-orange" />
            <br />
            <FButton disabled label="Default" class="btn-orange" />
            <FButton disabled secondary label="Default" class="btn-orange" />
            <FButton disabled tertiary label="Default" class="btn-orange" />
            <br />
            <FButton loading label="Default" class="btn-orange" />
            <FButton loading secondary label="Default" class="btn-orange" />
            <FButton loading tertiary label="Default" class="btn-orange" />
            <h3><code>.btn-grey</code></h3>
            <FButton label="Default" class="btn-grey" />
            <FButton secondary label="Default" class="btn-grey" />
            <FButton tertiary label="Default" class="btn-grey" />
            <br />
            <FButton disabled label="Default" class="btn-grey" />
            <FButton disabled secondary label="Default" class="btn-grey" />
            <FButton disabled tertiary label="Default" class="btn-grey" />
            <br />
            <FButton loading label="Default" class="btn-grey" />
            <FButton loading secondary label="Default" class="btn-grey" />
            <FButton loading tertiary label="Default" class="btn-grey" />
            <h3><code>.btn-light, .darktheme -> fbutton</code></h3>
            <div class="bac-grey-8 pa-5 darktheme">
                <FButton label="Default" />
                <FButton secondary label="Default" class="btn-light" />
                <FButton tertiary label="Default" class="btn-light" />
                <br />
                <FButton disabled label="Default" />
                <FButton disabled secondary label="Default" class="btn-light" />
                <FButton disabled tertiary label="Default" class="btn-light" />
                <br />
                <FButton loading label="Default" />
                <FButton loading secondary label="Default" class="btn-light" />
                <FButton loading tertiary label="Default" class="btn-light" />
            </div>
        </div>
    `,
});

export const Slot = () => ({
    components: { FButton, FSvgIcon, IconTimes },
    template: `
        <div>
            <FButton><FSvgIcon size="16px"><IconTimes /></FSvgIcon> <i>Primary</i></FButton>
            <FButton secondary><FSvgIcon size="16px"><IconTimes /></FSvgIcon> <i>Secondary</i></FButton>
            <FButton tertiary><FSvgIcon size="16px"><IconTimes /></FSvgIcon> <i>Tertiary</i></FButton>
        </div>
    `,
});
