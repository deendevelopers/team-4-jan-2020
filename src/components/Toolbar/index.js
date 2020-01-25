import preact from 'preact';
import ViewService from '../../services/ViewService';
import Icon from '../Icon';
import './style.scss';

export default class Toolbar extends preact.Component {
    constructor() {
        super();

        this.state = {
            menuOpen: false
        };
    }

    /**
     * Display toolbar button
     * @param  {str} direction The button side to display
     * @return {jsx}           The button
     */
    toolbarBtn(direction) {
        if (this.props[`${direction}Btn`] && 'icon' in this.props[`${direction}Btn`]) {
            const btnProps = this.props[`${direction}Btn`];
            const btnFn = () => {
                if ('back' in btnProps) {
                    ViewService.goBack(btnProps.id);
                } else if ('slide' in btnProps) {
                    ViewService.goBack(btnProps.id, 'slid');
                } else if ('callback' in btnProps) {
                    btnProps.callback();
                } else {
                    ViewService.open(btnProps.id);
                }
            };

            if ('menu' in btnProps) {
                return (
                    <div className="toolbar__container">
                        <a onClick={() => this.toolbarToggleMenu()}><Icon name={btnProps.icon} /></a>
                        <ul className={`toolbar__menu${(this.state.menuOpen) ? ' toolbar__menu--open' : ''}`}>
                            {btnProps.menu.map(menuItem => (
                                <li><a onClick={() => this.toolbarMenuAction(menuItem.callback)}>{ menuItem.title }</a></li>
                            ))}
                        </ul>
                    </div>
                );
            }

            return (
                <a onClick={() => btnFn()}><Icon name={btnProps.icon} /></a>
            );
        }

        return '';
    }

    /**
     * Toggle the menu
     * @return void
     */
    toolbarToggleMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }

    /**
     * Call the menu item callback and close the menu
     * @param  {Function} cb The callback function
     * @return void
     */
    toolbarMenuAction(cb) {
        cb();
        this.setState({
            menuOpen: false
        });
    }

    /**
     * Handles the display of the toolbar title
     * @return {jsx|str} The title or logo
     */
    toolbarTitle() {
        const { title } = this.props;

        if (title == 'logo') {
            return (
                <Icon name="logo" />
            );
        }

        return title;
    }

    render({ title, border }) {
        const classes = ['toolbar'];

        if (typeof border !== 'undefined') {
            classes.push(`${classes[0]}--border`);
        }

        return (
            <section className={classes.join(' ')}>
                <div className="toolbar__left">{ this.toolbarBtn('left') }</div>
                <div className={`toolbar__middle ${((title == 'logo') ? 'toolbar__middle--logo' : '')}`}><span>{ this.toolbarTitle() }</span></div>
                <div className="toolbar__right">{ this.toolbarBtn('right') }</div>
            </section>
        );
    }
}
