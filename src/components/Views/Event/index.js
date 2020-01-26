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
            id: 'event',
            title: 'Event',
            view: 'Event',
            backable: false,
            slidable: false,
            eventDetails: {
                eventId: 1232,
                name: 'Islamic Education in the 21st Century Hackathon',
                organiser: 'Muslamic Makers',
                dateStart: '2020-01-25',
                dateFinish: '2020-01-25',
                timeStart: '09:00',
                timeFinish: '18:00',
                posterUrl: 'https://i.imgur.com/r56wn2l.png',
                description: 'Muslamic Makers & Deen Developers invite you to a weekend to use your skills for good and bring Islamic education into the 21st Century with technology.',
                attendees: ['Keanu Reeves', 'Morgan Freeman', 'Mo Salah', 'Dave Chapelle'],
                discussion: [
                    { user: 'Donald Trump', message: 'Is there a prayer space available?' },
                    { user: 'BoJo', message: 'How much is parking?' }
                ],
                tags: ['#men', '#women', '#freefood']
            },
            attending: false,
            following: false,
            leftBtn: {
                id: 'event',
                icon: 'chevron-left',
                back: true
            }
        };
    }

     log() {
         this.setState({ attending : !this.state.attending });
    }

    follow() {
        this.setState({ following : !this.state.following });
    }

    keyPressed(event) {
        // console.log('THIS', this.state)

        // if (event.key === "Enter") {
        //     console.log('enter')
        //
        //     this.setState({ eventDetails: {...this.state.eventDetails ] })
        // }
    }

    openOrganiserPage() {
        ViewService.open('Organiser');
    }


    render(props, { id, title, eventDetails, attending, following, leftBtn}) {
        return (
            <div id={id} className="event-page view view--bars">
                <Toolbar title={title} leftBtn={leftBtn} />

                <div className="view__container">
                    <div>

                        <div className="event-page__event-name-header">
                            <span>{eventDetails.name}</span>
                        </div>

                        <div className="event-page__organiser-header">
                            <span onClick={() => this.openOrganiserPage()} className="home__subtitle h5 text-uppercase text-gray-500 mb-3 mx-4"><u>{eventDetails.organiser}</u></span>
                            <button onClick={() => this.follow()}  type="button" className="btn btn-primary event-page__follow-organisation">{ following ? 'Follow ' : 'Following ' }
                            <Icon className="event-page__follow-icon" name={following ? "user-plus" : "user"} />
                            </button>
                        </div>

                        <div className="event-page__poster-container">
                        <img className="event-page__poster" src={eventDetails.posterUrl} alt="poster"/>
                        </div>

                        <div className='event-page__tags-container'>
                            {eventDetails.tags.map(tag => (
                                <button type="button" className="btn btn-outline-success event-page__tag">{tag}</button>
                            ))}
                            <Icon name="share-2" />

                        </div>

                        <div className='event-page__description'>
                            {eventDetails.description}
                        </div>

                        <div className='event-page__core-details'>
                            <span><b>Date:</b> </span>
                            <span>{eventDetails.dateStart}</span>
                        </div>

                        <div className='event-page__core-details'>
                            <span><b>Time:</b> </span>
                            <span>{eventDetails.timeStart} - {eventDetails.timeFinish}</span>
                        </div>

                        {/*<button onClick={() => this.log()} type="button" className="btn btn-outline-primary">*/}
                        <button onClick={() => this.log()} type="button" className={attending ? 'btn btn-outline-primary event-page__attendingBtn' : 'btn btn-outline-warning event-page__attendingBtn'}>
                        {attending ? 'Attending' : 'Not attending'}
                        </button>


                        <div className='event-page__attendees'>
                            <h2 className="home__subtitle h5 text-uppercase text-gray-500 mb-3 mx-4">Attendees (54):</h2>
                            {eventDetails.attendees.length > 0 && eventDetails.attendees.map(userName => (
                                <div>
                                    <Icon name="user" />
                                    <span>{userName}</span>
                                </div>
                            ))}
                            {eventDetails.attendees.length == 0 && <div>No attendees :(</div>}
                            <div>... <i><u>(see all)</u></i></div>
                        </div>




                        <div className='event-page__discussion'>
                            <h2 className="home__subtitle h5 text-uppercase text-gray-500 mb-3 mx-4">Join the discussion...</h2>

                            {eventDetails.discussion.length > 0 &&
                            eventDetails.discussion.map(comment => (
                                <div className='event-page__comment'>
                                    <span><b>{comment.user}</b>: </span>
                                    <span>{comment.message}</span>
                                </div>
                            ))}

                            {eventDetails.discussion.length === 0 &&
                                <div className='event-page__comment'>
                                    No comments
                                </div>
                            }

                            <input className="event-page__input" placeholder="type a message here..."  onKeyPress={() => this.keyPressed()}></input>

                        </div>

                    </div>
                </div>
                <NavBar selected={id} />
            </div>
        );
    }
}
