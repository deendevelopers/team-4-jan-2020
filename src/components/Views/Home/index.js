import preact from 'preact';
import BaseViewComponent from '../../BaseViewComponent';
import Useful from '../../../helpers/Useful';
import Toolbar from '../../Toolbar';
import NavBar from '../../NavBar';
import List from '../../List';
import './style.scss';

export default class Home extends BaseViewComponent {
    constructor() {
        super();

        this.state = {
            id: 'home',
            title: 'Home',
            view: 'Home',
            backable: false,
            slidable: false,
            rightBtn: {
                id: 'Settings',
                icon: 'settings'
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
            <div id={id} className="home view view--bars">
                <Toolbar title={title} rightBtn={rightBtn} />
                <div className="view__container">
                    <div className="home__wrapper py-5 px-4">
                        <h1 className="home__title m-0">
                            <span className="text-uppercase d-block mb-2">Welcome to</span>
                            <span className="d-block">
                                <span>Ilm</span>
                                <span className="text-primary">Events</span>
                            </span>
                        </h1>
                    </div>
                    <div className="home__events">
                        <h2 className="home__subtitle h5 text-uppercase text-gray-500 mb-3 mx-4">Your events</h2>
                        <List items={events} />
                    </div>
                    <div className="home__events my-5">
                        <h2 className="home__subtitle h5 text-uppercase text-gray-500 mb-3 mx-4">Local events</h2>
                        <List items={events} />
                    </div>
                    <div className="home__events mt-5 mb-7">
                        <h2 className="home__subtitle h5 text-uppercase text-gray-500 mb-3 mx-4">Latest events</h2>
                        <List items={events} />
                    </div>
                </div>
                <NavBar selected="home" />
            </div>
        );
    }
}
