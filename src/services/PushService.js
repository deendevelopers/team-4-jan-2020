import GlobalsService from './GlobalsService';
import RequestService from './RequestService';

/**
 * Handles functionality for push notifications
 */
class PushService {
    /**
     * Setup push notifications for user
     * @return void
     */
    init() {
        if ('plugins' in window) {
            const user = GlobalsService.get('user');

            window.plugins.OneSignal
                .startInit(GlobalsService.get('osAppId'))
                .handleNotificationReceived((jsonData) => {
                    console.log(JSON.stringify(jsonData));
                })
                .handleNotificationOpened((jsonData) => {
                    console.log(JSON.stringify(jsonData));
                })
                .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.None)
                .endInit();

            setTimeout(() => {
                window.plugins.OneSignal.sendTag('userId', user.id);
            }, 0);
        }
    }

    /**
     * Un/register this user from receiving notifications
     * @param  {boolean} subscribe Register the user or not
     * @return void
     */
    register(subscribe) {
        if ('plugins' in window) {
            const user = GlobalsService.get('user');

            window.plugins.OneSignal.setSubscription(subscribe);
            window.plugins.OneSignal.sendTag('userId', user.id);
        }
    }

    /**
     * Check notifications state
     * @param  {object} cb The callback
     * @return void
     */
    checkState(cb) {
        if ('plugins' in window) {
            window.plugins.OneSignal.getPermissionSubscriptionState(cb);
        }
    }

    /**
     * Sends push notification
     * @param  {integer} messageId  The message ID
     * @return void
     */
    send(messageId) {
        new RequestService('POST', '/push', {
            type: 'message',
            message_id: messageId
        }, () => {
            // console.log(response);
        }, () => {
            // console.warn(response);
        }, true);
    }
}

export default new PushService();
