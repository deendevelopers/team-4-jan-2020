import preact from 'preact';
import BaseViewComponent from '../../BaseViewComponent';
import ViewService from '../../../services/ViewService';
import Toolbar from '../../Toolbar';
import Form from '../../Form';

export default class Profile extends BaseViewComponent {
    constructor() {
        super();

        this.state = {
            id: 'profile',
            title: 'Profile',
            view: 'Profile',
            backable: true,
            slidable: false,
            leftBtn: {
                id: 'profile',
                icon: 'chevron-left',
                back: true
            },
            rightBtn: {
                icon: 'save',
                callback() {
                    ViewService.goBack('profile');
                }
            }
        };

        // The form fields

        this.fields = [
            {
                name: 'f_email',
                type: 'email',
                label: 'Email',
                placeholder: 'jane.doe@email.com',
                value: 'adam.sheikh@gmail.com'
            },
            {
                name: 'f_first_name',
                type: 'text',
                label: 'First name',
                placeholder: 'Jane',
                value: 'Adam'
            },
            {
                name: 'f_last_name',
                type: 'text',
                label: 'Last name',
                placeholder: 'Doe',
                value: 'Sheikh'
            }
        ];
    }

    render(props, { id, title, leftBtn, rightBtn }) {
        return (
            <div id={id} className="profile view back view--toolbar">
                <Toolbar title={title} leftBtn={leftBtn} rightBtn={rightBtn} />
                <div className="view__container">
                    <Form action="/profile" method="PUT" fields={this.fields} auth />
                </div>
            </div>
        );
    }
}
