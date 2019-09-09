
export class Endpoints {
    static GetSkills                            = '/applicationdata/skills';

    static GetLocales                           = '/applicationdata/locales';

    static GetCurrencies                        = '/applicationdata/currencies';

    static GetGeneralApplicationInformation     = '/applicationdata/general';

    static Login                                = '/authentication';

    static CheckUserPassword                    = '/authentication/password/validity';

    static Contact                              = '/users/contact';

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

    static GetCommunityMemberProfile            = '/users/profile';

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

    static GetProject                           = '/projects';

    static GetProjects                          = '/projects';

    static CreateProject                        = '/projects';

    static Administration = {
        GetUsers: '/administration/users',
        InviteUser: '/administration/user/invite',
        EnableUser: '/administration/user/{0}/enable',
        DisableUser: '/administration/user/{0}/disable',
        DeleteUser: '/administration/user/{0}/delete'
    }
};
