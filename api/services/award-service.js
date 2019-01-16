import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class AwardService extends BaseService {
    static async create (request) {
        return this.$axios.$post(Endpoints.CreateAward, request);
    }

    static async update (request) {
        return this.$axios.$patch(Endpoints.UpdateAward, request);
    }

    static async delete (id) {
        return this.$axios.$delete(`${Endpoints.DeleteAwardByID}/${id}`);
    }
}
