'use strict';

import { get } from '../../common/util/service';
import { post } from '../../common/util/service';

export function getAllProphetUsersAjax(params) {
	return get('/get_all_prophet_users.json', params);
}

export function addProphetUserAjax(params) {
	return post('/add_prophet_user.json', params);
}

