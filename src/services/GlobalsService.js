
/**
 * Handles functionality for global values
 */
class GlobalsService {
    /**
     * Get a global value
     * @param  {str}   key The global key
     * @return {mixed}     The global value
     */
    get(key = '') {
        let ret = '';

        if (key !== '') {
            ret = window.appGlobals[key];
        } else {
            ret = window.appGlobals;
        }

        return ret;
    }

    /**
     * Set the global value
     * @param {str}   key   The global key
     * @param {mixed} value The value to set
     */
    set(key, value) {
        window.appGlobals[key] = value;
    }

    /**
     * Update the view with it's state
     * @param  {obj} settings The view state/settings
     * @return void
     */
    updateViewState(settings) {
        const viewState = this.get('viewState');

        viewState[settings.id] = settings;
        this.set('viewState', viewState);
    }
}

export default new GlobalsService();
