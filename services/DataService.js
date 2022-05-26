function registerUser(userData) {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'));

    if (registeredUsers) {
        registeredUsers.push(userData);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    } else {
        localStorage.setItem('registeredUsers', JSON.stringify([userData]));
    };
}

function loginUser({
    userName,
    password
}) {
    const user = getUserByName(userName);

    if (user && user.password === password) {
        localStorage.setItem('loggedUser', JSON.stringify({
            userName,
            lastLogin: new Date().getTime(),
        }));
        return {
            status: true
        }
    } else {
        return {
            status: false
        }
    }
}

function logOffUser() {
    localStorage.removeItem('loggedUser');
}

function getUserByName(name) {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'));
    return registeredUsers.find(user => user.userName === name);
}

function getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
}

export default {
    registerUser,
    loginUser,
    getLoggedUser,
    logOffUser,
}