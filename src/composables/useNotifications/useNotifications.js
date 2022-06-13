import { Notifications } from '../../plugins/notifications.js';

export function useNotifications() {
    const notifications = new Notifications();

    return {
        notifications,
    };
}
