'use strict';

import { post } from '../../common/util/service';

export function getList(params) {
	return post('/report/rankList.json', params);
}
