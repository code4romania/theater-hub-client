import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class ApplicationDataService extends BaseService {
    static async getSkills () {
        return this.$axios.$get(Endpoints.GetSkills);
    }

    static async getLocales () {
        return this.$axios.$get(Endpoints.GetLocales);
    }

    static async getCurrencies () {
        return this.$axios.$get(Endpoints.GetCurrencies);
    }

    static async getTags () {
        return this.$axios.$get(Endpoints.GetTags);
    }

    static async getGeneralApplicationInformation () {
        return this.$axios.$get(Endpoints.GetGeneralApplicationInformation);
    }
}
