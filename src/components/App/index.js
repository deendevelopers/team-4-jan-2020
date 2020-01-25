import preact from 'preact';
import ViewService from '../../services/ViewService';
import Loading from '../Loading';

export default class App extends preact.Component {
    constructor() {
        super();

        // Setup app settings

        if ('appGlobals' in window) {
            // Globals have been set
        } else {
            window.appGlobals = {
                version: 'v1.0.0',
                currentView: '',
                breadcrumbs: [],
                viewState: {},
                views: {},
                online: true,
                devicePlatform: ''
            };
        }
    }

    componentDidMount() {
        document.body.setAttribute('data-viewport-height', window.outerHeight || window.innerHeight);

        // Load images as they come into view

        setInterval(() => {
            this.lazyLoadImages();
        }, 1000);

        // Go to homepage

        ViewService.open('Home');
    }

    /**
     * Looks for images with the .is-loadable class and lazy loads them in
     * @return void
     */
    lazyLoadImages() {
        const loadClass = 'is-loadable';
        const imgs = document.querySelectorAll(`.${loadClass}, img[data-src]:not(.${loadClass})`);

        if (imgs.length) {
            [].slice.call(imgs).forEach((img) => {
                const imgUrl = img.getAttribute('data-src');
                const newImg = new Image();

                newImg.onload = () => {
                    img.setAttribute('src', imgUrl);
                    img.removeAttribute('data-src');
                    img.classList.remove(loadClass);
                };

                newImg.setAttribute('src', imgUrl);
            });
        }
    }

    render() {
        return (
            <div className="app-container">
                <div className="views" />
                <div id="global-loading" className="is-active">
                    <span className="loading-container">
                        <Loading />
                    </span>
                </div>
            </div>
        );
    }
}
