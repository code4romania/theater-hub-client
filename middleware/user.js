
export default ({ store, redirect }) => {
    if (!store.getters['users/isUser']) {
        return redirect('/administration/users');
    }
}
