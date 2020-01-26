import axios from 'axios';
import ViewService from './ViewService';
import GlobalsService from './GlobalsService';
import PushService from './PushService';
import Storage from '../helpers/Storage';
import Useful from '../helpers/Useful';

/**
 * Handles functionality for user functions
 */
class UserService {
    /**
     * Handles the functionality of when login is successful
     * @param  {object} response The response from the server
     * @return void
     */
    loginSuccess(response) {
        GlobalsService.set('accessToken', response.data.accessToken);
        GlobalsService.set('user', response.data.user);
        GlobalsService.set('loggedIn', true);
        Storage.set('rememberToken', response.data.rememberToken);
        Storage.set('username', response.data.user.username);
        ViewService.open('Home');
        PushService.init();
    }

    /**
     * Logs user out
     * @param  {boolean} showConfirm Display the confirm message
     * @return void
     */
    logout(showConfirm = true) {
        const logoutFn = () => {
            PushService.register(false);
            Storage.remove('rememberToken');
            Storage.remove('username');
            window.location.reload();
        };

        if (showConfirm) {
            Useful.confirm('Are you sure you want to log out?', 'Log out', [
                'Yes',
                'No'
            ], (cb) => {
                if (cb === 1) {
                    logoutFn();
                }
            });
        } else {
            logoutFn();
        }
    }

    /**
     * Logs the user in using the refresh token
     * @return void
     */
    refreshLogin() {
        const token = Storage.get('rememberToken');
        const username = Storage.get('username');

        if (token && username) {
            const endpoint = GlobalsService.get('endpoint');
            const action = `${endpoint}/remember`;

            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            axios({
                method: 'post',
                url: action,
                data: Useful.serialize({ username, token })
            })
                .then((response) => {
                    if (response.data.status == 200) {
                        this.loginSuccess(response.data);
                    }
                })
                .catch((error) => {
                    ViewService.open('Onboarding');
                    console.warn(error);
                });
        } else {
            ViewService.open('Onboarding');
        }
    }
}

export default new UserService();
