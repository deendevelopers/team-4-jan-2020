import preact from 'preact';
import GlobalsService from '../../services/GlobalsService';
import ViewService from '../../services/ViewService';

export default class BaseViewComponent extends preact.Component {
    componentDidMount() {
        if (typeof this.state.id !== 'undefined') {
            ViewService.run(this.state);

            if ('didMount' in this) {
                this.didMount();
            }
        }
    }

    componentDidUpdate() {
        GlobalsService.updateViewState(this.state);

        if ('didUpdate' in this) {
            this.didUpdate();
        }
    }
}
