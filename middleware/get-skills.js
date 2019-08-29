
export default ({ store, redirect }) => {
    if (store.getters['applicationData/skills'].length === 0) {
        return store.dispatch('applicationData/getSkills');
    }
}
