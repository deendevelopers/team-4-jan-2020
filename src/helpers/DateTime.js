export default class DateTime {
    /**
     * Add zeroes to the beginning of the hours/minutes
     * @param  {int}   dt The time (hour or minute)
     * @return {mixed}  The formatted time
     */
    formatZeroTime(dt) {
        const dateTime = parseInt(dt, 10);

        if (dateTime === 0) {
            return '00';
        } else if (dateTime < 10) {
            return `0${dateTime}`;
        }

        return dateTime;
    }
}
