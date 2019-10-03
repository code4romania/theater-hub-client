
export default ({ store, redirect }) => {
    if (!store.getters['applicationData/projectNeedTags']) {
        return store.dispatch('applicationData/getTags');
    }
}
