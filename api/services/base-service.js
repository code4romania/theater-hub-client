import { Endpoints } from '../endpoints';

export class BaseService {
    static $axios;

    static setAxios (axios) {
        this.$axios = axios;
    }

    static async getWelcomeMessage () {
        var response = await this.$axios.$get(Endpoints.GetWelcomeMessage);

        return response.message;
    }
}
