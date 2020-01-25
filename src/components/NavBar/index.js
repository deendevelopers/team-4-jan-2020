import preact from 'preact';
import ViewService from '../../services/ViewService';
import Icon from '../Icon';
import './style.scss';

export default class NavBar extends preact.Component {
    render({ selected }) {
        return (
            <nav className="navbar">
                <ul>
                    <li className={`view-home${(selected == 'home') ? ' is-selected' : ''}`}>
                        <a onClick={() => ViewService.open('Home')}><Icon name="home" /></a>
                    </li>
                    <li className={`view-profile${(selected == 'profile') ? ' is-selected' : ''}`}>
                        <a onClick={() => ViewService.open('Profile')}><Icon name="user" /></a>
                    </li>
                </ul>
            </nav>
        );
    }
}
