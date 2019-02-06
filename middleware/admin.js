
export default ({ store, redirect }) => {
    if (!store.getters['users/isAdmin']) {
        return redirect('/projects');
    }
}
