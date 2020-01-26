import preact from 'preact';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import BaseViewComponent from '../../BaseViewComponent';
import Toolbar from '../../Toolbar';
import './style.scss';


export class MapView extends BaseViewComponent {
    constructor() {
        super();

        this.state = {
            id: 'map',
            title: 'Map',
            view: 'Map',
            backable: true,
            slidable: false,
            leftBtn: {
                id: 'map',
                icon: 'chevron-left',
                back: true
            },
            longi: -0.074480,
            lati: 51.518890,
        };
    }


    // showPosition(position) {
    //     console.log(position.coords.latitude);
    //     console.log(position.coords.longitude);
    //     return { lat: position.coords.latitude, lng: position.coords.longitude };
    // }

    render(props, { id, title, leftBtn, longi, lati }) {
        
        return (
            <div id={id} className="settings back view view--toolbar">
                <Toolbar title={title} leftBtn={leftBtn} />
                <div className="view__container">
                    <Map
                        google={this.props.google}
                        zoom={14}
                        initialCenter={{ lat: lati, lng: longi }}
                    >
                        <Marker />
                        <Marker
                            onClick={this.onMarkerClick}
                            title={'Understanding Hadith and Fiqh'}
                            name={'Event1'}
                            position={{ lat: 51.515881, lng: -0.070210 }} 
                            icon={{
                                url: 'https://mosques.muslimsinbritain.org/js/marker-gen.php?T=&C=Pkstn&W=W&J=',
                                anchor: new google.maps.Point(32, 32),
                                scaledSize: new google.maps.Size(32, 32)
                            }}
                        />
                        <Marker
                            onClick={this.onMarkerClick}
                            title={'The Fiqh of Salaah and Ibaadah'}
                            name={'Event2'}
                            position={{ lat: 51.521091, lng: -0.078460 }} 
                            icon={{
                                url: 'https://mosques.muslimsinbritain.org/js/marker-gen.php?T=Arab&C=Arab&W=W&J=',
                                anchor: new google.maps.Point(32, 32),
                                scaledSize: new google.maps.Size(32, 32)
                            }}
                        />
                        <Marker
                            onClick={this.onMarkerClick}
                            title={'A Deep Dive into Business in Islam'}
                            name={'Event3'}
                            position={{ lat: 51.52430, lng: -0.05889 }}
                            icon={{
                                url: 'https://mosques.muslimsinbritain.org/js/marker-gen.php?T=Brel&C=Pkstn&W=W&J=',
                                anchor: new google.maps.Point(32, 32),
                                scaledSize: new google.maps.Size(32, 32)
                            }}
                        />
                        <Marker
                            onClick={this.onMarkerClick}
                            title={'An Islamic event: The event of events'}
                            name={'Event4'}
                            position={{lat: 51.50827, lng: -0.07627 }}
                            icon={{
                                url: 'https://mosques.muslimsinbritain.org/js/marker-gen.php?T=Salf&C=&W=W&J=',
                                anchor: new google.maps.Point(32,32),
                                scaledSize: new google.maps.Size(32,32)
                            }}
                        />
                        
                    </Map>
                    <div className="settings__version">Version 1.0.0 (2020-01-26)</div>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCZmnbzEOrllwXtpPCFWKBIHjBXptSXyZo',
})(MapView);
