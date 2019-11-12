
export class Endpoints {
    static GetSkills                            = '/applicationdata/skills';

    static GetLocales                           = '/applicationdata/locales';

    static GetCurrencies                        = '/applicationdata/currencies';

    static GetTags                              = '/applicationdata/tags';

    static GetGeneralApplicationInformation     = '/applicationdata/general';

    static Login                                = '/authentication';

    static CheckUserPassword                    = '/authentication/password/validity';

    static Contact                              = '/users/contact';

    static SubcribeToNewsletter                 = '/users/newsletter';

    static Register                             = '/users/register';

    static ManagedUserSignup                    = '/users/register/managed';

    static FinishRegistration                   = '/users/register/finish';

    static ForgotPassword                       = '/users/password/forgot';

    static ResetPassword                        = '/users/password/reset';

    static ChangePassword                       = '/users/password/change';

    static CreateProfile                        = '/users/profile/create';

    static GenerateResume                       = '/users/resume';

    static UpdateMyGeneralInformation           = '/users/me/general';

    static UpdateMySkills                       = '/users/me/skills';

    static UpdateMyPhotoGallery                 = '/users/me/photogallery';

    static UpdateMyVideoGallery                 = '/users/me/videogallery';

    static UpdateMyAwards                       = '/users/me/awards';

    static UpdateMyExperience                   = '/users/me/experience';

    static UpdateMyEducation                    = '/users/me/education';

    static GetSettings                          = '/users/settings';

    static UpdateSettings                       = '/users/settings';

    static GetMyProfile                         = '/users/me/profile';

    static GetMe                                = '/users/me';

    static GetCommunityLayers                   = '/users/community/layers';

    static GetCommunityMembers                  = '/users/community/members';

    static GetRandomCommunityMembers            = '/users/community/members/random';

    static GetCommunityMemberProfile            = '/users/profile';

    static GetMyProjects                        = '/users/me/projects';

    static GetProjects                          = '/users/projects';

    static DeleteMe                             = '/users/me';

    static CreateVideo                          = '/videos';

    static UpdateVideo                          = '/videos';

    static DeleteVideoByID                      = '/videos';

    static CreateAward                          = '/awards';

    static UpdateAward                          = '/awards';

    static DeleteAwardByID                      = '/awards';

    static CreateEducationStep                  = '/education';

    static UpdateEducationStep                  = '/education';

    static DeleteEducationStepByID              = '/education';

    static CreateExperienceStep                 = '/experience';

    static UpdateExperienceStep                 = '/experience';

    static DeleteExperienceStepByID             = '/experience';

    static Projects = {
        GetProject: '/projects',
        GetMyProject: '/projects/me',
        GetProjects: '/projects',
        GetRandomProjects: '/projects/random',
        CreateProject: '/projects',
        UpdateProjectGeneralInformation: '/projects/{0}/general',
        DeleteProjectByID: '/projects',
        CreateProjectNeed: '/projects/{0}/needs',
        UpdateProjectNeed: '/projects/{0}/needs/{1}',
        DeleteProjectNeedByID: '/projects/{0}/needs/{1}',
        CreateProjectUpdate: '/projects/{0}/updates',
        UpdateProjectUpdate: '/projects/{0}/updates/{1}',
        DeleteProjectUpdateByID: '/projects/{0}/updates/{1}'
    }

    static Administration = {
        GetUsers: '/administration/users',
        InviteUser: '/administration/users/invite',
        EnableUser: '/administration/users/{0}/enable',
        DisableUser: '/administration/users/{0}/disable',
        DeleteUser: '/administration/users/{0}/delete',
        GetProjects: '/administration/projects',
        EnableProject: '/administration/projects/{0}/enable',
        DisableProject: '/administration/projects/{0}/disable',
        DeleteProject: '/administration/projects/{0}/delete'
    }

    static HereMaps = {
        GetAutocompleteSuggestions: 'http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id={0}&app_code={1}&query={2}'
    };
};
