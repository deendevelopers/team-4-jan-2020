import preact from 'preact';
import BaseViewComponent from '../../BaseViewComponent';
import ViewService from '../../../services/ViewService';
import Toolbar from '../../Toolbar';
import NavBar from '../../NavBar';
import './style.scss';
import Icon from '../../Icon';
import List from '../../List';

export default class Organiser extends BaseViewComponent {
    constructor() {
        super();

        this.state = {
            id: 'organiser',
            title: 'Organiser',
            view: 'Organiser',
            backable: false,
            slidable: false,
            leftBtn: {
                id: 'organiser',
                icon: 'chevron-left',
                back: true
            },
            organiserDetails: {
                name: 'Muslimac Makers',
                description: 'A meetup bringing Muslim and non-Muslim makers together to discuss, pitch and share ideas',
                contact: 'https://muslamicmakers.com'
            },
            following: false,
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
    }


    follow() {
        this.setState({ following : !this.state.following });
    }


    render(props, { id, title, organiserDetails, leftBtn, following, events}) {
        return (
            <div id={id} className="event-page view view--bars">
                <Toolbar title={title} leftBtn={leftBtn} />

                <div className="view__container">

                    <div className="organiser-page">

                        <h1 className="home__subtitle h2 text-uppercase text-primary mb-3 mx-4">{organiserDetails.name}</h1>
                        <button onClick={() => this.follow()}  type="button" className="btn btn-primary event-page__follow-organisation">{ following ? 'Follow ' : 'Following ' }
                            <Icon className="event-page__follow-icon" name={following ? "user-plus" : "user"} />
                        </button>
                        <h2 className="home__subtitle h5 mb-3 mx-4 organiser-page__description">{organiserDetails.description}</h2>

                        <div className="organiser-page__contact">
                            <span className="organiser-page__contact-icon"><Icon name="mail" /></span>
                            <span className="organiser-page__contact-icon"><Icon name="phone" /></span>
                            <span className="organiser-page__contact-icon"><Icon name="globe" /></span>
                        </div>


                        <div className="home__events my-5">
                            <h2 className="home__subtitle h5 text-uppercase text-gray-500 mb-3 mx-4">Upcoming events</h2>
                            <List items={events} onClick={this.navigateToEventPage} />
                        </div>

                    </div>



                </div>

            </div>
        );
    }
}
