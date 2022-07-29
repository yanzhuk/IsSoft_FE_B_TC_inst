import {
    authView,
    usersListView,
    userDetailsView,
} from './views/index.js';

export const ROUTES_ENUM = {
    auth: '#auth',
    usersList: '#usersList',
    user: '#user',
}

const views = {
    [ROUTES_ENUM.auth]: authView,
    [ROUTES_ENUM.usersList]: usersListView,
    [ROUTES_ENUM.user]: userDetailsView,
}

const $root = document.getElementById('root');

export function goTo(path) {
    // history.pushState(null, null, document.location.pathname + path); // problems with arrows
    window.location.hash = path; // problems with double rendering
    const [viewName, ...params] = path.split('/');
    const layout = views[viewName].render(params);

    $root.innerHTML = '';
    $root.append(layout);
}