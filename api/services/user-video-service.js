import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class UserVideoService extends BaseService {
    static async create (request) {
        return this.$axios.$post(Endpoints.CreateVideo, request);
    }

    static async update (request) {
        return this.$axios.$patch(Endpoints.UpdateVideo, request);
    }

    static async delete (id) {
        return this.$axios.$delete(`${Endpoints.DeleteVideoByID}/${id}`);
    }
}
