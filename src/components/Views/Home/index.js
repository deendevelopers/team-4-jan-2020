import preact from 'preact';
import BaseViewComponent from '../../BaseViewComponent';
import Useful from '../../../helpers/Useful';
import Toolbar from '../../Toolbar';
import NavBar from '../../NavBar';
import List from '../../List';
import './style.scss';
import ViewService from '../../../services/ViewService';

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
            leftBtn: {
                id: 'Map',
                icon: 'map'
            },
            events: [
                {
                    thumb: 'https://picsum.photos/200?random=1',
                    title: 'Understanding Hadith and Fiqh',
                    location: 'London',
                    date: 'Thu 31st Dec - 1pm',
                    meetup: true
                },
                {
                    thumb: 'https://picsum.photos/200?random=2',
                    title: 'The Fiqh of Salaah and Ibaadah',
                    location: 'Birmingham',
                    date: 'Mon 13th Feb - 12noon',
                    meetup: true
                },
                {
                    thumb: 'https://picsum.photos/200?random=3',
                    title: 'A Deep Dive into Business in Islam',
                    location: 'West London',
                    date: 'Tue 7th Jan - 1pm - 5pm'
                }
            ]
        };

        // Hide loader

        Useful.loading('hide');
    }
    navigateToEventPage() {
        ViewService.open('Event');
    }

  
    render(props, { id, title, rightBtn, leftBtn, events }) {
        return (
            <div id={id} className="home view view--bars">
                <Toolbar title={title} rightBtn={rightBtn} leftBtn={leftBtn} />
                <div className="view__container">
                    <div className="home__wrapper px-4">
                        <h1 className="home__title text-center m-0">
                            <img className="home__logo" alt="IlmEvents" src={require('./logo.png')} />
                            <span className="d-block">
                                <span>Ilm</span>
                                <span className="text-primary">Events</span>
                            </span>
                        </h1>
                    </div>
                    <div className="home__events">
                        <h2 className="home__subtitle h5 text-uppercase text-gray-500 mb-3 mx-4">Your events</h2>
                        <List items={events} onClick={this.navigateToEventPage} />
                    </div>
                    <div className="home__events my-5">
                        <h2 className="home__subtitle h5 text-uppercase text-gray-500 mb-3 mx-4">Local events</h2>
                        <List items={events} onClick={this.navigateToEventPage} />
                    </div>
                    <div className="home__events mt-5 mb-7">
                        <h2 className="home__subtitle h5 text-uppercase text-gray-500 mb-3 mx-4">Latest events</h2>
                        <List items={events} onClick={this.navigateToEventPage} />
                    </div>
                </div>
                <NavBar selected={id} />
            </div>
        );
    }
}
