// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import FPopover from './FPopover.vue';
import FButton from '../FButton/FButton.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';

export default {
    title: 'FPopover',
    component: FPopover,
};

export const Default = () => ({
    components: { FPopover, FButton },
    template: `
        <div>
            <FPopover ref="popover" attach-to="#btn">
                Lorem ipsum
            </FPopover>

            <div style="padding: 40px; text-align: center">
                <FButton id="btn" @click.native="$refs.popover.toggle()">Toggle</FButton>
            </div>

            <FPopover ref="popover2" attach-to="#btn2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!
            </FPopover>

            <div style="padding: 40px; text-align: center">
                <FButton id="btn2" @click.native="$refs.popover2.toggle()">Toggle</FButton>
            </div>
        </div>
    `,
});

export const Size = () => ({
    components: { FPopover, FButton },
    template: `
        <div class="gridauto gridauto-miw-256">
            <div>
                <FPopover size="big" ref="popover" attach-to="#btn">
                    Lorem ipsum
                </FPopover>

                <div style="padding: 40px; text-align: center">
                    <FButton id="btn" @click.native="$refs.popover.toggle()"><code>size="big"</code></FButton>
                </div>

                <FPopover size="big" ref="popover2" attach-to="#btn2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!
                </FPopover>

                <div style="padding: 40px; text-align: center">
                    <FButton id="btn2" @click.native="$refs.popover2.toggle()"><code>size="big"</code></FButton>
                </div>
            </div>
            <div>
                <FPopover ref="popover3" attach-to="#btn3">
                    Lorem ipsum
                </FPopover>

                <div style="padding: 40px; text-align: center">
                    <FButton id="btn3" @click.native="$refs.popover3.toggle()">Default</FButton>
                </div>

                <FPopover ref="popover4" attach-to="#btn4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!
                </FPopover>

                <div style="padding: 40px; text-align: center">
                    <FButton id="btn4" @click.native="$refs.popover4.toggle()">Default</FButton>
                </div>
            </div>
            <div>
                <FPopover size="small" ref="popover5" attach-to="#btn5">
                    Lorem ipsum
                </FPopover>

                <div style="padding: 40px; text-align: center">
                    <FButton id="btn5" @click.native="$refs.popover5.toggle()"><code>size="small"</code></FButton>
                </div>

                <FPopover size="small" ref="popover6" attach-to="#btn6">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!
                </FPopover>

                <div style="padding: 40px; text-align: center">
                    <FButton id="btn6" @click.native="$refs.popover6.toggle()"><code>size="small"</code></FButton>
                </div>
            </div>
        </div>
    `,
});

export const WithHeader = () => ({
    components: { FPopover, FButton },
    template: `
        <div class="gridauto gridauto-miw-256 pat-9">
            <div>
                <FPopover :with-header="true" title="Title" attach-position="top" size="big" ref="popover" attach-to="#btn">
                    Lorem ipsum
                </FPopover>

                <div style="padding: 40px; text-align: center">
                    <FButton id="btn" @click.native="$refs.popover.toggle()"><code>size="big"</code></FButton>
                </div>

                <FPopover :with-header="true" title="Title" attach-position="top" size="big" ref="popover2" attach-to="#btn2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!
                </FPopover>

                <div style="padding: 40px; text-align: center">
                    <FButton id="btn2" @click.native="$refs.popover2.toggle()"><code>size="big"</code></FButton>
                </div>
            </div>
            <div>
                <FPopover :with-header="true" title="Title" attach-position="top" ref="popover3" attach-to="#btn3">
                    Lorem ipsum
                </FPopover>

                <div style="padding: 40px; text-align: center">
                    <FButton id="btn3" @click.native="$refs.popover3.toggle()">Default</FButton>
                </div>

                <FPopover :with-header="true" title="Title" attach-position="top" ref="popover4" attach-to="#btn4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!
                </FPopover>

                <div style="padding: 40px; text-align: center">
                    <FButton id="btn4" @click.native="$refs.popover4.toggle()">Default</FButton>
                </div>
            </div>
            <div>
                <FPopover :with-header="true" title="Title" attach-position="top" size="small" ref="popover5" attach-to="#btn5">
                    Lorem ipsum
                </FPopover>

                <div style="padding: 40px; text-align: center">
                    <FButton id="btn5" @click.native="$refs.popover5.toggle()"><code>size="small"</code></FButton>
                </div>

                <FPopover :with-header="true" title="Title" attach-position="top" size="small" ref="popover6" attach-to="#btn6">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui!
                </FPopover>

                <div style="padding: 40px; text-align: center">
                    <FButton id="btn6" @click.native="$refs.popover6.toggle()"><code>size="small"</code></FButton>
                </div>
            </div>
        </div>
    `,
});

