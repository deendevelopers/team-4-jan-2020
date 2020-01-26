import preact from 'preact';
import FastClick from 'fastclick';
import ViewService from '../services/ViewService';
import GlobalsService from '../services/GlobalsService';
import App from '../components/App';
import '../assets/scss/main.scss';

// Initialize the app and fire cordova deviceready event


const onDeviceReady = (devicePlatform) => {
    preact.render(<App />, document.getElementById('app'));

    // Initialise events on device ready

    if (typeof cordova !== 'undefined') {
        FastClick.attach(document.body);
        window.open = cordova.InAppBrowser.open;

        // Add back button event

        document.addEventListener('backbutton', () => {
            const online = GlobalsService.get('online');

            if (online) {
                ViewService.goBack();
            }
        }, false);

        // Add offline event

        document.addEventListener('offline', () => {
            GlobalsService.set('online', false);
            ViewService.open('NoInternet');
        }, false);

        // Add online event

        document.addEventListener('online', () => {
            const online = GlobalsService.get('online');

            if (!online) {
                window.location.reload();
            }
        }, false);
    }

    // Add device class to body and status bar class

    if (typeof device !== 'undefined' && devicePlatform == 'mobile') {
        document.querySelector('html').classList.add(`device-${device.platform}`);
        document.querySelector('html').classList.add('device-mobile');
        document.querySelector('html').classList.add(`device-model-${device.model.replace(/[^0-9a-zA-Z]/, '')}`);
        GlobalsService.set('devicePlatform', device.platform);
    } else if (devicePlatform == 'browser') {
        document.querySelector('html').classList.add('device-browser');
        GlobalsService.set('devicePlatform', 'browser');
    }
};

if (process.env.NODE_ENV !== 'development' && navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/) && window.location.href !== 'https://arilly.com/search/') {
    document.addEventListener('deviceready', () => {
        onDeviceReady('mobile');
    }, false);
} else {
    onDeviceReady('browser');
}

// Allow :active styles to work

document.addEventListener('touchstart', () => {}, true);
