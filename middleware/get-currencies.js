
export default ({ store, redirect }) => {
    if (store.getters['applicationData/currencies'].length === 0) {
        return store.dispatch('applicationData/getCurrencies');
    }
}
