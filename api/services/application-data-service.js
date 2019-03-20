import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class ApplicationDataService extends BaseService {
    static async getSkills () {
        return this.$axios.$get(Endpoints.GetSkills);
    }

    static async getLocales () {
        return this.$axios.$get(Endpoints.GetLocales);
    }
}
