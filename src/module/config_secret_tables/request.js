'use strict';

import { get } from '../../common/util/service';
import { post } from '../../common/util/service';

export function getAllNonSecretsAjax(params) {
	return get('/hive_secret/get_all_non_secrets.json', params);
}

export function addSecretTablesAjax(params) {
	return post('/hive_secret/add_secret_tables.json', params);
}