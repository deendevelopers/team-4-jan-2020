import preact from 'preact';
import BaseViewComponent from '../../BaseViewComponent';
import ViewService from '../../../services/ViewService';
import Toolbar from '../../Toolbar';
import NavBar from '../../NavBar';
import './style.scss';

export default class Profile extends BaseViewComponent {
    constructor() {
        super();

        this.state = {
            id: 'profile',
            title: 'Profile',
            view: 'Profile',
            backable: false,
            slidable: false
        };
    }

    render(props, { id, title }) {
        return (
            <div id={id} className="profile view view--bars">
                <Toolbar title={title} />
                <div className="view__container">
                    <h1>Hello user!</h1>
                    <p><a onClick={() => ViewService.open('Settings')}>Settings</a></p>
                </div>
                <NavBar selected={id} />
            </div>
        );
    }
}
