import DataService from './services/DataService.js';
import { goTo, ROUTES_ENUM } from './router.js';

const SESSION_LENGTH = 60 * 60 * 1000;

window.addEventListener('hashchange', () => { goTo(window.location.hash) })

document.addEventListener('DOMContentLoaded', checkLoggedUser);
document.addEventListener('submit', (e) => e.preventDefault());

function checkLoggedUser() {
    const loggedUser = DataService.getLoggedUser();
    if (!loggedUser || new Date().getTime() - loggedUser.lastLogin > SESSION_LENGTH) {
        goTo(ROUTES_ENUM.login);
        DataService.logOffUser();
    } else {
        goTo(ROUTES_ENUM.usersList);
    }
}