export const AttachPositions = () => ({
    components: { FPopover, FButton },
    template: `
        <div>
            <FPopover attach-position="top" attach-to="#btn1" ref="popover1" visible>
                <code>attach-position="top"</code>
            </FPopover>

            <FPopover attach-position="right" attach-to="#btn2" ref="popover2" visible>
                <code>attach-position="right"</code>
            </FPopover>

            <FPopover attach-position="bottom" attach-to="#btn3" ref="popover3" visible>
                <code>attach-position="bottom"</code>
            </FPopover>

            <FPopover attach-position="left" attach-to="#btn4" ref="popover4" visible>
                <code>attach-position="left"</code>
            </FPopover>

            <FPopover attach-position="auto" attach-to="#btn5" ref="popover5" visible>
                <code>attach-position="auto"</code>
            </FPopover>

            <FPopover attach-position="auto-vertical" attach-to="#btn6" ref="popover6" visible>
                <code>attach-position="auto-vertical"</code>
            </FPopover>

            <FPopover attach-position="auto-vertical-exact" attach-to="#btn7" ref="popover7" visible>
                <code>attach-position="auto-vertical-exact"</code>
            </FPopover>

            <div class="pa-8" style="max-width: 400px; margin: 0 auto;">
                <div class="mab-9">
                    <FButton id="btn1" @click.native="$refs.popover1.toggle()">Toggle</FButton>
                </div>
                <div class="mab-9">
                    <FButton id="btn2" @click.native="$refs.popover2.toggle()">Toggle</FButton>
                </div>
                <div class="mab-9">
                    <FButton id="btn3" @click.native="$refs.popover3.toggle()">Toggle</FButton>
                </div>
                <div class="mab-9">
                    <FButton id="btn4" @click.native="$refs.popover4.toggle()">Toggle</FButton>
                </div>
                <div class="mab-9">
                    <FButton id="btn5" @click.native="$refs.popover5.toggle()">Toggle</FButton>
                </div>
                <div class="mab-9">
                    <FButton id="btn6" @click.native="$refs.popover6.toggle()">Toggle</FButton>
                </div>
                <div class="mab-9">
                    <FButton id="btn7" @click.native="$refs.popover7.toggle()">Toggle</FButton>
                </div>

                <div style="padding-bottom: 1000px;"></div>
            </div>
        </div>
    `,
});

export const WithArrow = () => ({
    components: { FPopover, FButton },
    template: `
        <div>
            <FPopover
                with-arrow
                :attach-to="attachTo"
                :attach-position="attachPosition"
                :hide-after="1000"
                ref="win"
            >
                Lorem ipsum
            </FPopover>

            <div style="padding: 40px; text-align: center">
                <FButton id="attach-top" @click.native="onAttachTopClick">attach top</FButton>
                <FButton id="attach-right" @click.native="onAttachRightClick">attach right</FButton>
                <FButton id="attach-bottom" @click.native="onAttachBottomClick">attach bottom</FButton>
                <FButton id="attach-left" @click.native="onAttachLeftClick">attach left</FButton>
            </div>
        </div>
    `,
    data() {
        return {
            attachPosition: 'right',
            attachTo: '#attach-right',
        };
    },
    methods: {
        onAttachTopClick() {
            this.onBtnClick('top');
        },

        onAttachRightClick() {
            this.onBtnClick('right');
        },

        onAttachBottomClick() {
            this.onBtnClick('bottom');
        },

        onAttachLeftClick() {
            this.onBtnClick('left');
        },

        async onBtnClick(_position) {
            const { win } = this.$refs;

            if (win) {
                this.attachPosition = _position;
                this.attachTo = `#attach-${_position}`;

                win.hide();
                win.show();
            }
        },
    },
});

