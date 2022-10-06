import { BaseView } from './index.js';
import { LoginViewTemplate } from '../templates/viewTemplates/index.js';
import { getFormElementValue } from '../helpers.js';
import { goTo, ROUTES_ENUM } from '../router.js';

class LoginView extends BaseView {
    constructor() {
        super('loginView');
        this.template = LoginViewTemplate;
    }

    get $form() {
        return this.container.firstElementChild;
    }

    addEventListeners() {
        this.container.addEventListener('click', (e) => this.handleLogIn(e));
        this.container.addEventListener('click', (e) => this.handleToggleForm(e));
    }

    handleToggleForm(event) {
        if (event.target.classList.contains('form_toggler')) {
            this.dispatchRouterEvent('toRegisterForm')
        }
    }

    handleLogIn(event) {
        if (event.target.id === 'submitLogIn') {
            event.preventDefault();
            const newUser = {
                userName: getFormElementValue(this.$form, 'username'),
                password: getFormElementValue(this.$form, 'password'),
            }
            const {
                status
            } = this.DataService.loginUser(newUser);
            status ?
                this.dispatchRouterEvent('toUsersList') :
                alert('wrong username or password');
        }
    }
}

export const loginView = new LoginView();