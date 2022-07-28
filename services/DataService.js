function registerUser(userData) {
    const registeredUsers = getAllUsers();
    const newUser = {
        ...userData,
        id: new Date().getTime().toString(),
    }
    if (registeredUsers) {
        registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    } else {
        localStorage.setItem('registeredUsers', JSON.stringify([newUser]));
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
            id: user.id,
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

function getUserById(id) {
    const registeredUsers = getAllUsers();
    return registeredUsers.find(user => user.id === id);
}

function getUserByName(userName) {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'));
    return registeredUsers.find(user => user.userName === userName);
}

function getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
}

function getAllUsers() {
    return JSON.parse(localStorage.getItem('registeredUsers'));
}

function deleteUserById(id) {
    const users = getAllUsers();
    const updatedUsers = users.filter(user => user.id !== id);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
}

function updateUserById(id, newUserData) {
    const allUsers = getAllUsers();
    const newUsersList = allUsers.map(
        user =>
            user.id === id
                ? {
                    ...user,
                    ...newUserData,
                }
                : user
    );

    localStorage.setItem('registeredUsers', JSON.stringify(newUsersList));
}

export default {
    deleteUserById,
    registerUser,
    loginUser,
    getLoggedUser,
    logOffUser,
    getAllUsers,
    getUserById,
    updateUserById,
}
