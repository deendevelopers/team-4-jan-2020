import preact from 'preact';
import BaseViewComponent from '../../BaseViewComponent';
import ViewService from '../../../services/ViewService';
import Toolbar from '../../Toolbar';
import NavBar from '../../NavBar';
import Form from '../../Form';
import './style.scss';

export default class Search extends BaseViewComponent {
    constructor() {
        super();

        this.state = {
            id: 'search',
            title: 'Event Search',
            view: 'Search',
            backable: true,
            slidable: false,
            rightBtn: {
                icon: 'search',
                callback() {
                    ViewService.open('Home');
                }
            }
        };

        // The form fields
        this.fields = [
            {
                name: 'address',
                type: 'text',
                label: 'Address',
                placeholder: 'Road, City, Postcode',
                value: null
            },
            {
                name: 'search_radius',
                type: 'select',
                label: 'Search Radius (miles)',
                placeholder: null,
                options: { 5: '5', 10: '10', 15: '15' }
            },
            {
                name: 'keywords',
                type: 'text',
                label: 'Keywords',
                placeholder: 'Road, City, Postcode',
                value: null
            }

            // {
            //  TODO: extend form service to generate multiple options for checkbox
            //     name: 'interests',
            //     type: 'checkbox',
            //     label: 'Interests',

            // }
        ];
    }

    handleSubmitButtonClick() {
        // redirect to map page
        ViewService.open('Home');
    }

    render(props, { id, title, rightBtn }) {
        return (
            <div id={id} className="view view--bars">
                <Toolbar title={title} rightBtn={rightBtn} />
                <div className="view__container">
                    <Form id="searchForm" action="/home" method="GET" fields={this.fields} />
                    <div id="submit-button" className="form__field form__field--submit">
                        <button onClick={() => this.handleSubmitButtonClick()}className="button button--green button--block" type="submit">Search</button>
                    </div>
                </div>
                <NavBar selected={id} />
            </div>
        );
    }
}
