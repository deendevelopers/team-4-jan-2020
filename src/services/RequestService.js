import axios from 'axios';
import GlobalsService from './GlobalsService';
import Useful from '../helpers/Useful';

/**
 * Handles functionality for request/ajax functions
 */
export default class RequestService {
    /**
     * Sends a request with callbacks
     * @param  {string}  method          The request method
     * @param  {string}  endpoint        The endpoint
     * @param  {mixed}   data            The post data
     * @param  {mixed}   successCallback The success function
     * @param  {mixed}   errorCallback   The error function
     * @param  {boolean} auth            Enable authorization header
     * @param  {string}  version         The api version
     * @return void
     */
    constructor(method, endpoint, data = false, successCallback = false, errorCallback = false, auth = false, version = '') {
        const url = GlobalsService.get('endpoint');
        let action = `${url}${endpoint}`;

        if (version !== '') {
            action = action.replace('/v1/', `/v${version}/`);
        }

        const options = {
            url: action,
            method
        };

        if ((method == 'POST' || method == 'PUT') && data) {
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            options.data = Useful.serialize(data);
        } else if (method == 'GET' && data) {
            options.params = data;
        }

        if (auth) {
            const accessToken = GlobalsService.get('accessToken');

            if (accessToken && accessToken.length) {
                options.headers = {
                    Authorization: `Bearer ${accessToken}`
                };
            }
        }

        axios(options)
            .then((response) => {
                if (successCallback) {
                    successCallback(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
                if ('exitCode' in error.response.data) {
                    window.location.reload();
                    return;
                }

                if (errorCallback) {
                    errorCallback(error.response.data);
                }
            });
    }
}
