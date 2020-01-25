export default class Media {
    /**
     * Tests to see if viewport within the specified width
     * @param {int} width The viewport width to Check
     * @return {bool}
     */
    mq(width) {
        const w = window;
        const d = document;
        const e = d.documentElement;
        const g = d.getElementsByTagName('body')[0];
        const x = w.innerWidth || e.clientWidth || g.clientWidth;
        return x <= width;
    }

    /**
     * Creates a hash based on time type
     * @param {str} type The time for the cache string
     * @return {int}     The cache busting string
     */
    cacheBust(type = 'daily') {
        const date = new Date();
        return `${date.getFullYear()}${date.getMonth()}${date.getDate()}${(type === 'hourly') ? date.getHours() : ''}`;
    }
}
