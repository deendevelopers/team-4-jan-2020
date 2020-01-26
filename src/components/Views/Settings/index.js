import preact from 'preact';
import BaseViewComponent from '../../BaseViewComponent';
import UserService from '../../../services/UserService';
import ViewService from '../../../services/ViewService';
import Toolbar from '../../Toolbar';
import Icon from '../../Icon';
import './style.scss';

export default class Settings extends BaseViewComponent {
    constructor() {
        super();

        this.state = {
            id: 'settings',
            title: 'Settings',
            view: 'Settings',
            backable: true,
            slidable: false,
            leftBtn: {
                id: 'settings',
                icon: 'chevron-left',
                back: true
            }
        };

        this.menu = [
            {
                title: 'Profile',
                icon: 'user',
                callback() {
                    ViewService.open('Profile');
                }
            },
            {
                title: 'Password',
                icon: 'lock',
                callback() {
                    ViewService.open('Password');
                }
            }
        ];
    }

    render(props, { id, title, leftBtn }) {
        return (
            <div id={id} className="settings back view view--toolbar">
                <Toolbar title={title} leftBtn={leftBtn} />
                <div className="view__container">
                    <ul className="settings__list">
                        {this.menu.map(menuItem => (
                            <li className="settings__item">
                                <a className="settings__link" onClick={() => menuItem.callback()}>
                                    <span className="settings__title">{ menuItem.title }</span>
                                    <span className="settings__arrow"><Icon name="chevron-right" /></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="settings__version">Version 1.0.0 (2020-01-26)</div>
                </div>
            </div>
        );
    }
}
