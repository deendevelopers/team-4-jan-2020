import preact from 'preact';
import BaseViewComponent from '../../BaseViewComponent';
import Toolbar from '../../Toolbar';
import NavBar from '../../NavBar';
import './style.scss';

export default class Settings extends BaseViewComponent {
    constructor() {
        super();

        this.state = {
            id: 'settings',
            title: 'Settings',
            view: 'Settings',
            backable: true,
            slidable: true,
            leftBtn: {
                id: 'settings',
                icon: 'chevron-down',
                slide: true
            },
        };
    }

    render(props, { id, title, leftBtn }) {
        return (
            <div id={id} className="settings back view view--bars">
                <Toolbar title={title} leftBtn={leftBtn} />
                <div className="view__container">
                    <h1 className="settings__title">Hello settings!</h1>
                </div>
                <NavBar selected={id} />
            </div>
        );
    }
}
