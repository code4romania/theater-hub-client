
export class Endpoints {
    static GetWelcomeMessage            = '';

    static GetSkills                    = '/applicationdata/skills';

    static Login                        = '/authentication';

    static CheckUserPassword            = '/authentication/password/validity';

    static Register                     = '/users/register';

    static FinishRegistration           = '/users/register/finish';

    static ForgotPassword               = '/users/password/forgot';

    static ResetPassword                = '/users/password/reset';

    static SetPassword                  = '/users/password/set';

    static ChangePassword               = '/users/password/change';

    static CreateProfile                = '/users/profile/create';

    static UpdateMyGeneralInformation   = '/users/me/general';

    static UpdateMySkills               = '/users/me/skills';

    static UpdateMyPhotoGallery         = '/users/me/photogallery';

    static UpdateMyVideoGallery         = '/users/me/videogallery';

    static UpdateMyAwards               = '/users/me/awards';

    static UpdateMyExperience           = '/users/me/experience';

    static UpdateMyEducation            = '/users/me/education';

    static GetSettings                  = '/users/settings';

    static UpdateSettings               = '/users/settings';

    static GetMyProfile                 = '/users/me/profile';

    static GetMe                        = '/users/me';

    static GetCommunityMembers          = '/users/community';

    static GetCommunityMemberProfile    = '/users/profile';

    static DeleteMe                     = '/users/me';

    static CreateVideo                  = '/videos';

    static UpdateVideo                  = '/videos';

    static DeleteVideoByID              = '/videos';

    static CreateAward                  = '/awards';

    static UpdateAward                  = '/awards';

    static DeleteAwardByID              = '/awards';

    static CreateEducationStep          = '/education';

    static UpdateEducationStep          = '/education';

    static DeleteEducationStepByID      = '/education';

    static CreateExperienceStep         = '/experience';

    static UpdateExperienceStep         = '/experience';

    static DeleteExperienceStepByID     = '/experience';

    static Administration = {
        GetUsers: '/administration/users',
        AddUser: '/administration/user',
        EnableUser: '/administration/user/{1}/enable',
        DisableUser: '/administration/user/{1}/disable',
        DeleteUser: '/administration/user/{1}/delete'
    }
};
