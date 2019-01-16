import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class EducationService extends BaseService {
    static async create (request) {
        return this.$axios.$post(Endpoints.CreateEducationStep, request);
    }

    static async update (request) {
        return this.$axios.$patch(Endpoints.UpdateEducationStep, request);
    }

    static async delete (id) {
        return this.$axios.$delete(`${Endpoints.DeleteEducationStepByID}/${id}`);
    }
}
