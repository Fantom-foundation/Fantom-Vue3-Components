import FDetails from './FDetails.vue';

export default {
    title: 'FDetails',
    components: FDetails,
};

export const Default = () => ({
    components: { FDetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <FDetails label="Label">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </FDetails>
        </div>
    `,
});

export const Open = () => ({
    components: { FDetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <FDetails open label="Label">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </FDetails>
        </div>
    `,
});

export const Disabled = () => ({
    components: { FDetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <FDetails disabled label="Label">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </FDetails>
            <br>
            <FDetails disabled open label="Label">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </FDetails>
        </div>
    `,
});

export const Animate = () => ({
    components: { FDetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <FDetails animate label="Label">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </FDetails>
        </div>
    `,
});

export const Transition = () => ({
    components: { FDetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <FDetails style="--fdetails-transitions-length: 1s; --fdetails-transitions-func: ease-in-out;" animate label="Label">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </FDetails>
        </div>
    `,
});

export const Strategy = () => ({
    components: { FDetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <h3><code>render</code></h3>
            <FDetails strategy="render" animate label="Label">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </FDetails>
            <h3><code>create</code></h3>
            <FDetails strategy="create" animate label="Label">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </FDetails>
            <h3><code>create-destroy</code></h3>
            <FDetails strategy="create-destroy" animate label="Label">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </FDetails>
        </div>
    `,
});

export const Slots = () => ({
    components: { FDetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <FDetails label="Label" animate>
                <template #label><b>Label</b></template>
                <template #icon><b>:</b></template>

                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </FDetails>
        </div>
    `,
});

export const Flat = () => ({
    components: { FDetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <FDetails flat animate label="Label">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </FDetails>
        </div>
    `,
});
