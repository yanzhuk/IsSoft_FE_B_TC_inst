import { BaseView } from './index.js';
import { RegisterViewTemplate } from '../templates/viewTemplates/index.js';
import { validateForm, registerFormValidationSchema } from '../validation.js';
import { getFormElementValue } from '../helpers.js';

class RegisterView extends BaseView {
    constructor() {
        super('registerView');
        this.template = RegisterViewTemplate;
    }

    get $form() {
        return this.container.firstElementChild;
    }

    addEventListeners() {
        this.container.addEventListener('click', (e) => this.handleRegister(e));
        this.container.addEventListener('click', (e) => this.handleToggleForm(e));
    }

    handleToggleForm(event) {
        if (event.target.classList.contains('form_toggler')) {
            this.dispatchRouterEvent('toLoginForm')
        }
    }

    handleRegister(event) {
        if (event.target.id === "submitRegister") {
            event.preventDefault();
            if (!validateForm(this.$form, registerFormValidationSchema)) return;
            const newUser = {
                userName: getFormElementValue(this.$form, 'username'),
                email: getFormElementValue(this.$form, 'email'),
                password: getFormElementValue(this.$form, 'password'),
            }
            this.DataService.registerUser(newUser);
            this.dispatchRouterEvent('toLoginForm');
        }
    }
}

export const registerView = new RegisterView();