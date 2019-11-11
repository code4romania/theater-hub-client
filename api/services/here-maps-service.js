import { Endpoints }    from '../endpoints';
import { BaseService }  from './index';
import { getConfig }    from '~/config/env';
const axios = require('axios');

const config = getConfig();

export class HereMapsService extends BaseService {
    static async getCities (text) {
        const url = Endpoints.HereMaps.GetAutocompleteSuggestions
                            .replace('{0}', config.Here_Maps.app_id)
                            .replace('{1}', config.Here_Maps.app_code)
                            .replace('{2}', text);

        let response = await axios.get(url);

        let cities = [];

        if (response.data && response.data.suggestions) {
            cities = response.data.suggestions
                                .filter(s => s.matchLevel === 'city')
                                .map(s => `${s.address.city}, ${s.address.country}`);
        }

        return cities;
    }
}
