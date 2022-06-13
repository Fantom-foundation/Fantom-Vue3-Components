import { describe, it, expect } from 'vitest';
import { withSetup } from '../../test/utils.js';
import { useNotifications } from './useNotifications.js';
import { Notifications } from '../../plugins/notifications.js';

describe('useNotifications', () => {
    it('should return instance of Interval class', () => {
        const { composableResult, app } = withSetup({ composable: useNotifications });

        expect(composableResult.notifications instanceof Notifications).toBe(true);

        app.unmount();
    });
});
