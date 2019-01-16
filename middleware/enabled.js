
export default ({ store, redirect }) => {
    if (!store.getters['users/isEnabled']) {
        return redirect('/create-profile');
    }
}
