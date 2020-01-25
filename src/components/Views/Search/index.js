import preact from 'preact';
import BaseViewComponent from '../../BaseViewComponent';
import Toolbar from '../../Toolbar';
import NavBar from '../../NavBar';
import './style.scss';

export default class Search extends BaseViewComponent {
    constructor() {
        super();

        this.state = {
            id: 'search',
            title: 'Search',
            view: 'Search',
            backable: false,
            slidable: false
        };
    }

    render(props, { id, title }) {
        return (
            <div id={id} className="search view view--bars">
                <Toolbar title={title} />
                <div className="view__container">
                    <h1>Search!</h1>
                </div>
                <NavBar selected={id} />
            </div>
        );
    }
}
