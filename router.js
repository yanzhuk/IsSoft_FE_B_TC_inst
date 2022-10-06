import {
    registerView,
    loginView,
    usersListView,
    userDetailsView,
} from "./views/index.js";

export const ROUTES_ENUM = {
    login: "#login",
    register: "#register",
    usersList: "#usersList",
    user: "#user",
};

const views = {
    [ROUTES_ENUM.login]: loginView,
    [ROUTES_ENUM.register]: registerView,
    [ROUTES_ENUM.usersList]: usersListView,
    [ROUTES_ENUM.user]: userDetailsView,
};

const routerActions = {
    'toRegisterForm': () => { goTo(ROUTES_ENUM.register) },
    'toLoginForm': () => { goTo(ROUTES_ENUM.login) },
    'toUsersList': () => { goTo(ROUTES_ENUM.usersList) },
    'toUserPage': (param) => { goTo(`${ROUTES_ENUM.user}/${param}`) },
};

document.addEventListener("RouterEvent", handleRouterEvent);

const $root = document.getElementById("root");

export function goTo(path) {
    // history.pushState(null, null, document.location.pathname + path); // problems with arrows
    window.location.hash = path; // problems with double rendering
    const [viewName, ...params] = path.split("/");
    const layout = views[viewName].render(params);

    $root.innerHTML = "";
    $root.append(layout);
}

function handleRouterEvent({ detail }) {
    console.log(detail)
    const { actionName, param } = detail;
    routerActions[actionName](param);
}
