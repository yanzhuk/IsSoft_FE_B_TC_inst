import {
    getFormElementValue
} from './helpers.js';
import DataService from './services/DataService.js';
import {
    registerFormValidationSchema,
    validateForm
} from './validation.js';

const SESSION_LENGTH = 1 * 60 * 1000;

const $registerForm = document.getElementById('register_form');
const $logInForm = document.getElementById('log_in_form');
const $userPage = document.getElementById('user_page');
const $usersListPage = document.getElementById('users_list_page');

const views = {
    'register': {
        node: $registerForm,
        cb: () => {}
    },
    'login': {
        node: $logInForm,
        cb: () => {}
    },
    'userPage': {
        node: $userPage,
        cb: (userId) => {
            renderUserDetails(userId);
        }
    },
    'usersListPage': {
        node: $usersListPage,
        cb: () => {
            renderUsersList();
        }
    },
}

document.addEventListener('DOMContentLoaded', checkLoggedUser);
document.addEventListener('click', handleToggleAuthForms);
document.addEventListener('click', handleRegister);
document.addEventListener('click', handleLogIn);
document.addEventListener('click', handleLogOff);
document.addEventListener('click', handleViewUser);
document.addEventListener('click', handleDeleteUser);
document.addEventListener('submit', (e) => e.preventDefault());

function handleViewUser(event) {
    if (event.target.classList.contains('viewUser')) {
        showView('userPage', event.target.parentNode.dataset.userid);
    }
}

function handleDeleteUser(event) {
    if (event.target.classList.contains('deleteUser')) {
        DataService.deleteUserById(event.target.parentNode.dataset.userid);
        showView('usersListPage');
    }
}

function handleToggleAuthForms(event) {
    if (event.target.classList.contains('form_toggler')) {
        event.preventDefault();
        $registerForm.classList.toggle('view_disabled');
        $logInForm.classList.toggle('view_disabled');
    }
}

function handleRegister(event) {
    if (event.target.id === "submitRegister") {
        event.preventDefault();
        if (!validateForm($registerForm, registerFormValidationSchema)) return;
        const newUser = {
            userName: getFormElementValue($registerForm, 'username'),
            email: getFormElementValue($registerForm, 'email'),
            password: getFormElementValue($registerForm, 'password'),
        }
        DataService.registerUser(newUser);
        showView('login');
    }
}

function handleLogIn(event) {
    if (event.target.id === "submitLogIn") {
        event.preventDefault();
        const newUser = {
            userName: getFormElementValue($logInForm, 'username'),
            password: getFormElementValue($logInForm, 'password'),
        }
        const {
            status
        } = DataService.loginUser(newUser);
        status ? showView('usersListPage') : alert('wrong username or password');
    }
}

function handleLogOff(event) {
    if (event.target.id === "logOffUser") {
        DataService.logOffUser();
        showView('login');
    }
}

function checkLoggedUser() {
    const loggedUser = DataService.getLoggedUser();
    if (!loggedUser || new Date().getTime() - loggedUser.lastLogin > SESSION_LENGTH) {
        showView('login');
        DataService.logOffUser();
    } else {
        showView('usersListPage')
    }
}

function showView(viewName, param) {
    for (const prop in views) {
        if (prop === viewName) {
            views[prop].cb(param);
            views[prop].node.classList.remove('view_disabled');
            continue;
        };
        views[prop].node.classList.add('view_disabled');
    }
}

function renderUsersList() {
    const users = DataService.getAllUsers();
    let usersList = '';
    for (let i = 0; i < users.length; i++) {
        usersList += UserPaper(users[i]);
    }
    $usersListPage.innerHTML = usersList;
}

function UserPaper({
    userName,
    id
}) {
    return `
        <div class="userPaper">
            <div class="userPaper_info">${userName}</div>
            <div data-userId="${id}" class="userPaper_actions">
                <button class="viewUser btn btn_filled">View</button>
                <button class="deleteUser btn btn_outlined">Delete</button>
            </div>
        </div>
    `;
}

function renderUserDetails(userId) {
    const {
        userName
    } = DataService.getUserById(userId);

    $userPage.innerHTML = `
        <div class="userDetails">
            <h2>Hello ${userName}</h2>
            <button id="logOffUser" class="btn btn_filled">Log off</button>
        </div>
    `;

}