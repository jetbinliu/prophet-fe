'use strict';

import { get } from '../../common/util/service';

export function getList(params) {
	return get('/json1.json', params);
}
