import preact from 'preact';
import BaseViewComponent from '../../BaseViewComponent';
import ViewService from '../../../services/ViewService';
import Toolbar from '../../Toolbar';
import Form from '../../Form';

export default class Password extends BaseViewComponent {
    constructor() {
        super();

        this.state = {
            id: 'password',
            title: 'Password',
            view: 'Password',
            backable: true,
            slidable: false,
            leftBtn: {
                id: 'password',
                icon: 'chevron-left',
                back: true
            },
            rightBtn: {
                icon: 'save',
                callback() {
                    ViewService.goBack('password');
                }
            }
        };

        // The form fields

        this.fields = [
            {
                name: 'f_current_password',
                type: 'password',
                label: 'Current password'
            },
            {
                name: 'f_new_password',
                type: 'password',
                label: 'New password',
                description: 'Minimum 8 characters long'
            },
            {
                name: 'f_confirm_password',
                type: 'password',
                label: 'Confirm password'
            }
        ];
    }

    render(props, { id, title, leftBtn, rightBtn }) {
        return (
            <div id={id} className="password view back view--toolbar">
                <Toolbar title={title} leftBtn={leftBtn} rightBtn={rightBtn} />
                <div className="view__container">
                    <Form action="/password" method="PUT" fields={this.fields} auth />
                </div>
            </div>
        );
    }
}
