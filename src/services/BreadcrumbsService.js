import GlobalsService from './GlobalsService';

/**
 * Handles functionality for navigation breadcrumbs
 */
class BreadcrumbsService {
    /**
     * Gets all the breadcrumbs
     * @return {array} The breadcrumbs
     */
    get() {
        return GlobalsService.get('breadcrumbs');
    }

    /**
     * Adds a new item to the breadcrumbs
     * @param  {str}    id The view ID
     * @return {array}     The breadcrumbs
     */
    add(id) {
        let breadcrumbs = this.get();

        if (breadcrumbs.length == 0 || (breadcrumbs[0] && breadcrumbs[0] !== id)) {
            breadcrumbs.unshift(id);
            breadcrumbs = breadcrumbs.slice(0, 5);
            GlobalsService.set('breadcrumbs', breadcrumbs);
        }

        return breadcrumbs;
    }

    /**
     * Removes the first crumb in the list
     * @return void
     */
    removeFirst() {
        const breadcrumbs = this.get();

        if (breadcrumbs.length) {
            breadcrumbs.shift();
        }

        GlobalsService.set('breadcrumbs', breadcrumbs);
    }
}

export default new BreadcrumbsService();
