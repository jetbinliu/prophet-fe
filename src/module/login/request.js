'use strict';

import { get } from '../../common/util/service';
import { post } from '../../common/util/service';

export function login(params) {
	return post('/login.json', params);
}

export function logout(params) {
	return post('/logout.json', params);
}

export function getLoginedUser(params) {
	return get('/get_login_user.json', params);
}