import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class ExperienceService extends BaseService {
    static async create (request) {
        return this.$axios.$post(Endpoints.CreateExperienceStep, request);
    }

    static async update (request) {
        return this.$axios.$patch(Endpoints.UpdateExperienceStep, request);
    }

    static async delete (id) {
        return this.$axios.$delete(`${Endpoints.DeleteExperienceStepByID}/${id}`);
    }
}
