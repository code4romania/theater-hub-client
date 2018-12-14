import { BaseService } from '../api/services';

export default ({ $axios }) => {
    BaseService.setAxios($axios);
}
