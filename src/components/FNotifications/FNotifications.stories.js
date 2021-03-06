// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import { app } from '@storybook/vue3';
import FNotifications from './FNotifications.vue';
import FButton from '../FButton/FButton.vue';
import { Notifications } from '../../plugins/notifications.js';

app.use(Notifications);

export default {
    title: 'FNotifications',
    component: FNotifications,
};

function notificationText(_type) {
    if (_type === 'success') {
        return 'Success message';
    } else if (_type === 'error') {
        return 'Error message';
    } else if (_type === 'warning') {
        return 'Warning message';
    } else if (_type === 'info') {
        return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
    }
}

function getRandomType() {
    return ['success', 'error', 'warning', 'info'][Math.floor(Math.random() * 4)];
}

export const Default = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <h3>In page</h3>
            <p>
                <FButton secondary size="small" @click.native="onButtonClick('success')">success</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('error')">error</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('warning')">warning</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('info')">info</FButton>
            </p>
            <FNotifications ref="notifications" style="max-width: 400px; padding: 0;" />
        </div>
    `,
    methods: {
        onButtonClick(_type) {
            this.$refs.notifications.add({
                type: _type,
                text: notificationText(_type),
                withIcon: _type === 'error',
            });
        },
    },
});

export const PositionAndGroup = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <p>
                <br /><br /><br /><br /><br />
                <FButton secondary size="small" @click.native="onButtonClick('topleft')">top-left</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('topcenter')">top-center</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('topright')">top-right</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('bottomleft')">bottom-left</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('bottomcenter')">bottom-center</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('bottomright')">bottom-right</FButton>
            </p>
            <FNotifications position="top-left" group="topleft" />
            <FNotifications position="top-center" group="topcenter" />
            <FNotifications position="top-right" group="topright" />
            <FNotifications position="bottom-left" group="bottomleft" />
            <FNotifications position="bottom-center" group="bottomcenter" />
            <FNotifications position="bottom-right" group="bottomright" />
        </div>
    `,
    methods: {
        onButtonClick(_group) {
            let type = getRandomType();

            this.$notifications.add(
                {
                    type,
                    text: notificationText(type),
                    withIcon: type === 'error',
                },
                _group
            );
        },
    },
});

export const Strategy = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <p>
                <FButton secondary size="small" @click.native="onButtonClick('bottomleft')">No strategy</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('bottomcenter')"><code>'newest-first'</code></FButton>
                <FButton secondary size="small" @click.native="onButtonClick('topright')"><code>'single'</code></FButton>
            </p>
            <FNotifications position="bottom-left" group="bottomleft" />
            <FNotifications strategy="newest-first" position="bottom-center" group="bottomcenter" />
            <FNotifications strategy="single" position="top-right" group="topright" />
        </div>
    `,
    methods: {
        onButtonClick(_group) {
            let type = getRandomType();

            this.$notifications.add(
                {
                    type,
                    text: notificationText(type),
                    withIcon: type === 'error',
                },
                _group
            );
        },
    },
});

export const Hide = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <h3><code>hide-on-click</code></h3>
            <p>
                <FButton secondary size="small" @click.native="onButtonClick('topcetner')">show notification</FButton>
            </p>

            <h3><code>hide-on-close-button</code></h3>
            <p>
                <FButton secondary size="small" @click.native="onButtonClick('topright')">show notification</FButton>
            </p>

            <h3><code>hide-after</code></h3>
            <p>
                <FButton secondary size="small" @click.native="onButtonClick('topleft')">show notification</FButton>
            </p>

            <h3>manual hide</h3>
            <p>
                <FButton secondary size="small" @click.native="onButtonClick('topleft', 100000)">show notification</FButton>
                <FButton secondary size="small" @click.native="onButtonHideClick('topleft')">hide notification</FButton>
            </p>

            <FNotifications hide-on-click position="top-center" group="topcetner" />
            <FNotifications hide-on-close-button position="top-right" group="topright" />
            <FNotifications :hide-after="{success: 1000, error: 1000, warning: 1000, info: 1000}" position="top-left" group="topleft" />
        </div>
    `,
    data() {
        return {
            msgId: '',
        };
    },
    methods: {
        async onButtonClick(_group, hideAfter) {
            let type = getRandomType();

            this.msgId = await this.$notifications.add(
                {
                    type,
                    text: notificationText(type),
                    withIcon: type === 'error',
                    hideAfter,
                },
                _group
            );
        },

        onButtonHideClick(_group) {
            if (this.msgId) {
                this.$notifications.hide(this.msgId, _group);
            }
        },
    },
});

