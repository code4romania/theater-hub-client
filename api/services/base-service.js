
export class BaseService {
    static $axios;

    static setAxios (axios) {
        this.$axios = axios;
    }
}
