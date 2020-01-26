import preact from 'preact';
import $ from 'cash-dom';
import BaseViewComponent from '../../BaseViewComponent';
import ViewService from '../../../services/ViewService';
import Toolbar from '../../Toolbar';
import Form from '../../Form';
import Icon from '../../Icon';
import './style.scss';

export default class Interests extends BaseViewComponent {
    constructor() {
        super();

        this.state = {
            id: 'interests',
            title: 'Interests',
            view: 'Interests',
            backable: true,
            slidable: false,
            leftBtn: {
                id: 'interests',
                icon: 'chevron-left',
                back: true
            },
            rightBtn: {
                icon: 'save',
                callback() {
                    ViewService.goBack();
                }
            },
            interests: [
                {
                    title: 'Halaqa'
                },
                {
                    title: 'Aarabic Tajweed'
                },
                {
                    title: 'Fiqh and Hadith'
                }
            ]
        };

        // The form fields

        this.fields = [
            {
                name: 'search',
                type: 'text',
                label: 'Search for interests',
                placeholder: 'e.g. Arabic, Halaqa...'
            }
        ];
    }

    /**
     * Removes interest
     * @param  {object} interest The interest object
     * @return void
     */
    removeInterest(interest) {
        const newInterests = [];
        $.each(this.state.interests, (i, interestItem) => {
            if (interest !== interestItem) {
                newInterests.push(interestItem);
            }
        });
        this.setState({ interests: newInterests });
    }

    render(props, { id, title, leftBtn, rightBtn, interests }) {
        return (
            <div id={id} className="interests view back view--toolbar">
                <Toolbar title={title} leftBtn={leftBtn} rightBtn={rightBtn} />
                <div className="view__container">
                    <div className="interests__form">
                        <Form action="/password" method="PUT" fields={this.fields} auth />
                        <ul className="interests__mine list-unstyled px-4">
                            {interests.map(interest => (
                                <li className="rounded d-flex justify-content-between py-3 px-4 mb-2">
                                    <strong className="mr-2">{ interest.title }</strong>
                                    <a onClick={() => this.removeInterest(interest)}><Icon name="x" /></a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
