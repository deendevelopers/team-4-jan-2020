import preact from 'preact';
import BaseViewComponent from '../../BaseViewComponent';
import ViewService from '../../../services/ViewService';
import Toolbar from '../../Toolbar';
import NavBar from '../../NavBar';
import './style.scss';
import Icon from '../../Icon';

export default class Event extends BaseViewComponent {
    constructor() {
        super();

        this.state = {
            id: 'profile',
            title: 'Profile',
            view: 'Profile',
            backable: false,
            slidable: false,
            eventDetails: {
                name: 'Hackathon',
                organiser: 'Muslamic Makers',
                dateStart: '2020-01-25',
                dateFinish: '2020-01-25',
                timeStart: '09:00',
                timeFinish: '18:00',
                posterUrl: 'https://i.imgur.com/r56wn2l.png',
                description: 'Muslamic Makers & Deen Developers invite you to a weekend to use your skills for good and bring Islamic education into the 21st Century with technology.',
                attendees: ['UserA', 'UserB', 'UserC', 'UserD'],
                discussion: [
                    { user: 'UserA', message: 'Is there a prayer space available?' },
                    { user: 'UserB', message: 'How much is parking?' }
                ],
                tags: ['men', 'women']
            }

        };
    }

    render(props, { id, title, eventDetails}) {
        console.log('EVENT D', eventDetails)
        return (
            <div id={id} className="event-page view view--bars">
                <Toolbar title={eventDetails.name} />

                <div className="view__container">
                    <div>

                        <div>
                            <span>{eventDetails.organiser}</span>
                            <span>FOLLOW</span><Icon name="user-plus" />
                        </div>

                        <div className="event-page__poster-container">
                        <img className="event-page__poster" src={eventDetails.posterUrl} alt="poster"/>
                        </div>

                        <div className='event-page__description'>
                            {eventDetails.description}
                        </div>

                        <div className='event-page__core-details'>
                            <span>Date: </span>
                            <span>{eventDetails.dateStart}</span>
                        </div>

                        <div className='event-page__core-details'>
                            <span>Time: </span>
                            <span>{eventDetails.timeStart} - {eventDetails.timeFinish}</span>
                        </div>



                        <div className='event-page__attendees'>
                            <div><u>Attendees (54):</u></div>
                            {eventDetails.attendees.map(userName => (
                                <div>
                                    <Icon name="user" />
                                    <span>{userName}</span>
                                </div>
                            ))}
                            <div>... <i><u>(see all)</u></i></div>
                            <div>IM ATTENDING btn</div>
                        </div>




                        <div className='event-page__discussion'>
                            <span><u>Join the discussion...</u></span>
                            {eventDetails.discussion.map(comment => (
                                <div className='event-page__comment'>
                                    <span><b>{comment.user}</b>: </span>
                                    <span>{comment.message}</span>
                                </div>
                            ))}

                            <input placeholder="type a message here"></input>

                        </div>

                    </div>
                </div>
                <NavBar selected={id} />
            </div>
        );
    }
}
