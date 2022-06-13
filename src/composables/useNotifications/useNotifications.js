import { Notifications } from '../../plugins/notifications.js';

const notifications = new Notifications();

export function useNotifications() {
    return {
        notifications,
    };
}
