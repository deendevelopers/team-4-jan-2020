import preact from 'preact';
import linkState from 'linkstate';
import ViewService from '../../services/ViewService';
import RequestService from '../../services/RequestService';
import Useful from '../../helpers/Useful';
import Button from '../Button';
import Loading from '../Loading';
import Icon from '../Icon';
import './style.scss';

export default class Form extends preact.Component {
    constructor(props) {
        super(props);

        console.log(props);
        // Create the default form data values

        const formData = {};

        props.fields.forEach((field) => {
            if ('name' in field) {
                if ('value' in field) {
                    formData[field.name] = field.value;
                } else if ('default' in field) {
                    formData[field.name] = field.default;
                } else {
                    formData[field.name] = '';
                }
            }
        });

        // Set the state

        this.state = {
            responseMsg: '',
            responseStatus: 0,
            loading: false,
            errors: {},
            formData
        };
    }

    /**
     * Generate field from a set of values
     * @param  {object} fieldObj The field data
     * @return {jsx}          The field jsx
     */
    field(fieldObj) {
        const field = fieldObj;
        const classes = ['form__field'];

        if (typeof field.requiredIf !== 'undefined' || typeof field.showIf !== 'undefined') {
            classes.push('form__field--hide');
        }

        if (field.type == 'description') {
            classes.push('form__field--description');
        }

        if (field.type == 'select') {
            if (!Useful.isArray(field.options)) {
                const newOptions = [];

                Object.keys(field.options).forEach((option) => {
                    newOptions.push({
                        key: option,
                        value: field.options[option]
                    });
                });

                newOptions.sort((a, b) => {
                    const nameA = a.value.toLowerCase();
                    const nameB = b.value.toLowerCase();

                    if (nameA < nameB) {
                        return -1;
                    } else if (nameA > nameB) {
                        return 1;
                    }

                    return 0;
                });
                field.options = newOptions;
            }

            classes.push('form__field--select');
        }

        if (field.type == 'tnp') {
            classes.push('form__field--tnp');
        }

        if (field.type == 'submit') {
            classes.push('form__field--submit');
        }

        if (field.type == 'checkbox') {
            classes.push('form__field--checkbox');
        }

        if (field.name in this.state.errors) {
            classes.push('form__field--error');
        }

        if (field.name == 'email') {
            classes.push('form__field--email');
        }

        if (typeof field.requiredIf !== 'undefined') {
            if (
                typeof this.state.formData[field.requiredIf.name] !== 'undefined' &&
                this.state.formData[field.requiredIf.name] == field.requiredIf.value
            ) {
                const hideIndex = classes.indexOf('form__field--hide');

                if (hideIndex !== -1) {
                    classes.splice(hideIndex, 1);
                }
            }
        } else if (typeof field.showIf !== 'undefined') {
            if (
                typeof this.state.formData[field.showIf.name] !== 'undefined' &&
                this.state.formData[field.showIf.name] == field.showIf.value
            ) {
                const hideIndex = classes.indexOf('form__field--hide');

                if (hideIndex !== -1) {
                    classes.splice(hideIndex, 1);
                }
            }
        }

        if (field.type == 'description') {
            return (
                <div className={classes.join(' ')}>
                    <p>{field.label}</p>
                </div>
            );
        } else if (field.type == 'hidden') {
            return (
                <div className={classes.join(' ')}>
                    <input type="hidden" name={field.name} onInput={linkState(this, `formData.${field.name}`)} value={this.state.formData[field.name] || ''} />
                </div>
            );
        } else if (field.type == 'emailCheck') {
            return (
                <div className={classes.join(' ')}>
                    <label htmlFor={field.name}>
                        {field.label}
                        {this.state.errors[field.name] &&
                            <abbr className="is-unavailable"> - {this.state.errors[field.name]}</abbr>
                        }
                    </label>
                    <input type="email" maxLength={field.maxlength} name={field.name} placeholder={field.placeholder} onBlur={e => this.checkEmail(e)} onInput={linkState(this, `formData.${field.name}`)} value={this.state.formData[field.name] || ''} />
                    {field.description &&
                        <p className="form__description">{field.description}</p>
                    }
                </div>
            );
        } else if (field.type == 'usernameCheck') {
            return (
                <div className={classes.join(' ')}>
                    <label htmlFor={field.name}>
                        {field.label}
                        {this.state.errors[field.name] &&
                            <abbr className="is-unavailable"> - {this.state.errors[field.name]}</abbr>
                        }
                    </label>
                    <input type="text" maxLength={field.maxlength} name={field.name} placeholder={field.placeholder} onBlur={e => this.checkUsername(e)} onInput={linkState(this, `formData.${field.name}`)} value={this.state.formData[field.name] || ''} />
                    {field.description &&
                        <p className="form__description">{field.description}</p>
                    }
                </div>
            );
        } else if (field.type == 'text') {
            return (
                <div className={classes.join(' ')}>
                    {field.label &&
                        <label htmlFor={field.name}>{field.label}</label>
                    }
                    <input type="text" maxLength={(field.maxlength) ? field.maxlength : 300} name={field.name} placeholder={field.placeholder} onInput={linkState(this, `formData.${field.name}`)} value={this.state.formData[field.name] || ''} />
                    <a className={(this.state.formData[field.name] && this.state.formData[field.name].length) ? 'is-active form__field-clear' : 'form__field-clear'} onClick={e => this.clearField(field.name, e)}><Icon name="x" /></a>
                    {field.description &&
                        <p className="form__description">{field.description}</p>
                    }
                </div>
            );
        } else if (field.type == 'textarea') {
            return (
                <div className={classes.join(' ')}>
                    {field.label &&
                        <label htmlFor={field.name}>{field.label}</label>
                    }
                    <textarea maxLength={(field.maxlength) ? field.maxlength : 300} name={field.name}placeholder={field.placeholder} onInput={linkState(this, `formData.${field.name}`)}>{this.state.formData[field.name] || ''}</textarea>
                    {field.description &&
                        <p className="form__description">{field.description}</p>
                    }
                </div>
            );
        } else if (field.type == 'number') {
            return (
                <div className={classes.join(' ')}>
                    {field.label &&
                        <label htmlFor={field.name}>{field.label}</label>
                    }
                    <input type="number" name={field.name} placeholder={field.placeholder} onInput={linkState(this, `formData.${field.name}`)} value={this.state.formData[field.name] || ''} />
                    <a className={(this.state.formData[field.name] && this.state.formData[field.name].length) ? 'is-active form__field-clear' : 'form__field-clear'} onClick={e => this.clearField(field.name, e)}><Icon name="x" /></a>
                    {field.description &&
                        <p className="form__description">{field.description}</p>
                    }
                </div>
            );
        } else if (field.type == 'email') {
            return (
                <div className={classes.join(' ')}>
                    {field.label &&
                        <label htmlFor={field.name}>{field.label}</label>
                    }
                    <input type="email" maxLength="100" name={field.name} placeholder={field.placeholder} onInput={linkState(this, `formData.${field.name}`)} value={this.state.formData[field.name] || ''} />
                    <a className={(this.state.formData[field.name] && this.state.formData[field.name].length) ? 'is-active form__field-clear' : 'form__field-clear'} onClick={e => this.clearField(field.name, e)}><Icon name="x" /></a>
                    {field.description &&
                        <p className="form__description">{field.description}</p>
                    }
                </div>
            );
        } else if (field.type == 'password') {
            return (
                <div className={classes.join(' ')}>
                    {field.label &&
                        <label htmlFor={field.name}>{field.label}</label>
                    }
                    <input type="password" maxLength={(field.maxlength) ? field.maxlength : 300} name={field.name} placeholder={field.placeholder} onInput={linkState(this, `formData.${field.name}`)} />
                    <a className={(this.state.formData[field.name] && this.state.formData[field.name].length) ? 'is-active form__field-clear' : 'form__field-clear'} onClick={e => this.clearField(field.name, e)}><Icon name="x" /></a>
                    {field.description &&
                        <p className="form__description">{field.description}</p>
                    }
                </div>
            );
        } else if (field.type == 'select') {
            return (
                <div className={classes.join(' ')}>
                    {field.label &&
                        <label htmlFor={field.name}>{field.label}</label>
                    }
                    <select name={field.name} onChange={linkState(this, `formData.${field.name}`)}>
                        {field.options.map(option =>
                            <option value={option.key} selected={('value' in field && this.state.formData[field.name] == option.key)}>{option.value}</option>
                        )}
                    </select>
                    <Icon name="chevron-down" />
                    {field.description &&
                        <p className="form__description">{field.description}</p>
                    }
                </div>
            );
        } else if (field.type == 'checkbox') {
            return (
                <div className={classes.join(' ')}>
                    <label htmlFor={field.name}>
                        <input type="checkbox" id={field.name} checked={this.state.formData[field.name] == 'true' || this.state.formData[field.name]} name={field.name} onChange={linkState(this, `formData.${field.name}`)} /><i>{field.label}</i><span />
                    </label>
                    {field.description &&
                        <p className="form__description">{field.description}</p>
                    }
                </div>
            );
        } else if (field.type == 'submit') {
            return (
                <div className={classes.join(' ')}>
                    <button className="button button--green button--block" type="submit">
                        {(this.state.loading) ? '' : field.label}
                        {this.state.loading &&
                            <Loading size="small" />
                        }
                    </button>
                </div>
            );
        } else if (field.type == 'button') {
            return (
                <div className={classes.join(' ')}>
                    <Button onClick={field.callback} el="button" type="button" label={field.label} color="teal" elStyle="block" />
                </div>
            );
        } else if (field.type == 'response') {
            const responseClasses = ['form__field', 'form__response'];

            if (this.state.responseStatus == 200) {
                responseClasses.push('form__response--success');
            } else {
                responseClasses.push('form__response--error');
            }

            if (this.state.responseMsg.length) {
                responseClasses.push('is-active');
            }

            return (
                <div className={responseClasses.join(' ')}><p>{this.state.responseMsg}</p></div>
            );
        } else if (field.type == 'tnp') {
            return (
                <div className={classes.join(' ')}>
                    By creating an account you agree to the <a onClick={() => ViewService.open('Privacy')}>privacy policy</a> and <a onClick={() => ViewService.open('Terms')}>terms &amp; conditions</a>
                </div>
            );
        }

        return '';
    }

