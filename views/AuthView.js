import { BaseView } from './index.js';
import { AuthViewTemplate } from '../templates/viewTemplates/index.js';
import { validateForm, registerFormValidationSchema } from '../validation.js';
import { getFormElementValue } from '../helpers.js';
import { goTo, ROUTES_ENUM } from '../router.js';

class AuthView extends BaseView {
    constructor() {
        super('authView');
        this.template = AuthViewTemplate;
    }

    get $registerForm() {
        return document.getElementById('register_form');
    }

    get $logInForm() {
        return document.getElementById('log_in_form');
    }

    addEventListeners() {
        this.container.addEventListener('click', (e) => this.handleToggleAuthForms(e));
        this.container.addEventListener('click', (e) => this.handleRegister(e));
        this.container.addEventListener('click', (e) => this.handleLogIn(e));
    }

    toggleForms() {
        this.$registerForm.classList.toggle('view_disabled');
        this.$logInForm.classList.toggle('view_disabled');
    }

    handleToggleAuthForms(event) {
        if (event.target.classList.contains('form_toggler')) {
            event.preventDefault();
            this.toggleForms();
        }
    }

    handleRegister(event) {
        if (event.target.id === "submitRegister") {
            event.preventDefault();
            if (!validateForm(this.$registerForm, registerFormValidationSchema)) return;
            const newUser = {
                userName: getFormElementValue(this.$registerForm, 'username'),
                email: getFormElementValue(this.$registerForm, 'email'),
                password: getFormElementValue(this.$registerForm, 'password'),
            }
            this.DataService.registerUser(newUser);
            this.toggleForms();
        }
    }

    handleLogIn(event) {
        if (event.target.id === "submitLogIn") {
            event.preventDefault();
            const newUser = {
                userName: getFormElementValue(this.$logInForm, 'username'),
                password: getFormElementValue(this.$logInForm, 'password'),
            }
            const {
                status
            } = this.DataService.loginUser(newUser);
            status ? goTo(ROUTES_ENUM.usersList) : alert('wrong username or password');
        }
    }
}

export const authView = new AuthView();
