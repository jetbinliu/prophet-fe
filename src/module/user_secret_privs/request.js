'use strict';

import { get } from '../../common/util/service';
import { post } from '../../common/util/service';

export function getAllSecretTablesAjax(params) {
	return get('/hive_secret/get_all_secret_tables.json', params);
}

export function grantSecretPrivAjax(params) {
	return post('/hive_secret/grant_user_priv.json', params);
}