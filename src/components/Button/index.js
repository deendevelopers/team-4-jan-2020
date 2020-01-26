import preact from 'preact';
import './style.scss';

export default class Button extends preact.Component {
    constructor() {
        super();

        this.blurButton = this.blurButton.bind(this);
    }

    /**
     * Blur the button after clicking on it to see the original state
     * @param  {object} e The event
     * @return void
     */
    blurButton(e) {
        setTimeout(() => {
            e.target.blur();
        }, 250);
    }

    /**
     * Generates the jsx button based on the el prop
     * @return {jsx} The button
     */
    generateButton() {
        const { type, el, color, href, label, shadow, elStyle, classNames } = this.props;
        const classes = ['button', `button--${color}`];
        let { onClick } = this.props;

        // Add classes if set

        if (typeof classNames !== 'undefined') {
            classNames.split(' ').forEach((cls) => {
                classes.push(cls);
            });
        }

        // If onClick isn't a function then pass empty function

        if (!onClick) {
            onClick = () => {};
        }

        // Add shadow to the button if set

        if (shadow) {
            classes.push('button--shadow');
        }

        // Add button style

        classes.push(`button--${elStyle}`);

        // Generate the buttons based on element type

        if (el == 'button') {
            return (
                <button
                    className={classes.join(' ')}
                    type={type}
                    onClick={(e) => { e.preventDefault(); onClick(); this.blurButton(e); }}
                >{ label }</button>
            );
        } else if (el == 'anchor') {
            classes.push('button--link');

            return (
                <a
                    className={classes.join(' ')}
                    href={href}
                    onClick={(e) => { e.preventDefault(); onClick(); this.blurButton(e); }}
                >{ label }</a>
            );
        }

        return '';
    }

    render() {
        return this.generateButton();
    }
}
