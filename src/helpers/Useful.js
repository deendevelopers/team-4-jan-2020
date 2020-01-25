import GlobalsService from '../services/GlobalsService';

/**
 * Contains useful functions
 */
class Useful {
    /**
     * Serializes an object
     * @param  {object} obj The object
     * @return {string}     The serialized string
     */
    serialize(obj) {
        const str = [];

        Object.keys(obj).forEach((p) => {
            if (Object.prototype.hasOwnProperty.call(obj, p)) {
                str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
            }
        });

        return str.join('&');
    }

    /**
     * Displays dialog or alert
     * @param  {string}  message  The alert message
     * @param  {string}  title    The title
     * @param  {string}  label    The button label
     * @param  {boolean} callback The callback
     * @return void
     */
    alert(message, title = '', label = 'Done', callback = false) {
        let cb = callback;

        if (!cb) {
            cb = () => {};
        }

        if ('notification' in navigator) {
            navigator.notification.alert(
                message,
                cb,
                title,
                label
            );
        } else {
            alert(message);
        }
    }

    /**
     * Sets the transform value
     * @param {object} element The element
     * @param {string} value   The transform value
     */
    setTransform(element, value) {
        const el = element;

        el.style.webkitTransform = value;
        el.style.MozTransform = value;
        el.style.msTransform = value;
        el.style.OTransform = value;
        el.style.transform = value;
    }

    /**
     * Displays confirm dialog
     * @param  {string}  message      The message
     * @param  {string}  title        The title
     * @param  {array}   buttonLabels The button labels
     * @param  {boolean} callback     The callback
     * @return void
     */
    confirm(message, title = '', buttonLabels = [], callback = false) {
        if ('notification' in navigator) {
            navigator.notification.confirm(
                message,
                callback,
                title,
                buttonLabels
            );
        } else if (confirm(message) && callback) {
            callback(1);
        } else if (callback) {
            callback(2);
        }
    }

    /**
     * Displays prompt dialog
     * @param  {string}  message      The message
     * @param  {string}  title        The title
     * @param  {array}   buttonLabels The button labels
     * @param  {string}  defaultText  The default input text
     * @param  {boolean} callback     The callback
     * @return void
     */
    prompt(message, title = '', buttonLabels = [], defaultText = '', callback = false) {
        if ('notification' in navigator) {
            navigator.notification.prompt(
                message,
                (results) => {
                    if (callback) {
                        callback(results.buttonIndex, results.input1);
                    }
                },
                title,
                buttonLabels,
                defaultText
            );
        } else {
            const dialog = prompt(message);

            if (dialog && callback) {
                callback(0, dialog);
            }
        }
    }

    /**
     * Creates the correct endpoint URL
     * @param  {string} path The endpoint path
     * @return {string}      The full endpoint URL
     */
    endpoint(path) {
        return `${GlobalsService.get('endpoint')}${path}`;
    }

    /**
     * Displays/hides loading overlay
     * @param  {string} action The action to take
     * @return void
     */
    loading(action) {
        const el = document.getElementById('global-loading');
        const activeClass = 'is-active';

        if (action == 'show') {
            el.classList.add(activeClass);
        } else if (action == 'hide') {
            el.classList.remove(activeClass);
        }
    }

    /**
     * Check if the var is an array
     * @param  {array}  arr The array to check
     * @return {boolean}    If it's an array
     */
    isArray(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    }

    /**
     * Handles the auto expanding of the textarea
     * @param  {obj} e The event handler
     * @return void
     */
    textareaResize(e) {
        const el = e.target;
        const data = 'data-height';
        let chatFormOrigTAHeight = parseInt(e.target.getAttribute(data), 10);

        if (chatFormOrigTAHeight == 0) {
            chatFormOrigTAHeight = e.target.setAttribute(data, el.offsetHeight);
        }

        setTimeout(() => {
            el.style.height = `${chatFormOrigTAHeight}px`;
            el.style.height = `${el.scrollHeight}px`;
        }, 0);
    }

    /**
     * Shrink or unshrink keyboard size
     * @param  {boolean} value To shrink or not to shrink
     * @return void
     */
    keyboardShrink(value) {
        if (typeof Keyboard !== 'undefined') {
            Keyboard.shrinkView(value);
        }
    }
}

export default new Useful();