export const ArrowSlot = () => ({
    components: { FPopover, FButton, FSvgIcon },
    template: `
        <div>
            <FPopover
                with-arrow
                :attach-to="attachTo"
                :attach-position="attachPosition"
                :hide-after="1000"
                title="Popover window"
                ref="win"
            >
                Lorem ipsum
                <template #arrow-icon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"/></svg>
                </template>
            </FPopover>

            <div style="padding: 40px; text-align: center">
                <FButton id="attach-top" @click.native="onAttachTopClick">attach top</FButton>
                <FButton id="attach-right" @click.native="onAttachRightClick">attach right</FButton>
                <FButton id="attach-bottom" @click.native="onAttachBottomClick">attach bottom</FButton>
                <FButton id="attach-left" @click.native="onAttachLeftClick">attach left</FButton>
            </div>
        </div>
    `,
    data() {
        return {
            attachPosition: 'right',
            attachTo: '#attach-right',
        };
    },
    methods: {
        onAttachTopClick() {
            this.onBtnClick('top');
        },

        onAttachRightClick() {
            this.onBtnClick('right');
        },

        onAttachBottomClick() {
            this.onBtnClick('bottom');
        },

        onAttachLeftClick() {
            this.onBtnClick('left');
        },

        async onBtnClick(_position) {
            const { win } = this.$refs;

            if (win) {
                this.attachPosition = _position;
                this.attachTo = `#attach-${_position}`;

                win.hide();
                win.show();
            }
        },
    },
});

export const Hide = () => ({
    components: { FPopover, FButton },
    template: `
        <div style="max-width: 400px; margin: 0 auto;">
            <FPopover
                hide-on-document-mousedown
                attach-to="#popover"
                attach-position="bottom"
                ref="popover"
            >
                Hide on document mousedown
            </FPopover>
            <FPopover
                hide-on-document-resize
                attach-to="#popover2"
                attach-position="bottom"
                ref="popover2"
            >
                Hide on document resize
            </FPopover>
            <FPopover
                :hide-after="2000"
                attach-to="#popover3"
                attach-position="bottom"
                ref="popover3"
            >
                Hide after 2s
            </FPopover>
            <FPopover
                hide-on-document-scroll
                attach-to="#popover4"
                attach-position="bottom"
                ref="popover4"
            >
                Hide on document scroll
            </FPopover>
            <br><br>
            <FButton id="popover" @click.native="$refs.popover.show()"><code>hide-on-document-mousedown</code></FButton>
            <br><br>
            <FButton id="popover2" @click.native="$refs.popover2.show()">hide-on-document-resize</FButton>
            <br><br>
            <FButton id="popover3" @click.native="$refs.popover3.show()">:hide-after="2000"</FButton>
            <br><br>
            <FButton id="popover4" @click.native="$refs.popover4.show()">hide-on-document-scroll</FButton>

            <div style="padding-top: 1000px"></div>
        </div>
    `,
});

export const StayInPlace = () => ({
    components: { FPopover, FButton },
    template: `
        <div style="max-width: 400px; margin: 0 auto;">
            <FPopover
                stay-in-place
                hide-on-document-mousedown
                attach-to="#popover"
                attach-position="bottom"
                ref="popover"
            >
                Stay In Place
            </FPopover>
            <br><br>
            <FButton id="popover" @click.native="$refs.popover.show()">Show</FButton>
        </div>
    `,
});

export const FitHeightToViewport = () => ({
    components: { FPopover, FButton },
    template: `
        <div style="position: fixed; top: 10px; width: 320px;">
            <FButton id="popover" @click.native="$refs.popover.show()">Show</FButton>
            <FPopover
                fit-height-to-viewport
                stay-in-place
                hide-on-document-mousedown
                attach-to="#popover"
                attach-position="bottom"
                ref="popover"
            >
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque deleniti dignissimos, dolorum esse inventore ipsum minus molestiae nesciunt nisi nobis quis, temporibus. A adipisci autem expedita natus officiis omnis perspiciatis!</div><div>Beatae illo officia provident. Accusantium architecto consequuntur dicta ex illum iure, nam nihil quas, quisquam reprehenderit repudiandae sed similique tempora? Alias amet atque debitis eum exercitationem in labore quibusdam quo.</div><div>A accusantium amet deserunt dolore ipsa itaque libero maiores nihil tempore unde! Atque distinctio dolore eos, eveniet facere inventore maiores officia officiis quae quidem quod ratione sed sequi sint tempora?</div><div>Alias aliquid aut blanditiis consectetur distinctio dolorum earum exercitationem facilis iste molestiae pariatur quam quas qui quod reprehenderit similique soluta tenetur, totam voluptate voluptatem! Cupiditate dolores dolorum iste nulla unde!</div><div>Aperiam eligendi fugiat inventore praesentium, quod reiciendis. Architecto assumenda autem cumque cupiditate distinctio eaque eligendi esse eum iure maiores, nam natus, odit optio perspiciatis quas, quibusdam repudiandae sapiente voluptate voluptatibus.</div>
            </FPopover>
        </div>
    `,
});
