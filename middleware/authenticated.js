
export default ({ store, redirect }) => {
    if (!store.getters['authentication/isAuthenticated']) {
        return redirect('/login');
    }
}
