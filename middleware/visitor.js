
export default ({ store, redirect }) => {
    if (store.getters['authentication/isAuthenticated'] && store.getters['users/isUser']) {
        return redirect('/projects');
    }

    if (store.getters['authentication/isAuthenticated'] && store.getters['users/isAdmin']) {
        return redirect('/administration/users');
    }
}
