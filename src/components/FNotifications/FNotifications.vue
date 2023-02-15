<template>
    <div class="fnotifications" :class="[positionClasses]">
        <FMessage
            ref="msg"
            v-for="notification in notifications"
            :key="notification.id"
            v-bind="{ ...notification, text: undefined, html: undefined }"
            :type="notification.type"
            :id="notification.id"
            animate
            alert
            @message-hidden="onMessageHidden"
            class="fnotifications_notification"
        >
            <slot name="notification" v-bind="{ ...notification }">
                <template v-if="notification.html">
                    <div v-html="notification.html"></div>
                </template>
                <template v-else-if="notification.text">
                    {{ notification.text }}
                </template>
            </slot>
        </FMessage>
    </div>
</template>

<script>
import FMessage from '../FMessage/FMessage.vue';
import { getUniqueId } from '../../utils/index.js';
import { ref } from 'vue';
import { callAndWait } from '../../utils/vue-helpers.js';

const notificationsState = ref({
    addNotification: {},
    hideNotification: {},
    updateNotification: {},
});

/**
 * Container for notifications (`FMessage` components).
 *
 * Use `add` method to add new notifications. This method accepts object that describes notification
 * - properties are the same as of `FMessage` + property `'text'` (for displaying
 * text content) or `'html'` - for displaying html content.
 *
 * You can install Notifications as a plugin
 *
 * `import { Notifications } from '@/plugins/notifications.js';`
 * `Vue.use(Notifications);`
 *
 * and use it in a Vue component like:
 *
 * `this.$notifications.add(notification, group);`
 */
export default {
    name: 'FNotifications',

    components: { FMessage },

    props: {
        /**
         * Predefined notification positions
         *
         * @type {('' | 'top-start'| 'top-left' | 'top-center' | 'top-end' | 'top-right' | 'bottom-start' | 'bottom-left' | 'bottom-center' | 'bottom-end' | 'bottom-right')}
         */
        position: {
            type: String,
            default: '',
            validator: function (_value) {
                return (
                    [
                        '',
                        'top-start',
                        'top-left',
                        'top-center',
                        'top-end',
                        'top-right',
                        'bottom-start',
                        'bottom-left',
                        'bottom-center',
                        'bottom-end',
                        'bottom-right',
                    ].indexOf(_value) !== -1
                );
            },
        },
        /** Name of notification group. Specifies where notifications will be rendered to */
        group: {
            type: String,
            default: '',
        },
        /**
         * Strategy for displaying notifications.
         * `'newest-first'` - new notification will be prepended
         * `'single'` - just one notification at a time will be displayed
         *
         * @type {('' | 'newest-first' | 'single')}
         */
        strategy: {
            type: String,
            default: '',
            validator: function (_value) {
                return ['', 'newest-first', 'single'].indexOf(_value) !== -1;
            },
        },
        /** Use icon with notifications */
        withIcon: {
            type: Boolean,
            default: false,
        },
        /** Animation that starts when the notification is just about to show. */
        animationIn: {
            type: String,
            default: 'fade-enter-active',
        },
        /** Animation that starts when the notification is just about to hide. */
        animationOut: {
            type: String,
            default: 'fade-leave-active',
        },
        /** Notification will be hidden by clicking on it */
        hideOnClick: {
            type: Boolean,
            default: false,
        },
        /** Notification will be hidden by clicking on 'close' button */
        hideOnCloseButton: {
            type: Boolean,
            default: false,
        },
        /** Accepts object - keys are notification types, values specify the time in milliseconds after which
         * the notifications close
         */
        hideAfter: {
            type: Object,
            default() {
                return {
                    success: 3000,
                    info: 4000,
                    warning: 4000,
                    error: 5000,
                };
            },
        },
    },

    data() {
        return {
            notifications: [],
        };
    },

    computed: {
        positionClasses() {
            return this.position ? ['fnotifications-fixed', `fnotifications-${this.position.replace('-', '')}`] : '';
        },

        cAddNotification() {
            return notificationsState.value.addNotification;
        },

        cHideNotification() {
            return notificationsState.value.hideNotification;
        },

        cUpdateNotification() {
            return notificationsState.value.updateNotification;
        },
    },

    watch: {
        cAddNotification(data) {
            this.addNotification(data);
        },

        cHideNotification(data) {
            this.hideNotification(data);
        },

        cUpdateNotification(data) {
            this.updateNotification(data);
        },
    },

    methods: {
        /**
         * @param {Object} _notification
         * @return {string} Notification id
         */
        add(_notification) {
            const { notifications } = this;
            const { strategy } = this;
            const id = getUniqueId();
            const notification = {
                id,
                type: 'success',
                animationIn: this.animationIn,
                animationOut: this.animationOut,
                withIcon: this.withIcon,
                alert: this.alert,
                hideOnClick: this.hideOnClick,
                hideOnCloseButton: this.hideOnCloseButton,
                ...(_notification || {}),
            };

            if (!notification.hideAfter) {
                notification.hideAfter = this.hideAfter[notification.type];
            }

            if (arguments.length > 1) {
                notification.args = [];

                for (let i = 1, len = arguments.length; i < len; i++) {
                    notification.args.push(arguments[i]);
                }
            }

            if (strategy === 'newest-first') {
                notifications.unshift(notification);
            } else if (strategy === 'single') {
                this.notifications = [notification];
            } else {
                notifications.push(notification);
            }

            return id;
        },

        /**
         * @param  {Object}_notification
         * @param {string} _messageId
         * @return {boolean}
         */
        update(_notification, _messageId) {
            const index = this.getNotificationIdxById(_messageId);
            let updated = false;

            if (index > -1) {
                const args = [];

                if (arguments.length > 2) {
                    for (let i = 2, len = arguments.length; i < len; i++) {
                        args.push(arguments[i]);
                    }
                }

                this.notifications[index] = {
                    ..._notification,
                    args: args.length > 0 ? args : this.notifications[index].args,
                };

                updated = true;
            }

            return updated;
        },

        addNotification(_data) {
            if (_data.group === this.group) {
                _data._msgId = this.add(_data.notification);
            }
        },

        hideNotification(_data) {
            const { msg } = this.$refs;

            if (_data.group === this.group && _data.msgId && msg) {
                msg.forEach((msg) => {
                    if (msg.id === _data.msgId) {
                        msg.hide();
                    }
                });
            }
        },

        updateNotification(_data) {
            if (_data.group === this.group && _data.msgId && _data.notification) {
                this.update(_data.notification, _data.msgId);
            }
        },

        getNotificationIdxById(_id) {
            return this.notifications.findIndex((_notification) => _id === _notification.id);
        },

        onMessageHidden(_messageId) {
            const index = this.getNotificationIdxById(_messageId);

            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        },
    },

    /**
     * @param {Object} notification
     * @return {Promise<*>}
     */
    addNotification(notification) {
        return callAndWait(() => {
            notificationsState.value.addNotification = notification;
        });
    },

    /**
     * @param {string} msgId Message id
     * @param {string} [group] Notification group
     * @return {Promise<*>}
     */
    hideNotification(msgId = '', group = '') {
        return callAndWait(() => {
            notificationsState.value.hideNotification = { msgId, group };
        });
    },

    /**
     * @param {Object} notification
     * @param {string} msgId Message id
     * @param {string} [group] Notification group
     * @return {Promise<*>}
     */
    updateNotification(notification, msgId = '', group = '') {
        return callAndWait(() => {
            notificationsState.value.updateNotification = { notification, msgId, group };
        });
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
