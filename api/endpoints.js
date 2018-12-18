
export class Endpoints {
    static GetWelcomeMessage    = '';

    static Login                = '/authentication';

    static CheckUserPassword    = '/authentication/password/validity';

    static Register             = '/users/register';

    static FinishRegistration   = '/users/register/finish';

    static ForgotPassword       = '/users/password/forgot';

    static ResetPassword        = '/users/password/reset';

    static ChangePassword       = '/users/password/change';

    static CreateProfile        = '/users/profile/create';

    static GetSettings          = '/users/settings';

    static UpdateSettings       = '/users/settings';

    static DeleteMe             = '/users/me';
};
