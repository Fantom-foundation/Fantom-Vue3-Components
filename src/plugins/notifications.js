import FNotifications from '../components/FNotifications/FNotifications.vue';

export let notifications = null;

export class Notifications {
    static install(app) {
        notifications = new Notifications();
        app.config.globalProperties.$notifications = notifications;
    }

    /**
     * Add notification
     *
     * @param {object} _notification
     * @param {string} [_group] Notification group
     */
    async add(_notification, _group = '') {
        const data = {
            notification: _notification,
            group: _group,
        };

        await FNotifications.addNotification(data);

        return data._msgId || '';
    }

    /**
     * @param {string} msgId Message id
     * @param {string} [group] Notification group
     */
    async hide(msgId = '', group = '') {
        if (msgId) {
            await FNotifications.hideNotification(msgId, group);
        }
    }
}
