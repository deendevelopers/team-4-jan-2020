import preact from 'preact';
import $ from 'cash-dom';
import BaseViewComponent from '../../BaseViewComponent';
import Useful from '../../../helpers/Useful';
import Toolbar from '../../Toolbar';
import NavBar from '../../NavBar';
import List from '../../List';
import './style.scss';
import ViewService from '../../../services/ViewService';

export default class Notifications extends BaseViewComponent {
    constructor() {
        super();

        const self = this;

        this.state = {
            id: 'notifications',
            title: 'Notifications',
            view: 'Notifications',
            backable: false,
            slidable: false,
            rightBtn: {
                icon: 'check-square',
                callback() {
                    const newEvents = [];
                    $.each(self.state.events, (i, event) => {
                        const eventItem = event;
                        eventItem.unread = false;
                        newEvents.push(eventItem);
                    });
                    self.setState({
                        events: newEvents
                    });
                }
            },
            events: [
                {
                    thumb: 'https://via.placeholder.com/150',
                    title: 'Understanding Hadith and Fiqh',
                    location: 'London',
                    date: 'Thu 31st Dec - 1pm',
                    unread: true
                },
                {
                    thumb: 'https://via.placeholder.com/150',
                    title: 'The Fiqh of Salaah and Ibaadah',
                    location: 'Birmingham',
                    date: 'Mon 13th Feb - 12noon',
                    unread: false
                },
                {
                    thumb: 'https://via.placeholder.com/150',
                    title: 'A Deep Dive into Business in Islam',
                    location: 'West London',
                    date: 'Tue 7th Jan - 1pm - 5pm',
                    unread: true
                }
            ]
        };

        // Hide loader

        Useful.loading('hide');
    }

    navigateToEventPage() {
        ViewService.open('Event');
    }

    render(props, { id, title, rightBtn, events }) {
        return (
            <div id={id} className="notifications view view--bars">
                <Toolbar title={title} rightBtn={rightBtn} />
                <div className="view__container">
                    <div className="notifications__items">
                        <List items={events} onClick={this.navigateToEventPage} />
                    </div>
                </div>
                <NavBar selected={id} />
            </div>
        );
    }
}
