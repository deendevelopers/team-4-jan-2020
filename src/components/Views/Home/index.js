import preact from 'preact';
import BaseViewComponent from '../../BaseViewComponent';
import Useful from '../../../helpers/Useful';
import Toolbar from '../../Toolbar';
import NavBar from '../../NavBar';
import './style.scss';

export default class Home extends BaseViewComponent {
    constructor() {
        super();

        this.state = {
            id: 'home',
            title: 'Home',
            view: 'Home',
            backable: false,
            slidable: false
        };

        Useful.loading('hide');
    }

    render(props, { id, title }) {
        return (
            <div id={id} className="home view view--bars">
                <Toolbar title={title} />
                <div className="view__container">
                    <h1 className="home__title">Hello world!</h1>
                </div>
                <NavBar selected={id} />
            </div>
        );
    }
}
