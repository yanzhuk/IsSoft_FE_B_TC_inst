import { BaseView } from './index.js';
import { UserDetailsViewTemplate } from '../templates/viewTemplates/index.js';
import { UserEditFormTemplate } from '../templates/componentTemplates/index.js';
import { getFormElementValue } from '../helpers.js'

class UserDetailsView extends BaseView {
    editUserFormShown = false;
    editUserForm = UserEditFormTemplate();
    user = {};
    loggedUser = {};

    constructor(viewName) {
        super(viewName);
        this.template = UserDetailsViewTemplate;
    }

    addEventListeners() {
        this.container.addEventListener('click', (e) => this.handleEditUserBtnClick(e));
        this.container.addEventListener('click', (e) => this.handleUpdateUserInfo(e));
        this.container.addEventListener('click', (e) => this.handleLogOff(e));
    }

    handleLogOff(event) {
        if (event.target.id === "logOffUser") {
            this.DataService.logOffUser();
            this.dispatchRouterEvent('toLoginForm');
        }
    }

    handleEditUserBtnClick(e) {
        if (e.target.id === "editUserDetails") {
            this.editUserFormShown = !this.editUserFormShown;
            this.render([this.user.id]);
        }
    }

    handleUpdateUserInfo(event) {
        if (event.target.id === "submitUserDetails") {
            event.preventDefault();
            const newUserData = {
                location: getFormElementValue(this.editUserForm, 'location'),
                age: getFormElementValue(this.editUserForm, 'age'),
                about: getFormElementValue(this.editUserForm, 'about'),
            }

            this.DataService.updateUserById(this.user.id, newUserData);
            this.render([this.user.id]);
        }
    }

    getData(userId) {
        this.user = this.DataService.getUserById(userId);
        this.loggedUser = this.DataService.getLoggedUser();
    }

    createLayout([userId]) {
        this.getData(userId);
        this.container.innerHTML = this.template(this.user, this.loggedUser.id);
        if (this.editUserFormShown) {
            this.container.append(this.editUserForm);
        } else {
            this.editUserForm.remove();
        }
        return this.container;
    }
}

export const userDetailsView = new UserDetailsView('userDetailsView');
