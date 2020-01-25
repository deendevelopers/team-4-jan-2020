import preact from 'preact';
import Icon from '../Icon';
import './style.scss';

export default class Loading extends preact.Component {
    render({ block, size, full }) {
        const classes = ['loading'];

        if (block) {
            classes.push(`${classes[0]}--block`);
        }

        if (size) {
            classes.push(`${classes[0]}--${size}`);
        }

        if (full) {
            classes.push(`${classes[0]}--full`);
        }

        return (
            <span className={classes.join(' ')}>
                <Icon name="loader" />
            </span>
        );
    }
}
