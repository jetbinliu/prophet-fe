'use strict';

import { get } from '../../common/util/service';
import { post } from '../../common/util/service';

export function getAllSecretsByUser(params) {
	return get('/hive_secret/get_all_secrets.json', params);
}
