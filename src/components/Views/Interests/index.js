import preact from 'preact';
import BaseViewComponent from '../../BaseViewComponent';
import GlobalsService from '../../../services/GlobalsService';
import ViewService from '../../../services/ViewService';
import Toolbar from '../../Toolbar';
import Form from '../../Form';
import './style.scss';

export default class Interests extends BaseViewComponent {
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
                    console.log('This will save the form details');
                }
            }
        };
    }

    render(props, { id, title, leftBtn, rightBtn }) {
        return (
            <div id={id} className="profile view back view--toolbar">
                <Toolbar title={title} leftBtn={leftBtn} rightBtn={rightBtn} />
                <div className="view__container">
                    <Form action="/profile" method="PUT" onSuccess={this.handleSubmit} fields={this.fields} auth />
                </div>
            </div>
        );
    }
}
