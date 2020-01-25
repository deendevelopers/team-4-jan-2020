import Useful from '../helpers/Useful';
import GlobalsService from '../services/GlobalsService';
import RequestService from '../services/RequestService';
import ViewService from '../services/ViewService';

/**
 * Handles functionality for uploading files
 */
export default class UploadService {
    /**
     * Uploads a file from the device
     * @param  {string}  type      The type of image we're uploading
     * @param  {boolean} successCb The success callback
     * @param  {boolean} errorCb   The error callback
     * @return void
     */
    constructor(type, successCb = false, errorCb = false) {
        const avatar = GlobalsService.get('user').avatar;
        const buttons = ['Take photo', 'Choose from gallery'];
        const self = this;

        if (avatar.length > 0 && type == 'avatar') {
            buttons.push('Remove photo');
        }

        if (type == 'gallery') {
            buttons.push('Add video');
        }

        buttons.push('Cancel');

        navigator.notification.confirm('What would you like to do?', (index) => {
            if (index == 1) {
                navigator.camera.getPicture((imageUri) => {
                    if (type == 'avatar') {
                        navigator.notification.confirm('Would you like to crop your profile photo?', (indexSecond) => {
                            if (indexSecond == 1) {
                                ViewService.open('Crop', {
                                    uri: imageUri,
                                    cropCallback() {
                                        self.upload(imageUri, type, successCb, errorCb);
                                    }
                                });
                            } else {
                                self.upload(imageUri, type, successCb, errorCb);
                            }
                        }, 'Crop photo', ['Yes', 'No']);
                    } else {
                        self.upload(imageUri, type, successCb, errorCb);
                    }
                }, this.errorCallback, {
                    destinationType: 1,
                });
            } else if (index == 2) {
                navigator.camera.getPicture((imageUri) => {
                    if (type == 'avatar') {
                        navigator.notification.confirm('Would you like to crop your profile photo?', (indexSecond) => {
                            if (indexSecond == 1) {
                                ViewService.open('Crop', {
                                    uri: imageUri,
                                    cropCallback() {
                                        self.upload(imageUri, type, successCb, errorCb);
                                    }
                                });
                            } else {
                                self.upload(imageUri, type, successCb, errorCb);
                            }
                        }, 'Crop photo', ['Yes', 'No']);
                    } else {
                        self.upload(imageUri, type, successCb, errorCb);
                    }
                }, this.errorCallback, {
                    destinationType: 1,
                    sourceType: 0
                });
            } else if (index == 3 && type == 'avatar') {
                successCb('remove');
            } else if (index == 3 && type == 'gallery') {
                Useful.prompt('Enter a YouTube or Vimeo url', 'Add video', ['Add', 'Cancel'], '', (i, input) => {
                    if (i == 0 || i == 1) {
                        Useful.loading('show');

                        new RequestService('POST', '/video', {
                            video: input
                        }, (response) => {
                            Useful.loading('hide');

                            if (successCb) {
                                successCb(response);
                            }
                        }, (response) => {
                            Useful.loading('hide');

                            if (errorCb) {
                                Useful.alert(response.message, 'Video error');
                                errorCb(response);
                            }
                        }, true);
                    }
                });
            }
        }, 'Upload', buttons);
    }

    /**
     * Uploads the given image URI
     * @param  {string} imageUri  The image URI
     * @param  {string} type      The type of image
     * @param  {mixed}  successCb The success callback function
     * @param  {mixed}  errorCb   The error callback function
     * @return void
     */
    upload(imageUri, type, successCb, errorCb) {
        const options = new FileUploadOptions();
        const ft = new FileTransfer();
        const params = {};
        const cropOffset = GlobalsService.get('cropOffset');
        let successCallback = successCb;
        let errorCallback = errorCb;

        if (!successCallback) {
            successCallback = () => {};
        }

        if (!errorCallback) {
            errorCallback = () => {};
        }

        if (type == 'avatar' && cropOffset) {
            params.cropOffset = cropOffset;
        }

        Useful.loading('show');

        options.fileKey = 'file';
        options.fileName = imageUri.substr(imageUri.lastIndexOf('/') + 1);
        options.mimeType = 'image/jpeg';
        params.type = type;
        options.params = params;
        options.headers = {
            Authorization: `Bearer ${GlobalsService.get('accessToken')}`
        };

        ft.upload(imageUri, encodeURI(Useful.endpoint('/upload')), (response) => {
            const data = JSON.parse(response.response);

            Useful.loading('hide');

            if (data.status == 200) {
                successCallback(data);
            } else {
                Useful.alert("Sorry we couldn't upload your photo at this time", 'Upload error');
                errorCallback(data);
                this.errorCallback(response);
            }
        }, (response) => {
            Useful.loading('hide');
            Useful.alert("Sorry we couldn't upload your photo at this time", 'Upload error');
            errorCallback(response.body);
            this.errorCallback(response);
        }, options);
    }

    /**
     * The error callback for the native image selection
     * @param  {object} response The error
     * @return void
     */
    errorCallback(response) {
        console.log(response);
    }
}