    /**
     * Checks if the email address is not in use
     * @param {object} e The event object
     * @return void
     */
    checkEmail(e) {
        const value = e.target.value;
        const errors = this.state.errors;

        if (value.length > 6) {
            new RequestService('GET', '/emailcheck', { email: value }, () => {
                delete errors.email;
                this.setState({ errors });
            }, (response) => {
                errors.email = response.error.default;
                this.setState({ errors });
            }, true);
        }
    }

    /**
     * Checks if the username is taken or not
     * @param {object} e The event object
     * @return void
     */
    checkUsername(e) {
        const value = e.target.value;
        const errors = this.state.errors;

        if (value.length > 3) {
            new RequestService('GET', '/usernamecheck', { username: value }, () => {
                delete errors.username;
                this.setState({ errors });
            }, (response) => {
                errors.username = response.error.default;
                this.setState({ errors });
            }, true);
        }
    }

    /**
     * Clears the field
     * @param  {string} name  The field name
     * @param  {object} event The event object
     * @return void
     */
    clearField(name, event) {
        if (typeof this.state.formData[name] !== 'undefined' && this.state.formData[name].length) {
            const formData = this.state.formData;
            const el = event.target;

            formData[name] = '';
            el.parentNode.querySelector('[name]').value = '';
            el.parentNode.querySelector('[name]').focus();

            this.setState(formData);
        }
    }

