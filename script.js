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

const views = {
    'register': $registerForm,
    'login': $logInForm,
    'userPage': $userPage,
}

window.addEventListener('load', checkLoggedUser);
document.addEventListener('click', handleToggleAuthForms);
document.addEventListener('click', handleRegister);
document.addEventListener('click', handleLogIn);
document.addEventListener('click', handleLogOff);
document.addEventListener('submit', (e) => e.preventDefault());


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
        status ? showView('userPage') : alert('wrong username or password');
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
        showView('userPage')
    }
}

function showView(viewName) {
    for (const prop in views) {
        if (prop === viewName) {
            views[prop].classList.remove('view_disabled');
            continue;
        };
        views[prop].classList.add('view_disabled');
    }
}