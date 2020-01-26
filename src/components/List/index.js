import preact from 'preact';
import './style.scss';

export default class List extends preact.Component {
    render({ items }) {
        return (
            <ul className="list list-unstyled border-top m-0">
                {items.map(item => (
                    <li className="border-bottom">
                        <a href="javascript:;" className="list__item d-block">
                            <div className="row no-gutters align-items-stretch">
                                <div className="col-3">
                                    <div className="list__thumb" style={{ backgroundImage: `url('${item.thumb}')` }} />
                                </div>
                                <div className="col-9">
                                    <div className="list__content">
                                        <h3 className={`${(item.unread) ? 'list__title--unread' : ''} list__title font-weight-bold text-truncate m-0 mb-1`}>{ item.title }</h3>
                                        <p className="list__meta text-truncate small m-0">
                                            <span className="text-gray-600">{ item.location }</span>
                                            <span className="text-gray-300 d-inline-block mx-2">|</span>
                                            <span className="text-success">{ item.date }</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        );
    }
}