    /**
     * Handles the response from the form
     * @param  {object}  response    The response
     * @param  {Element} form        The form element
     * @return {boolean}             True
     */
    handleResponse(response, form) {
        const code = response.status;
        const button = form.querySelector('button');
        let message = '';
        let messageTitle = '';
        let errors = {};

        Useful.loading('hide');

        this.setState({
            loading: false
        });

        if (code == 200) {
            if ('onSuccess' in this.props) {
                this.props.onSuccess(response, this.state.formData);
            } else {
                message = response.message;
                messageTitle = 'Success';
            }
        } else {
            message = response.error.default;
            if (button) {
                button.removeAttribute('disabled');
            }
            errors = response.error;
            messageTitle = 'Error';
        }

        this.setState({
            responseStatus: code,
            errors
        });

        if (message.length > 0 && code !== 200) {
            Useful.alert(message, messageTitle);
        }

        return true;
    }

    /**
     * Handles the submission of the form
     * @param  {object} e The event
     * @return void
     */
    handleForm(e) {
        e.preventDefault();

        // Variables

        const method = this.props.method;
        const form = e.target;
        const button = form.querySelector('button');
        let auth = false;

        // Disable button and add loading icon

        if (button) {
            button.setAttribute('disabled', 'disabled');
        }
        this.setState({
            loading: true
        });

        // Check if form needs to be authorised

        if ('auth' in this.props) {
            auth = true;
            Useful.loading('show');
        }

        // Send data to endpoint
        console.log(method);
        console.log(this.props.action);

        new RequestService(method, this.props.action, this.state.formData, (response) => {
            this.handleResponse(response, form);
        }, (response) => {
            this.handleResponse(response, form);
        }, auth);
    }

    render({ fields, type }) {
        const classes = [];

        if (typeof type == 'undefined') {
            classes.push('form');
        }

        return (
            <form className={classes.join(' ')} onSubmit={e => this.handleForm(e)} noValidate>
                {fields.map(field => this.field(field))}

                
            </form>
        );
    }
}
