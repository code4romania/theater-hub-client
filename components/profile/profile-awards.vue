<template>
    <v-layout class="profile-awards-layout profile-entity-layout">

        <v-flex xs12 v-if="isTimeline">
            <v-timeline-item medium hide-dot right class="timeline-header-item">
                <v-card class="timeline-header-card elevation-2">
                    <v-card-title class="secondary-color">
                        <h3 class="timeline-header">{{ $t('pages.profile.awards-title') }}</h3>
                    </v-card-title>
                </v-card>
            </v-timeline-item>

            <v-timeline-item
                :key="`award-${awardIndex}`"
                v-for="(award, awardIndex) in awards"
                v-bind:class="{'timeline-message': award.inEditMode || award.inDeleteMode}"
                @mouseenter.native="award.isHovered = true"  @mouseleave.native="award.isHovered = false"
                class="timeline-achievement-item" color="primary" small fill-dot right>
                    <v-card class="elevation-2" v-if="!award.inEditMode && !award.inDeleteMode">
                        <v-card-title>
                            <v-layout row class="timeline-item-action-row profile-row-actions-container">
                                <v-flex xs10 sm10 md10 lg10>
                                    <span class="award-title">{{ award.title }}</span>, <span class="award-issuer ml-1">{{ award.issuer }}</span>
                                    -
                                    <span class="timeline-date">{{ getTimelineDate(award.date) }}</span>
                                </v-flex>
                                <v-flex xs12 sm2 md2 lg2 class="profile-row-actions" v-if="awardIndex === 0 || award.isHovered">
                                    <v-btn outline small fab class="edit-icon" v-on:click="onEditAwardClick(award, awardIndex)">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn outline small fab class="remove-icon" v-on:click="onDeleteAwardClick(award, awardIndex)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-card-text v-if="award.description">
                            <p class="award-description">
                                {{ award.description }}
                            </p>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="award.inEditMode">
                        <ProfileAwardEdit :award="award" :index="awardIndex" @editAward="editAward"/>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="award.inDeleteMode">
                        <ProfileAwardDelete :index="awardIndex" @deleteAward="deleteAward"/>
                    </v-card>
            </v-timeline-item>
            <v-timeline-item  v-if="!hasAwards() && !isEditingAwards" medium hide-dot class="timeline-message">
                <v-card class="timeline-message-card elevation-2">
                    <v-card-title>
                        {{ $t('pages.profile.no-awards-message') }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>
            <v-timeline-item medium hide-dot class="timeline-message add-achievement-timeline-item"
                v-if="!isAddingAward">
                <v-card class="timeline-message-card text-xs-center" v-on:click.native="onAddAwardClick()">
                    <v-card-title>
                        <v-icon>add</v-icon>
                       {{ $t('shared.content.add-award-button') }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>
            <v-timeline-item medium hide-dot class="timeline-message" v-if="isAddingAward">
                <v-card class="timeline-message-card elevation-2 highlighted-section">
                    <ProfileAwardAdd @addAward="addAward"/>
                </v-card>
            </v-timeline-item>
        </v-flex>

        <v-flex xs12 v-if="!isTimeline">

            <div :key="`award-${awardIndex}`"
                v-for="(award, awardIndex) in awards"
                v-bind:class="{'timeline-message': award.inEditMode || award.inDeleteMode}"
                @mouseenter.native="award.isHovered = true"  @mouseleave.native="award.isHovered = false"
                class="achievement-item" color="primary">
                    <v-card class="elevation-2" v-if="!award.inEditMode && !award.inDeleteMode">
                        <v-card-title>
                            <v-layout row class="item-action-row profile-row-actions-container">
                                <v-flex xs10 sm10 md10 lg10>
                                    <span class="award-title">{{ award.title }}</span>, <span class="award-issuer ml-1">{{ award.issuer }}</span>
                                    -
                                    <span class="timeline-date">{{ getTimelineDate(award.date) }}</span>
                                </v-flex>
                                <v-flex xs12 sm2 md2 lg2 class="profile-row-actions" v-if="awardIndex === 0 || award.isHovered">
                                    <v-btn outline small fab class="edit-icon" v-on:click="onEditAwardClick(award, awardIndex)">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn outline small fab class="remove-icon" v-on:click="onDeleteAwardClick(award, awardIndex)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-card-text v-if="award.description">
                            <p class="award-description">
                                {{ award.description }}
                            </p>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="award.inEditMode">
                        <ProfileAwardEdit :award="award" :index="awardIndex" @editAward="editAward"/>
                    </v-card>
                    <v-card class="elevation-2 timeline-message-card highlighted-section" v-if="award.inDeleteMode">
                        <ProfileAwardDelete :index="awardIndex" @deleteAward="deleteAward"/>
                    </v-card>
            </div>
            <div v-if="!hasAwards && !isEditingAwards" class="timeline-message">
                <v-card class="timeline-message-card elevation-2">
                    <v-card-title>
                        {{ $t('pages.profile.no-awards-message') }}
                    </v-card-title>
                </v-card>
            </div>

            <v-btn outline class="add-achievement-btn add-award-btn add-entity-btn"
                                                    v-if="!isAddingAward" v-on:click.native="onAddAwardClick()">
                <v-icon>add</v-icon> {{ $t('shared.content.add-award-button') }}
            </v-btn>

            <div class="timeline-message" v-if="isAddingAward">
                <v-card class="timeline-message-card elevation-2 highlighted-section">
                    <ProfileAwardAdd @addAward="addAward"/>
                </v-card>
            </div>
        </v-flex>

    </v-layout>
</template>

<script>
    import moment from 'moment';
    import { Helpers } from '~/utils';
    import { ProfileSectionType } from '~/store/entities';
    import ProfileAwardAdd from '~/components/profile/profile-award-add.vue';
    import ProfileAwardEdit from '~/components/profile/profile-award-edit.vue';
    import ProfileAwardDelete from '~/components/profile/profile-award-delete.vue';

    export default {
        components: {
            ProfileAwardAdd,
            ProfileAwardEdit,
            ProfileAwardDelete
        },
        props: ['awards', 'isTimeline', 'saveChanges'],
		data: function () {
            return {
                editedAwards: [...this.awards],
                isEditingAwards: false,
                isAddingAward: false,
                isDeletingAward: false
            };
        },
        methods: {
            onAddAwardClick: function () {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(false);
                this.cloneEditedAwards();
                this.isAddingAward = true;
            },
            onEditAwardClick: function (award, index) {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(false);
                this.cloneEditedAwards();
                this.isEditingAwards = true;
                award.inEditMode = true;
            },
            onDeleteAwardClick: function (award, index) {
                this.cancelAllUnsavedChanges();
                this.initiateEditSectionSession(false);
                this.cloneEditedAwards();
                this.isDeletingAward = true;
                award.inDeleteMode = true;
            },
            addAward: function (award) {
                let newAward = {};

                if (award) {
                    newAward = {
                        title: award.title,
                        issuer: award.issuer,
                        description: award.description,
                        date: award.date,
                        isHovered: false,
                        inEditMode: false,
                        inDeleteMode: false
                    };
                }

                if (award && this.saveChanges) {
                    var request = {
                        Title: award.title,
                        Issuer: award.issuer,
                        Description: award.description,
                        Date: award.date
                    };

                    this.$store.dispatch('awards/create', request).then((response) => {
                        newAward.id = this.$store.state.awards.newAward.ID;

                        this.editedAwards.push(newAward);

                        this.editedAwards = this.editedAwards.sort((a1, a2) => new Date(a1.date).getTime() > new Date(a2.date).getTime() ? -1 : 1);

                        this.updateAwards();
                        this.showSnackbar(this.$t('pages.profile.snackbar-messages.update-awards'));
                    });
                } else if (award) {
                    this.editedAwards.push(newAward);

                    this.editedAwards = this.editedAwards.sort((a1, a2) => new Date(a1.date).getTime() > new Date(a2.date).getTime() ? -1 : 1);

                    this.updateAwards();
                }

                this.isAddingAward = false;
                this.endEditSectionSession();
            },
            editAward: function (award, index) {
                let newAward = {};

                if (award) {
                    newAward = {
                        title: award.title,
                        issuer: award.issuer,
                        description: award.description,
                        date: award.date
                    };
                }

                if (award && this.saveChanges) {
                    var request = {
                        ID: award.id,
                        Title: award.title,
                        Issuer: award.issuer,
                        Description: award.description,
                        Date: award.date
                    };

                    this.$store.dispatch('awards/update', request).then(() => {
                        this.editedAwards[index] = newAward;

                        this.editedAwards = this.editedAwards.sort((a1, a2) => new Date(a1.date).getTime() > new Date(a2.date).getTime() ? -1 : 1);

                        this.updateAwards();
                        this.showSnackbar(this.$t('pages.profile.snackbar-messages.update-awards'));
                    });
                } else if (award) {
                    this.editedAwards[index] = newAward;

                    this.editedAwards = this.editedAwards.sort((a1, a2) => new Date(a1.date).getTime() > new Date(a2.date).getTime() ? -1 : 1);

                    this.updateAwards();
                }

                this.awards.forEach(a => {
                    a.inEditMode = false;
                });
                this.isEditingAwards = false;
                this.endEditSectionSession();
            },
            deleteAward: function (index) {
                if (index !== null && this.saveChanges) {
                    var id = this.editedAwards[index].id;

                    this.$store.dispatch('awards/delete', id).then(() => {
                        this.editedAwards.splice(index, 1);

                        this.updateAwards();
                        this.showSnackbar(this.$t('pages.profile.snackbar-messages.update-awards'));
                    });
                } else if (index !== null) {
                    this.editedAwards.splice(index, 1);

                    this.updateAwards();
                }

                this.awards.forEach(a => {
                    a.inDeleteMode = false;
                });
                this.isDeletingAward = false;
                this.endEditSectionSession();
            },
            cancelAllUnsavedChanges: function () {
                this.isAddingAward   = false;
                this.isEditingAwards = false;
                this.isDeletingAward = false;
                this.endEditSectionSession();
            },
            cloneEditedAwards: function () {
                this.editedAwards = Helpers.cloneObject(this.awards);
            },
            initiateEditSectionSession: function (navigateToElement) {
                this.$emit('initiateEditSectionSession', navigateToElement, ProfileSectionType.Awards);
            },
            endEditSectionSession: function () {
                this.$emit('endEditSectionSession', ProfileSectionType.Awards);
            },
            updateAwards: function () {
                this.$emit('updateAwards', this.editedAwards);
            },
            showSnackbar: function (snackbarText) {
                this.$emit('showSnackbar', snackbarText);
            },
            hasAwards: function () {
                return this.awards.length !== 0;
            },
            getTimelineDate (date) {
                return moment(date).format('MM/YYYY');
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>
