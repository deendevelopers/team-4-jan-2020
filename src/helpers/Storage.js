
/**
 * Functions to store data in localStorage
 */
class Storage {
    /**
    * Checks to see if localStorage is available
    * @return {bool} If localStorage available
    */
    available() {
        try {
            const x = '__storage_test__';
            const storage = window.localStorage;

            storage.setItem(x, x);
            storage.removeItem(x);

            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Gets an item from localStorage
     * @param  {str}   key The key to retrieve
     * @return {mixed}     The value if exists
     */
    get(key) {
        if (this.available()) {
            const item = localStorage.getItem(key);

            if (item && item !== '') {
                return item;
            }
        }
        return false;
    }

    /**
     * Removes key from localStorage
     * @param  {string} key The key
     * @return void
     */
    remove(key) {
        localStorage.removeItem(key);
    }

    /**
     * Sets an item to localStorage
     * @param  {str}       key   The key to set
     * @param  {mixed}     value The value to save
     * @param  {int}       time  The time in seconds to store value
     * @param  {boolean}   cache If it should be cached
     * @return {void}
     */
    set(key, value, time = 31536000, cache = false) {
        if (this.available()) {
            const now = (new Date().getTime() / 1000) + time;

            localStorage.setItem(key, value);

            if (cache) {
                localStorage.setItem(`${key}_cache`, now);
            }
        }
    }
}

export default new Storage();
