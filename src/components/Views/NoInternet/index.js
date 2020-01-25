import preact from 'preact';
import Useful from '../../../helpers/Useful';
import BaseViewComponent from '../../BaseViewComponent';
import Toolbar from '../../Toolbar';
import Icon from '../../Icon';
import './style.scss';

export default class NoInternet extends BaseViewComponent {
    constructor() {
        super();
        this.state = {
            id: 'nointernet',
            title: 'Connection',
            view: 'NoInternet',
            backable: false,
            slidable: false
        };

        Useful.loading('hide');
    }

    render(props, { id, title }) {
        return (
            <div id={id} className="nointernet view view--toolbar">
                <Toolbar title={title} />
                <div className="view__container">
                    <div className="nointernet__message">
                        <Icon name="slash" />
                        <h2>No internet connection</h2>
                        <p>Oh no it looks like you&#39;re not connected to the internet, please check your connection.</p>
                    </div>
                </div>
            </div>
        );
    }
}
