import { BaseView } from './index.js';
import { UserPaperComponent } from '../components/index.js';

class UsersListView extends BaseView {
    constructor(viewName) {
        super(viewName);
    }

    addEventListeners() {
        this.container.addEventListener('click', (e) => this.handleViewUser(e));
        this.container.addEventListener('click', (e) => this.handleDeleteUser(e));
    }

    handleViewUser(event) {
        if (event.target.classList.contains('viewUser')) {
            this.dispatchRouterEvent('toUserPage', event.target.parentNode.dataset.userid)
        }
    }

    handleDeleteUser(event) {
        if (event.target.classList.contains('deleteUser')) {
            const userId = event.target.parentNode.dataset.userid
            const loggedUser = this.DataService.getLoggedUser();

            this.DataService.deleteUserById(userId);
            this.dispatchRouterEvent('toUserList');

            if (userId === loggedUser.id) {
                this.DataService.logOffUser();
                this.dispatchRouterEvent('toRegisterForm');
            }
        }
    }

    getData() {
        return this.DataService.getAllUsers()
    }

    createLayout() {
        const data = this.getData();
        data.map(user => {
            const usr = UserPaperComponent(user)
            this.container.append(usr)
        })
        return this.container;
    }
}

export const usersListView = new UsersListView('usersListView');
