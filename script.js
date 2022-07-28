import {
    getFormElementValue,
    clearForm,
} from './helpers.js';
import DataService from './services/DataService.js';
import {
    registerFormValidationSchema,
    validateForm
} from './validation.js';

const SESSION_LENGTH = 60 * 60 * 1000;

const $registerForm = document.getElementById('register_form');
const $logInForm = document.getElementById('log_in_form');
const $userPage = document.getElementById('user_page');
const $usersListPage = document.getElementById('users_list_page');

const views = {
    'register': {
        node: $registerForm,
        cb: () => { }
    },
    'login': {
        node: $logInForm,
        cb: () => { }
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
document.addEventListener('click', handleUpdateUserInfo);
document.addEventListener('submit', (e) => e.preventDefault());

function handleViewUser(event) {
    if (event.target.classList.contains('viewUser')) {
        showView('userPage', event.target.parentNode.dataset.userid);
    }
}

function handleDeleteUser(event) {
    if (event.target.classList.contains('deleteUser')) {
        const userId = event.target.parentNode.dataset.userid
        const loggedUser = DataService.getLoggedUser();

        DataService.deleteUserById(userId);
        showView('usersListPage');

        if (userId === loggedUser.id) {
            DataService.logOffUser();
            showView('login');
        }
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
function handleUpdateUserInfo(event) {
    if (event.target.id === "submitUserDetails") {
        event.preventDefault();
        const $userDetailsForm = document.getElementById("userDetailsForm");
        const newUserData = {
            location: getFormElementValue($userDetailsForm, 'location'),
            age: getFormElementValue($userDetailsForm, 'age'),
            about: getFormElementValue($userDetailsForm, 'about'),
        }
        const { id } = DataService.getLoggedUser();
        DataService.updateUserById(id, newUserData);
        clearForm($userDetailsForm);
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
        <div class="userPaper flex align-center space-between bordered-container">
            <div class="userPaper_info">${userName}</div>
            <div data-userId="${id}" class="userPaper_actions flex space-between">
                <button class="viewUser btn btn_filled">View</button>
                <button class="deleteUser btn btn_outlined">Delete</button>
            </div>
        </div>
    `;
}

function renderUserDetails(userId) {
    const user = DataService.getUserById(userId);

    const {
        id: loggedUserId,
    } = DataService.getLoggedUser();

    $userPage.innerHTML = `
        <div class="userDetails">
            <div class="userDetails-header bordered-container flex align-center space-between">
                <h2>Hello ${user.userName}</h2>
                <div class="header-actions">
                    <button id="logOffUser" class="btn btn_filled">Log off</button>
                </div>
            </div>
            <div class="userDetails-info bordered-container">
                <ul>
                    <li>About: ${user.about ?? ''}</li>
                    <li>Location: ${user.location ?? ''}</li>
                    <li>Age: ${user.age ?? ''}</li>
                </ul>
                
            </div>
            ${user.id === loggedUserId ? UserDetailsForm(user) : ''}
        </div>
    `;
}

function UserDetailsForm(user) {
    const { location, age, about } = user;
    return `
        <form id="userDetailsForm" class="bordered-container">
            <div class="formControl">
                <textarea
                    name="about"
                    placeholder="About You"
                    rows="5"
                    cols="25"
                    maxlength="125"
                >${about ?? ''}</textarea>
            </div>
            <div class="formControl">
                <input type="text" value="${location ?? ''}" name="location" placeholder="Your Location">
            </div>
            <div class="formControl">
                <input type="number" value="${age ?? ''}" min="0" max="150" name="age" placeholder="Age">
            </div>
            <div class="form_actions justify-end flex align-center">
                <button type="submit" id="submitUserDetails" class="btn btn_filled">Submit</button>
            </div>
        </form>
    `
}
