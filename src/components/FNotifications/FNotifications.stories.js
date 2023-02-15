// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import { app } from '@storybook/vue3';
import FNotifications from './FNotifications.vue';
import FButton from '../FButton/FButton.vue';
import { Notifications } from '../../plugins/notifications.js';
import { ref } from 'vue';

app.use(Notifications);

const argRef = ref({ foo: 'foo' });

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
                <FButton secondary size="small" @click.native="onButtonClick('topstart')">top-start</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('topcenter')">top-center</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('topend')">top-end</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('bottomstart')">bottom-start</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('bottomcenter')">bottom-center</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('bottomend')">bottom-end</FButton>
            </p>
            <FNotifications position="top-start" group="topstart" />
            <FNotifications position="top-center" group="topcenter" />
            <FNotifications position="top-end" group="topend" />
            <FNotifications position="bottom-start" group="bottomstart" />
            <FNotifications position="bottom-center" group="bottomcenter" />
            <FNotifications position="bottom-end" group="bottomend" />
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
                <FButton secondary size="small" @click.native="onButtonClick('bottomstart')">No strategy</FButton>
                <FButton secondary size="small" @click.native="onButtonClick('bottomcenter')"><code>'newest-first'</code></FButton>
                <FButton secondary size="small" @click.native="onButtonClick('topend')"><code>'single'</code></FButton>
            </p>
            <FNotifications position="bottom-start" group="bottomstart" />
            <FNotifications strategy="newest-first" position="bottom-center" group="bottomcenter" />
            <FNotifications strategy="single" position="top-end" group="topend" />
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
                <FButton secondary size="small" @click.native="onButtonClick('topend', 100000)">show notification</FButton>
            </p>

            <h3><code>hide-after</code></h3>
            <p>
                <FButton secondary size="small" @click.native="onButtonClick('topstart')">show notification</FButton>
            </p>

            <h3>manual hide</h3>
            <p>
                <FButton secondary size="small" @click.native="onButtonClick('topstart', 100000)">show notification</FButton>
                <FButton secondary size="small" @click.native="onButtonHideClick('topstart')">hide notification</FButton>
            </p>

            <FNotifications hide-on-click position="top-center" group="topcetner" />
            <FNotifications hide-on-close-button position="top-end" group="topend" />
            <FNotifications :hide-after="{success: 1000, error: 1000, warning: 1000, info: 1000}" position="top-start" group="topstart" />
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

export const Update = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
        <h3>In page</h3>
        <p>
            <FButton secondary size="small" @click.native="onButtonClick('info')">info</FButton>
            <FButton secondary size="small" @click.native="update()">update</FButton>
        </p>
        <FNotifications
            :group="group"
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
            style="max-width: 400px; padding: 0;"
        />
        </div>
    `,
    data() {
        return {
            group: 'updatenotifications',
            msgId: '',
        };
    },
    methods: {
        async onButtonClick(_type) {
            this.msgId = await this.$notifications.add(
                {
                    type: _type,
                    text: notificationText(_type),
                    hideAfter: 1000000,
                },
                this.group
            );
        },
        update() {
            this.$notifications.update({ text: 'updated', type: 'info' }, this.msgId, this.group);
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

export const AdditionalArgs = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
        <h3>In page</h3>
        <p>
            <FButton secondary size="small" @click="onButtonClick('info')">info</FButton>
            <FButton secondary size="small" @click="changeRef('foo2')">change to 'foo2'</FButton>
            <FButton secondary size="small" @click="changeRef('foo3')">change to 'foo3'</FButton>
            <FButton secondary size="small" @click="update()">update</FButton>
        </p>
        <FNotifications ref="notifications" style="max-width: 400px; padding: 0;">
            <template #notification="notification">
                <b>argument: {{ notification.args[0].value.foo }}</b> <br />
                {{ notification.text }}
            </template>
        </FNotifications>
        </div>
    `,
    data() {
        return {
            msgId: '',
        };
    },
    methods: {
        async onButtonClick(_type) {
            this.msgId = await this.$refs.notifications.add(
                {
                    type: _type,
                    text: notificationText(_type),
                    withIcon: _type === 'error',
                    hideAfter: 1000000,
                },
                argRef
            );
        },
        changeRef(text) {
            argRef.value = { foo: text };
        },
        update() {
            this.$refs.notifications.update({ text: 'updated', type: 'error' }, this.msgId);
        },
    },
});

export const Variations = () => ({
    components: { FNotifications, FButton },
    template: `
        <div>
            <div class="grid">
                <div class="col-4">
                    <h3>top-start</h3>
                    <p>
                        <FButton secondary size="small" @click.native="onButtonClick('success', 'topstart')">success</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('error', 'topstart')">error</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('warning', 'topstart')">warning</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('info', 'topstart')">info</FButton>
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
                    <h3>top-end</h3>
                    <p>
                        <FButton secondary size="small" @click.native="onButtonClick('success', 'topend')">success</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('error', 'topend')">error</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('warning', 'topend')">warning</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('info', 'topend')">info</FButton>
                    </p>
                </div>

                <div class="col-4">
                    <h3>bottom-start</h3>
                    <p>
                        <FButton secondary size="small" @click.native="onButtonClick('success', 'bottomstart')">success</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('error', 'bottomstart')">error</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('warning', 'bottomstart')">warning</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('info', 'bottomstart')">info</FButton>
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
                    <h3>bottom-end</h3>
                    <p>
                        <FButton secondary size="small" @click.native="onButtonClick('success', 'bottomend')">success</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('error', 'bottomend')">error</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('warning', 'bottomend')">warning</FButton>
                        <FButton secondary size="small" @click.native="onButtonClick('info', 'bottomend')">info</FButton>
                    </p>
                </div>
            </div>

            <FNotifications
                group="topstart"
                with-icon
                position="top-start"
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
                group="topend"
                position="top-end"
                hide-on-close-button
                animation-in="slide-left-enter-active"
                animation-out="slide-right-leave-active"
            />
            <FNotifications group="bottomstart" position="bottom-start" />
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
            <FNotifications group="bottomend" position="bottom-end" />
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
