
export default ({ store, redirect }) => {
    if (store.getters['authentication/isAuthenticated'] &&
                store.getters['users/isUser'] &&
                !store.getters['users/isEnabled']) {
        return redirect('/create-profile');
    }
}
