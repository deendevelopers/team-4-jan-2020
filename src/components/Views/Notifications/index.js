import preact from 'preact';
import BaseViewComponent from '../../BaseViewComponent';
import Useful from '../../../helpers/Useful';
import Toolbar from '../../Toolbar';
import NavBar from '../../NavBar';
import List from '../../List';
import './style.scss';

export default class Notifications extends BaseViewComponent {
    constructor() {
        super();

        this.state = {
            id: 'notifications',
            title: 'Notifications',
            view: 'Notifications',
            backable: false,
            slidable: false,
            rightBtn: {
                icon: 'check-square',
                callback() {
                    console.log('This will mark all as read');
                }
            },
            events: [
                {
                    thumb: 'https://via.placeholder.com/150',
                    title: 'Understanding Hadith and Fiqh',
                    location: 'London',
                    date: 'Thu 31st Dec - 1pm'
                },
                {
                    thumb: 'https://via.placeholder.com/150',
                    title: 'The Fiqh of Salaah and Ibaadah',
                    location: 'Birmingham',
                    date: 'Mon 13th Feb - 12noon'
                },
                {
                    thumb: 'https://via.placeholder.com/150',
                    title: 'A Deep Dive into Business in Islam',
                    location: 'West London',
                    date: 'Tue 7th Jan - 1pm - 5pm'
                }
            ]
        };

        // Hide loader

        Useful.loading('hide');
    }

    render(props, { id, title, rightBtn, events }) {
        return (
            <div id={id} className="notifications view view--bars">
                <Toolbar title={title} rightBtn={rightBtn} />
                <div className="view__container">
                    <div className="notifications__items">
                        <List items={events} />
                    </div>
                </div>
                <NavBar />
            </div>
        );
    }
}
