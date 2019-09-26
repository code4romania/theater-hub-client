import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';

export class ProjectService extends BaseService {
    static async create (request) {
        return this.$axios.$post(Endpoints.Projects.CreateProject, request);
    }

    static async getProject (id) {
        return this.$axios.$get(`${Endpoints.Projects.GetProject}/${id}`);
    }

    static async getMyProject (id) {
        return this.$axios.$get(`${Endpoints.Projects.GetMyProject}/${id}`);
    }

    static async getProjects (query) {
        return this.$axios.$get(`${Endpoints.Projects.GetProjects}?searchTerm=${query.searchTerm}&page=${query.page}&pageSize=${query.pageSize}`);
    }

    static async getRandomProjects (count = 2) {
        return this.$axios.$get(`${Endpoints.Projects.GetRandomProjects}?count=${count}`);
    }

    static async updateGeneralInformation (id, generalInformation) {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };

        const projectImage = generalInformation.Image
                                    ? generalInformation.Image.File
                                    : '';

        var generalInformationFormData = new FormData();
        generalInformationFormData.append('Name', generalInformation.Name);
        generalInformationFormData.append('Description', generalInformation.Description);
        generalInformationFormData.append('Image', projectImage);
        generalInformationFormData.append('Email', generalInformation.Email);
        generalInformationFormData.append('PhoneNumber', generalInformation.PhoneNumber);
        generalInformationFormData.append('Date', generalInformation.Date);
        generalInformationFormData.append('Budget', generalInformation.Budget);
        generalInformationFormData.append('Currency', generalInformation.Currency);
        generalInformationFormData.append('City', generalInformation.City);
        generalInformationFormData.append('Visibility', generalInformation.Visibility);

        return this.$axios.$patch(Endpoints.Projects.UpdateProjectGeneralInformation.replace('{0}', id), generalInformationFormData, config);
    }

    static async delete (id) {
        return this.$axios.$delete(`${Endpoints.Projects.DeleteProjectByID}/${id}`);
    }
}