export const Slot = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <p>
                <FButton secondary size="small" @click.native="onButtonClick('topcenter')">show notification</FButton>
            </p>

            <FNotifications
                group="topcenter"
                position="top-center"
                animation-in="slide-down-enter-active"
                animation-out="slide-up-leave-active"
            >
                <template #notification="notification">
                    <template v-if="notification.html">
                        <b>&#9742; <span v-html="notification.html"></span></b>
                    </template>
                    <template v-else-if="notification.text">
                        <b>&#9742; {{ notification.text }}</b>
                    </template>
                </template>
            </FNotifications>
        </div>
    `,
    methods: {
        onButtonClick(_group) {
            let type = getRandomType();

            this.$notifications.add(
                {
                    type,
                    text: notificationText(type),
                    withIcon: type === 'error',
                },
                _group
            );
        },
    },
});

export const WithIcon = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <p>
                <FButton secondary size="small" @click.native="onButtonClick('topcetner')">show notification</FButton>
            </p>

            <FNotifications with-icon position="top-center" group="topcetner" />
        </div>
    `,
    methods: {
        onButtonClick(_group) {
            let type = getRandomType();

            this.$notifications.add(
                {
                    type,
                    text: notificationText(type),
                },
                _group
            );
        },
    },
});

export const Variations = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <div class="grid">
                <div class="col-4">
                    <h3>top-left</h3>
                    <p>
                        <FButton secondary size="small" @click.native="onButtonClick('success', 'topleft')">success</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('error', 'topleft')">error</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('warning', 'topleft')">warning</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('info', 'topleft')">info</FButton>
                    </p>
                </div>

                <div class="col-4">
                    <h3>top-center</h3>
                    <p>
                        <FButton secondary size="small" @click.native="onButtonClick('success', 'topcenter')">success</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('error', 'topcenter')">error</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('warning', 'topcenter')">warning</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('info', 'topcenter')">info</FButton>
                    </p>
                </div>

                <div class="col-4">
                    <h3>top-right</h3>
                    <p>
                        <FButton secondary size="small" @click.native="onButtonClick('success', 'topright')">success</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('error', 'topright')">error</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('warning', 'topright')">warning</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('info', 'topright')">info</FButton>
                    </p>
                </div>

                <div class="col-4">
                    <h3>bottom-left</h3>
                    <p>
                        <FButton secondary size="small" @click.native="onButtonClick('success', 'bottomleft')">success</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('error', 'bottomleft')">error</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('warning', 'bottomleft')">warning</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('info', 'bottomleft')">info</FButton>
                    </p>
                </div>

                <div class="col-4">
                    <h3>bottom-center</h3>
                    <p>
                        <FButton secondary size="small" @click.native="onButtonClick('success', 'bottomcenter')">success</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('error', 'bottomcenter')">error</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('warning', 'bottomcenter')">warning</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('info', 'bottomcenter')">info</FButton>
                    </p>
                </div>

                <div class="col-4">
                    <h3>bottom-right</h3>
                    <p>
                        <FButton secondary size="small" @click.native="onButtonClick('success', 'bottomright')">success</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('error', 'bottomright')">error</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('warning', 'bottomright')">warning</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('info', 'bottomright')">info</FButton>
                    </p>
                </div>
            </div>

            <FNotifications
                group="topleft"
                with-icon
                position="top-left"
                hide-on-click
                animation-in="slide-right-enter-active"
                animation-out="slide-left-leave-active"
            />
            <FNotifications
                group="topcenter"
                with-icon
                hide-on-click
                animation-in="scale-center-enter-active"
                animation-out="scale-center-leave-active"
                strategy="single"
                position="top-center"
            />
            <FNotifications
                group="topright"
                position="top-right"
                hide-on-close-button
                animation-in="slide-left-enter-active"
                animation-out="slide-right-leave-active"
            />
            <FNotifications group="bottomleft" position="bottom-left" />
            <FNotifications
                group="bottomcenter"
                position="bottom-center"
                strategy="newest-first"
                animation-in="slide-up-enter-active"
                animation-out="slide-down-leave-active"
            >
                <template #notification="notification">
                    <template v-if="notification.html">
                        <b>&#9742; <span v-html="notification.html"></span></b>
                    </template>
                    <template v-else-if="notification.text">
                        <b>&#9742; {{ notification.text }}</b>
                    </template>
                </template>
            </FNotifications>
            <FNotifications group="bottomright" position="bottom-right" />
        </div>
    `,
    methods: {
        onButtonClick(_type, _group) {
            this.$notifications.add(
                {
                    type: _type,
                    text: notificationText(_type),
                    withIcon: _type === 'error',
                },
                _group
            );
        },
    },
});
