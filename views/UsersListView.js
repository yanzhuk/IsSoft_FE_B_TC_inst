import { BaseView } from './index.js';
import { UserPaperComponent } from '../components/index.js';
import { goTo, ROUTES_ENUM } from '../router.js';

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
            goTo(`${ROUTES_ENUM.user}/${event.target.parentNode.dataset.userid}`);
        }
    }

    handleDeleteUser(event) {
        if (event.target.classList.contains('deleteUser')) {
            const userId = event.target.parentNode.dataset.userid
            const loggedUser = this.DataService.getLoggedUser();

            this.DataService.deleteUserById(userId);
            goTo(ROUTES_ENUM.usersList);

            if (userId === loggedUser.id) {
                this.DataService.logOffUser();
                goTo(ROUTES_ENUM.auth);
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
